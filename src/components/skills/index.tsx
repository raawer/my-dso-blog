import type { ComponentType, SVGProps } from 'react';
import styles from './skills.module.css';

import HtmlIcon from '@site/static/img/skills/html.svg';
import CssIcon from '@site/static/img/skills/css.svg';
import DocusaurusIcon from '@site/static/img/skills/docusaurus.svg';
import PythonIcon from '@site/static/img/skills/python.svg';
import ShellIcon from '@site/static/img/skills/shell.svg';
import YamlIcon from '@site/static/img/skills/yaml.svg';
import DockerIcon from '@site/static/img/skills/docker.svg';
import ActionsIcon from '@site/static/img/skills/github-actions.svg';
import SecurityIcon from '@site/static/img/skills/security.svg';

type Skill = {
    name: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const skills: Skill[] = [
    { name: 'HTML', Icon: HtmlIcon },
    { name: 'CSS', Icon: CssIcon },
    { name: 'Static site\ngenerator', Icon: DocusaurusIcon },
    { name: 'Python', Icon: PythonIcon },
    { name: 'Shell\nscripting', Icon: ShellIcon },
    { name: 'Yaml', Icon: YamlIcon },
    { name: 'Container', Icon: DockerIcon },
    { name: 'CI/CD with\nGitHub Actions', Icon: ActionsIcon },
    { name: 'IT Security', Icon: SecurityIcon },
];

export default function Skills(): JSX.Element {
    return (
        <section id="skills" className={styles.skills}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>My skills</h2>
                <ul className={styles.list}>
                    {skills.map(({ name, Icon }) => (
                        <li key={name} className={styles.card}>
                            <Icon className={styles.icon} aria-hidden focusable="false" />
                            <span className={styles.name}>{name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
