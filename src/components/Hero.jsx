import { useEffect, useRef, useState } from 'react';

// Placeholders por ahora — reemplazar "url" con fotos reales subidas a
// Supabase Storage cuando las tengas. La estructura ya está lista para eso.
const slides = [
  {
    id: 1,
    eyebrow: null,
    heading: 'Antónica: música que cuenta historias',
    url: '/images/hero1.png',
  },
  {
    id: 2,
    eyebrow: null,
    heading: 'Palabras que encuentran su voz',
    url: '/images/hero2.jpg',
  },
  {
    id: 3,
    eyebrow: null,
    heading: 'Explorá el universo de Géminis',
    url: '/images/hero3.png',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  function goTo(index) {
    const next = (index + slides.length) % slides.length;
    setCurrent(next);
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 8000);
  }

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * 100}%)`;
    }
  }, [current]);

  return (
    <section className="hero">
      <div className="hero-track" ref={trackRef}>
        {slides.map((slide, i) => (
          <div className={`hero-slide hero-slide-${i + 1}`} key={slide.id}>
            <div className="slide-bg">
              {slide.url ? (
                <img src={slide.url} alt={slide.heading} />
              ) : (
                <span>[ foto de Antónica ]</span>
              )}
            </div>
            <div className="hero-content">
              {slide.eyebrow && <div className="eyebrow">{slide.eyebrow}</div>}
              <h1>{slide.heading}</h1>
              <div className="hero-divider"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-controls">
        <button
          aria-label="Foto anterior"
          onClick={() => {
            goTo(current - 1);
            resetTimer();
          }}
        >
          ←
        </button>
        <button
          aria-label="Foto siguiente"
          onClick={() => {
            goTo(current + 1);
            resetTimer();
          }}
        >
          →
        </button>
      </div>

      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            className={i === current ? 'active' : ''}
            aria-label={`Ir a la foto ${i + 1}`}
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
          />
        ))}
      </div>

      <div className="scroll-cue">Deslizar</div>
    </section>
  );
}