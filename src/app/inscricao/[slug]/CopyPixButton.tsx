"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export function CopyPixButton({ pixKey }: { pixKey: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-spiritual-gold/20 hover:bg-spiritual-gold/30 text-spiritual-gold rounded-md text-xs font-bold transition-colors"
            title="Copiar Chave PIX"
        >
            {copied ? (
                <>
                    <Check className="w-3.5 h-3.5" /> Copiado!
                </>
            ) : (
                <>
                    <Copy className="w-3.5 h-3.5" /> Copiar
                </>
            )}
        </button>
    );
}
