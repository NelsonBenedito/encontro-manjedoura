import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="w-full bg-spiritual-dark text-spiritual-white/80 border-t border-spiritual-gold/20 mt-auto pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
                    <div className="flex flex-col max-w-sm">
                        <Link href="/" className="flex items-center group mb-6 hover:opacity-80 transition-opacity">
                            <Image
                                src="/ManjedouraLogoWhiteHorizontal.png"
                                alt="Encontro Manjedoura Logo"
                                width={180}
                                height={50}
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-sm font-light leading-relaxed text-spiritual-white/60">
                            Assim como a manjedoura revelou ao mundo a realeza de um Rei, estamos aqui para ajudar você a descobrir e honrar o propósito para o qual nasceu.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-semibold text-spiritual-gold uppercase tracking-widest mb-2 font-serif">
                            Navegação
                        </h4>
                        <Link href="/" className="text-sm hover:text-spiritual-gold transition-colors">
                            Página Inicial
                        </Link>
                        <Link href="/inscricao" className="text-sm hover:text-spiritual-gold transition-colors">
                            Inscrever para Eventos
                        </Link>
                        <Link href="/sobre" className="text-sm hover:text-spiritual-gold transition-colors">
                            Sobre Nós
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-semibold text-spiritual-gold uppercase tracking-widest mb-2 font-serif">
                            Suporte
                        </h4>
                        <Link href="/contato" className="text-sm hover:text-spiritual-gold transition-colors">
                            Fale Conosco
                        </Link>
                        <Link href="/faq" className="text-sm hover:text-spiritual-gold transition-colors">
                            Perguntas Frequentes
                        </Link>
                        <Link href="/termos" className="text-sm hover:text-spiritual-gold transition-colors">
                            Termos de Uso
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-sm font-semibold text-spiritual-gold uppercase tracking-widest mb-2 font-serif">
                            Coordenação
                        </h4>
                        <Link href="/admin" className="text-sm hover:text-spiritual-gold transition-colors flex items-center gap-1.5">
                            Acessar Painel
                        </Link>
                    </div>
                </div>

                <div className="border-t border-spiritual-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-spiritual-white/40">
                        © {new Date().getFullYear()} Movimento Manjedoura. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Icons placeholder */}
                        <div className="w-8 h-8 rounded-full bg-spiritual-white/5 hover:bg-spiritual-gold/20 flex items-center justify-center transition-colors cursor-pointer" />
                        <div className="w-8 h-8 rounded-full bg-spiritual-white/5 hover:bg-spiritual-gold/20 flex items-center justify-center transition-colors cursor-pointer" />
                        <div className="w-8 h-8 rounded-full bg-spiritual-white/5 hover:bg-spiritual-gold/20 flex items-center justify-center transition-colors cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
