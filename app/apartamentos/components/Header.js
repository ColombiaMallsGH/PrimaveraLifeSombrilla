'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Proyecto', href: '#proyecto' },
    { label: 'Tipologías', href: '#tipologias' },
    { label: 'Amenidades', href: '#amenidades' },
    { label: 'Ubicación', href: '#ubicacion' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="header">
      <div className={styles.inner}>
        <a href="#hero" className={styles.logo}>
          <Image
            src="/House_blanco.png"
            alt="Primavera Life House Logo"
            width={160}
            height={50}
            className={styles.logoImage}
            priority
          />
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.me/573225567048?text=Hola%2C%20quiero%20agendar%20una%20visita%20a%20Primavera%20Life%20House"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.navCta}`}
            onClick={() => setMenuOpen(false)}
            id="header-cta"
          >
            Agendar Visita
          </a>
        </nav>

        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú de navegación"
          id="menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
