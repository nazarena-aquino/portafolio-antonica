import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Libro() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | ok | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase
      .from('libro_avisos')
      .insert([{ email }]);
    setStatus(error ? 'error' : 'ok');
    if (!error) setEmail('');
  }

  return (
    <section className="libro" id="libro">
      <div className="book-layout">
        <div>
          <span className="badge-soon">Próximamente</span>
          <h2>El hilo invisible del linaje</h2>
          <p>
            Un libro sobre lo que heredamos sin saberlo — la memoria
            familiar como hilo que atraviesa generaciones y encuentra, en la
            palabra, otra forma de canción.
          </p>
          <form className="notify-row" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando…' : 'Avisarme'}
            </button>
          </form>
          {status === 'ok' && (
            <p className="notify-msg">¡Listo! Te avisamos apenas salga.</p>
          )}
          {status === 'error' && (
            <p className="notify-msg">
              Hubo un problema. Probá de nuevo en un momento.
            </p>
          )}
        </div>
        <div className="cover">
          <img src="/images/portada-libro.png" alt="Tapa del libro El hilo invisible del linaje, de Antónica" />
        </div>
      </div>
    </section>
  );
}