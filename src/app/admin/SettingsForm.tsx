"use client";

import { useState } from "react";
import { QrCode, Clipboard, User, Save, Check, Key, Trash2 } from "lucide-react";
import Image from "next/image";
import { saveSettings } from "./settings-actions";

interface SettingsFormProps {
    initialData: {
        chave_pix: string;
        titular_pix: string;
        link_pix?: string | null;
        qr_code_url: string | null;
    } | null;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [removeQR, setRemoveQR] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setSuccess(false);
        try {
            await saveSettings(formData);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error("Erro ao salvar configurações:", error);
            alert("Erro ao salvar as configurações. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="chave_pix" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2">
                            <Clipboard className="w-4 h-4 text-spiritual-gold" /> Chave PIX (Principal)
                        </label>
                        <input
                            type="text"
                            name="chave_pix"
                            id="chave_pix"
                            defaultValue={initialData?.chave_pix || ""}
                            required
                            className="w-full px-5 py-3 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold outline-none transition-all text-spiritual-dark dark:text-spiritual-white"
                            placeholder="Ex: 00.000.000/0001-00"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="titular_pix" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2">
                            <User className="w-4 h-4 text-spiritual-gold" /> Nome do Titular
                        </label>
                        <input
                            type="text"
                            name="titular_pix"
                            id="titular_pix"
                            defaultValue={initialData?.titular_pix || ""}
                            required
                            className="w-full px-5 py-3 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold outline-none transition-all text-spiritual-dark dark:text-spiritual-white"
                            placeholder="Nome que aparece no PIX"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="link_pix" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2">
                            <Key className="w-4 h-4 text-spiritual-gold" /> Chave Aleatória Temporária
                        </label>
                        <input
                            type="text"
                            name="link_pix"
                            id="link_pix"
                            defaultValue={initialData?.link_pix || ""}
                            className="w-full px-5 py-3 rounded-xl border border-spiritual-dark/10 dark:border-spiritual-white/10 bg-spiritual-white dark:bg-[#202020] focus:ring-2 focus:ring-spiritual-gold/50 focus:border-spiritual-gold outline-none transition-all text-spiritual-dark dark:text-spiritual-white font-mono text-xs"
                            placeholder="Cole aqui a chave aleatória (Copia e Cola)"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="qr_code" className="text-sm font-bold text-spiritual-dark/80 dark:text-spiritual-white/80 uppercase tracking-wider flex items-center gap-2">
                            <QrCode className="w-4 h-4 text-spiritual-gold" /> Upload do QR Code
                        </label>
                        <div className="flex items-center gap-4 p-4 bg-spiritual-dark/5 dark:bg-spiritual-white/5 rounded-2xl border border-dashed border-spiritual-dark/10 dark:border-spiritual-white/10">
                            {initialData?.qr_code_url && !removeQR ? (
                                <div className="group relative w-24 h-24 bg-white rounded-lg p-2 border border-spiritual-dark/10 overflow-hidden flex items-center justify-center shrink-0">
                                    <Image
                                        src={initialData.qr_code_url}
                                        alt="QR Code Atual"
                                        width={80}
                                        height={80}
                                        className="object-contain transition-opacity group-hover:opacity-40"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setRemoveQR(true)}
                                        className="absolute inset-0 m-auto w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md hover:bg-red-600"
                                        title="Apagar QR Code Atual"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 bg-white rounded-lg p-2 border border-spiritual-dark/10 overflow-hidden flex items-center justify-center shrink-0">
                                    <QrCode className="w-10 h-10 text-spiritual-dark/20" />
                                </div>
                            )}
                            {removeQR && <input type="hidden" name="remove_qr_code" value="true" />}
                            <input
                                type="file"
                                name="qr_code"
                                id="qr_code"
                                accept="image/*"
                                className="text-xs text-spiritual-dark/50 dark:text-spiritual-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-spiritual-gold file:text-spiritual-dark hover:file:opacity-80 transition-all cursor-pointer"
                            />
                        </div>
                        <p className="text-[10px] text-spiritual-dark/40 dark:text-spiritual-white/40 italic">
                            Dica: Use uma imagem quadrada para melhor visualização.
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 py-4 rounded-xl font-black text-lg transition-all shadow-md ${success
                    ? "bg-green-500 text-white"
                    : "bg-spiritual-dark dark:bg-spiritual-white text-spiritual-gold dark:text-spiritual-dark hover:scale-[1.02] active:scale-[0.98]"
                    }`}
            >
                {loading ? (
                    <div className="w-6 h-6 border-4 border-spiritual-gold border-t-transparent rounded-full animate-spin"></div>
                ) : success ? (
                    <>
                        <Check className="w-6 h-6" /> Atualizado com Sucesso!
                    </>
                ) : (
                    <>
                        <Save className="w-6 h-6" /> Salvar Configurações
                    </>
                )}
            </button>
        </form>
    );
}
