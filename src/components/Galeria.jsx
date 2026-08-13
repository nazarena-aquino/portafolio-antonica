import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

// Detecta si la URL es de YouTube y devuelve el ID del video, o null si no lo es.
function getYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

function GalleryRow({ label, items, loading, renderItem, itemVariant, onItemClick }) {
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
              className={`gallery-item${itemVariant ? ' ' + itemVariant : ''}${
                item && onItemClick ? ' gallery-item-clickable' : ''
              }`}
              key={item?.id ?? i}
              onClick={item && onItemClick ? () => onItemClick(i) : undefined}
              role={item && onItemClick ? 'button' : undefined}
              tabIndex={item && onItemClick ? 0 : undefined}
              onKeyDown={
                item && onItemClick
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onItemClick(i);
                      }
                    }
                  : undefined
              }
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
  const [lightbox, setLightbox] = useState(null);
  const touchStartX = useRef(null);

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

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % fotosList.length);
      if (e.key === 'ArrowLeft')
        setLightbox((i) => (i - 1 + fotosList.length) % fotosList.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, fotosList.length]);

  const openPhoto = fotosList[lightbox];

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0)
        setLightbox((i) => (i + 1) % fotosList.length);
      else setLightbox((i) => (i - 1 + fotosList.length) % fotosList.length);
    }
  }

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
        onItemClick={(i) => setLightbox(i)}
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

      {lightbox !== null && openPhoto && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vista completa de la foto"
          onClick={() => setLightbox(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="lightbox-close"
            aria-label="Cerrar"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + fotosList.length) % fotosList.length);
            }}
          >
            ←
          </button>
          <img
            src={openPhoto.url}
            alt={openPhoto.alt_text || 'Antónica'}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Foto siguiente"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % fotosList.length);
            }}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}