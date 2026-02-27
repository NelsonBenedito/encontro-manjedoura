"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-10 h-10 rounded-full bg-spiritual-dark/5 dark:bg-spiritual-white/10 flex items-center justify-center animate-pulse">
                <span className="sr-only">Carregando Tema</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="relative w-10 h-10 rounded-full bg-spiritual-dark/5 hover:bg-spiritual-dark/10 dark:bg-spiritual-white/5 dark:hover:bg-spiritual-white/10 flex items-center justify-center transition-colors border border-transparent dark:border-spiritual-white/5 group overflow-hidden"
            aria-label="Alternar Tema"
        >
            <Sun className="w-5 h-5 text-spiritual-gold absolute transition-all duration-500 scale-100 rotate-0 dark:-rotate-90 dark:opacity-0" />
            <Moon className="w-5 h-5 text-spiritual-gold absolute transition-all duration-500 rotate-90 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100" />
        </button>
    );
}
