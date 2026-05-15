import Header from './components/Header';
import CanvasScrollHero from './components/CanvasScrollHero';
import './oficinas.css';

export const metadata = {
  title: "Oficinas Premium — Primavera Life Office | Armenia, Quindío",
  description:
    "11 oficinas premium disponibles en Primavera Life Office, Armenia, Quindío. Desde 41.9 m² hasta 58.8 m². Piso 6, edificio inteligente con helipuerto.",
  alternates: {
    canonical: 'https://www.primaveralife.com.co/oficinas',
  },
};

export default function OficinasPage() {
  return (
    <main>
      <Header />
      <CanvasScrollHero />
    </main>
  );
}
