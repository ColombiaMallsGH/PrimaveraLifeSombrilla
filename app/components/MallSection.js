'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './MallSection.module.css';

const brands = [
  { name: 'Sakana Sushi', category: 'Comida Asiática', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401915/Sakana_Sushi_Armenia_Primavera_Life_1_350x100_orjmuq.svg' },
  { name: 'Bruma Pizzería', category: 'Pizzas', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401915/Bruma_Pizzeria_Armenia_Pizzas_Primavera_Life_1_350x100_wwbgtw.svg' },
  { name: 'Tierra Adentro', category: 'Café', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401916/Tierra_Adentro_Cafe_Armenia_Primavera_Life_1_350x100_rjccdc.svg' },
  { name: 'Gringo Burguer', category: 'Hamburguesas', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401917/Gringo_Burguer_Armenia_Hamburguesas_Primavera_Life_1_350x100_u2iorb.svg' },
  { name: 'Elizabeth Cucina', category: 'Pasta', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401916/Elizabeth_Cucina_Italiana_Armenia_Pasta_Primavera_Life_1_350x100_pykvyb.svg' },
  { name: 'La Octavilla', category: 'Bar', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401917/La_Octavilla_Armenia_Primavera_Life_1_350x100_ej3ezj.svg' },
  { name: 'Moka Repostería', category: 'Café', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401918/Moka_Reposteria_Cafe_Armenia_Primavera_Life_1_350x100_xqrndp.svg' },
  { name: 'Makoto Sushi', category: 'Comida Asiática', logo: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401918/Makoto_Sushi_Armenia_Primavera_Life_1_350x100_y3maa2.svg' },
];

export default function MallSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.section}`} id="mall" ref={sectionRef}>
      <Image 
        src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401880/DJI_0452_hfnp4c.avif"
        alt="Primavera Life Mall Background"
        fill
        style={{ objectFit: 'cover' }}
        className={styles.bgImage}
      />
      <div className={styles.bgOverlay} />

      <div className={`container ${styles.container}`}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={`text-label reveal ${styles.label}`}>Descubre</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Primavera Life<br />
            <span className={styles.titleAccent}>Mall</span>
          </h2>
          <p className={`text-body-lg reveal reveal-delay-2 ${styles.description}`}>
            Un espacio gastronómico vibrante donde conviven el café de especialidad,
            la coctelería de autor, la cocina asiática y mucho más.
            Con horario extendido para que la noche empiece diferente.
          </p>
        </div>

        {/* Hours Banner */}
        <div className={`reveal reveal-delay-2 ${styles.hoursBanner}`}>
          <div className={styles.hoursGlow} />
          <div className={styles.hoursContent}>
            <span className={styles.hoursIcon}>✦</span>
            <div>
              <span className={styles.hoursTitle}>Horario Extendido</span>
              <span className={styles.hoursText}>Lunes a Sábado: 11:00 AM — 12:00 AM · Domingos: 11:00 AM — 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className={styles.brandsGrid}>
          {brands.map((brand, i) => (
            <div
              key={brand.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${styles.brandCard}`}
            >
              <div className={styles.brandLogoWrapper}>
                <Image src={brand.logo} alt={`Logo de ${brand.name}`} fill className={styles.brandLogo} />
              </div>
              <h3 className={styles.brandName}>{brand.name}</h3>
              <span className={styles.brandCategory}>{brand.category}</span>
            </div>
          ))}
        </div>

        {/* Available Spaces CTA */}
        <div className={`reveal ${styles.availableCta}`}>
          <div className={styles.ctaGlass}>
            <div className={styles.ctaContent}>
              <span className={styles.ctaBadge}>Locales Disponibles</span>
              <h3 className={styles.ctaTitle}>¿Tienes una marca?</h3>
              <p className={styles.ctaText}>
                Aún hay locales disponibles en Primavera Life Mall.
                Únete al ecosistema comercial más innovador de Armenia.
              </p>
              <a 
                href="https://wa.me/573225567048?text=Hola,%20quiero%20conocer%20los%20espacios%20disponibles%20en%20el%20Mall" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary" 
                id="cta-mall-available"
              >
                Conocer Espacios Disponibles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
