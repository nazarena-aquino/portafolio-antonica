const tracks = [
  {
    title: 'Guerrero',
    note: ' El origen de todo — dedicada a mi papá.',
  },
  {
    title: 'Cúspide',
    note: ' Soñé que Gustavo Cerati me la cantaba.',
  },
  {
    title: 'Anuncio',
    note: ' Dedicada a mi abuelo Pepe Nicastro.',
  },
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
            voz. La mayoría de las canciones nacieron en sueños — me
            despertaba con una melodía y me sentaba a componerla en el
            teclado. Lo produjo Nick Schinder (Rosario): cuatro meses a la
            distancia hasta viajar a grabar las voces.
          </p>
          {tracks.map((t, i) => (
            <div className="track-row" key={t.title}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <div className="track-info">
                <span className="track-title">{t.title}</span>
                <span className="track-note">{t.note}</span>
              </div>
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
