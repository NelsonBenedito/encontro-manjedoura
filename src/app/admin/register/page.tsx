import { register } from "./actions";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const hasError = resolvedSearchParams.error === "true";
    const errorMessage = resolvedSearchParams.message as string || "Ocorreu um erro ao criar a conta.";

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white dark:bg-[#1a1a1a] p-8 rounded-3xl shadow-xl border border-spiritual-dark/5 dark:border-spiritual-white/5">
                <h1 className="text-2xl font-serif font-black text-center text-spiritual-dark dark:text-spiritual-white mb-2">
                    Primeiro Acesso
                </h1>
                <p className="text-center text-sm text-spiritual-dark/60 dark:text-spiritual-white/60 mb-6">
                    Crie a conta do Administrador Master
                </p>

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="px-4 py-3 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80">Senha (Min. 6 caracteres)</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            minLength={6}
                            required
                            className="px-4 py-3 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:outline-none focus:border-spiritual-gold text-spiritual-dark dark:text-spiritual-white"
                        />
                    </div>

                    {hasError && (
                        <div className="flex items-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 bg-red-500/10 rounded-lg justify-center font-medium">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    <button
                        formAction={register}
                        className="w-full mt-4 py-3 bg-spiritual-gold text-spiritual-dark font-bold rounded-xl hover:bg-spiritual-dark hover:text-spiritual-gold dark:hover:bg-spiritual-white dark:hover:text-spiritual-dark transition-colors"
                    >
                        Criar Conta e Entrar
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/admin/login" className="text-sm text-spiritual-gold hover:underline">
                            Já possui conta? Fazer Login
                        </Link>
                    </div>
                </form>
            </div>

            <p className="text-xs text-spiritual-dark/40 dark:text-spiritual-white/40 max-w-sm text-center mt-6">
                Nota de segurança: Em um ambiente de produção real, desativa-se o cadastro aberto ou restringe-se novos usuários apenas por convite interno do banco de dados, para evitar que intrusos se cadastrem.
            </p>
        </div>
    );
}
