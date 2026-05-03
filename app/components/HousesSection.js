'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from './Lightbox';
import styles from './HousesSection.module.css';
import { Bath, Droplets, Flame, Dumbbell, Baby, Dog, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const typologies = [
  {
    name: 'Garden',
    tagline: 'Naturaleza en tu hogar',
    description: 'Espacios amplios con acceso a zonas verdes privadas. Ideal para quienes buscan tranquilidad.',
    gradient: 'linear-gradient(135deg, #4a6741, #6b8a5e)',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737158/envato-labs-image-edit_-_2026-01-13T221428.610_wm8u6o.avif',
  },
  {
    name: 'Natura',
    tagline: 'Vida orgánica',
    description: 'Diseño biofílico con materiales naturales y luz abundante. Conecta con lo esencial.',
    gradient: 'linear-gradient(135deg, #5a7050, #7a9668)',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737224/envato-labs-image-edit_-_2026-01-14T084405.459_nqxvm6.avif',
  },
  {
    name: 'Oasis',
    tagline: 'Tu refugio urbano',
    description: 'Espacios de descanso con vista privilegiada. Tu escape dentro de la ciudad.',
    gradient: 'linear-gradient(135deg, #3a5a6a, #5a8090)',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737263/envato-labs-image-edit_-_2026-01-14T162958.615_x1x1ko.jpg',
  },
  {
    name: 'Serenity',
    tagline: 'Serenidad absoluta',
    description: 'Diseño minimalista y acabados premium. La calma que necesitas después de un largo día.',
    gradient: 'linear-gradient(135deg, #5a4a3a, #8a7060)',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737315/envato-labs-image-edit_-_2026-01-12T231018.846_orb187.avif',
  },
  {
    name: 'Urban',
    tagline: 'Estilo metropolitano',
    description: 'Moderno, funcional, conectado. Para quienes viven la ciudad con intensidad.',
    gradient: 'linear-gradient(135deg, #3a3a4a, #5a5a70)',
    image: 'https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737356/envato-labs-image-edit_-_2026-01-14T132644.280_jwvlas.avif',
  },
];

const amenities = [
  { name: 'Jacuzzi', icon: <Bath size={20} strokeWidth={1.5} /> },
  { name: 'Turco', icon: <Droplets size={20} strokeWidth={1.5} /> },
  { name: 'Sauna', icon: <Flame size={20} strokeWidth={1.5} /> },
  { name: 'Gimnasio', icon: <Dumbbell size={20} strokeWidth={1.5} /> },
  { name: 'Zona de Niños', icon: <Baby size={20} strokeWidth={1.5} /> },
  { name: 'Pet Friendly', icon: <Dog size={20} strokeWidth={1.5} /> },
  { name: 'Zona Social', icon: <Users size={20} strokeWidth={1.5} /> },
];

export default function HousesSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const scrollTo = (index) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const card = scrollRef.current.children[index];
      if (card) {
        const container = scrollRef.current;
        const scrollLeft = card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const newIndex = Math.max(0, activeIndex - 1);
      scrollTo(newIndex);
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const newIndex = Math.min(typologies.length - 1, activeIndex + 1);
      scrollTo(newIndex);
    }
  };

  return (
    <section className={styles.section} id="houses" ref={sectionRef}>
      <div className={styles.bgImage}>
        <Image
          src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777402063/Oasis_Primavera_Life_Armenia4_jsvxcc.avif"
          alt="Primavera Life House"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={80}
          priority={true}
          unoptimized={true}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={`container ${styles.header}`}>
          <span className={`text-label reveal ${styles.label}`}>Tu próximo hogar</span>
          <h2 className={`text-section reveal reveal-delay-1 ${styles.title}`}>
            Primavera Life<br />
            <span className={styles.titleAccent}>House</span>
          </h2>
          <p className={`text-body-lg reveal reveal-delay-2 ${styles.description}`}>
            5 tipologías únicas de apartamentos y apartaestudios
            diseñados para vivir con estilo. Disponibles exclusivamente en alquiler.
          </p>

          <div className={`reveal reveal-delay-3 ${styles.rentBadge}`}>
            <span>✦</span> Exclusivamente para Alquiler / Renta
          </div>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className={`reveal ${styles.carouselWrapper}`}>
          {/* Navigation Arrows */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`} 
            onClick={scrollPrev}
            aria-label="Anterior"
            disabled={activeIndex === 0}
            style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.carousel} ref={scrollRef}>
            {typologies.map((type, i) => (
              <div 
                key={type.name} 
                className={`${styles.typeCard} ${i === activeIndex ? styles.activeCard : ''}`}
                onClick={() => {
                  setLightboxImage(type.image);
                  setActiveIndex(i);
                }}
                style={{ cursor: 'pointer' }}
              >
                <motion.div 
                  className={styles.typeCardBg} 
                  style={{ background: type.gradient }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  {type.image && (
                    <Image 
                      src={type.image} 
                      alt={`Tipología ${type.name}`} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }} 
                      priority={true}
                      unoptimized={true}
                    />
                  )}
                </motion.div>
                <div className={styles.typeCardContent}>
                  <span className={styles.typeNumber}>0{i + 1}</span>
                  <h3 className={styles.typeName}>{type.name}</h3>
                  <span className={styles.typeTagline}>{type.tagline}</span>
                  <p className={styles.typeDesc}>{type.description}</p>
                  <button className="btn btn-glass" id={`cta-type-${type.name.toLowerCase()}`}>
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`} 
            onClick={scrollNext}
            aria-label="Siguiente"
            disabled={activeIndex === typologies.length - 1}
            style={{ opacity: activeIndex === typologies.length - 1 ? 0.3 : 1 }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className={styles.dots}>
            {typologies.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                onClick={() => scrollTo(i)}
                aria-label={`Ver tipología ${typologies[i].name}`}
              />
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className={`container ${styles.amenitiesSection}`}>
          <h3 className={`reveal ${styles.amenitiesTitle}`}>Amenidades Premium</h3>
          <div className={styles.amenitiesGrid}>
            {amenities.map((a, i) => (
              <div key={a.name} className={`reveal reveal-delay-${Math.min(i + 1, 5)} ${styles.amenityItem}`}>
                <span className={styles.amenityIcon}>{a.icon}</span>
                <span className={styles.amenityName}>{a.name}</span>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
            <a 
              href="https://wa.me/573117457906?text=Hola,%20quiero%20agendar%20una%20visita%20a%20los%20apartamentos" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark btn-lg" 
              id="cta-houses-visit"
            >
              Agendar Visita
            </a>
          </div>
        </div>
      </div>

      <Lightbox 
        isOpen={!!lightboxImage} 
        src={lightboxImage} 
        alt="Tipología ampliada" 
        onClose={() => setLightboxImage(null)} 
      />
    </section>
  );
}
