-- ============================================================
-- Schema Supabase — Portfolio Antónica
-- Ejecutar en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- Tabla: galeria (fotos y videoclips para promoción)
create table if not exists galeria (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('foto', 'video')),
  url text not null,              -- URL pública del Storage de Supabase, o de YouTube/Vimeo si es video
  alt_text text,                  -- texto alternativo (accesibilidad + SEO de imágenes)
  orden int default 0,            -- para controlar el orden de aparición en la grilla
  destacado boolean default false, -- por si querés marcar fotos para el hero, etc.
  created_at timestamptz default now()
);

-- Tabla: shows (agenda de presentaciones)
create table if not exists shows (
  id uuid primary key default gen_random_uuid(),
  fecha timestamptz not null,
  venue text not null,
  ciudad text not null,
  link text,                      -- link a entradas o evento de Instagram/Facebook
  created_at timestamptz default now()
);

-- Tabla: mensajes_contacto (formulario de contacto para shows/notas/colaboraciones)
create table if not exists mensajes_contacto (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  mensaje text not null,
  leido boolean default false,
  created_at timestamptz default now()
);

-- Tabla: libro_avisos (lista de espera para el lanzamiento del libro —
-- te sirve de base de clientes potenciales cuando abras la tienda online)
create table if not exists libro_avisos (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- Muy importante: por defecto Supabase expone las tablas si RLS
-- está desactivado. Acá lo dejamos así:
--   - galeria y shows: lectura pública (el sitio las muestra a cualquiera)
--   - mensajes_contacto y libro_avisos: solo INSERT público (nadie
--     puede leer los mensajes de otros, solo vos desde el panel de Supabase)
-- ============================================================

alter table galeria enable row level security;
alter table shows enable row level security;
alter table mensajes_contacto enable row level security;
alter table libro_avisos enable row level security;

-- Lectura pública de galería y shows
create policy "Lectura publica galeria" on galeria
  for select using (true);

create policy "Lectura publica shows" on shows
  for select using (true);

-- Cualquiera puede insertar un mensaje de contacto, pero no leer los de otros
create policy "Insertar mensaje de contacto" on mensajes_contacto
  for insert with check (true);

-- Cualquiera puede sumarse a la lista de avisos del libro, pero no leerla
create policy "Insertar aviso libro" on libro_avisos
  for insert with check (true);

-- ============================================================
-- Storage: bucket para fotos y videos
-- Corré esto o creá el bucket manualmente desde el dashboard
-- (Storage > New Bucket > "media", marcado como público)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Política de storage: lectura pública, escritura solo autenticada
-- (así vos podés subir desde un panel de admin logueado más adelante,
-- pero nadie más puede subir archivos al bucket)
create policy "Lectura publica de media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Escritura autenticada en media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');
