export default function Bio() {
  return (
    <section className="bio" id="bio">
      <div className="portrait">
        <img src="/images/perfil.jpg" alt="Antónica, retrato" />
      </div>
      <div className="bio-copy">
        <div className="eyebrow">Sobre mí</div>
        <h2 style={{ margin: '1rem 0 1.5rem' }}>Una voz que teje historias</h2>
        <p>
          Nací y crecí en <strong>Formosa</strong>, y desde acá construyo un
          universo propio donde la canción y la palabra escrita se
          entrelazan. Mi música nace de historias personales y colectivas —
          un hilo que conecta lo íntimo con lo heredado.
        </p>
        <p>
          Empecé a componer en 2021, después de un año sin cantar por la
          pandemia y de perder a mi papá — un antes y un después que me
          llevó a este camino.
        </p>
        <p>
          En 2024 publiqué <strong>Géminis</strong>, mi primer disco, y hoy
          me preparo para dar el salto a la palabra escrita con mi próximo
          libro.
        </p>
        <div className="bio-stats">
          <div>
            <b>2024</b>
            <small>Álbum debut</small>
          </div>
          <div>
            <b>01</b>
            <small>Libro en camino</small>
          </div>
          <div>
            <b>FSA</b>
            <small>Formosa, Arg.</small>
          </div>
        </div>
      </div>
    </section>
  );
}