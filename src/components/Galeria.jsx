import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Detecta si la URL es de YouTube y devuelve el ID del video, o null si no lo es.
function getYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function Galeria() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function fetchItems() {
      const { data, error } = await supabase
        .from('galeria')
        .select('id, tipo, url, alt_text')
        .order('orden', { ascending: true })
        .limit(12);
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

  function scrollByCard(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.gallery-item');
    const cardWidth = card ? card.offsetWidth + 16 : 320;
    track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  const placeholders = Array.from({ length: 6 });
  const list = items.length ? items : placeholders;

  return (
    <section>
      <section id="galeria"></section>
      <div className="section-head">
        <div className="eyebrow">Galería</div>
        <h2>Escenario &amp; backstage</h2>
      </div>

      <div className="gallery-wrap">
        <button
          className="gallery-arrow gallery-arrow-left"
          aria-label="Ver anteriores"
          onClick={() => scrollByCard(-1)}
        >
          ←
        </button>

        <div className="gallery-grid" ref={trackRef}>
          {list.map((item, i) => {
            const youtubeId = item?.tipo === 'video' ? getYouTubeId(item.url) : null;
            const isVideo = item?.tipo === 'video';
            return (
              <div
                className={`gallery-item${isVideo ? ' gallery-item-video' : ''}`}
                key={item?.id ?? i}
              >
                {!item && (loading ? 'cargando…' : 'foto')}

                {item?.tipo === 'foto' && (
                  <img src={item.url} alt={item.alt_text || 'Antónica'} loading="lazy" />
                )}

                {isVideo && youtubeId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={item.alt_text || 'Videoclip de Antónica'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                )}

                {isVideo && !youtubeId && (
                  <video src={item.url} controls playsInline />
                )}
              </div>
            );
          })}
        </div>

        <button
          className="gallery-arrow gallery-arrow-right"
          aria-label="Ver siguientes"
          onClick={() => scrollByCard(1)}
        >
          →
        </button>
      </div>
    </section>
  );
}