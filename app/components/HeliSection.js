'use client';

import { useEffect, useRef } from 'react';
import styles from './HeliSection.module.css';

const uses = [
  { icon: '✦', title: 'Salud', description: 'Apoyo aéreo al Hospital San Juan de Dios, ubicado justo al lado del edificio.' },
  { icon: '✦', title: 'Turismo', description: 'Conecta con los destinos turísticos del Eje Cafetero desde el aire.' },
  { icon: '✦', title: 'Negocios', description: 'Ejecutivos pueden llegar directamente al edificio sin perder tiempo en carretera.' },
];

export default function HeliSection() {
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
    <section className={styles.section} id="helipuerto" ref={sectionRef}>
      {/* Background */}
      <div className={styles.bg}>
        <div className={styles.bgImage}>
          <img 
            src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842186/DJI_0373_tjq3ct.avif" 
            alt="Helipuerto Primavera Life" 
          />
        </div>
        <div className={styles.bgGradient} />
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.badge}>
          <span className="reveal">✦</span>
          <span className="reveal reveal-delay-1">Único en la Región</span>
        </div>

        <h2 className={`reveal reveal-delay-1 ${styles.title}`}>
          Helipuerto
        </h2>

        <p className={`reveal reveal-delay-2 ${styles.subtitle}`}>
          El primer y único helipuerto del Eje Cafetero, ubicado en la cima
          de Primavera Life. Un diferenciador que conecta salud, turismo y negocios.
        </p>

        <div className={`reveal reveal-delay-3 ${styles.videoWrapper}`}>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/vK1m1CfiijA?rel=0&modestbranding=1" 
            title="Visita Aeronáutica Civil - Primavera Life" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            style={{ borderRadius: 'var(--radius-lg)' }}
          ></iframe>
        </div>

        <div className={styles.usesGrid}>
          {uses.map((use, i) => (
            <div key={use.title} className={`reveal reveal-delay-${i + 2} ${styles.useCard}`}>
              <span className={styles.useIcon}>{use.icon}</span>
              <h3 className={styles.useTitle}>{use.title}</h3>
              <p className={styles.useDesc}>{use.description}</p>
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-5 ${styles.hospitalNote}`}>
          <span className={styles.hospitalIcon}>+</span>
          <p>
            Ubicado junto al <strong>Hospital San Juan de Dios</strong>,
            el helipuerto permite traslados aéreos de emergencia y servicios médicos especializados.
          </p>
        </div>
      </div>
    </section>
  );
}
