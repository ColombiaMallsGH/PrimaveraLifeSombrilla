import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MallSection from './components/MallSection';
import HousesSection from './components/HousesSection';
import OficinaSection from './components/OficinaSection';
import HeliSection from './components/HeliSection';
import ParkingSection from './components/ParkingSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MallSection />
        <HousesSection />
        <OficinaSection />
        <HeliSection />
        <ParkingSection />
      </main>
      <Footer />
    </>
  );
}
