'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProyectoSection.module.css';

const stats = [
  { value: '66', label: 'Apartamentos', suffix: '' },
  { value: '5', label: 'Tipologías', suffix: '' },
  { value: '40–112', label: 'Metros cuadrados', suffix: ' m²' },
];

function AnimatedStat({ value, label, suffix, visible }) {
  return (
    <div className={`${styles.statCard} ${visible ? styles.statVisible : ''}`}>
      <span className={styles.statValue}>
        {value}<span className={styles.statSuffix}>{suffix}</span>
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

export default function ProyectoSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
            el.classList.add('visible');
          });
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="proyecto" ref={sectionRef}>
      <div className={`container ${styles.inner}`}>

        {/* Text */}
        <div className={styles.textBlock}>
          <span className={`text-label reveal ${styles.label}`}>El Proyecto</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Tu próximo hogar<br />
            <span className={styles.titleAccent}>en Armenia</span>
          </h2>
          <p className={`text-body-lg reveal reveal-delay-2 ${styles.description}`}>
            Primavera Life House es el espacio residencial del ecosistema Primavera Life.
            Un edificio diseñado para quienes valoran el confort, la privacidad y los acabados premium,
            en el corazón de Armenia, Quindío.
          </p>
          <div className={`reveal reveal-delay-3 ${styles.rentTag}`}>
            <span className={styles.rentDot} />
            Exclusivamente disponible en alquiler
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} visible={visible} />
          ))}
        </div>

      </div>

      {/* Decorative line */}
      <div className={styles.decorLine} aria-hidden="true" />
    </section>
  );
}
