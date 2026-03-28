import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Icons } from '../ui/Icons';


export const Footer = () => {
    return (
        <footer className="border-t border-border bg-zinc-50 dark:bg-zinc-950 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
                <div className="col-span-2">
                    <Link href="/" className="flex items-center gap-2 text-foreground font-semibold mb-4">
                        <Icons.appIcon />
                        TernakAja
                    </Link>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        Mewujudkan sistem peternakan digital yang berkelanjutan untuk meningkatkan ketahanan pangan nasional.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Produk</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Hardware IoT</a></li>
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Dashboard AI</a></li>
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Integrasi SIKOMANDAN</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Riset</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Hasil Pilot</a></li>
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Dokumentasi ISIKHNAS</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Perusahaan</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Tim Kami</a></li>
                        <li><a href="#" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Misi</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
                <p>© 2026 TernakAja. Memberdayakan masa depan agrikultur pintar.</p>
            </div>
        </footer>
    );
};
