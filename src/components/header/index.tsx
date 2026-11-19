import MobileMenu from './mobile-menu';
import { navLinks } from './nav-links';
import styles from './header.module.css';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
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
