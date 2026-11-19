import { skills } from './skill-list';
import styles from './skills.module.css';

export default function Skills(): JSX.Element {
  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>My skills</h2>
        <ul className={styles.list}>
          {skills.map(({ name, Icon, details }) => (
            <li key={name} className={styles.card} tabIndex={0}>
              <div className={styles.faces}>
                <div className={styles.front}>
                  <Icon className={styles.icon} aria-hidden focusable="false" />
                  <span className={styles.name}>{name}</span>
                </div>
                <div className={styles.back}>
                  <h3 className={styles.backHeading}>How I used this skill</h3>
                  <ul className={styles.details}>
                    {details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
