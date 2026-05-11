import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProyectoSection from './components/ProyectoSection';
import TipologiasSection from './components/TipologiasSection';
import AmenidadesSection from './components/AmenidadesSection';
import UbicacionSection from './components/UbicacionSection';
import Footer from './components/Footer';

export const metadata = {
  title: "Apartamentos en Alquiler — Primavera Life House | Armenia, Quindío",
  description:
    "66 apartamentos en alquiler en Armenia, Quindío. 5 tipologías: Urban, Natura, Serenity, Garden y Oasis. Desde 40 m² hasta 112 m². Amenidades premium: Jacuzzi, Turco, Sauna, Gimnasio y más.",
  alternates: {
    canonical: 'https://www.primaveralife.com.co/apartamentos',
  },
};

export default function ApartamentosPage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProyectoSection />
      <TipologiasSection />
      <AmenidadesSection />
      <UbicacionSection />
      <Footer />
    </main>
  );
}
