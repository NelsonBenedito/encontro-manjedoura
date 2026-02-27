"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirect(`/admin/register?error=true&message=${encodeURIComponent(error.message)}`);
  }

  // Normalmente as config padrões do Supabase exigem confirmação de e-mail p/ logar.
  // Se isso acontecer, ele joga o 'error' pra cá e não entra.
  // Mas como desativamos ou ele entra direto, faremos o autologin.
  
  await supabase.auth.signInWithPassword(data);
  
  revalidatePath("/", "layout");
  redirect("/admin");
}
