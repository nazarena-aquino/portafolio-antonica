# Antónica — Portfolio oficial NAZA
Sitio de promoción para Antónica (cantante y escritora, Formosa, Argentina).
React + Vite + Supabase. Sin backend propio: Supabase hace de base de datos,
storage de archivos y API.

## Instalación

```bash
npm install
cp .env.example .env
# completá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY con los datos
# de tu proyecto en supabase.com/dashboard > Project Settings > API
npm run dev
```

## Supabase — setup inicial 0

1. Creá un proyecto nuevo en https://supabase.com
2. Andá a **SQL Editor** y corré todo el contenido de `supabase/schema.sql`
   (esto crea las tablas, activa RLS y crea el bucket de Storage `media`)
3. Para subir fotos/videos:
   - Manualmente desde **Storage > media** en el dashboard de Supabase,
     y después insertás una fila en la tabla `galeria` con la URL pública
   - O armamos más adelante un mini panel de admin en React para que
     vos (o Antónica) puedan subir contenido sin tocar el dashboard

## Build de producción (con pre-renderizado para SEO)

```bash
npm run build
```

El script `postbuild` corre automáticamente `react-snap`, que abre el sitio
en un Chromium headless y "congela" el HTML resultante — así Google (y
cualquier bot) recibe HTML con contenido real, no una página vacía que
depende de JavaScript.

> Nota: `react-snap` usa Puppeteer, que descarga Chromium la primera vez.
> Si tenés problemas de instalación en macOS Catalina, avisame y lo
> resolvemos (alternativa: prerender.io o desplegar en Netlify con su
> propio prerendering).

## Estructura

```
src/
  components/       Hero, Bio, Musica, Libro, Galeria, Agenda, Contacto...
  lib/
    supabaseClient.js
  App.jsx
  index.css         paleta y estilos base
supabase/
  schema.sql         tablas + RLS + bucket de storage
public/
  robots.txt, sitemap.xml
```
