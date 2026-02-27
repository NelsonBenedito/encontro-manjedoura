import { ArrowLeft, CheckCircle2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { submeterInscricao } from "./actions";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function InscricaoForm({ params }: PageProps) {
    const supabase = await createClient();
    const resolvedParams = await params;

    // Busca o evento real no banco para confirmar se existe
    const { data: evento } = await supabase
        .from("eventos")
        .select("id, title, date, status")
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
                    className="flex items-center gap-2 text-spiritual-dark/50 hover:text-spiritual-gold transition-colors mb-10 font-bold uppercase tracking-widest text-xs w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para Eventos
                </Link>

                <div className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-xl border border-spiritual-dark/5 dark:border-spiritual-gold/5 backdrop-blur-sm">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-4 drop-shadow-sm">
                            Ficha de Inscrição
                        </h1>
                        <p className="text-spiritual-dark/60 dark:text-spiritual-white/70 text-lg font-light">
                            Você está se inscrevendo para o evento: <br />
                            <strong className="text-spiritual-gold block mt-3 text-2xl font-serif font-bold">
                                {evento.title}
                            </strong>
                            <span className="text-sm border border-spiritual-gold/20 text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full mt-3 inline-block font-bold">
                                {evento.date}
                            </span>
                        </p>
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

                        {/* Upload de Comprovante de Pagamento (Storage Supabase) */}
                        <div className="flex flex-col gap-2.5 mt-2">
                            <label htmlFor="comprovante" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2 border-t pt-8 border-spiritual-dark/10 dark:border-spiritual-white/10">
                                <UploadCloud className="w-5 h-5 text-spiritual-gold" /> Anexe seu Comprovante de Pagamento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="file"
                                name="comprovante"
                                id="comprovante"
                                accept="image/*,.pdf"
                                required
                                className="w-full text-sm mt-1 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-spiritual-gold file:text-spiritual-dark hover:file:bg-spiritual-dark hover:file:text-spiritual-gold dark:hover:file:text-spiritual-dark dark:hover:file:bg-spiritual-white transition-colors cursor-pointer text-spiritual-dark/60 dark:text-spiritual-white/60"
                            />
                            <p className="text-xs text-spiritual-dark/40 dark:text-spiritual-white/40 mt-1">Imagens (.jpg, .png) ou PDF do banco.</p>
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
