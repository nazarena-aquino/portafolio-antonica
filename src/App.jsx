import './components/components.css';
import SEO from './components/SEO';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Maternidad from './components/Maternidad';
import Musica from './components/Musica';
import Covers from './components/Covers';
import Libro from './components/Libro';
import Cita from './components/Cita';
import Galeria from './components/Galeria';
import Agenda from './components/Agenda';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="site">
      <SEO
        title="Antónica — Música que cuenta historias | Formosa, Argentina"
        description="Sitio oficial de Antónica, cantante y escritora de Formosa, Argentina. Escuchá Géminis (2024) y enterate del lanzamiento de El hilo invisible del linaje."
      />
      <Nav />
      <Hero />
      <Bio />
      <Maternidad />
      <Musica />
      <Covers />
      <Libro />
      <Cita />
      <Galeria />
      {/*<Agenda />*/}
      <Contacto />
      <Footer />
    </div>
  );
}