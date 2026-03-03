"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { saveEvento } from "../actions";

// Foi criado um alias para os Eventos salvos no banco
interface EventoProps {
    id: string;
    title: string;
    date: string;
    location: string;
    status: string;
    price: string;
    payment_link?: string;
}

export function FormEvento({ evento }: { evento?: EventoProps }) {
    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <Link href="/admin" className="flex items-center gap-2 text-spiritual-dark/50 hover:text-spiritual-gold transition-colors mb-8 font-bold uppercase tracking-widest text-xs w-fit">
                <ArrowLeft className="w-4 h-4" />
                Voltar para o Painel
            </Link>

            <div className="bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-3xl shadow-xl border border-spiritual-dark/5 dark:border-spiritual-white/5">
                <h1 className="text-3xl font-serif font-black text-spiritual-dark dark:text-spiritual-white mb-8">
                    {evento ? "Editar Evento" : "Novo Evento"}
                </h1>

                <form action={saveEvento} className="flex flex-col gap-6">
                    {evento && <input type="hidden" name="id" value={evento.id} />}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Título do Evento</label>
                        <input name="title" required defaultValue={evento?.title} className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white" placeholder="Ex: 1º Encontro de Casais" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Data</label>
                            <input name="date" required defaultValue={evento?.date} className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white" placeholder="Ex: 15 a 17 de Novembro, 2026" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Valor da Inscrição (Opcional)</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-spiritual-dark/40 dark:text-spiritual-white/40 font-bold">R$</span>
                                <input
                                    name="price"
                                    defaultValue={evento?.price?.replace('R$', '').trim()}
                                    className="w-full pl-12 pr-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white"
                                    placeholder="250,00 ou Gratuito"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Status das Vagas</label>
                            <select name="status" required defaultValue={evento?.status || "Abertas"} className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white">
                                <option value="Abertas">Abertas</option>
                                <option value="Em Breve">Em Breve</option>
                                <option value="Esgotadas">Esgotadas</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Local (Endereço/Cidade)</label>
                        <input name="location" required defaultValue={evento?.location} className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white" placeholder="Ex: Recanto das Águas, SP" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider">Link de Pagamento (Infinity Pay)</label>
                        <input name="payment_link" defaultValue={evento?.payment_link} className="w-full px-5 py-4 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white" placeholder="Ex: https://link.infinitepay.io/..." />
                    </div>

                    <button type="submit" className="w-full mt-4 py-4 bg-spiritual-gold text-spiritual-dark font-black rounded-xl hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg">
                        <Save className="w-5 h-5" />
                        {evento ? "Atualizar Evento" : "Salvar e Publicar Evento"}
                    </button>
                </form>
            </div>
        </div>
    );
}
