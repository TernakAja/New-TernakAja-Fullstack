"use client"

import { Icons } from "@/components/ui/Icons";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginAction } from "./actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(loginAction, null);

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (

        <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-sans">

            <div className="w-full max-w-sm">

                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-2xl tracking-tight mb-6 hover:opacity-80 transition">
                        <Icons.appIcon />
                        TernakAja
                    </Link>
                    <h1 className="text-2xl font-bold">Masuk ke Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-2">Gunakan kredensial mitra untuk melanjutkan</p>
                </div>

                <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
                    <form action={formAction} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                disabled={isPending}
                                placeholder="nama@peternakan.com"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password">Kata Sandi</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                disabled={isPending}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full gap-2"
                            >
                                {isPending && (
                                    <span className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                                )}
                                {isPending ? "Memverifikasi..." : "Masuk"}
                            </Button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Belum menjadi mitra? <Link href="/join-us" className="text-primary hover:underline">Pelajari lebih lanjut</Link>
                </p>
            </div>

        </div>
    );
}
