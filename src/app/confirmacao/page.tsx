import Link from "next/link";
import { CheckCircle, Home, Calendar } from "lucide-react";

export default function Confirmacao() {
    return (
        <div className="min-h-[85vh] flex items-center justify-center py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-spiritual-gold/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-xl text-center relative z-10">
                <div className="bg-white dark:bg-[#1a1a1a] p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-spiritual-dark/5 dark:border-spiritual-white/5 flex flex-col items-center">
                    <div className="w-28 h-28 bg-transparent border-4 border-spiritual-gold rounded-full flex items-center justify-center mb-10 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                        <CheckCircle className="w-14 h-14 text-spiritual-gold" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-6 drop-shadow-sm">
                        Inscrição <span className="text-spiritual-gold block mt-2">Confirmada!</span>
                    </h1>
                    <p className="text-lg text-spiritual-dark/70 dark:text-spiritual-white/70 mb-12 leading-relaxed font-light">
                        Agradecemos o seu interesse e compromisso. A sua inscrição foi realizada com sucesso! Prepare seu coração, em breve enviaremos todos os detalhes e orientações para o seu e-mail.
                    </p>

                    <div className="flex flex-col sm:flex-row w-full gap-5">
                        <Link
                            href="/inscricao"
                            className="flex-1 py-4 px-6 bg-spiritual-dark/5 dark:bg-spiritual-white/5 rounded-xl text-spiritual-dark dark:text-spiritual-white font-bold hover:bg-spiritual-gold hover:text-spiritual-dark dark:hover:bg-spiritual-gold transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-spiritual-gold shadow-sm whitespace-nowrap"
                        >
                            <Calendar className="w-5 h-5" />
                            Ver Mais Eventos
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 py-4 px-6 bg-spiritual-dark dark:bg-white/10 rounded-xl text-spiritual-gold font-bold hover:bg-black dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Home className="w-5 h-5" />
                            Voltar ao Início
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
