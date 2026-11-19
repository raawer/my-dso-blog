import { useState } from 'react';
import { projects } from './project-list';
import styles from './projects.module.css';
import Link from '@docusaurus/Link';

export default function Projects(): JSX.Element {
    const [selected, setSelected] = useState(0);
    const project = projects[selected];

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>My project highlights</h2>

                <div className={styles.content}>
                    <div className={styles.list}>
                        <ol className={styles.names}>
                            {projects.map(({ name }, index) => (
                                <li
                                    key={name}
                                    className={index === selected ? styles.itemSelected : styles.item}>
                                    <button
                                        type="button"
                                        className={styles.name}
                                        aria-current={index === selected ? 'true' : undefined}
                                        onClick={() => setSelected(index)}>
                                        {name}
                                    </button>
                                </li>
                            ))}
                        </ol>
                        <Link className={styles.more} to="/docs/projects/overview">
                            <span aria-hidden="true">↳</span> see more projects
                        </Link>
                    </div>

                    <article className={styles.card}>
                        <header className={styles.cardHeader}>
                            <h3 className={styles.title}>{project.title}</h3>
                            <ul className={styles.chips}>
                                {project.chips.map((chip) => {
                                    const ChipIcon = chip.ChipIcon ?? chip.Icon;
                                    return (
                                        <li key={chip.name} className={styles.chip}>
                                            <ChipIcon className={styles.chipIcon} aria-hidden focusable="false" />
                                            <span>{chip.name}</span>
                                        </li>
                                    );
                                })}

                            </ul>
                        </header>

                        <div className={styles.cardBody}>
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.imageAlt}
                                    className={styles.image}
                                />
                            )}
                            <div className={styles.description}>
                                <p className={styles.text}>{project.description}</p>
                                <div className={styles.buttons}>
                                    {project.documentation && (
                                        <Link className={styles.buttonPrimary} to={project.documentation}>
                                            Documentation
                                        </Link>
                                    )}
                                    {project.github && (
                                        <a className={styles.buttonSecondary} href={project.github}>
                                            GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
