import { useState } from 'react';

const links = [
  { href: '#bio', label: 'Sobre mí' },
  { href: '#maternidad', label: 'Maternidad' },
  { href: '#musica', label: 'Música' },
  { href: '#covers', label: 'Covers' },
  { href: '#libro', label: 'Libro' },
  { href: '#galeria', label: 'Galería' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="nav-bar">
        <div className="brand">
          Antónica<span>✧</span>
        </div>

        <ul className="nav-links-desktop">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        <div className="nav-mobile-menu-inner">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}