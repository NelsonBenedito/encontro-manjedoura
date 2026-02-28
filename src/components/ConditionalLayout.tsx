"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";

export function ConditionalLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // Remove Header e Footer na tela de checkout (/inscricao/[slug])
    const isCheckoutForm = pathname?.startsWith("/inscricao/") && pathname.length > "/inscricao/".length;

    if (isCheckoutForm) {
        return <main className="flex-1">{children}</main>;
    }

    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </>
    );
}
