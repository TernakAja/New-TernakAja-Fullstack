"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
    const router = useRouter();
    const supabase = createClient();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ==============================
    // EMAIL REGISTER
    // ==============================
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        // If email confirmation is enabled, user must verify email first
        router.push("/login");
    };

    // ==============================
    // GOOGLE REGISTER
    // ==============================
    const handleGoogleRegister = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-primary p-4">
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

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* LEFT PANEL */}
                <div className="hidden md:flex w-1/2 bg-primary p-12 flex-col items-center justify-center relative overflow-hidden text-center border-r border-primary/20">
                    <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"></div>

                    <h2 className="text-4xl font-bold text-white mb-8 relative z-10">
                        New here?
                    </h2>

                    <div className="relative w-full max-w-sm h-64 mb-8 flex items-center justify-center z-10">
                        <Image
                            src="/cow-register.png"
                            alt="Jumping Cow Illustration"
                            className="object-contain drop-shadow-2xl"
                            priority
                            width={300}
                            height={200}
                        />
                    </div>

                    <p className="text-white/80 text-lg font-medium relative z-10 max-w-xs">
                        Create an account and join us today!
                    </p>
                </div>

                {/* RIGHT PANEL */}
                <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-background">
                    <h1 className="text-4xl font-bold text-center text-foreground mb-8">
                        Register
                    </h1>

                    <form onSubmit={handleRegister} className="space-y-5">
                        {/* Full Name */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-muted-foreground">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
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
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-muted-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-muted-foreground">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 mt-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-opacity shadow-md disabled:opacity-50"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
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
                        onClick={handleGoogleRegister}
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

                    {/* Login Link */}
                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-bold text-foreground hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
