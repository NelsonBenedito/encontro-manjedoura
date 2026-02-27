"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export async function submeterInscricao(formData: FormData) {
    const supabase = await createClient();
    
    const evento_id = formData.get("evento_id") as string;
    const nome = formData.get("name") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("phone") as string;
    const comprovante = formData.get("comprovante") as File;

    let comprovante_url = null;

    if (comprovante && comprovante.size > 0) {
        const fileExt = comprovante.name.split('.').pop();
        const fileName = `${evento_id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
            .from("comprovantes")
            .upload(fileName, comprovante);
            
        if (!uploadError) {
            const { data } = supabase.storage.from("comprovantes").getPublicUrl(fileName);
            comprovante_url = data.publicUrl;
        }
    }

    const { error } = await supabase.from("inscricoes").insert({
        evento_id,
        nome,
        email,
        telefone,
        comprovante_url,
        status: "Pendente" // Aguardando validação financeira
    });

    if (error) {
        console.error("Erro ao salvar no banco:", error);
        // Em um app real retornaríamos um erro pra tela, mas vamos redirecionar:
        return;
    }

    // Busca o título do evento para colocar no e-mail
    const { data: evento } = await supabase.from("eventos").select("title").eq("id", evento_id).single();

    // Enviar E-mail usando Resend
    // Nota: O email remetente ideal é um domínio verificado seu. Aqui usamos o padrão de testes do Resend.
    try {
        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.emails.send({
            from: 'Encontro Manjedoura <onboarding@resend.dev>', 
            to: [email],
            subject: 'Sua inscrição foi recebida! - Encontro Manjedoura',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
                    <h2 style="color: #D4AF37;">Olá, ${nome}!</h2>
                    <p>Sua inscrição para o evento <strong>${evento?.title || 'Encontro Manjedoura'}</strong> foi recebida com sucesso e está com o status: <strong>Pendente de Confirmação</strong>.</p>
                    <p>Abaixo estão os detalhes que você nos enviou:</p>
                    <ul style="background: #f9f9f9; padding: 20px; border-radius: 8px;">
                        <li><strong>Nome:</strong> ${nome}</li>
                        <li><strong>E-mail:</strong> ${email}</li>
                        <li><strong>Telefone:</strong> ${telefone || 'Não informado'}</li>
                    </ul>
                    <p>Nossa coordenação verificará o seu comprovante de pagamento e em breve você receberá a confirmação definitiva junto com orientações para o grande dia.</p>
                    <br/>
                    <p>Aguardamos ansiosamente por você!</p>
                    <p>Atenciosamente,</p>
                    <p><strong>Equipe Manjedoura</strong></p>
                </div>
            `,
        });
    } catch(e) {
        console.error("Erro ao enviar email:", e);
    }

    redirect("/confirmacao");
}
