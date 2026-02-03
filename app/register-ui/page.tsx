import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    // Outer Container: Dark Green Background with Texture
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-primary p-4">
      {/* Background Texture */}
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
        {/* ========================
            LEFT PANEL: BRAND (Green)
        ======================== */}
        <div className="hidden md:flex w-1/2 bg-primary p-12 flex-col items-center justify-center relative overflow-hidden text-center border-r border-primary/20">
          {/* Decorative Glow */}
          <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"></div>

          <h2 className="text-4xl font-bold text-white mb-8 relative z-10">
            New here?
          </h2>

          {/* Cow Image */}
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

        {/* ========================
            RIGHT PANEL: FORM (White)
        ======================== */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-background">
          <h1 className="text-4xl font-bold text-center text-foreground mb-8">
            Register
          </h1>

          <form className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-muted-foreground">
                Full Name
              </label>
              <input
                type="text"
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
                className="w-full px-4 py-3 rounded-lg border border-input bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Register Button */}
            <button
              type="button"
              className="w-full py-3 px-4 mt-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-opacity shadow-md"
            >
              Register
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
            type="button"
            className="w-full py-3 px-4 border border-input bg-transparent text-foreground font-bold rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
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
