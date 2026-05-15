'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './CanvasScrollHero.module.css';

const TOTAL_FRAMES = 90;
const PRELOAD_BATCH = 15;
const INITIAL_BATCH = 8;

function getFramePath(index) {
  const padded = String(index).padStart(2, '0');
  return `/oficinas-frames/OfficeHeader${padded}.webp`;
}

/* ── Overlay visibility helper ── */
function overlayOpacity(progress, fadeIn, peakStart, peakEnd, fadeOut) {
  if (progress < fadeIn) return 0;
  if (progress < peakStart) return (progress - fadeIn) / (peakStart - fadeIn);
  if (progress <= peakEnd) return 1;
  if (progress < fadeOut) return 1 - (progress - peakEnd) / (fadeOut - peakEnd);
  return 0;
}

/* ── Gallery images from Primavera Life Sombrilla Cloudinary ── */
const galleryImages = [
  {
    src: "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777841970/envato-labs-image-edit_-_2026-01-22T162954.255_vz6naq.avif",
    alt: "Oficina moderna tipo 1",
  },
  {
    src: "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842013/envato-labs-image-edit_-_2026-01-16T104850.319_wtwysy.avif",
    alt: "Oficina moderna tipo 2",
  },
  {
    src: "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842057/envato-labs-image-edit_-_2026-01-16T083324.111_uq4fe9.avif",
    alt: "Oficina moderna tipo 3",
  },
  {
    src: "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842095/envato-labs-image-edit_-_2026-01-16T084914.984_ng70ps.avif",
    alt: "Oficina moderna tipo 4",
  },
  {
    src: "https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777842127/envato-labs-image-edit_-_2026-01-22T160838.755_nrrxkr.avif",
    alt: "Oficina moderna tipo 5",
  },
];

export default function CanvasScrollHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const loadedRef = useRef(new Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef(0);
  const rafRef = useRef(null);

  const [initialReady, setInitialReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Frame loader ──
  const loadFrame = useCallback((index) => {
    return new Promise((resolve, reject) => {
      if (index < 0 || index >= TOTAL_FRAMES) return reject('Out of bounds');
      if (loadedRef.current[index] && imagesRef.current[index]) {
        return resolve(imagesRef.current[index]);
      }
      const img = new Image();
      img.onload = () => {
        imagesRef.current[index] = img;
        loadedRef.current[index] = true;
        resolve(img);
      };
      img.onerror = reject;
      img.src = getFramePath(index);
    });
  }, []);

  const loadRange = useCallback(async (start, end) => {
    const s = Math.max(0, start);
    const e = Math.min(TOTAL_FRAMES - 1, end);
    const promises = [];
    for (let i = s; i <= e; i++) {
      if (!loadedRef.current[i]) promises.push(loadFrame(i));
    }
    await Promise.all(promises);
  }, [loadFrame]);

  // ── Draw frame on canvas ──
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = w / h;
    let drawW, drawH, offsetX, offsetY;

    if (imgAspect > canvasAspect) {
      drawH = h;
      drawW = h * imgAspect;
      offsetX = (w - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = w;
      drawH = w / imgAspect;
      offsetX = 0;
      offsetY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ── Initial load ──
  useEffect(() => {
    loadRange(0, INITIAL_BATCH - 1).then(() => {
      setInitialReady(true);
      drawFrame(0);

      const loadRemaining = async () => {
        for (let i = INITIAL_BATCH; i < TOTAL_FRAMES; i += PRELOAD_BATCH) {
          await loadRange(i, i + PRELOAD_BATCH - 1);
        }
      };
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadRemaining());
      } else {
        setTimeout(loadRemaining, 100);
      }
    });
  }, [loadRange, drawFrame]);

  // ── Scroll handler ──
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        setScrollProgress(progress);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;

          if (loadedRef.current[targetFrame]) {
            drawFrame(targetFrame);
          } else {
            for (let delta = 1; delta < 20; delta++) {
              if (targetFrame - delta >= 0 && loadedRef.current[targetFrame - delta]) {
                drawFrame(targetFrame - delta);
                break;
              }
              if (targetFrame + delta < TOTAL_FRAMES && loadedRef.current[targetFrame + delta]) {
                drawFrame(targetFrame + delta);
                break;
              }
            }
            loadRange(
              Math.max(0, targetFrame - 5),
              Math.min(TOTAL_FRAMES - 1, targetFrame + PRELOAD_BATCH)
            );
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadRange]);

  // ── Window resize ──
  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  /* ═══════════════════════════════════════
     OVERLAY OPACITIES
     1. Hero title               0% – 15%
     2. Tipologías + Gallery     15% – 45%
     3. Tu oficina...            45% – 65%
     4. CTA final                70% – 100%
     ═══════════════════════════════════════ */
  const p = scrollProgress;

  const heroOp     = overlayOpacity(p, 0, 0, 0.07, 0.15);
  const heroY      = p * -150;
  const statsOp    = overlayOpacity(p, 0.12, 0.17, 0.37, 0.45);
  const subtitleOp = overlayOpacity(p, 0.42, 0.47, 0.57, 0.65);
  // CTA never disappears — fadeOut set beyond max scroll
  const ctaOp      = overlayOpacity(p, 0.67, 0.73, 1.0, 2.0);

  // Subtle darkening only for text readability
  const darkenOpacity = p > 0.10
    ? Math.min(0.40, (p - 0.10) * 0.7)
    : 0;

  // Show back-to-top after scrolling past hero
  const showBackToTop = p > 0.15;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className={styles.section} id="hero-scroll">
      <div className={styles.stickyContainer}>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={`${styles.canvas} ${initialReady ? styles.canvasReady : ''}`}
        />

        {/* Subtle darkening for text readability */}
        <div className={styles.darken} style={{ opacity: darkenOpacity }} />

        {!initialReady && (
          <div className={styles.loader}>
            <div className={styles.spinner} />
          </div>
        )}

        {/* ═══ BACK TO TOP ═══ */}
        <button
          className={`${styles.backToTop} ${showBackToTop ? styles.backToTopVisible : ''}`}
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>

        {/* ═══ 1. HERO TITLE ═══ */}
        <div
          className={`${styles.overlay} ${styles.overlayLeft}`}
          style={{ opacity: heroOp, transform: `translateY(${heroY}px)` }}
        >
          <span className={styles.label}>Primavera Life</span>
          <h1 className={styles.heroTitle}>
            Oficinas<br />
            <span className={styles.accent}>Premium</span>
          </h1>
          <p className={styles.bodyText}>
            11 oficinas únicas · Piso 6 · Armenia, Quindío
          </p>
          <div className={styles.scrollHint}>
            <span>Desliza para explorar</span>
            <div className={styles.scrollArrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══ 2. TIPOLOGÍAS + GALLERY ═══ */}
        <div
          className={`${styles.overlay} ${styles.overlayFull}`}
          style={{ opacity: statsOp }}
        >
          <div className={styles.statsSection}>
            <h2 className={styles.statsTitle}>
              Nuestras <span className={styles.accent}>Tipologías</span>
            </h2>

            {/* Stats row — BIGGER */}
            <div className={styles.statsBar}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>11</span>
                <span className={styles.statLabel}>Oficinas Disponibles</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>41.9 – 58.8 m²</span>
                <span className={styles.statLabel}>Metrajes</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>Piso 6</span>
                <span className={styles.statLabel}>Edificio Inteligente</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>Helipuerto</span>
                <span className={styles.statLabel}>Único en Armenia</span>
              </div>
            </div>

            {/* Gallery — Cloudinary, centered layout */}
            <div className={styles.gallery}>
              {galleryImages.map((img, i) => (
                <div key={i} className={styles.gallerySlot}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={styles.galleryImg}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ 3. TU OFICINA EN EL CORAZÓN ═══ */}
        <div
          className={`${styles.overlay} ${styles.overlayLeft}`}
          style={{ opacity: subtitleOp }}
        >
          <span className={styles.labelWithLine}>
            <span className={styles.labelLine} />
            Piso 6 · Edificio Inteligente
          </span>
          <h2 className={styles.sectionTitle}>
            Tu oficina en el<br />
            <span className={styles.accent}>corazón del Quindío</span>
          </h2>
          <p className={styles.bodyText}>
            Armenia, la capital del Quindío, te conecta<br />
            con el Eje Cafetero y toda Colombia.<br />
            Un entorno de negocios privilegiado.
          </p>
        </div>

        {/* ═══ 4. CTA FINAL ═══ */}
        <div
          className={`${styles.overlay} ${styles.overlayCenter}`}
          style={{ opacity: ctaOp }}
        >
          <span className={styles.label}>El Siguiente Paso</span>
          <h2 className={styles.sectionTitle}>
            ¿Listo para tu<br />
            <span className={styles.accent}>oficina premium?</span>
          </h2>
          <a
            href="https://wa.me/573225567048?text=Hola,%20me%20interesa%20una%20oficina%20en%20Primavera%20Life%20Office"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
            id="cta-office-scroll"
          >
            Agendar Visita
          </a>
        </div>

        {/* ═══ FOOTER — Inside scroll, pinned to bottom ═══ */}
        <div
          className={styles.inlineFooter}
          style={{ opacity: ctaOp }}
        >
          <div className={styles.footerInner}>
            <div className={styles.footerCol}>
              <span className={styles.footerLabel}>Primavera Life Office</span>
              <span className={styles.footerText}>Cra. 13 #16N - 79 · Armenia, Quindío</span>
            </div>

            <div className={styles.footerCol}>
              <span className={styles.footerText}>
                <a href="mailto:info@primaveralife.com.co" className={styles.footerLink}>info@primaveralife.com.co</a>
              </span>
            </div>

            {/* Social — hidden on mobile */}
            <div className={`${styles.footerCol} ${styles.footerSocial}`}>
              <a href="https://www.instagram.com/primaveralife_/" target="_blank" rel="noopener noreferrer" className={styles.footerSocialLink} aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.facebook.com/PrimaveraLifeOficial" target="_blank" rel="noopener noreferrer" className={styles.footerSocialLink} aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>

            <div className={styles.footerCol}>
              <span className={styles.footerCredit}>
                Diseñado por{' '}
                <a href="https://www.colombiamalls.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                  <strong>Colombia Malls</strong>
                </a>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ═══ FLOATING WHATSAPP ═══ */}
      <a
        href="https://wa.me/573225567048?text=Hola,%20me%20interesa%20una%20oficina%20en%20Primavera%20Life%20Office"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Contactar por WhatsApp"
        id="whatsapp-float-office"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.743 3.072 9.371L1.06 31.11l5.963-1.966A15.886 15.886 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.314 22.588c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.656-1.216-4.746-1.966-7.802-6.78-8.04-7.094-.228-.314-1.916-2.552-1.916-4.868 0-2.316 1.212-3.454 1.642-3.928.39-.428 1.026-.625 1.634-.625.198 0 .376.01.536.018.43.018.644.042.928.716.354.842 1.216 2.974 1.322 3.19.108.218.214.514.066.814-.138.308-.258.5-.486.77-.228.27-.468.478-.696.77-.208.252-.442.522-.188.952.254.428 1.13 1.866 2.426 3.022 1.668 1.49 3.074 1.952 3.51 2.17.33.166.726.128.99-.156.336-.364.75-.966 1.17-1.56.298-.422.674-.476 1.038-.318.368.148 2.334 1.1 2.734 1.3.4.2.666.3.764.462.096.162.096.932-.294 2.032z"/>
        </svg>
      </a>
    </section>
  );
}
