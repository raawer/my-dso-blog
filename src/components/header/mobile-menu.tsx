import { useState } from 'react';
import { navLinks } from './nav-links';
import styles from './mobile-menu.module.css';

export default function MobileMenu(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}>
        <span className={styles.burgerBar} />
        <span className={styles.burgerBar} />
        <span className={styles.burgerBar} />
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.close}
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}>
            ×
          </button>
          <ul className={styles.list}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className={styles.link} onClick={() => setIsOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
