import styles from './hero.module.css';

export default function Hero(): JSX.Element {
  return (
    <section className={styles.hero}>
      <p className={styles.greeting}>Hey there. 👋 I am</p>
      <h1 className={styles.title}>Werner Raatz</h1>
      <p className={styles.subtitle}>DevSecOps Engineer and Software Tester</p>
      <p className={styles.description}>I've spent over 20 years in IT — from software development to consulting and test automation. Today I'm focused on DevSecOps, bringing a tester's instinct for where systems break to building secure software.</p>
      <a href="#contact" className={styles.contactButton}>Contact me</a>
    </section>
  );
}
