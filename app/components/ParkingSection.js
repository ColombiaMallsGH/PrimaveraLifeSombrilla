'use client';

import { useEffect, useRef } from 'react';
import styles from './ParkingSection.module.css';

export default function ParkingSection() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="parking" ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={`reveal-scale ${styles.banner}`}>
          <div className={styles.bannerBg} />
          <div className={styles.bannerContent}>
            <span className={styles.promoBadge}>Promoción Especial</span>
            <h2 className={styles.bannerTitle}>
              Parqueadero<br />
              <span className={styles.bannerAccent}>Abierto al Público</span>
            </h2>
            <p className={styles.bannerText}>
              4 pisos de parqueadero seguro y cubierto. No necesitas vivir ni trabajar
              aquí para usarlo — <strong>aprovecha nuestra promoción especial</strong>.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.featureNumber}>4</span>
                <span className={styles.featureLabel}>Pisos</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureNumber}>★</span>
                <span className={styles.featureLabel}>Seguridad Privada</span>
              </div>
              <div className={styles.featureDivider} />
              <div className={styles.feature}>
                <span className={styles.featureNumber}>★</span>
                <span className={styles.featureLabel}>Promo Activa</span>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href="https://www.google.com/maps/place/Primavera+Life+Mall/@4.5549737,-75.6564619,17z/data=!4m10!1m2!2m1!1sPrimavera+Life+Mall+Cra.+13+#16N+-+79,+Armenia,+Quind!3m6!1s0x8e38f5b7a2883031:0xef7df9f70ba2dd99!8m2!3d4.5549737!4d-75.6564619!15sCjVQcmltYXZlcmEgTGlmZSBNYWxsIENyYS4gMTMgIzE2TiAtIDc5LCBBcm1lbmlhLCBRdWluZFoyIjBwcmltYXZlcmEgbGlmZSBtYWxsIGNyYSAxMyAjMTZuIDc5IGFybWVuaWEgcXVpbmSSAQ9zaG9wcGluZ19jZW50ZXLgAQA!16s%2Fg%2F11p5ks7p65?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
                id="cta-parking-maps"
              >
                Llegar con Google Maps
              </a>
              <a
                href="https://www.waze.com/ul?ll=4.5549737,-75.6564619&navigate=yes&zoom=17"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                id="cta-parking-waze"
              >
                Abrir en Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
