import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    return (
        <header className="w-full bg-white/80 dark:bg-spiritual-dark/80 backdrop-blur-md shadow-sm dark:shadow-black/30 border-b border-spiritual-dark/5 dark:border-spiritual-gold/10 sticky top-0 z-50 transition-all">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center group h-full py-4 transition-opacity hover:opacity-80">
                    <Image
                        src="/ManjedouraLogoBlackGorizontal.png"
                        alt="Encontro Manjedoura Logo"
                        width={180}
                        height={48}
                        className="object-contain h-full w-auto dark:hidden"
                        priority
                    />
                    <Image
                        src="/ManjedouraLogoWhiteHorizontal.png"
                        alt="Encontro Manjedoura Logo Dark Mode"
                        width={180}
                        height={48}
                        className="object-contain h-full w-auto hidden dark:block"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-spiritual-dark/70 dark:text-spiritual-white/80 hover:text-spiritual-gold dark:hover:text-spiritual-gold transition-colors"
                    >
                        Início
                    </Link>
                    <Link
                        href="/inscricao"
                        className="text-sm font-medium text-spiritual-dark/70 dark:text-spiritual-white/80 hover:text-spiritual-gold dark:hover:text-spiritual-gold transition-colors"
                    >
                        Eventos
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link
                        href="/inscricao"
                        className="px-6 py-2.5 text-sm font-bold bg-spiritual-gold text-spiritual-dark rounded-full hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark transition-all shadow-sm shadow-spiritual-gold/20 hover:shadow-md hover:-translate-y-0.5 border border-transparent hover:border-spiritual-gold hidden sm:flex"
                    >
                        Inscrever-se
                    </Link>
                </div>
            </div>
        </header>
    );
}
