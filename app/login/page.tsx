import { Leaf } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-foreground font-sans">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-2xl tracking-tight mb-6 hover:opacity-80 transition">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-black dark:text-zinc-900" />
                        </div>
                        TernakAja
                    </Link>
                    <h1 className="text-2xl font-bold">Masuk ke Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-2">Gunakan kredensial mitra untuk melanjutkan</p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-950/50 p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
                    <form className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="nama@peternakan.com"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium" htmlFor="password">Kata Sandi</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-emerald-500/50 transition-shadow text-sm"
                            />
                        </div>
                        <div className="pt-4">
                            <button className="w-full bg-foreground text-background py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                Masuk
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Belum menjadi mitra? <Link href="/information" className="text-emerald-600 dark:text-emerald-400 hover:underline">Pelajari lebih lanjut</Link>
                </p>
            </div>
        </div>
    );
}