import Link from '@docusaurus/Link';
import ArrowIcon from '@site/static/img/footer/arrow.svg';
import styles from './footer.module.css';


export default function Footer(): JSX.Element {
    return (
        <footer className={styles.footer}>
            <a href="#top" className={styles.toTop} aria-label="Back to top">
                <ArrowIcon className={styles.toTopIcon} aria-hidden focusable="false" />
            </a>

            <div className={styles.content}>
                <p className={styles.copyright}>© Werner Raatz 2026</p>
                <ul className={styles.links}>
                    <li>
                        <Link className={styles.link} to="/impressum">Legal notice</Link>
                    </li>
                    <li>
                        <Link className={styles.link} to="/datenschutz">Privacy</Link>
                    </li>

                </ul>
            </div>
        </footer>
    );
}
