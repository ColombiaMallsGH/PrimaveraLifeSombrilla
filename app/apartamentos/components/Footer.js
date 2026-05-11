'use client';

import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contacto">
      <div className={`container ${styles.inner}`}>

        {/* Top: Brand + Nav */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image
              src="/House_blanco.png"
              alt="Primavera Life House Logo"
              width={150}
              height={46}
              className={styles.logo}
            />
            <p className={styles.brandDesc}>
              66 apartamentos en alquiler<br />
              Armenia, Quindío — Colombia
            </p>
            <a
              href="https://primaveralife.com.co"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.backLink}
            >
              ← Ir a Primavera Life
            </a>
          </div>

          <div className={styles.columns}>
            {/* Ubicación */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Ubicación</h4>
              <p className={styles.colText}>
                Cra. 13 #16N - 79<br />
                Sector El Nogal, La Castellana<br />
                Armenia, Quindío — Colombia
              </p>
              <p className={styles.colNote}>Al lado del Hospital San Juan de Dios</p>
            </div>

            {/* Tipologías */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Tipologías</h4>
              <ul className={styles.tipList}>
                <li>Urban · 40 m²</li>
                <li>Natura · 66 m²</li>
                <li>Serenity · 68–81 m²</li>
                <li>Garden · 98–112 m²</li>
                <li>Oasis · 94 m²</li>
              </ul>
            </div>

            {/* Contacto */}
            <div className={styles.column}>
              <h4 className={styles.colTitle}>Contacto</h4>
              <div className={styles.contactLinks}>
                <a
                  href="https://wa.me/573225567048?text=Hola%2C%20me%20interesa%20Primavera%20Life%20House"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  id="footer-whatsapp"
                >
                  WhatsApp
                </a>
                <a href="mailto:info@primaveralife.com.co" className={styles.contactLink} id="footer-email">
                  info@primaveralife.com.co
                </a>
                <a
                  href="https://www.instagram.com/primaveralife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                  id="footer-instagram"
                >
                  @primaveralife
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Primavera Life House. Todos los derechos reservados.
          </p>
          <p className={styles.credits}>
            Diseñado por <strong>Colombia Malls</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
