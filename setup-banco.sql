-- Executar isso no Editor SQL do Supabase!

-- 1. Cria a Tabela de Eventos
create table
  public.eventos (
    id uuid not null default gen_random_uuid (),
    title text not null,
    slug text not null,
    date text not null,
    location text not null,
    status text not null,
    created_at timestamp with time zone not null default now(),
    constraint eventos_pkey primary key (id),
    constraint eventos_slug_key unique (slug)
  ) tablespace pg_default;

-- 2. Cria Tabela de Inscrições
create table
  public.inscricoes (
    id uuid not null default gen_random_uuid (),
    evento_id uuid null,
    nome text not null,
    email text not null,
    telefone text null,
    status text not null default 'Pendente'::text,
    created_at timestamp with time zone not null default now(),
    comprovante_url text null,
    constraint inscricoes_pkey primary key (id),
    constraint inscricoes_evento_id_fkey foreign key (evento_id) references eventos (id) on update cascade on delete cascade
  ) tablespace pg_default;

-- 3. Habilita Políticas RLS (Row Level Security)
alter table public.eventos enable row level security;
alter table public.inscricoes enable row level security;

-- Permitir qualquer pessoa ler os eventos (público total)
create policy "Enable read access for all users" on public.eventos as permissive for select to public using (true);

-- Permitir apenas admins (usuários autenticados) gerenciar eventos
create policy "Enable all access for authenticated users only" on public.eventos as permissive for all to authenticated using (true);

-- Permitir inserção de inscrições para o público preencher o formulário
create policy "Enable insert access for all users" on public.inscricoes as permissive for insert to public with check (true);

-- Permitir leitura e escrita de inscrições SOMENTE para admins autenticados
create policy "Auth users have full access to inscricoes" on public.inscricoes as permissive for all to authenticated using (true);

-- 4. Criando Bucket para Comprovantes (Storage)
insert into storage.buckets (id, name, public) values ('comprovantes', 'comprovantes', false);

-- Permitir upload público no bucket de comprovantes
create policy "Público pode fazer upload de comprovantes" on storage.objects for insert to public with check (bucket_id = 'comprovantes');
create policy "Admins podem ver e fazer download de comprovantes" on storage.objects for select to authenticated using (bucket_id = 'comprovantes');
