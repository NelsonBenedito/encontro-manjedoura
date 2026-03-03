import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Página não encontrada",
    description: "Desculpe, o caminho que você tentou acessar não existe no Movimento Manjedoura.",
};

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden bg-spiritual-white dark:bg-spiritual-dark text-spiritual-dark dark:text-spiritual-white px-4">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-spiritual-gold/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container max-w-2xl mx-auto text-center relative z-10">
                {/* 404 Visual */}
                <div className="relative mb-8 inline-block">
                    <h1 className="text-[120px] md:text-[180px] font-playfair font-black leading-none opacity-10 dark:opacity-20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center translate-y-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 relative">
                            <Image
                                src="/favicon.ico"
                                alt="Logo Manjedoura"
                                fill
                                className="object-contain opacity-80"
                            />
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-spiritual-dark dark:text-spiritual-white">
                    Caminho não encontrado
                </h2>

                <p className="text-lg text-spiritual-dark/60 dark:text-spiritual-white/60 font-light mb-12 max-w-md mx-auto leading-relaxed">
                    Assim como procuramos o propósito, às vezes nos perdemos pelo caminho.
                    A página que você busca parece não estar disponível.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-spiritual-gold text-spiritual-dark font-black rounded-2xl hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark transition-all shadow-lg shadow-spiritual-gold/20"
                    >
                        <Home className="w-5 h-5" />
                        Voltar ao Início
                    </Link>

                    <Link
                        href="/inscricao"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-spiritual-dark/10 dark:border-spiritual-white/10 text-spiritual-dark dark:text-spiritual-white font-bold rounded-2xl hover:border-spiritual-gold hover:text-spiritual-gold transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Ver Eventos
                    </Link>
                </div>
            </div>

            {/* Subtle bottom text */}
            <div className="absolute bottom-12 left-0 w-full text-center">
                <p className="text-xs uppercase tracking-[0.3em] font-bold text-spiritual-gold opacity-50">
                    Movimento Manjedoura
                </p>
            </div>
        </div>
    );
}
