"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ==============================
    // EMAIL/PASSWORD LOGIN
    // ==============================
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        router.push("/protected"); // change to your dashboard route
    };

    // ==============================
    // GOOGLE LOGIN
    // ==============================
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="p-10 min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-primary">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/home-bg.jpeg"
                    alt="Background Texture"
                    fill
                    className="object-cover opacity-20 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/80"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* LEFT PANEL */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-background">
                    <h1 className="text-4xl font-bold text-center text-foreground mb-10">
                        Login
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-muted-foreground">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-muted-foreground">
                                    Password
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm font-bold text-muted-foreground hover:text-primary underline decoration-transparent hover:decoration-primary transition-all"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-opacity shadow-md disabled:opacity-50"
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground font-medium">
                                OR
                            </span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogleLogin}
                        type="button"
                        className="w-full py-3 px-4 border border-input bg-transparent text-foreground font-bold rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-3"
                    >
                        <Image
                            src="/google_logo.webp"
                            alt="Google Icon"
                            width={20}
                            height={20}
                            className="object-contain"
                        />
                        Continue with Google
                    </button>

                    {/* Sign Up */}
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account yet?{" "}
                        <Link
                            href="/auth/sign-up"
                            className="font-bold text-foreground hover:underline"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="hidden md:flex w-1/2 bg-primary p-12 flex-col items-center justify-center relative overflow-hidden text-center">
                    <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -top-20 -right-20 pointer-events-none"></div>

                    <h2 className="text-4xl font-bold text-white mb-8 relative z-10">
                        Welcome back!
                    </h2>

                    <div className="relative w-full max-w-sm h-64 mb-8 flex items-center justify-center z-10">
                        <Image
                            src="/cow-login.png"
                            alt="Cow Illustration"
                            className="object-contain drop-shadow-2xl"
                            priority
                            width={300}
                            height={200}
                        />
                    </div>

                    <p className="text-white/80 text-lg font-medium relative z-10">
                        Log in to continue to your account.
                    </p>
                </div>
            </div>
        </div>
    );
}
