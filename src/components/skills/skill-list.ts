import type { ComponentType, SVGProps } from 'react';

import HtmlIcon from '@site/static/img/skills/html.svg';
import CssIcon from '@site/static/img/skills/css.svg';
import DocusaurusIcon from '@site/static/img/skills/docusaurus.svg';
import PythonIcon from '@site/static/img/skills/python.svg';
import ShellIcon from '@site/static/img/skills/shell.svg';
import YamlIcon from '@site/static/img/skills/yaml.svg';
import DockerIcon from '@site/static/img/skills/docker.svg';
import ActionsIcon from '@site/static/img/skills/github-actions.svg';
import SecurityIcon from '@site/static/img/skills/security.svg';
import HtmlChip from '@site/static/img/chips/html.svg';
import CssChip from '@site/static/img/chips/css.svg';
import DocusaurusChip from '@site/static/img/chips/docusaurus.svg';
import PythonChip from '@site/static/img/chips/python.svg';
import ShellChip from '@site/static/img/chips/shell.svg';
import YamlChip from '@site/static/img/chips/yaml.svg';
import DockerChip from '@site/static/img/chips/docker.svg';
import SecurityChip from '@site/static/img/chips/security.svg';


export type Skill = {
    name: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    ChipIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    details: string[];
};

export const skills: Skill[] = [
    {
        name: 'HTML',
        Icon: HtmlIcon,
        ChipIcon: HtmlChip,
        details: [
            'Semantic structure: header, nav, main, section',
            'Accessible menus with aria attributes and focus states',
            'Markup written by hand, without a UI framework',
        ],
    },
    {
        name: 'CSS',
        Icon: CssIcon,
        ChipIcon: CssChip,
        details: [
            'Responsive layouts with Grid and Flexbox',
            'Design tokens as CSS custom properties',
            'Fluid typography with clamp() instead of breakpoints',
            'Component-scoped styles with CSS Modules',
        ],
    },
    {
        name: 'Static site\ngenerator',
        Icon: DocusaurusIcon,
        ChipIcon: DocusaurusChip,
        details: [
            'Portfolio and learning diary built with Docusaurus',
            'Own React components beside the generated docs pages',
            'Dependencies kept current and free of known advisories',
            'Static builds deployed to GitHub Pages',
        ],
    },
    {
        name: 'Python',
        Icon: PythonIcon,
        ChipIcon: PythonChip,
        details: [
            'Command line tools built with argparse',
            'HTTP clients: methods, status codes, authentication',
            'Sockets, TCP and threads for network scanning',
            'Metadata analysis and cleaning through subprocess',
        ],
    },
    {
        name: 'Shell\nscripting',
        Icon: ShellIcon,
        ChipIcon: ShellChip,
        details: [
            'Container entrypoints with error handling and startup checks',
            'Server setup: SSH keys, nginx, git over SSH',
            'Everyday automation with pipes, grep and find',
        ],
    },
    {
        name: 'Yaml',
        Icon: YamlIcon,
        ChipIcon: YamlChip,
        details: [
            'GitHub Actions workflows for build, test and deployment',
            'Docker Compose stacks for multi-service applications',
            'Secrets referenced as variables, never written into the file',
            'Reviewing workflow steps that can fail silently',
        ],
    },
    {
        name: 'Container',
        Icon: DockerIcon,
        ChipIcon: DockerChip,
        details: [
            'Multi-container stacks with Docker Compose and PostgreSQL',
            'Application images with their own entrypoint',
            'Configuration through environment variables, never baked in',
            'Cleaning up orphaned containers and images after deployment',
        ],
    },
    {
        name: 'CI/CD with\nGitHub Actions',
        Icon: ActionsIcon,
        details: [
            'Build, test and deploy pipelines across several projects',
            'Deployment to a virtual server over SSH from a workflow',
            'Quality gates that stop a broken build before it ships',
            'Pull requests build, only the main branch deploys',
        ],
    },
    {
        name: 'IT Security',
        Icon: SecurityIcon,
        ChipIcon: SecurityChip,
        details: [
            'OWASP Top 10 hands-on in OWASP Juice Shop',
            'Key-only SSH after disabling password authentication',
            'Credentials and secrets kept out of every repository',
            'Assessing dependency advisories by actual exposure',
        ],
    },
];
