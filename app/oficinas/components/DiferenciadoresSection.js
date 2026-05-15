'use client';

import { useEffect, useRef } from 'react';
import styles from './DiferenciadoresSection.module.css';
import { Eye, MapPin, Wifi, Shield, Car, Zap } from 'lucide-react';

const diferenciadores = [
  {
    icon: <Eye size={28} strokeWidth={1.5} />,
    title: 'Vista Panorámica',
    desc: 'Cordillera Central o skyline de Armenia. Cada oficina se diferencia por su ubicación y vista.',
  },
  {
    icon: <MapPin size={28} strokeWidth={1.5} />,
    title: 'Ubicación Estratégica',
    desc: 'Cra. 13 #16N-79, sector El Nogal, La Castellana. Al lado del Hospital San Juan de Dios.',
  },
  {
    icon: <Zap size={28} strokeWidth={1.5} />,
    title: 'Edificio Inteligente',
    desc: 'Infraestructura de última generación con sistemas automatizados y conectividad de alto nivel.',
  },
  {
    icon: <Shield size={28} strokeWidth={1.5} />,
    title: 'Seguridad 24/7',
    desc: 'CCTV, control de acceso y vigilancia permanente para tu tranquilidad y la de tus clientes.',
  },
  {
    icon: <Car size={28} strokeWidth={1.5} />,
    title: 'Parqueadero 4 Pisos',
    desc: 'Parqueadero propio del edificio Primavera Life con fácil acceso desde la vía principal.',
  },
  {
    icon: <Wifi size={28} strokeWidth={1.5} />,
    title: 'Helipuerto',
    desc: 'Único edificio con helipuerto en Armenia. Conectividad exclusiva con la Ruta del Café.',
  },
];

export default function DiferenciadoresSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
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
    <section className={styles.section} id="diferenciadores" ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={`text-label reveal ${styles.label}`}>¿Por qué Primavera Office?</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Un edificio <span className={styles.accent}>sin igual</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {diferenciadores.map((item, i) => (
            <div
              key={i}
              className={`reveal-scale reveal-delay-${Math.min(i + 1, 5)} ${styles.card}`}
            >
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
