export default function Footer() {
  return (
    <footer>
      <div className="footer-copy">
        © {new Date().getFullYear()} Antónica — Todos los derechos reservados
      </div>
      <div className="footer-credit">
        <span>Hecho con</span>
        <span className="heart">💜</span>
        <span>en Formosa, Argentina</span>
        <span>·</span>
        <span>
          Creación, diseño y producción de{' '}
          <a
            href="https://ceo-multimedios.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            CEO Multimedios
          </a>
        </span>
      </div>
    </footer>
  );
}
