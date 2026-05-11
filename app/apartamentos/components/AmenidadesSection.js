'use client';

import { useEffect, useRef } from 'react';
import { Bath, Droplets, Flame, Dumbbell, Baby, Dog, Users } from 'lucide-react';
import styles from './AmenidadesSection.module.css';

const amenidades = [
  { name: 'Jacuzzi', icon: Bath, desc: 'Relájate y desconéctate' },
  { name: 'Turco', icon: Droplets, desc: 'Vapor terapéutico' },
  { name: 'Sauna', icon: Flame, desc: 'Calor renovador' },
  { name: 'Gimnasio', icon: Dumbbell, desc: 'Equipado y disponible' },
  { name: 'Zona de Niños', icon: Baby, desc: 'Espacio seguro y divertido' },
  { name: 'Pet Friendly', icon: Dog, desc: 'Mascotas bienvenidas' },
  { name: 'Zona Social', icon: Users, desc: 'Para compartir momentos' },
];

export default function AmenidadesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
            el.classList.add('visible');
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="amenidades" ref={sectionRef}>
      {/* Decorative top */}
      <div className={styles.topDecor} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className={`text-label reveal ${styles.label}`}>Amenidades</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Un estilo de vida<br />
            <span className={styles.titleAccent}>premium</span>
          </h2>
          <p className={`text-body-lg reveal reveal-delay-2 ${styles.subtitle}`}>
            Primavera Life House incluye espacios de bienestar y socialización
            diseñados para elevar tu calidad de vida.
          </p>
        </div>

        <div className={styles.grid}>
          {amenidades.map((a, i) => {
            const Icon = a.icon;
            return (
              <div
                key={a.name}
                className={`reveal-scale reveal-delay-${Math.min(i + 1, 5)} ${styles.amenidadCard}`}
              >
                <div className={styles.amenidadIconWrap}>
                  <Icon size={28} strokeWidth={1.5} className={styles.amenidadIcon} />
                </div>
                <h3 className={styles.amenidadName}>{a.name}</h3>
                <p className={styles.amenidadDesc}>{a.desc}</p>
              </div>
            );
          })}
        </div>

        <div className={`reveal ${styles.ctaWrapper}`}>
          <a
            href="https://wa.me/573225567048?text=Hola%2C%20quiero%20agendar%20una%20visita%20a%20Primavera%20Life%20House%20para%20conocer%20las%20amenidades"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            id="amenidades-cta"
          >
            Agendar Visita
          </a>
        </div>
      </div>
    </section>
  );
}
