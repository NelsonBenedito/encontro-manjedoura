import { ArrowLeft, CheckCircle2, UploadCloud, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { submeterInscricao } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { CopyPixButton } from "./CopyPixButton";
import { SubmitButton } from "./SubmitButton";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const supabase = await createClient();
    const resolvedParams = await params;

    const { data: evento } = await supabase
        .from("eventos")
        .select("title, date")
        .eq("slug", resolvedParams.slug)
        .single();

    if (!evento) {
        return {
            title: "Evento não encontrado",
        };
    }

    const title = `Faça sua inscrição no evento: ${evento.title}`;
    const description = `Participe do ${evento.title} no dia ${evento.date}. Garanta sua vaga agora mesmo no site oficial do Movimento Manjedoura.`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `https://encontro-manjedoura.vercel.app/inscricao/${resolvedParams.slug}`,
            siteName: "Encontro Manjedoura",
            type: "website",
            images: [
                {
                    url: "/FotoManjedoura.jpg",
                    width: 1200,
                    height: 630,
                    alt: `Imagem de capa do ${evento.title}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: ["/FotoManjedoura.jpg"],
        },
    };
}

import { PixQRCode } from "./PixQRCode";

export const dynamic = "force-dynamic";

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

    // Os dados do pix agora são apenas do evento
    // Removendo o fallback global (|| config) para permitir que o usuário deixe os campos vazios
    const pixKey = evento.chave_pix || "";
    const pixName = evento.titular_pix || "";
    const pixQRCode = evento.qr_code_url || "";
    const pixLink = evento.link_pix || "";

    // Varíavel para determinar se a Opção Pix deve ser exibida inteira
    const hasPixConfig = Boolean(pixKey || pixLink || pixQRCode);
    const hasPaymentOptions = hasPixConfig || Boolean(evento.payment_link);

    return (
        <div className="min-h-screen py-20 relative overflow-hidden flex flex-col items-center bg-transparent transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spiritual-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-2xl relative z-10">
                <Link
                    href="/inscricao"
                    className="flex items-center gap-2 text-spiritual-gold hover:text-spiritual-gold transition-colors mb-10 font-bold uppercase tracking-widest text-xs w-fit"
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
                        {/* Campo Honeypot - Visível apenas para robôs/spam bots */}
                        <div className="opacity-0 absolute -z-10 w-0 h-0" aria-hidden="true" tabIndex={-1}>
                            <label htmlFor="website">Website</label>
                            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                        </div>

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
                        {hasPaymentOptions && (
                            <div className="mt-6 pt-8 border-t border-spiritual-dark/10 dark:border-spiritual-white/10">
                                <h3 className="text-2xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-6">
                                    Informações de Pagamento
                                </h3>

                                {/* Opções de Pagamento */}
                                <div className="flex flex-col gap-6 mb-10">
                                    <div className="grid md:grid-cols-2 gap-6 items-stretch">
                                        {/* Opção 1: Pix */}
                                        {hasPixConfig && (
                                            <div className="bg-white dark:bg-[#1a1a1a] border border-spiritual-dark/5 dark:border-spiritual-white/5 rounded-3xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-spiritual-gold" />

                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-spiritual-gold">Opção 01</span>
                                                    <h3 className="text-xl font-serif font-black text-spiritual-dark dark:text-spiritual-white italic">Pagar com Pix</h3>
                                                </div>

                                                <div className="flex flex-col items-center gap-6">
                                                    <div className="w-40 h-40 bg-white rounded-2xl p-3 shadow-inner border border-spiritual-dark/5 flex items-center justify-center overflow-hidden">
                                                        {pixLink ? (
                                                            <PixQRCode pixCode={pixLink} />
                                                        ) : pixQRCode ? (
                                                            <Image
                                                                src={pixQRCode}
                                                                alt="QR Code Pix"
                                                                width={160}
                                                                height={160}
                                                                className="opacity-90 dark:opacity-100 mix-blend-multiply dark:mix-blend-normal object-contain"
                                                            />
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-2 text-spiritual-dark/20 dark:text-spiritual-white/20">
                                                                <QrCode className="w-12 h-12" />
                                                                <span className="text-[10px] uppercase font-black tracking-widest text-center leading-tight">Aguardando<br />Configuração</span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="w-full space-y-3">
                                                        <div className="flex flex-col items-center text-center px-4">
                                                            <span className="text-spiritual-dark/40 dark:text-spiritual-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">Chave Pix</span>
                                                            <p className="text-spiritual-dark dark:text-spiritual-white font-black text-sm break-all">{pixKey}</p>
                                                            <span className="text-spiritual-dark/40 dark:text-spiritual-white/40 text-[9px] uppercase font-medium mt-1">{pixName}</span>
                                                        </div>

                                                        {pixLink && (
                                                            <div className="mt-6 pt-6 border-t border-spiritual-dark/5 dark:border-spiritual-white/5 w-full flex flex-col gap-3">
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-[10px] text-spiritual-dark/40 dark:text-spiritual-white/40 uppercase tracking-widest font-black">Pix Copia e Cola</span>
                                                                    <CopyPixButton pixKey={pixLink} />
                                                                </div>
                                                                <div className="bg-spiritual-dark/5 dark:bg-spiritual-white/5 p-4 rounded-xl border border-spiritual-dark/5 dark:border-spiritual-white/5 relative group/code">
                                                                    <p className="text-[10px] font-mono text-spiritual-dark/70 dark:text-spiritual-white/70 break-all leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
                                                                        {pixLink}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Opção 2: Cartão (se houver link) */}
                                        {evento.payment_link && (
                                            <div className="bg-white dark:bg-[#1a1a1a] border border-spiritual-dark/5 dark:border-spiritual-white/5 rounded-3xl p-6 shadow-sm flex flex-col gap-6 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />

                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] uppercase font-black tracking-widest text-blue-500">Opção 02</span>
                                                    <h3 className="text-xl font-serif font-black text-spiritual-dark dark:text-spiritual-white italic">Cartão de Crédito</h3>
                                                </div>

                                                <div className="flex-1 flex flex-col items-center justify-center gap-8 py-4">
                                                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                        <CheckCircle2 className="w-10 h-10 text-blue-500 opacity-50" />
                                                    </div>

                                                    <div className="text-center px-4">
                                                        <p className="text-spiritual-dark/60 dark:text-spiritual-white/60 text-sm leading-relaxed mb-8">
                                                            Prefere pagar com cartão? <br />
                                                            Use o link oficial da Infinite Pay para realizar o pagamento com segurança.
                                                        </p>

                                                        <a
                                                            href={evento.payment_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 group"
                                                        >
                                                            Acessar Link
                                                            <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

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

                        <div className="mt-8">
                            <SubmitButton />
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
