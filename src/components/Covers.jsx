const repertorio = [
    {
      genero: 'Rock Nacional',
      canciones: [
        { titulo: 'La Ciudad de la Furia', artista: 'Soda Stereo' },
        { titulo: 'Crimen', artista: 'Gustavo Cerati' },
        { titulo: 'Corazón Delator', artista: 'Soda Stereo' },
        { titulo: 'Prófugos', artista: 'Soda Stereo' },
      ],
    },
    {
      genero: 'Bossa & Jazz',
      canciones: [
        { titulo: "Ain't No Sunshine", artista: 'Karen Souza' },
        { titulo: 'Fly Me to the Moon', artista: 'Frank Sinatra' },
        { titulo: 'Águas de Março', artista: 'Elis Regina & Tom Jobim' },
        { titulo: 'Samba de Verão', artista: 'Caetano Veloso' },
        { titulo: 'Garota de Ipanema', artista: 'João Gilberto' },
        { titulo: 'My Way', artista: 'Frank Sinatra' },
      ],
    },
    {
      genero: 'Funk & Disco',
      canciones: [
        { titulo: 'Get Lucky', artista: 'Daft Punk (versión Karen Souza)' },
        { titulo: 'I Love You Baby', artista: 'Donna Summer' },
        { titulo: 'Hot Stuff', artista: 'Donna Summer' },
        { titulo: 'I Will Survive', artista: 'Gloria Gaynor' },
        { titulo: "Don't Start Now", artista: 'Dua Lipa' },
        { titulo: 'Love Foolosophy', artista: 'Jamiroquai' },
      ],
    },
    {
      genero: 'Soul & R&B',
      canciones: [
        { titulo: 'Ordinary Love', artista: 'Sade' },
        { titulo: 'Valerie', artista: 'Amy Winehouse' },
        { titulo: 'Like a Tattoo', artista: 'Sade' },
        { titulo: 'Corner of the Heart', artista: 'Jamiroquai' },
        { titulo: "You Know I'm No Good", artista: 'Amy Winehouse' },
        { titulo: 'Bad Dreams / Lose Control', artista: 'Teddy Swims' },
      ],
    },
    {
      genero: 'Pop',
      canciones: [
        { titulo: 'Smalltown Boy', artista: 'Bronski Beat' },
        { titulo: 'Flowers', artista: 'Miley Cyrus' },
        { titulo: 'Sugar', artista: 'Maroon 5' },
        { titulo: "I'll Never Love Again", artista: 'Lady Gaga' },
        { titulo: 'Like a Virgin / Material Girl', artista: 'Madonna' },
        { titulo: 'Hurricane / Fire for You / Baby', artista: 'Cannons' },
      ],
    },
    {
      genero: 'Rock',
      canciones: [
        { titulo: 'Oh! Darling', artista: 'The Beatles' },
        { titulo: 'Hold the Line', artista: 'Toto' },
        { titulo: 'In the Air Tonight', artista: 'Phil Collins' },
        { titulo: "Sweet Child O' Mine", artista: 'Guns N’ Roses' },
      ],
    },
  ];
  
  const proximasCanciones = [
    {
      titulo: 'Gritar',
      nota: 'Con aires de tango — inspirada en mi abuelo, que amaba el tango.',
    },
    {
      titulo: 'Tobogán',
      nota: 'Escrita para mi hijo Salvador, antes de saber si iba a ser varón o nena.',
    },
    {
      titulo: 'My Love Is Strange',
      nota: 'Tiene versión en inglés y en español. Compuesta junto a mi esposo, Horacio Fernández.',
    },
    {
      titulo: 'Conexión',
      nota: 'También compuesta junto a Horacio.',
    },
  ];
  
  export default function Covers() {
    return (
      <section className="covers" id="covers">
        <div className="section-head">
          <div className="eyebrow">Repertorio</div>
          <h2>Covers para tu evento</h2>
          <p className="covers-intro">
            Además de mis propias canciones, armé un repertorio de covers
            para shows privados, bodas y eventos corporativos. Consultá
            disponibilidad por el formulario de contacto.
          </p>
        </div>
  
        <div className="covers-list">
          {repertorio.map((grupo) => (
            <div className="cover-genre" key={grupo.genero}>
              <h4>{grupo.genero}</h4>
              {grupo.canciones.map((c) => (
                <div className="cover-song-row" key={c.titulo}>
                  <span>{c.titulo}</span>
                  <span className="artist">{c.artista}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
  
        <div className="proximas">
          <div className="eyebrow" style={{ marginBottom: '0.8rem' }}>
            Adelanto
          </div>
          <h3 className="proximas-title">Canciones nuevas</h3>
          <p className="covers-intro">
            Después de grabar Géminis seguí componiendo. Todavía no están
            grabadas en estudio, pero ya forman parte de mis shows en vivo.
          </p>
          <div className="proximas-list">
            {proximasCanciones.map((c) => (
              <div className="proximas-item" key={c.titulo}>
                <h4>{c.titulo}</h4>
                <p>{c.nota}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }