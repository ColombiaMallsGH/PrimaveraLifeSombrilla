'use client';

import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={`container ${styles.container}`}>
        {/* Map */}
        <div className={styles.mapWrapper}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.71183188981!2d-75.65903682415174!3d4.554973695420315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5b7a2883031%3A0xef7df9f70ba2dd99!2sPrimavera%20Life%20Mall!5e0!3m2!1ses!2sco!4v1714774087000!5m2!1ses!2sco"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: 'var(--radius-md)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación oficial de Primavera Life Mall en Cra. 13 #16N - 79, Armenia"
          />
        </div>

        {/* Content Grid */}
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Image 
                src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401615/Primavera_Negro_Horizontal_fa7bev.png" 
                alt="Primavera Life Logo Secundario" 
                width={160} 
                height={50} 
                className={styles.logoImage} 
              />
            </div>
            <p className={styles.brandDesc}>
              Mall · House · Office · Helipuerto<br />
              El ecosistema de vida más completo de Armenia.
            </p>
          </div>

          {/* Location */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Ubicación</h4>
            <p className={styles.columnText}>
              Cra. 13 #16N - 79<br />
              Sector El Nogal, La Castellana<br />
              Armenia, Quindío — Colombia
            </p>
            <p className={styles.columnText}>
              Al lado del Hospital San Juan de Dios
            </p>
          </div>

          {/* Hours */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Horarios</h4>
            <div className={styles.hours}>
              <div>
                <span className={styles.hourLabel}>Edificio General</span>
                <span className={styles.hourValue}>Lun — Dom: 7:00 AM — 10:00 PM</span>
              </div>
              <div>
                <span className={styles.hourLabel}>Primavera Life Mall</span>
                <span className={styles.hourValue}>Lun — Sáb: 11:00 AM — 12:00 AM</span>
                <span className={styles.hourValue}>Dom: 11:00 AM — 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contacto</h4>
            <div className={styles.contactLinks}>
              <a href="https://wa.me/573225567048" className={styles.contactLink} id="footer-whatsapp">
                WhatsApp
              </a>
              <a href="mailto:info@primaveralife.com.co" className={styles.contactLink} id="footer-email">
                info@primaveralife.com.co
              </a>
              <a href="https://www.instagram.com/primaveralife" target="_blank" rel="noopener noreferrer" className={styles.contactLink} id="footer-instagram">
                @primaveralife
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Primavera Life. Todos los derechos reservados.
          </p>
          <p className={styles.credits}>
            Diseñado por <strong>Colombia Malls</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
