"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch logic: only render after mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8 rounded-md bg-white/10 animate-pulse" />;
    }

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-white dark:hover:text-black transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 dark:hidden block text-zinc-400 hover:text-inherit" />
            <Moon className="h-5 w-5 hidden dark:block text-zinc-600 hover:text-inherit" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
