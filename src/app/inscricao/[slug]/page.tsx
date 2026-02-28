import { ArrowLeft, CheckCircle2, UploadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { submeterInscricao } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { CopyPixButton } from "./CopyPixButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function InscricaoForm({ params }: PageProps) {
    const supabase = await createClient();
    const resolvedParams = await params;

    // Busca o evento real no banco para confirmar se existe
    const { data: evento } = await supabase
        .from("eventos")
        .select("*")
        .eq("slug", resolvedParams.slug)
        .single();

    if (!evento || evento.status === "Esgotadas") {
        return notFound();
    }

    return (
        <div className="min-h-screen py-20 relative overflow-hidden flex flex-col items-center bg-transparent transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spiritual-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-2xl relative z-10">
                <Link
                    href="/inscricao"
                    className="flex items-center gap-2 text-spiritual-dark/50 text-spiritual-gold  hover:text-spiritual-gold transition-colors mb-10 font-bold uppercase tracking-widest text-xs w-fit"
                >
                    <ArrowLeft className="w-4 h-4 text-spiritual-gold " />
                    Voltar aos eventos
                </Link>

                <div className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-xl border border-spiritual-dark/5 dark:border-spiritual-gold/5 backdrop-blur-sm">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-4 drop-shadow-sm">
                            Ficha de Inscrição
                        </h1>
                        <div className="text-spiritual-dark/60 dark:text-spiritual-white/70 text-lg font-light">
                            Você está se inscrevendo para o evento: <br />
                            <strong className="text-spiritual-gold block mt-3 text-2xl font-serif font-bold">
                                {evento.title}
                            </strong>
                            <div className="flex justify-center items-center gap-2 mt-3 flex-wrap">
                                <span className="text-sm border border-spiritual-gold/20 text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full font-bold">
                                    {evento.date}
                                </span>
                                {evento.price && (
                                    <span className="text-sm border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-bold">
                                        Valor: {evento.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <form action={submeterInscricao} className="flex flex-col gap-6 text-left">
                        {/* Campo oculto com o ID do evento para salvar no banco */}
                        <input type="hidden" name="evento_id" value={evento.id} />

                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="name" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">
                                Nome Completo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold transition-all text-spiritual-dark dark:text-spiritual-white"
                                placeholder="Como deseja ser chamado(a)?"
                            />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="email" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">
                                E-mail <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold transition-all text-spiritual-dark dark:text-spiritual-white"
                                placeholder="Seu melhor e-mail de contato"
                            />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label htmlFor="phone" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">
                                WhatsApp / Telefone <span className="text-spiritual-dark/30 dark:text-spiritual-white/30 font-light text-xs normal-case">(Opcional)</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:bg-white dark:focus:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold transition-all text-spiritual-dark dark:text-spiritual-white"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        {/* Seção de Pagamento / Checkout */}
                        <div className="mt-6 pt-8 border-t border-spiritual-dark/10 dark:border-spiritual-white/10">
                            <h3 className="text-2xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-6">
                                Informações de Pagamento
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {/* Opção Pix */}
                                <div className="bg-spiritual-gold/5 border border-spiritual-gold/20 p-6 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-spiritual-dark dark:text-spiritual-white flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">1</div>
                                            Pagamento via PIX
                                        </h4>
                                        <p className="text-sm text-spiritual-dark/70 dark:text-spiritual-white/70 mb-4">
                                            Aponte a câmera para o QR Code ou use a chave CNPJ abaixo:
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-4 bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 text-center">
                                        <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-sm border border-spiritual-dark/5">
                                            <Image
                                                src="/pix-qrcode.png"
                                                alt="QR Code Pix"
                                                width={120}
                                                height={120}
                                                className="opacity-90 dark:opacity-100 mix-blend-multiply dark:mix-blend-normal"
                                            />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <div className="flex justify-between items-center bg-spiritual-dark/5 dark:bg-spiritual-white/5 py-2 px-3 rounded-lg gap-2">
                                                <p className="text-sm font-mono text-spiritual-gold font-bold select-all break-all m-0 leading-none">
                                                    53.740.127/0001-03
                                                </p>
                                                <CopyPixButton pixKey="53.740.127/0001-03" />
                                            </div>
                                            <span className="text-[10px] text-spiritual-dark/40 dark:text-spiritual-white/40 block uppercase tracking-wider text-left">Titular: FILIPE BENEDITO JOSE MARIA</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Opção Infinity Pay */}
                                <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h4 className="font-bold text-spiritual-dark dark:text-spiritual-white flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">2</div>
                                            Cartão (Infinity Pay)
                                        </h4>
                                        <p className="text-sm text-spiritual-dark/70 dark:text-spiritual-white/70 mb-4">
                                            Prefere usar o Cartão de Crédito? Acesse nosso link de pagamento seguro da Infinity Pay.
                                        </p>
                                    </div>
                                    <a
                                        href="https://link.infinitepay.io/manjedouramovimento/VC1D-7MfDzGwkzF-200,00"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-blue-600/90 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm shadow-sm"
                                    >
                                        Acessar Link de Pagamento
                                    </a>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <label htmlFor="comprovante" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2">
                                    <UploadCloud className="w-5 h-5 text-spiritual-gold" /> Anexe seu Comprovante após pagar <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="comprovante"
                                    id="comprovante"
                                    accept="image/*,.pdf"
                                    required
                                    className="w-full text-sm mt-1 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-spiritual-gold file:text-spiritual-dark hover:file:bg-spiritual-dark hover:file:text-spiritual-gold dark:hover:file:text-spiritual-dark dark:hover:file:bg-spiritual-white transition-colors cursor-pointer border border-spiritual-dark/5 dark:border-spiritual-white/5 text-spiritual-dark/60 dark:text-spiritual-white/60 p-2 bg-spiritual-white dark:bg-[#1a1a1a] rounded-2xl"
                                />
                                <p className="text-xs text-spiritual-dark/40 dark:text-spiritual-white/40 mt-1">Sua vaga só é garantida quando nossa equipe confirma o anexo enviado.</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full py-5 bg-spiritual-gold text-spiritual-dark font-black rounded-xl hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg border border-transparent"
                            >
                                <CheckCircle2 className="w-6 h-6" />
                                Confirmar Inscrição
                            </button>
                        </div>
                        <p className="text-xs text-center text-spiritual-dark/40 dark:text-spiritual-white/40 mt-4 font-light">
                            Ao confirmar sua inscrição, você concorda com os termos de uso do Movimento Manjedoura e atesta a legitimidade do comprovante enviado.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
