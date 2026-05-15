'use client';

import { useEffect, useRef } from 'react';
import styles from './OficinasSection.module.css';
import { Briefcase, Mountain, Building2 } from 'lucide-react';

const oficinas = [
  { id: '603', area: 41.9, vista: 'ciudad' },
  { id: '604', area: 43.4, vista: 'ciudad' },
  { id: '605', area: 53.7, vista: 'cordillera' },
  { id: '607', area: 44.0, vista: 'cordillera' },
  { id: '608', area: 49.5, vista: 'cordillera' },
  { id: '609', area: 53.6, vista: 'cordillera' },
  { id: '610', area: 48.0, vista: 'ciudad' },
  { id: '611', area: 58.8, vista: 'cordillera' },
  { id: '614', area: 45.7, vista: 'ciudad' },
  { id: '615', area: 45.7, vista: 'ciudad' },
];

export default function OficinasSection() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="oficinas" ref={sectionRef}>
      <div className={`container ${styles.container}`}>

        {/* Header */}
        <div className={styles.header}>
          <span className={`text-label reveal ${styles.label}`}>Disponibilidad</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Oficinas <span className={styles.accent}>Elite</span>
          </h2>
          <p className={`text-body-lg reveal reveal-delay-2 ${styles.subtitle}`}>
            Únicamente las <strong>Elite</strong> disponibles. 11 oficinas en el piso 6 con
            vistas privilegiadas a la cordillera Central o la ciudad de Armenia.
          </p>
        </div>

        {/* Stats bar */}
        <div className={`reveal reveal-delay-3 ${styles.statsBar}`}>
          <div className={styles.stat}>
            <Briefcase size={22} strokeWidth={1.5} className={styles.statIcon} />
            <span className={styles.statNumber}>11</span>
            <span className={styles.statLabel}>Oficinas</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>41.9 – 58.8</span>
            <span className={styles.statLabel}>m² disponibles</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>Piso 6</span>
            <span className={styles.statLabel}>Edificio inteligente</span>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {oficinas.map((of, i) => (
            <div
              key={of.id}
              className={`reveal reveal-delay-${Math.min(i % 5 + 1, 5)} ${styles.card}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardBadge}>Elite</span>
                <span className={styles.cardNumber}>{of.id}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardArea}>{of.area} m²</span>
                <div className={styles.cardVista}>
                  {of.vista === 'cordillera' ? (
                    <Mountain size={16} strokeWidth={1.5} />
                  ) : (
                    <Building2 size={16} strokeWidth={1.5} />
                  )}
                  <span>Vista {of.vista}</span>
                </div>
              </div>
              <a
                href={`https://wa.me/573225567048?text=Hola,%20me%20interesa%20la%20oficina%20${of.id}%20de%20Primavera%20Life%20Office`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardCta}
                id={`cta-oficina-${of.id}`}
              >
                Consultar
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
