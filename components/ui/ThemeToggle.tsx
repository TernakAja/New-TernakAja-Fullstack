"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark";
        const newTheme = isDark ? "light" : "dark";

        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            flushSync(() => setTheme(newTheme));
        });

        transition.ready.then(() => {
            const base = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
            document.documentElement.animate(
                { clipPath: isDark ? [...base].reverse() : base },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    fill: "forwards",
                    pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
                }
            );
        });
    }, [theme, setTheme]);

    return (
        <button
            onClick={toggleTheme}
            suppressHydrationWarning
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-white dark:hover:text-black transition-colors"
            aria-label="Toggle theme"
        >
            <Sun suppressHydrationWarning className="h-5 w-5 dark:hidden block text-zinc-400 hover:text-inherit" />
            <Moon suppressHydrationWarning className="h-5 w-5 hidden dark:block text-zinc-600 hover:text-inherit" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}