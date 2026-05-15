'use client';

import styles from './ContactoSection.module.css';

export default function ContactoSection() {
  return (
    <section className={styles.section} id="contacto-office">
      <div className={styles.bgOverlay} />
      <div className={`container ${styles.container}`}>
        <span className={styles.label}>
          <span className={styles.labelLine} />
          El Siguiente Paso
          <span className={styles.labelLine} />
        </span>
        <h2 className={styles.title}>
          ¿Listo para tu<br />
          <span className={styles.accent}>oficina Elite?</span>
        </h2>
        <p className={styles.description}>
          Agenda una visita al edificio Primavera Life y conoce en persona
          la vista, los acabados y la experiencia de trabajar aquí.
        </p>
        <a
          href="https://wa.me/573225567048?text=Hola,%20me%20interesa%20una%20oficina%20Elite%20en%20Primavera%20Life%20Office"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
          id="cta-contacto-office"
        >
          Agendar Visita
        </a>
      </div>
    </section>
  );
}
