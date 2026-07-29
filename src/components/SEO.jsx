import { Helmet } from 'react-helmet-async';

// Uso: <SEO title="..." description="..." /> dentro de cualquier página/sección
// que quieras que tenga su propio <title> y meta description.
// Como no usamos Next/SSR, react-snap "congela" el HTML resultante en el build,
// así que esto SÍ queda en el HTML que ve Google, no solo en el DOM del navegador.
export default function SEO({ title, description, image }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
