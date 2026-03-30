"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

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

    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isDark = theme === "dark";
        const newTheme = isDark ? "light" : "dark";

        // Fallback for unsupported browsers (Safari/Firefox might not fully support this yet)
        if (!document.startViewTransition) {
            setTheme(newTheme);
            return;
        }

        // 1. Get click coordinates to use as the center of the circle
        const x = event.clientX;
        const y = event.clientY;

        // 2. Calculate the maximum radius needed to cover the whole screen
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // 3. Start the transition
        const transition = document.startViewTransition(() => {
            // Kita wajib memakai flushSync di React 18+ saat menggunakan View Transition API.
            // Tanpa ini, React akan menjadwalkan update DOM nanti ("batching"),
            // sehingga layar mengambil "screenshot" animasi sebelum DOM temanya benar-benar berubah jadi gelap/terang.
            flushSync(() => {
                setTheme(newTheme);
            });
        });

        // 4. Wait for the pseudo-elements to be created, then animate them
        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            // Animate the root element shrinking or expanding
            document.documentElement.animate(
                {
                    clipPath: isDark ? [...clipPath].reverse() : clipPath,
                },
                {
                    duration: 500,
                    easing: "ease-in-out",
                    fill: "forwards", // <--- INI KUNCINYA: menahan animasi clipPath di state terakhir (0px) tidak nembak balik ke full-screen di akhir frame!
                    // If going to Dark: Animate the NEW element expanding
                    // If going to Light: Animate the OLD element shrinking (revealing the new light element below it)
                    pseudoElement: isDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                }
            );
        });
    };

    return (
        <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:text-white dark:hover:text-black transition-colors"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 dark:hidden block text-zinc-400 hover:text-inherit" />
            <Moon className="h-5 w-5 hidden dark:block text-zinc-600 hover:text-inherit" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
