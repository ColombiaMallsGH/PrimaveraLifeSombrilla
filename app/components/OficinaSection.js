'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from './Lightbox';
import styles from './OficinaSection.module.css';
import { Activity, Sparkles, Stethoscope, Briefcase } from 'lucide-react';

const services = [
  { name: 'Tu Oficina', type: 'Disponible', icon: <Briefcase size={20} strokeWidth={1.5} />, available: true },
];

const officeImages = [
  "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777841970/envato-labs-image-edit_-_2026-01-22T162954.255_vz6naq.avif",
  "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842013/envato-labs-image-edit_-_2026-01-16T104850.319_wtwysy.avif",
  "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842057/envato-labs-image-edit_-_2026-01-16T083324.111_uq4fe9.avif",
  "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842095/envato-labs-image-edit_-_2026-01-16T084914.984_ng70ps.avif",
  "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842127/envato-labs-image-edit_-_2026-01-22T160838.755_nrrxkr.avif",
];

export default function OficinaSection() {
  const sectionRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);

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
    <section className={styles.section} id="oficinas" ref={sectionRef}>
      <div className={styles.bgImage}>
        <Image
          src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777402136/envato-labs-image-edit_-_2026-01-22T163326.062_vxfphk.avif"
          alt="Primavera Life Office"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={80}
          unoptimized={true}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {/* Left: Content */}
          <div className={styles.content}>
            <span className={`text-label reveal ${styles.label}`}>Negocios</span>
            <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
              Primavera Life<br />
              <span className={styles.titleAccent}>Office</span>
            </h2>
            <p className={`text-body-lg reveal reveal-delay-2 ${styles.description}`}>
              Un piso completo dedicado a servicios profesionales, consultorios
              y emprendimientos. Diferentes metrajes disponibles para adaptarse
              a tu negocio.
            </p>

            <div className={`reveal reveal-delay-3 ${styles.servicesList}`}>
              {services.map((s) => (
                <div
                  key={s.name}
                  className={`${styles.serviceItem} ${s.available ? styles.serviceAvailable : ''}`}
                >
                  <span className={styles.serviceIcon}>{s.icon}</span>
                  <div>
                    <span className={styles.serviceName}>{s.name}</span>
                    <span className={styles.serviceType}>{s.type}</span>
                  </div>
                  {s.available && <span className={styles.availableBadge}>Disponible</span>}
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4">
              <a 
                href="https://wa.me/573117457906?text=Hola,%20quiero%20alquilar%20mi%20oficina" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark" 
                id="cta-oficinas-rent"
              >
                Alquila tu oficina
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className={`reveal-right ${styles.visual}`}>
            <motion.div 
              className={styles.visualCard}
              onClick={() => setLightboxImage("https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777402136/envato-labs-image-edit_-_2026-01-22T163326.062_vxfphk.avif")}
              style={{ cursor: 'pointer' }}
              layoutId="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777402136/envato-labs-image-edit_-_2026-01-22T163326.062_vxfphk.avif"
            >
              <Image 
                src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777402136/envato-labs-image-edit_-_2026-01-22T163326.062_vxfphk.avif"
                alt="Oficina Visual"
                fill
                style={{ objectFit: 'cover' }}
                className={styles.visualBgImage}
                priority={true}
              />
              <div className={styles.visualBg} />
              <div className={styles.visualContent}>
                <span className={styles.visualLabel}>Desde</span>
                <span className={styles.visualNumber}>20</span>
                <span className={styles.visualUnit}>m²</span>
                <span className={styles.visualSub}>Diferentes metrajes disponibles</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className={`reveal reveal-delay-5 ${styles.gallery}`}>
          {officeImages.map((img, index) => (
            <div 
              key={index} 
              className={styles.galleryItem}
              onClick={() => setLightboxImage(img)}
            >
              <Image
                src={img}
                alt={`Oficina ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className={styles.galleryImage}
                sizes="(min-width: 768px) 20vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox 
        isOpen={!!lightboxImage} 
        src={lightboxImage} 
        alt="Oficina ampliada" 
        onClose={() => setLightboxImage(null)} 
      />
    </section>
  );
}
