'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Left — Credit */}
        <p className={styles.credit}>
          Hecho por{' '}
          <a
            href="https://www.colombiamalls.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            Colombia Malls
          </a>
        </p>

        {/* Right — Social (hidden on mobile) */}
        <div className={styles.social}>
          <a
            href="https://www.instagram.com/primaveralife_/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/PrimaveraLifeOficial"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
