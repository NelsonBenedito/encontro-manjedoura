"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveSettings(formData: FormData) {
    const supabase = await createClient();
    
    const chave_pix = formData.get("chave_pix") as string;
    const titular_pix = formData.get("titular_pix") as string;
    const link_pix = formData.get("link_pix") as string;
    const qr_code = formData.get("qr_code") as File;

    // Busca a configuração atual
    const { data: currentConfig } = await supabase
        .from("configuracoes")
        .select("*")
        .single();

    let qr_code_url = currentConfig?.qr_code_url;

    // Se houver novo arquivo de QR Code, faz o upload
    if (qr_code && qr_code.size > 0) {
        const fileExt = qr_code.name.split('.').pop();
        const fileName = `qrcode-pix-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
            .from("configuracoes")
            .upload(fileName, qr_code);
            
        if (!uploadError) {
            const { data } = supabase.storage.from("configuracoes").getPublicUrl(fileName);
            qr_code_url = data.publicUrl;
        } else {
            console.error("Erro no upload do QR Code:", uploadError);
        }
    }

    const payload = {
        chave_pix,
        titular_pix,
        link_pix,
        qr_code_url,
        updated_at: new Date().toISOString()
    };

    if (currentConfig && currentConfig.id) {
        await supabase.from("configuracoes").update(payload).eq("id", currentConfig.id);
    } else {
        await supabase.from("configuracoes").insert(payload);
    }

    revalidatePath("/", "layout");
    
    return { success: true };
}
