import { Cpu, Battery, Terminal, Sun, Activity } from 'lucide-react';

export const products = [
    {
        id: '01',
        name: 'PETSA 01',
        img: 'products/petsa-01/AssemblyIsometric.png',
        tagline: 'The Foundation.',
        description: 'Engineered for everyday reliability. The original standard in performance, stripped down to the essentials without compromising quality.',
        price: 'Rp.215,000',
        comingSoon: true,
        specs: [
            { icon: Cpu, text: 'Core Processing' },
            { icon: Battery, text: 'Standard Battery' },
            { icon: Terminal, text: 'Essential Connectivity' }
        ],
        theme: {
            bg: 'bg-gray-50 dark:bg-[#0A0A0A]',
            glow: 'bg-indigo-500/10 dark:bg-indigo-500/20',
            border: 'border-border ',
            text: 'text-black dark:text-white',
            muted: 'text-gray-500 dark:text-[#888888]',
            card: 'bg-white dark:bg-white/[0.02] border-border  hover:bg-gray-50 dark:hover:bg-white/[0.05]',
            buttonPrimary: 'bg-black text-white hover:bg-neutral-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
            buttonSecondary: 'bg-transparent text-gray-500 dark:text-[#888888] hover:text-black dark:hover:text-white border border-transparent hover:border-border dark:hover:border-white/10'
        }
    },
    {
        id: '02',
        name: 'PETSA 02',
        img: 'products/petsa-02/AssemblyIsometric.png',
        tagline: 'The Evolution.',
        description: 'Advanced metrics and superior materials. Built for the absolute edge. Re-engineered from the ground up to exceed modern performance standards.',
        price: 'To Be Announced',
        comingSoon: true,
        specs: [
            { icon: Sun, text: 'Continuous Solar Charging' },
            { icon: Activity, text: 'Advanced Behavior Tracking' },
            { icon: Cpu, text: 'Pro-grade Processing' }
        ],
        theme: {
            bg: 'bg-white dark:bg-black',
            glow: 'bg-red-500/10 dark:bg-red-500/20',
            border: 'border-border ',
            text: 'text-black dark:text-white',
            muted: 'text-gray-500 dark:text-[#888888]',
            card: 'bg-gray-50 dark:bg-white/[0.03] border-border  hover:bg-gray-100 dark:hover:bg-white/[0.06]',
            buttonPrimary: 'bg-black text-white hover:bg-neutral-800 dark:bg-white/10 dark:text-white dark:hover:bg-white/20',
            buttonSecondary: 'bg-transparent text-gray-500 dark:text-[#888888] hover:text-black dark:hover:text-white border border-transparent hover:border-border dark:hover:border-white/10'
        }
    }
];
