import { useRef, useState } from 'react';
import { skills } from './skill-list';
import styles from './skills.module.css';

const PER_PAGE = 3;
const pageCount = Math.ceil(skills.length / PER_PAGE);

function getStep(list: HTMLUListElement): number {
    const first = list.children[0] as HTMLElement | undefined;
    const next = list.children[PER_PAGE] as HTMLElement | undefined;
    return first && next ? next.offsetLeft - first.offsetLeft : 0;
}

export default function Skills(): JSX.Element {
    const listRef = useRef<HTMLUListElement>(null);
    const [page, setPage] = useState(0);

    function handleScroll() {
        const list = listRef.current;
        if (!list) {
            return;
        }
        const step = getStep(list);
        if (step > 0) {
            setPage(Math.round(list.scrollLeft / step));
        }
    }

    function goToPage(index: number) {
        const list = listRef.current;
        if (!list) {
            return;
        }
        list.scrollTo({ left: index * getStep(list), behavior: 'smooth' });
    }

    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>My skills</h2>
                <ul ref={listRef} className={styles.list} onScroll={handleScroll}>
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
                <div className={styles.dots}>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={index === page ? styles.dotActive : styles.dot}
                            aria-label={`Go to page ${index + 1} of ${pageCount}`}
                            aria-current={index === page ? 'true' : undefined}
                            onClick={() => goToPage(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
