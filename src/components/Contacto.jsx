import { useState } from 'react';
import emailjs from '@emailjs/browser';
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

    const { error: dbError } = await supabase
      .from('mensajes_contacto')
      .insert([form]);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
    }

    if (dbError) {
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
          type="tel"
          name="numero"
          placeholder="Tu número de contacto"
          value={form.numero}
          onChange={handleChange}
          inputMode="numeric"
          pattern="[0-9]+"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="mensaje"
          placeholder="Contanos para qué la buscás (show, nota, colaboración...)"
          value={form.mensaje}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
        </button>
        {status === 'ok' && (
          <div className="form-success">
            <span className="form-success-icon">✓</span>
            <div>
              <strong>¡Gracias por escribirme!</strong>
              <p>Voy a leer tu mensaje y te respondo apenas pueda.</p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className="form-success form-success-error">
            <span className="form-success-icon">!</span>
            <div>
              <strong>Uy, algo falló</strong>
              <p>Probá de nuevo en un momento, o escribime directo por WhatsApp.</p>
            </div>
          </div>
        )}
      </form>

      <div className="socials">
        <a href="https://wa.me/5493704619259" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://www.instagram.com/antonica_oficial" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://open.spotify.com/intl-es/artist/7dWByuTUJXpGzyAH8AO1tX?si=BY83phBwTfaQO40trcwEBA&nd=1&dlsi=69cb364cc5294cb3" target="_blank" rel="noreferrer">Spotify</a>
        <a href="https://www.youtube.com/@Antonica_oficial" target="_blank" rel="noreferrer">YouTube</a>
      </div>
    </section>
  );
}
