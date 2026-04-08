import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Icons } from '../ui/Icons';

const textStyling1 = "hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"

const footerContents = [
    {
    title : "Produk",
    content : [
        { name: "Hardware IoT", url: "" },
        { name: "TernakBoard", url: "" },
        { name: "Integrasi SiKOMANDAN", url: "" }
    ]
    },
    {
    title : "Riset",
    content : [
        { name: "Rencana Pilot-Project", url: "" },
        { name: "TernakBoard", url: "" },
        { name: "Integrasi SiKOMANDAN", url: ""}
    ]
    }
]

const FooterColumns = () => {
    return (
        <>
        {footerContents.map((v) => (
        <div key={v.title}>
            <h4 className="font-semibold text-foreground mb-4">{v.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {v.content.map((x) => (
                    <li key={x.name} ><a href="#" className={textStyling1}>{x.name}</a></li>    
                ))}
            </ul>
        </div>
        )
        )}
        </>
    );
}

export function Footer ()  {
    return (
        <footer className="border-t border-border bg-muted pt-16 pb-8">
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
                {/* STARTS HERE */}
                <FooterColumns/>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
                <p>© 2026 TernakAja. Memberdayakan masa depan agrikultur pintar.</p>
            </div>
        </footer>
    );
};
