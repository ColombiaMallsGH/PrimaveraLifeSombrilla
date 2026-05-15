'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { BedDouble, BedSingle, Maximize2, MapPin, Trees, Coffee, Wind } from 'lucide-react';
import styles from './TipologiasSection.module.css';

const tipologias = [
  {
    id: 'urban',
    name: 'Urban',
    tagline: 'Estilo metropolitano',
    m2: '40 m²',
    habitaciones: 1,
    pisos: null,
    diferenciador: 'Apartaestudio de una sola habitación. Compacto, funcional y moderno. Ideal para quienes valoran la independencia.',
    features: [
      { icon: BedSingle, label: '1 Habitación' },
      { icon: Maximize2, label: '40 m²' },
    ],
    gradient: 'linear-gradient(160deg, #2a2a3a 0%, #4a4a60 100%)',
    accent: '#8a8ab0',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1778530229/envato-labs-image-edit_-_2026-01-14T144813.017_b130ms.avif',
    waMsg: 'Hola%2C%20me%20interesa%20la%20tipolog%C3%ADa%20Urban%20(40%20m%C2%B2)%20de%20Primavera%20Life%20House',
  },
  {
    id: 'natura',
    name: 'Natura',
    tagline: 'Vida orgánica',
    m2: '66 m²',
    habitaciones: 2,
    pisos: null,
    diferenciador: 'Apartamento de dos habitaciones sin balcón. Amplios espacios interiores con materiales naturales y luz abundante.',
    features: [
      { icon: BedDouble, label: '2 Habitaciones' },
      { icon: Maximize2, label: '66 m²' },
    ],
    gradient: 'linear-gradient(160deg, #3a5030 0%, #5a7848 100%)',
    accent: '#8ab878',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1778530120/envato-labs-image-edit_-_2026-01-13T230251.420_luwzh8.avif',
    waMsg: 'Hola%2C%20me%20interesa%20la%20tipolog%C3%ADa%20Natura%20(66%20m%C2%B2)%20de%20Primavera%20Life%20House',
  },
  {
    id: 'serenity',
    name: 'Serenity',
    tagline: 'Serenidad absoluta',
    m2: '68–81 m²',
    habitaciones: 2,
    pisos: null,
    diferenciador: 'Con o sin balcón del ancho de la sala-comedor. Cuenta con barra interna en la cocina — el espacio perfecto para las comidas.',
    features: [
      { icon: BedDouble, label: '2 Habitaciones' },
      { icon: Maximize2, label: '68–81 m²' },
      { icon: Wind, label: 'Con/Sin Balcón' },
      { icon: Coffee, label: 'Barra Cocina' },
    ],
    gradient: 'linear-gradient(160deg, #4a3a2a 0%, #7a6050 100%)',
    accent: '#d4a878',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1778530277/envato-labs-image-edit_-_2026-01-14T152442.746_masztt.avif',
    waMsg: 'Hola%2C%20me%20interesa%20la%20tipolog%C3%ADa%20Serenity%20(68-81%20m%C2%B2)%20de%20Primavera%20Life%20House',
  },
  {
    id: 'garden',
    name: 'Garden',
    tagline: 'Naturaleza en tu hogar',
    m2: '98–112 m²',
    habitaciones: 3,
    pisos: 'Solo Piso 7',
    diferenciador: 'Apartamentos de 3 habitaciones con terraza privada. Ubicados únicamente en el piso 7 del edificio — exclusividad total.',
    features: [
      { icon: BedDouble, label: '3 Habitaciones' },
      { icon: Maximize2, label: '98–112 m²' },
      { icon: Trees, label: 'Terraza privada' },
      { icon: MapPin, label: 'Piso 7' },
    ],
    gradient: 'linear-gradient(160deg, #2a4020 0%, #4a6838 100%)',
    accent: '#78b060',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1778530170/envato-labs-image-edit_-_2026-01-14T124722.452_ssz9i9.avif',
    waMsg: 'Hola%2C%20me%20interesa%20la%20tipolog%C3%ADa%20Garden%20(98-112%20m%C2%B2)%20de%20Primavera%20Life%20House',
  },
  {
    id: 'oasis',
    name: 'Oasis',
    tagline: 'Tu refugio en altura',
    m2: '94 m²',
    habitaciones: 3,
    pisos: 'Pisos 8°–14°',
    diferenciador: 'Apartamentos de 3 habitaciones con balcón. Ubicados del piso 8 al 14 — vistas privilegiadas de la ciudad.',
    features: [
      { icon: BedDouble, label: '3 Habitaciones' },
      { icon: Maximize2, label: '94 m²' },
      { icon: Wind, label: 'Balcón' },
      { icon: MapPin, label: 'Pisos 8°–14°' },
    ],
    gradient: 'linear-gradient(160deg, #1e3a4a 0%, #2e5a6a 100%)',
    accent: '#60a0c0',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1778530356/envato-labs-image-edit_-_2026-01-14T221237.692_de3lgv.avif',
    waMsg: 'Hola%2C%20me%20interesa%20la%20tipolog%C3%ADa%20Oasis%20(94%20m%C2%B2)%20de%20Primavera%20Life%20House',
  },
];

export default function TipologiasSection() {
  const sectionRef = useRef(null);
  const tabsRef = useRef(null);
  const touchStartX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tipologias[activeIndex];

  /* Scroll active tab into view */
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.querySelector('[data-active="true"]');
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  /* Swipe handlers for card */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && activeIndex < tipologias.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (delta < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
            el.classList.add('visible');
          });
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="tipologias" ref={sectionRef}>

      {/* Section Header */}
      <div className={`container ${styles.header}`}>
        <span className={`text-label reveal ${styles.label}`}>5 Tipologías</span>
        <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
          Encuentra tu<br />
          <span className={styles.titleAccent}>espacio ideal</span>
        </h2>
        <p className={`text-body-lg reveal reveal-delay-2 ${styles.subtitle}`}>
          Desde estudios compactos hasta amplios apartamentos con terraza.
          Todos disponibles en alquiler, exclusivamente.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabsWrapper} ref={tabsRef}>
        <div className={styles.tabs}>
          {tipologias.map((t, i) => (
            <button
              key={t.id}
              className={`${styles.tab} ${i === activeIndex ? styles.tabActive : ''}`}
              onClick={() => setActiveIndex(i)}
              id={`tab-${t.id}`}
              data-active={i === activeIndex ? 'true' : 'false'}
              style={i === activeIndex ? { '--tab-accent': t.accent } : {}}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Card */}
      <div
        className={`container ${styles.cardContainer}`}
        key={active.id}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.card} style={{ background: active.gradient }}>

          {/* Image */}
          <div className={styles.imageBlock}>
            <Image
              src={active.image}
              alt={`Tipología ${active.name} — Primavera Life House`}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              style={{ objectFit: 'cover' }}
              unoptimized={true}
              priority
            />
            <div className={styles.imageOverlay} />
            {/* Piso badge */}
            {active.pisos && (
              <div className={styles.pisosBadge}>
                <MapPin size={12} />
                {active.pisos}
              </div>
            )}
          </div>

          {/* Info */}
          <div className={styles.infoBlock}>
            <div className={styles.infoNumber}>0{activeIndex + 1} / 05</div>
            <h3 className={styles.infoName} style={{ color: active.accent }}>{active.name}</h3>
            <p className={styles.infoTagline}>{active.tagline}</p>

            <div className={styles.infoDivider} />

            <p className={styles.infoDiferenciador}>{active.diferenciador}</p>

            {/* Features */}
            <div className={styles.featuresGrid}>
              {active.features.map(({ icon: Icon, label }) => (
                <div key={label} className={styles.featureItem}>
                  <Icon size={16} strokeWidth={1.5} style={{ color: active.accent }} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={styles.infoActions}>
              <a
                href={`https://wa.me/573225567048?text=${active.waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-glass ${styles.ctaBtn}`}
                id={`cta-${active.id}`}
              >
                Solicitar Información
              </a>
            </div>
          </div>
        </div>

        {/* Dots nav */}
        <div className={styles.dots}>
          {tipologias.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Ver tipología ${tipologias[i].name}`}
              style={i === activeIndex ? { background: active.accent } : {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
