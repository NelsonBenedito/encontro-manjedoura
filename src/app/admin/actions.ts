"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function saveEvento(formData: FormData) {
  const supabase = await createClient();
  
  // Proteção da Server Action
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Acesso negado: Autenticação obrigatória.");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const date = formData.get("date") as string;
  const location = formData.get("location") as string;
  const status = formData.get("status") as string;
  const payment_link = (formData.get("payment_link") as string) || "";
  let price = (formData.get("price") as string) || "";
  
  // Novos campos de PIX
  const chave_pix = formData.get("chave_pix") as string || "";
  const titular_pix = formData.get("titular_pix") as string || "";
  const link_pix = formData.get("link_pix") as string || "";
  const qr_code = formData.get("qr_code") as File | null;

  // Garante que o preço comece com R$ ao salvar, se houver valor
  if (price && !price.startsWith("R$")) {
    price = `R$ ${price.trim()}`;
  }

  let qr_code_url = null;
  const remove_qr_code = formData.get("remove_qr_code") === "true";

  // Se estiver editando, busca a URL atual (se houver, e se NÃO foi pedido para remover)
  if (id && !remove_qr_code) {
    const { data: current } = await supabase.from("eventos").select("qr_code_url").eq("id", id).single();
    qr_code_url = current?.qr_code_url;
  }

  // Se houver novo arquivo de QR Code, faz o upload para a pasta de eventos
  if (qr_code && qr_code.size > 0) {
    const fileExt = qr_code.name.split('.').pop();
    const fileName = `qrcode-evento-${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
        .from("configuracoes") // Reutilizando o bucket de configurações para organização
        .upload(fileName, qr_code);
        
    if (!uploadError) {
        const { data } = supabase.storage.from("configuracoes").getPublicUrl(fileName);
        qr_code_url = data.publicUrl;
    }
  }

  const slug = generateSlug(title);
  const payload = { 
    title, 
    slug, 
    date, 
    location, 
    status, 
    price, 
    payment_link,
    chave_pix,
    titular_pix,
    link_pix,
    qr_code_url
  };

  if (id) {
    await supabase.from("eventos").update(payload).eq("id", id);
  } else {
    await supabase.from("eventos").insert(payload);
  }

  revalidatePath("/admin");
  revalidatePath("/inscricao");
  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function deleteEvento(formData: FormData) {
  const supabase = await createClient();

  // Proteção da Server Action
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Acesso negado: Autenticação obrigatória.");

  const id = formData.get("id") as string;
  
  await supabase.from("eventos").delete().eq("id", id);
  
  revalidatePath("/admin");
  revalidatePath("/inscricao");
  revalidatePath("/");
}

export async function confirmarInscricao(formData: FormData) {
  const supabase = await createClient();

  // Proteção da Server Action
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Acesso negado: Autenticação obrigatória.");

  const id = formData.get("id") as string;
  
  // Buscar os dados da inscrição para o e-mail
  const { data: inscricao } = await supabase
    .from("inscricoes")
    .select("*, eventos(title, date, location)")
    .eq("id", id)
    .single();

  if (!inscricao) return;

  // Atualizar para confirmada
  await supabase.from("inscricoes").update({ status: "Confirmada" }).eq("id", id);

  // Enviar email com ingresso usando Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: 'Encontro Manjedoura <onboarding@resend.dev>',
      to: [inscricao.email],
      subject: 'Seu Ingresso Chegou! - Encontro Manjedoura',
      html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a; border: 1px solid #D4AF37; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #D4AF37; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Ingresso Oficial</h1>
              </div>
              <div style="padding: 32px; background-color: #ffffff;">
                  <h2 style="color: #1a1a1a; margin-top: 0;">Olá, ${inscricao.nome}!</h2>
                  <p style="font-size: 16px;">Sua inscrição e comprovante de pagamento foram verificados e estão <strong>Confirmados</strong>!</p>
                  
                  <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #D4AF37;">
                      <h3 style="margin-top: 0; color: #D4AF37;">${inscricao.eventos.title}</h3>
                      <p style="margin: 8px 0;"><strong>Data:</strong> ${inscricao.eventos.date}</p>
                      <p style="margin: 8px 0;"><strong>Local:</strong> ${inscricao.eventos.location}</p>
                      <p style="margin: 8px 0;"><strong>Inscrição:</strong> #${inscricao.id.split('-')[0]}</p>
                  </div>
                  
                  <p style="font-size: 16px;">Por favor, apresente este e-mail (impresso ou na tela do celular) na entrada do evento para realizar o seu credenciamento.</p>
                  <p style="font-size: 16px;">Estamos muito felizes em ter você conosco. Prepare-se para viver o seu propósito!</p>
              </div>
              <div style="background-color: #1a1a1a; padding: 16px; text-align: center;">
                  <p style="color: #ffffff; margin: 0; font-size: 14px;"><strong>Equipe Manjedoura</strong></p>
              </div>
          </div>
      `,
    });
  } catch(e) {
    console.error("Erro ao enviar email de aprovação", e);
  }

  revalidatePath("/admin");
}
