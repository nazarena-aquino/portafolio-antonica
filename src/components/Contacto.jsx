import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const initialForm = { nombre: '', email: '', mensaje: '' };

export default function Contacto() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('mensajes_contacto').insert([form]);
    if (error) {
      setStatus('error');
    } else {
      setStatus('ok');
      setForm(initialForm);
    }
  }

  return (
    <section className="contacto" id="contacto">
      <div className="eyebrow" style={{ justifyContent: 'center' }}>
        Contacto
      </div>
      <h2>¿Un show, una nota, una colaboración?</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Contame para qué me buscás (show, nota, colaboración...)"
          value={form.mensaje}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
        </button>
        {status === 'ok' && (
          <p className="form-status">¡Gracias! Antónica va a leer tu mensaje pronto.</p>
        )}
        {status === 'error' && (
          <p className="form-status">Hubo un problema al enviar. Probá de nuevo.</p>
        )}
      </form>

      <div className="socials">
        <a href="https://www.instagram.com/antonica_oficial" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://open.spotify.com/intl-es/artist/7dWByuTUJXpGzyAH8AO1tX?si=BY83phBwTfaQO40trcwEBA&nd=1&dlsi=69cb364cc5294cb3" target="_blank" rel="noreferrer">Spotify</a>
        <a href="https://www.youtube.com/@Antonica_oficial" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </section>
  );
}
