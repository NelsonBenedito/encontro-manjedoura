"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode as QrIcon } from "lucide-react";

interface PixQRCodeProps {
    pixCode: string;
}

export function PixQRCode({ pixCode }: PixQRCodeProps) {
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

    useEffect(() => {
        if (pixCode) {
            QRCode.toDataURL(pixCode, {
                width: 400,
                margin: 2,
                color: {
                    dark: "#000000",
                    light: "#ffffff"
                }
            })
                .then((url: string) => setQrDataUrl(url))
                .catch((err: Error) => console.error("Erro ao gerar QR Code:", err));
        }
    }, [pixCode]);

    if (!qrDataUrl) {
        return (
            <div className="flex flex-col items-center gap-1 text-spiritual-dark/20 dark:text-spiritual-white/20">
                <QrIcon className="w-10 h-10 animate-pulse" />
                <span className="text-[8px] uppercase font-bold tracking-widest">Gerando QR Code...</span>
            </div>
        );
    }

    return (
        <img
            src={qrDataUrl}
            alt="Pix QR Code Gerado Automaticamente"
            className="w-full h-full object-contain"
        />
    );
}
