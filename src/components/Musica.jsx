const tracks = [
  '[ Cúspide ]',
  '[ Reinventar ]',
  '[ Silly ]',
];

export default function Musica() {
  return (
    <section className="musica" id="musica">
      <div className="album-card">
        <div className="vinyl">
          <img src="/images/portada-disco.jpeg" alt="Portada del álbum Géminis, de Antónica" />
        </div>
        <div className="album-meta">
          <div className="eyebrow">Álbum · 2024</div>
          <h3>Géminis</h3>
          <p>
            Un disco sobre la dualidad: dos mitades que conviven en una sola
            voz. Historias que se cantan porque no alcanzaban con decirse.
          </p>
          {tracks.map((t, i) => (
            <div className="track-row" key={i}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span>{t}</span>
            </div>
          ))}
          <a
            href="https://open.spotify.com/intl-es/artist/7dWByuTUJXpGzyAH8AO1tX?si=WAXrE5J-QVaNdyb7_gjnhA&utm_source=whatsapp&nd=1&dlsi=afb1a18f893c424a"
            className="listen-btn"
            target="_blank"
            rel="noreferrer"
          >
            Escuchar Géminis ↗
          </a>
        </div>
      </div>
    </section>
  );
}
