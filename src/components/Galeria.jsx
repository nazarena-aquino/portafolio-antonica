import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Detecta si la URL es de YouTube y devuelve el ID del video, o null si no lo es.
function getYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

function GalleryRow({ label, items, loading, renderItem, itemVariant }) {
  const trackRef = useRef(null);

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.gallery-item');
    const cardWidth = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  return (
    <div className="gallery-row">
      <div className="gallery-row-label">{label}</div>
      <div className="gallery-wrap">
        <button
          className="gallery-arrow gallery-arrow-left"
          aria-label={`${label}: ver anteriores`}
          onClick={() => scrollByCard(-1)}
        >
          ←
        </button>

        <div className="gallery-grid" ref={trackRef}>
          {items.map((item, i) => (
            <div
              className={`gallery-item${itemVariant ? ' ' + itemVariant : ''}`}
              key={item?.id ?? i}
            >
              {!item && (loading ? 'cargando…' : label.toLowerCase())}
              {item && renderItem(item)}
            </div>
          ))}
        </div>

        <button
          className="gallery-arrow gallery-arrow-right"
          aria-label={`${label}: ver siguientes`}
          onClick={() => scrollByCard(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function Galeria() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchItems() {
      const { data, error } = await supabase
        .from('galeria')
        .select('id, tipo, url, alt_text')
        .order('orden', { ascending: true })
        .limit(24);
      if (active) {
        if (!error && data) setItems(data);
        setLoading(false);
      }
    }
    fetchItems();
    return () => {
      active = false;
    };
  }, []);

  const fotos = items.filter((i) => i.tipo === 'foto');
  const videos = items.filter((i) => i.tipo === 'video');

  const fotosList = fotos.length ? fotos : Array.from({ length: 4 });
  const videosList = videos.length ? videos : Array.from({ length: 2 });

  return (
    <section>
      <section id="galeria"></section>
      <div className="section-head">
        <div className="eyebrow">Galería</div>
        <h2>Escenario &amp; backstage</h2>
      </div>

      <GalleryRow
        label="Fotos"
        items={fotosList}
        loading={loading}
        renderItem={(item) => (
          <img src={item.url} alt={item.alt_text || 'Antónica'} loading="lazy" />
        )}
      />

      <GalleryRow
        label="Videoclips"
        items={videosList}
        loading={loading}
        itemVariant="gallery-item-video"
        renderItem={(item) => {
          const youtubeId = getYouTubeId(item.url);
          if (youtubeId) {
            return (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={item.alt_text || 'Videoclip de Antónica'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            );
          }
          return <video src={item.url} controls playsInline />;
        }}
      />
    </section>
  );
}