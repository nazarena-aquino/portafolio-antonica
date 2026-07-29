export default function Maternidad() {
  return (
    <section className="maternidad" id="maternidad">
      <div className="maternidad-layout">
        <div className="maternidad-copy">
          <span className="badge-momento">8vo mes de embarazo</span>
          <h2 style={{ fontStyle: 'italic', marginBottom: '1.4rem' }}>
            Un nuevo capítulo, la misma voz
          </h2>
          <p>
            Estoy a punto de convertirme en mamá — y no dejé de crear. Al
            contrario: este embarazo se volvió parte de mi proceso
            artístico, una nueva forma de entender <strong>el hilo
            invisible del linaje</strong> del que habla mi próximo libro.
            Ya no es solo una idea sobre lo heredado: ahora también lo
            estoy viviendo en el cuerpo.
          </p>
          <blockquote>
            [ Espacio para una frase propia sobre este momento — tu voz
            siempre suma más que cualquier texto que escribamos nosotros. ]
          </blockquote>
          <p>
            La música y la maternidad conviven en esta etapa: sigo
            escribiendo, sigo soñando shows, y ahora también le canto a
            quien está por llegar.
          </p>
        </div>
        <div className="maternidad-photos">
          <div className="portrait">
            <img src="/images/maternidad1.jpg" alt="Antónica embarazada, sesión de fotos" />
          </div>
          <div className="portrait">
            <img src="/images/maternidad2.jpg" alt="Antónica embarazada, sesión de fotos" />
          </div>
          <div className="portrait">
            <img src="/images/maternidad3.jpg" alt="Antónica embarazada, sesión de fotos" />
          </div>
        </div>
      </div>
    </section>
  );
}