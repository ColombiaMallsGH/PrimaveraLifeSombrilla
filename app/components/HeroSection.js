'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Lightbox from './Lightbox';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress slightly for a more premium cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Layer 0: Background Zooming In
  const bgScale = useTransform(smoothProgress, [0, 1], [1.1, 1.5]);
  const bgY = useTransform(smoothProgress, [0, 1], ["10vh", "15vh"]);
  
  // Layer 1: Words emerging sequentially from behind the building
  // Text starts behind the building (25vh), moves higher up (-40vh), and fades
  // down to a lower opacity (0.3) without disappearing completely.
  const textY = useTransform(smoothProgress, [0, 1], ["25vh", "-40vh"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Layer 2: Foreground Building
  // Scales slightly to create 3D separation, but mostly stays anchored
  const fgScale = useTransform(smoothProgress, [0, 1], [1.05, 1.2]);
  const fgY = useTransform(smoothProgress, [0, 1], ["15vh", "20vh"]);

  // Action Cards: Appear slightly later to overlap nicely with the slower text exit
  const cardsOpacity = useTransform(smoothProgress, [0.6, 0.85], [0, 1]);
  const cardsY = useTransform(smoothProgress, [0.6, 0.85], ["40px", "0px"]);
  const cardsPointerEvents = useTransform(smoothProgress, (val) => val > 0.65 ? "auto" : "none");

  return (
    <section className={`${styles.heroContainer}`} ref={containerRef} id="hero">
      <div className={styles.stickyLayer}>
        
        {/* Layer 0: Background */}
        <motion.div className={styles.bgLayer} style={{ scale: bgScale, y: bgY }}>
          <Image 
            src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777405898/PrimaveraFondo_hnc4p2.png"
            alt="Fondo Primavera Life"
            fill
            priority
            unoptimized={true}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </motion.div>

        {/* Layer 1: Text Layer (Behind Building) */}
        <motion.div className={styles.textLayer} style={{ y: textY, opacity: textOpacity }}>
          <div className={`${styles.textItem} ${styles.textItemLeft}`}>
            <h1 className={styles.floatingTitle}>MALL</h1>
          </div>
          <div className={`${styles.textItem} ${styles.textItemCenter}`} style={{ visibility: 'hidden' }}>
            <h1 className={styles.floatingTitle}>APARTAMENTOS</h1>
          </div>
          <div className={`${styles.textItem} ${styles.textItemRight}`}>
            <h1 className={styles.floatingTitle}>OFICINAS</h1>
          </div>
        </motion.div>

        {/* Layer 2: Foreground Building */}
        <motion.div className={styles.fgLayer} style={{ scale: fgScale, y: fgY }}>
          <Image 
            src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777405074/Primaveraedificio_egmgny.png"
            alt="Edificio Primavera Life"
            fill
            priority
            unoptimized={true}
            style={{ objectFit: 'cover', objectPosition: 'bottom center' }}
          />
        </motion.div>

        {/* Layer 3: Text Layer (In Front of Building) */}
        <motion.div className={styles.textLayer} style={{ y: textY, opacity: textOpacity, zIndex: 3, pointerEvents: 'none' }}>
          <div className={`${styles.textItem} ${styles.textItemLeft}`} style={{ visibility: 'hidden' }}>
            <h1 className={styles.floatingTitle}>MALL</h1>
          </div>
          <div className={`${styles.textItem} ${styles.textItemCenter}`}>
            <h1 className={styles.floatingTitle}>APARTAMENTOS</h1>
          </div>
          <div className={`${styles.textItem} ${styles.textItemRight}`} style={{ visibility: 'hidden' }}>
            <h1 className={styles.floatingTitle}>OFICINAS</h1>
          </div>
        </motion.div>

        {/* Gradient Overlay for bottom blending */}
        <div className={styles.gradientOverlay} />

        {/* Action Cards (Appear at the end) */}
        <motion.div 
          className={styles.cardsLayer} 
          style={{ opacity: cardsOpacity, y: cardsY, pointerEvents: cardsPointerEvents }}
        >
          <div className={styles.actionCards}>
            <div 
              className={styles.actionCard} 
              id="cta-mall"
              onClick={() => setLightboxImage("https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736914/DJI_0450_dm8bav.avif")}
            >
              <motion.div className={styles.cardBg} layoutId="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736914/DJI_0450_dm8bav.avif">
                <Image 
                  src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736914/DJI_0450_dm8bav.avif" 
                  alt="Mall Primavera Life" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority={true}
                  unoptimized={true}
                />
              </motion.div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Visitar el</span>
                <span className={styles.cardTitle}>Mall</span>
                <span className={styles.cardSub}>Gastronomía · Rooftop</span>
              </div>
            </div>

            <div 
              className={styles.actionCard} 
              id="cta-houses"
              onClick={() => setLightboxImage("https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736975/envato-labs-image-edit_-_2026-01-13T153908.300_y07pnu.avif")}
            >
              <motion.div className={styles.cardBg} layoutId="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736975/envato-labs-image-edit_-_2026-01-13T153908.300_y07pnu.avif">
                <Image 
                  src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777736975/envato-labs-image-edit_-_2026-01-13T153908.300_y07pnu.avif" 
                  alt="Vivir en House" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority={true}
                  unoptimized={true}
                />
              </motion.div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Vivir en</span>
                <span className={styles.cardTitle}>House</span>
                <span className={styles.cardSub}>Lujo · Confort</span>
              </div>
            </div>

            <div 
              className={styles.actionCard} 
              id="cta-oficinas"
              onClick={() => setLightboxImage("https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737078/envato-labs-image-edit_-_2026-01-16T121915.719_dwisvw.avif")}
            >
              <motion.div className={styles.cardBg} layoutId="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737078/envato-labs-image-edit_-_2026-01-16T121915.719_dwisvw.avif">
                <Image 
                  src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777737078/envato-labs-image-edit_-_2026-01-16T121915.719_dwisvw.avif" 
                  alt="Trabajar en Oficinas" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  priority={true}
                  unoptimized={true}
                />
              </motion.div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>Trabajar en</span>
                <span className={styles.cardTitle}>Oficinas</span>
                <span className={styles.cardSub}>Negocios · Helipuerto</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <Lightbox 
        isOpen={!!lightboxImage} 
        src={lightboxImage} 
        alt="Imagen ampliada" 
        onClose={() => setLightboxImage(null)} 
      />
    </section>
  );
}
