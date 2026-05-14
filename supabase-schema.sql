-- ================================================================
-- CASA CERTA IMÓVEIS — Schema PostgreSQL para Supabase
-- ================================================================
-- COMO USAR:
-- 1. Acesse supabase.com → seu projeto
-- 2. Vá em "SQL Editor" → "New Query"
-- 3. Cole TODO este conteúdo e clique em "Run"
-- ================================================================

-- Habilita extensão UUID
create extension if not exists "uuid-ossp";

-- ── Tipos ENUM ────────────────────────────────────────────────
create type tipo_imovel as enum
  ('casa', 'apartamento', 'terreno', 'comercial');

create type status_imovel as enum
  ('disponivel', 'vendido', 'alugado', 'reservado');

-- ── Tabela principal de imóveis ───────────────────────────────
create table imoveis (
  id            uuid primary key default uuid_generate_v4(),
  titulo        text not null,
  descricao     text,
  preco         numeric(12,2) not null,
  tipo          tipo_imovel not null,
  status        status_imovel not null default 'disponivel',
  cidade        text not null default 'Quixadá',
  bairro        text,
  endereco      text,
  quartos       integer,
  banheiros     integer,
  vagas         integer not null default 0,
  area_m2       numeric(8,2),
  destaque      boolean not null default false,
  slug          text unique not null,
  ativo         boolean not null default true,
  views         integer not null default 0,
  corretor_id   uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Tabela de imagens dos imóveis ────────────────────────────
create table imovel_imagens (
  id            uuid primary key default uuid_generate_v4(),
  imovel_id     uuid not null references imoveis(id) on delete cascade,
  url           text not null,
  storage_path  text not null,
  ordem         integer not null default 0,
  alt_text      text,
  created_at    timestamptz not null default now()
);

-- ── Trigger: atualiza updated_at automaticamente ─────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger imoveis_updated_at
  before update on imoveis
  for each row execute function update_updated_at();

-- ── Índices para performance ──────────────────────────────────
create index idx_imoveis_tipo     on imoveis(tipo);
create index idx_imoveis_status   on imoveis(status);
create index idx_imoveis_destaque on imoveis(destaque);
create index idx_imoveis_ativo    on imoveis(ativo);
create index idx_imoveis_slug     on imoveis(slug);
create index idx_imagens_imovel   on imovel_imagens(imovel_id, ordem);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Ativa RLS
alter table imoveis enable row level security;
alter table imovel_imagens enable row level security;

-- PÚBLICO: lê apenas imóveis ativos
create policy "publico_le_imoveis_ativos"
  on imoveis for select
  using (ativo = true);

-- PÚBLICO: lê imagens de imóveis ativos
create policy "publico_le_imagens"
  on imovel_imagens for select
  using (
    exists (
      select 1 from imoveis
      where id = imovel_id and ativo = true
    )
  );

-- ADMIN: usuário autenticado tem controle total
create policy "admin_full_imoveis"
  on imoveis for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin_full_imagens"
  on imovel_imagens for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ================================================================
-- STORAGE: bucket para imagens
-- ================================================================

-- Cria o bucket público
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'imoveis-imagens',
  'imoveis-imagens',
  true,
  5242880, -- 5MB
  array['image/jpeg', 'image/png', 'image/webp']
);

-- Política: qualquer um pode VER as imagens
create policy "publico_ver_imagens"
  on storage.objects for select
  using (bucket_id = 'imoveis-imagens');

-- Política: apenas autenticados podem FAZER UPLOAD
create policy "admin_upload_imagens"
  on storage.objects for insert
  with check (
    bucket_id = 'imoveis-imagens'
    and auth.role() = 'authenticated'
  );

-- Política: apenas autenticados podem DELETAR
create policy "admin_deletar_imagens"
  on storage.objects for delete
  using (
    bucket_id = 'imoveis-imagens'
    and auth.role() = 'authenticated'
  );

-- ================================================================
-- DADOS DE EXEMPLO (opcional — remova se não quiser)
-- ================================================================
-- Descomente as linhas abaixo para inserir um imóvel de teste:

-- insert into imoveis
--   (titulo, descricao, preco, tipo, status, cidade, bairro, quartos, banheiros, vagas, area_m2, destaque, slug)
-- values
--   (
--     'Casa Moderna no Centro',
--     'Linda casa com acabamento de alto padrão, localizada no coração de Quixadá.',
--     350000,
--     'casa',
--     'disponivel',
--     'Quixadá',
--     'Centro',
--     3,
--     2,
--     2,
--     150.00,
--     true,
--     'casa-moderna-no-centro'
--   );
