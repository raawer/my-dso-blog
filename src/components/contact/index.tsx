import styles from './contact.module.css';

export default function Contact(): JSX.Element {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>Contact me</h2>

                <div className={styles.text}>
                    {/* deine Aufzählung */}
                </div>

                <p className={styles.tagline}>Looking forward to hearing from you!</p>

                <ul className={styles.contacts}>
                    {/* Mail und LinkedIn */}
                </ul>
            </div>
        </section>
    );
}
