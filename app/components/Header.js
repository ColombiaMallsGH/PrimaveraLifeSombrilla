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
    { label: 'Mall', href: '#mall' },
    { label: 'House', href: '#houses' },
    { label: 'Office', href: '#oficinas' },
    { label: 'Helipuerto', href: '#helipuerto' },
    { label: 'Parking', href: '#parking' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="header">
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <Image 
            src="https://res.cloudinary.com/difxixf4j/image/upload/q_auto/f_auto/v1777401613/LogosPrimaveraLife_Mesa_de_trabajo_1_copia_qn2jnb.png" 
            alt="Primavera Life Logo" 
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
            href="https://wa.me/573117457906?text=Hola,%20quiero%20saber%20m%C3%A1s%20de%20Primavera%20Life" 
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-primary ${styles.navCta}`} 
            onClick={() => setMenuOpen(false)}
          >
            Contáctanos
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
