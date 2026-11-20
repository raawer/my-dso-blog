import MailIcon from '@site/static/img/contact/mail.svg';
import styles from './contact.module.css';

export default function Contact(): JSX.Element {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>Contact me</h2>

                <div className={styles.text}>
                    <p className={styles.textLead}>
                        Feel free to reach out with job offers or opportunities.
                    </p>
                    <ul className={styles.textList}>
                        <li>
                            I am open to roles in Dev(Sec)Ops, development and software
                            testing.
                        </li>
                        <li>
                            I bring long IT experience and a steady hand when deadlines get
                            tight.
                        </li>
                        <li>
                            Remote work with occasional days on site suits me best.
                        </li>
                    </ul>
                </div>

                <p className={styles.tagline}>Looking forward to hearing from you!</p>

                <ul className={styles.contacts}>
                    <li>
                        <a
                            className={styles.contactLink}
                            href="mailto:kontakt@werner-raatz.de">
                            <MailIcon
                                className={styles.contactIcon}
                                aria-hidden
                                focusable="false"
                            />
                            <span>kontakt@werner-raatz.de</span>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
