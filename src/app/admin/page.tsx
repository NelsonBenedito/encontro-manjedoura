import { redirect } from "next/navigation";
import { logout } from "./login/actions";
import { deleteEvento } from "./actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Edit2, Plus, CheckCircle2 } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { confirmarInscricao } from "./actions";
import { SettingsForm } from "./SettingsForm";

export default async function AdminDashboard() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/admin/login");
    }

    // Busca os dados - agora usando conexões reais ao invés de mock
    const { data: eventos } = await supabase.from("eventos").select("*").order("created_at", { ascending: false });
    const { data: inscricoes } = await supabase.from("inscricoes").select("*, eventos(title)").order("created_at", { ascending: false });
    const { data: config } = await supabase.from("configuracoes").select("*").single();

    return (
        <div className="container mx-auto px-4 py-12 flex flex-col gap-10">
            <div className="flex justify-between items-center bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm border border-spiritual-dark/5 dark:border-spiritual-white/5">
                <div>
                    <h1 className="text-3xl font-serif font-black text-spiritual-dark dark:text-spiritual-white">
                        Painel da Coordenação
                    </h1>
                    <p className="text-spiritual-dark/60 dark:text-spiritual-white/60">
                        Logado como: <strong className="font-bold">{user.email}</strong>
                    </p>
                </div>
                <form action={logout}>
                    <button className="px-6 py-2 bg-red-500/10 text-red-600 dark:text-red-400 font-bold rounded-lg hover:bg-red-500/20 transition-colors">
                        Sair
                    </button>
                </form>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Card de Gerenciamento de Eventos */}
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm border border-spiritual-dark/5 dark:border-spiritual-white/5 h-fit">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-bold text-spiritual-dark dark:text-spiritual-white">
                            Seus Eventos
                        </h2>
                        <Link
                            href="/admin/eventos/novo"
                            className="flex items-center gap-2 text-sm font-bold bg-spiritual-gold px-4 py-2 text-spiritual-dark hover:bg-spiritual-dark hover:text-spiritual-gold dark:hover:bg-spiritual-white dark:hover:text-spiritual-dark rounded-lg transition-colors"
                        >
                            <Plus className="w-4 h-4" /> Novo Evento
                        </Link>
                    </div>
                    {eventos?.length ? (
                        <ul className="divide-y divide-spiritual-dark/5 dark:divide-spiritual-white/5">
                            {eventos.map((e) => (
                                <li key={e.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="font-bold text-lg block text-spiritual-dark dark:text-spiritual-white">{e.title}</span>
                                        <span className="text-sm text-spiritual-dark/60 dark:text-spiritual-white/60">{e.date} • {e.location}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xs px-3 py-1 bg-spiritual-dark/5 dark:bg-spiritual-white/5 rounded-full text-spiritual-dark/60 dark:text-spiritual-white/60 font-bold uppercase tracking-wider">{e.status}</span>
                                        <div className="flex items-center gap-1 border-l border-spiritual-dark/10 dark:border-spiritual-white/10 pl-3">
                                            <Link
                                                href={`/admin/eventos/${e.id}/editar`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                                title="Editar"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <form action={deleteEvento}>
                                                <input type="hidden" name="id" value={e.id} />
                                                <DeleteButton />
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-spiritual-dark/50 p-4 bg-spiritual-dark/5 dark:bg-spiritual-white/5 rounded-xl text-center">
                            Você ainda não possui nenhum evento cadastrado.
                        </p>
                    )}
                </div>

                {/* Card Lista de Inscrições Recentes */}
                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-sm border border-spiritual-dark/5 dark:border-spiritual-white/5 h-fit">
                    <h2 className="text-2xl font-serif font-bold text-spiritual-dark dark:text-spiritual-white mb-6">
                        Últimas Inscrições
                    </h2>
                    {inscricoes?.length ? (
                        <ul className="divide-y divide-spiritual-dark/5 dark:divide-spiritual-white/5">
                            {inscricoes.map((i) => (
                                <li key={i.id} className="py-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-bold text-lg leading-tight w-3/4 text-spiritual-dark dark:text-spiritual-white">{i.nome}</span>
                                        <span className={`text-xs px-2 py-1 rounded-md font-bold ${i.status === 'Confirmada' ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>{i.status}</span>
                                    </div>
                                    <p className="text-sm text-spiritual-dark/60 dark:text-spiritual-white/60 mb-1">{i.email} - {i.telefone || "Sem telefone"}</p>
                                    <p className="text-xs text-spiritual-gold font-medium mb-3">Evento: {i.eventos?.title}</p>

                                    <div className="flex justify-between items-end gap-2 mt-2">
                                        {i.comprovante_url ? (
                                            <a href={i.comprovante_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline font-medium">Ver Comprovante</a>
                                        ) : (
                                            <span className="text-xs text-spiritual-dark/40 dark:text-spiritual-white/40">Sem anexo</span>
                                        )}

                                        {i.status === "Pendente" && (
                                            <form action={confirmarInscricao}>
                                                <input type="hidden" name="id" value={i.id} />
                                                <button type="submit" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold transition-colors border border-green-500/20">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmar Pagamento
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-spiritual-dark/50 p-4 bg-spiritual-dark/5 dark:bg-spiritual-white/5 rounded-xl text-center">
                            Nenhuma inscrição recebida ainda.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}
