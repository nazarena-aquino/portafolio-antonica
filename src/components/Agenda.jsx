import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${MESES[d.getMonth()]} · ${String(d.getDate()).padStart(2, '0')}`;
}

export default function Agenda() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchShows() {
      const { data, error } = await supabase
        .from('shows')
        .select('id, fecha, venue, ciudad, link')
        .gte('fecha', new Date().toISOString())
        .order('fecha', { ascending: true });
      if (active) {
        if (!error && data) setShows(data);
        setLoading(false);
      }
    }
    fetchShows();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="agenda">
      <div className="section-head">
        <div className="eyebrow">Agenda</div>
        <h2>Próximos shows</h2>
      </div>
      <div>
        {loading && <p className="agenda-empty">Cargando shows…</p>}
        {!loading && shows.length === 0 && (
          <p className="agenda-empty">
            Todavía no hay shows confirmados. Seguime en Instagram para
            enterarte apenas se anuncie uno.
          </p>
        )}
        {shows.map((show) => (
          <div className="agenda-row" key={show.id}>
            <div className="agenda-date">{formatDate(show.fecha)}</div>
            <div className="agenda-info">
              <h4>{show.venue}</h4>
              <span>{show.ciudad}</span>
            </div>
            <a
              className="agenda-cta"
              href={show.link || '#contacto'}
              target={show.link ? '_blank' : undefined}
              rel="noreferrer"
            >
              Ver más
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
