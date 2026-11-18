import styles from './header.module.css';

export default function Header(): JSX.Element {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    <li><a href="#about" className={styles.link}>About me</a></li>
                    <li><a href="#skills" className={styles.link}>My skills</a></li>
                    <li><a href="#projects" className={styles.link}>My projects</a></li>
                    <li><a href="#contact" className={styles.link}>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
