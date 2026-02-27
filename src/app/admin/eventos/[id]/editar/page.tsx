import { createClient } from "@/utils/supabase/server";
import { FormEvento } from "../../FormEvento";
import { redirect } from "next/navigation";

export default async function EditarEvento({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const resolvedParams = await params;

    const { data: evento } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

    if (!evento) redirect("/admin");

    return <FormEvento evento={evento} />;
}
