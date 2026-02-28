import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function InscricaoList() {
    const supabase = await createClient();
    const { data: eventos } = await supabase.from("eventos").select("*").order("created_at", { ascending: false });

    return (
        <div className="min-h-screen py-20 relative overflow-hidden bg-spiritual-white dark:bg-spiritual-dark transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spiritual-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="mb-14 border-b border-spiritual-dark/5 dark:border-spiritual-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-4 drop-shadow-sm">
                        Eventos Disponíveis
                    </h1>
                    <p className="text-lg text-spiritual-dark/60 dark:text-spiritual-white/70 font-light">
                        Selecione o evento desejado para realizar sua inscrição e viver esta experiência.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {eventos?.length ? eventos.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-spiritual-dark/5 dark:border-spiritual-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all group hover:border-spiritual-gold/30 dark:hover:border-spiritual-gold/30 hover:-translate-y-1"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span
                                        className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${event.status === "Abertas"
                                            ? "bg-spiritual-gold/10 text-spiritual-gold border-spiritual-gold/20"
                                            : "bg-spiritual-dark/5 dark:bg-spiritual-white/5 text-spiritual-dark/40 dark:text-spiritual-white/50 border-spiritual-dark/5 dark:border-spiritual-white/10"
                                            }`}
                                    >
                                        Vagas {event.status}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-spiritual-dark dark:text-spiritual-white mb-4 group-hover:text-spiritual-gold dark:group-hover:text-spiritual-gold transition-colors">
                                    {event.title}
                                </h2>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    <div className="flex items-center gap-2 text-spiritual-dark/60 dark:text-spiritual-white/60 text-sm font-medium">
                                        <Calendar className="w-4 h-4 text-spiritual-gold" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-spiritual-dark/60 dark:text-spiritual-white/60 text-sm font-medium">
                                        <MapPin className="w-4 h-4 text-spiritual-gold" />
                                        <span>{event.location}</span>
                                    </div>
                                    {event.price && (
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                            <span>R$ {event.price.replace('R$ ', '').replace('R$', '')}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {event.status === "Abertas" ? (
                                <Link
                                    href={`/inscricao/${event.slug}`}
                                    className="w-full md:w-auto px-8 py-3.5 bg-spiritual-gold text-spiritual-dark font-bold rounded-xl hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark transition-colors flex items-center justify-center gap-2 shadow-sm border border-transparent"
                                >
                                    Inscrever-se <ArrowRight className="w-4 h-4" />
                                </Link>
                            ) : (
                                <button
                                    disabled
                                    className="w-full md:w-auto px-8 py-3.5 bg-spiritual-dark/5 dark:bg-spiritual-white/5 text-spiritual-dark/40 dark:text-spiritual-white/40 font-bold rounded-xl cursor-not-allowed border border-transparent"
                                >
                                    Em Breve
                                </button>
                            )}
                        </div>
                    )) : (
                        <p className="text-spiritual-dark/50 dark:text-spiritual-white/50 bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-spiritual-dark/5 dark:border-spiritual-white/5 shadow-sm">Nenhum evento registrado no momento. Fique de olho em nossas redes sociais!</p>
                    )}
                </div>
            </div>
        </div>
    );
}
