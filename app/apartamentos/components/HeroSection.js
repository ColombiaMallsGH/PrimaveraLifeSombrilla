'use client';

import { useRef, useEffect } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  const handleScrollToTipologias = () => {
    const el = document.getElementById('tipologias');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Video fullscreen */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          src="https://res.cloudinary.com/difxixf4j/video/upload/q_100,w_1920/v1778529311/Primavera_Life_Houses_gf440p.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.videoOverlay} />
      </div>

      {/* Hero Content — centered, minimal, between figure and helicopter */}
      <div className={styles.content}>

        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine} />
          Primavera Life House
          <span className={styles.eyebrowLine} />
        </div>

        <h1 className={styles.title}>
          Tu hogar en las alturas
        </h1>

        <p className={styles.subtitle}>
          66 apartamentos en alquiler · Armenia, Quindío
        </p>

        <div className={styles.actions}>
          <button
            className={styles.ctaPrimary}
            onClick={handleScrollToTipologias}
            id="hero-cta-tipologias"
          >
            Ver Tipologías
          </button>
          <a
            href="https://wa.me/573225567048?text=Hola%2C%20quiero%20agendar%20una%20visita%20a%20Primavera%20Life%20House"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
            id="hero-cta-visita"
          >
            Agendar Visita
          </a>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Descubrir</span>
      </div>
    </section>
  );
}
