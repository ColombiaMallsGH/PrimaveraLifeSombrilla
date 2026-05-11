'use client';

import { useEffect, useRef } from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import styles from './UbicacionSection.module.css';

export default function UbicacionSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
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
    <section className={styles.section} id="ubicacion" ref={sectionRef}>
      <div className={`container ${styles.inner}`}>

        {/* Text */}
        <div className={styles.textBlock}>
          <span className={`text-label reveal ${styles.label}`}>Ubicación</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Encuentra tu<br />
            <span className={styles.titleAccent}>hogar</span>
          </h2>

          <div className={`reveal reveal-delay-2 ${styles.addressBlock}`}>
            <MapPin size={18} className={styles.addressIcon} />
            <div>
              <p className={styles.addressMain}>Cra. 13 #16N - 79</p>
              <p className={styles.addressSub}>Sector El Nogal, La Castellana</p>
              <p className={styles.addressSub}>Armenia, Quindío — Colombia</p>
              <p className={styles.addressRef}>Al lado del Hospital San Juan de Dios</p>
            </div>
          </div>

          <div className={`reveal reveal-delay-3 ${styles.contactButtons}`}>
            <a
              href="https://wa.me/573225567048?text=Hola%2C%20quiero%20agendar%20una%20visita%20a%20Primavera%20Life%20House"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary btn-lg ${styles.contactBtn}`}
              id="ubicacion-whatsapp"
            >
              <MessageCircle size={18} />
              Agendar Visita por WhatsApp
            </a>
            <a
              href="tel:+573225567048"
              className={`btn btn-outline-dark btn-lg ${styles.contactBtn}`}
              id="ubicacion-call"
            >
              <Phone size={18} />
              Llamar
            </a>
          </div>
        </div>

        {/* Map */}
        <div className={`reveal-right ${styles.mapWrapper}`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.71183188981!2d-75.65903682415174!3d4.554973695420315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e38f5b7a2883031%3A0xef7df9f70ba2dd99!2sPrimavera%20Life%20Mall!5e0!3m2!1ses!2sco!4v1714774087000!5m2!1ses!2sco"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación oficial de Primavera Life House en Cra. 13 #16N - 79, Armenia"
          />
        </div>
      </div>
    </section>
  );
}
