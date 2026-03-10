"use client";

import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";

export function SubmitButton() {
    // Esse hook detecta automaticamente se o formulário pai está pending (enviando)
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`w-full py-5 font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-lg border border-transparent
                ${pending
                    ? "bg-spiritual-dark/20 text-spiritual-dark/50 dark:bg-spiritual-white/20 dark:text-spiritual-white/50 cursor-not-allowed"
                    : "bg-spiritual-gold text-spiritual-dark hover:bg-spiritual-dark dark:hover:bg-spiritual-white hover:text-spiritual-gold dark:hover:text-spiritual-dark hover:shadow-xl cursor-pointer"
                }`}
        >
            {pending ? (
                <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Enviando Inscrição...
                </>
            ) : (
                <>
                    <CheckCircle2 className="w-6 h-6" />
                    Confirmar Inscrição
                </>
            )}
        </button>
    );
}
