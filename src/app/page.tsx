import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: eventos } = await supabase.from("eventos").select("*").order("created_at", { ascending: false }).limit(3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-spiritual-white dark:bg-spiritual-dark py-24 md:py-36 overflow-hidden flex items-center min-h-[500px]">
        <Image
          src="/FotoManjedoura.jpg"
          alt="Encontro Manjedoura Background"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-spiritual-dark/80 dark:bg-spiritual-dark/70 z-1 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-spiritual-white via-transparent to-spiritual-white/50 dark:from-spiritual-dark dark:via-transparent dark:to-spiritual-dark/20 z-2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-black text-white dark:text-spiritual-white tracking-tight leading-tight mb-8">
              Encontre seu <span className="text-spiritual-gold italic block md:inline">Propósito</span> Real
            </h1>
            <p className="text-lg md:text-xl text-white/90 dark:text-spiritual-sand mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Assim como a manjedoura revelou ao mundo a realeza de um Rei, estamos aqui para ajudar você a descobrir e honrar o propósito para o qual nasceu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/inscricao"
                className="w-full sm:w-auto px-8 py-4 bg-spiritual-gold text-spiritual-dark font-bold rounded-full hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3 text-lg"
              >
                Ver Próximos Eventos <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Eventos Section */}
      <section className="py-24 bg-spiritual-white dark:bg-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-spiritual-gold/10 dark:bg-spiritual-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-playfair font-black text-spiritual-dark dark:text-spiritual-white mb-6">
              Próximos Eventos
            </h2>
            <div className="w-24 h-1 bg-spiritual-gold rounded-full mb-6"></div>
            <p className="text-spiritual-dark/80 dark:text-spiritual-dark/70 max-w-2xl text-lg font-light leading-relaxed">
              Garanta sua vaga nos nossos próximos encontros. As inscrições são limitadas e abertas para todos que buscam uma experiência única.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {eventos?.length ? (
              eventos.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-[#1a1a1a] border text-left border-spiritual-dark/10 dark:border-spiritual-white/5 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full hover:-translate-y-2 hover:border-spiritual-gold dark:hover:border-spiritual-gold/30"
                >
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-spiritual-gold/10 text-spiritual-gold text-xs font-bold uppercase tracking-widest rounded-full mb-5 border border-spiritual-gold/20">
                      Vagas {event.status}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-spiritual-dark dark:text-spiritual-white leading-snug mb-2 group-hover:text-spiritual-gold dark:group-hover:text-spiritual-gold transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-4 mb-10 mt-auto">
                    <div className="flex items-center gap-3 text-spiritual-dark/70 dark:text-spiritual-white/60 text-sm">
                      <Calendar className="w-5 h-5 text-spiritual-gold" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-spiritual-dark/70 dark:text-spiritual-white/60 text-sm">
                      <MapPin className="w-5 h-5 text-spiritual-gold" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-spiritual-dark/70 dark:text-spiritual-white/60 text-sm">
                      <Users className="w-5 h-5 text-spiritual-gold" />
                      <span className="font-medium">Para todos</span>
                    </div>
                  </div>

                  <Link
                    href={`/inscricao/${event.slug}`}
                    className="w-full block text-center px-4 py-3 bg-spiritual-dark/5 dark:bg-spiritual-white/5 text-spiritual-dark dark:text-spiritual-white font-bold rounded-xl group-hover:bg-spiritual-gold group-hover:text-spiritual-dark transition-colors border border-transparent group-hover:border-spiritual-gold shadow-sm"
                  >
                    Fazer Inscrição
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-spiritual-dark/50 dark:text-spiritual-white/50 col-span-full text-center p-8 border border-spiritual-dark/5 dark:border-spiritual-white/5 rounded-2xl">
                Nenhum evento registrado no momento. Fique de olho em nossas redes sociais!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
