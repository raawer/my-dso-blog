import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import MobileMenu from './mobile-menu';
import { navLinks } from './nav-links';
import styles from './header.module.css';

export default function Header(): JSX.Element {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ignoreScrollUntil = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const previous = lastScrollY.current;

      // The page is moving because of a jump link, not because the user
      // scrolled, so the direction must not hide the header.
      if (Date.now() < ignoreScrollUntil.current) {
        lastScrollY.current = current;
        return;
      }

      // Ignore the jitter a trackpad produces while the finger rests.
      if (Math.abs(current - previous) < 8) {
        return;
      }

      lastScrollY.current = current;
      setIsHidden(current > previous && current > 160);
    };

    const handleJumpLink = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest('a[href^="#"]')) {
        ignoreScrollUntil.current = Date.now() + 1000;
        setIsHidden(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleJumpLink);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleJumpLink);
    };
  }, []);

  return (
    <header className={clsx(styles.header, isHidden && styles.headerHidden)}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={styles.link}>{label}</a>
            </li>
          ))}
        </ul>
        <MobileMenu />
      </nav>
    </header>
  );
}