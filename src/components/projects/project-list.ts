import { skills } from '@site/src/components/skills/skill-list';
import type { Skill } from '@site/src/components/skills/skill-list';
import truckSignsImage from '@site/static/img/projects/truck-signs-api.png';
import conduitImage from '@site/static/img/projects/conduit-deployment.png';
import juiceShopImage from '@site/static/img/projects/juice-shop.png';
import minecraftImage from '@site/static/img/projects/minecraft.png';
import vServerImage from '@site/static/img/projects/v-server.png';

function skill(name: string): Skill {
  const found = skills.find((entry) => entry.name.replace('\n', ' ') === name);
  if (!found) {
    throw new Error(`Unknown skill: ${name}`);
  }
  return found;
}

export type Project = {
  name: string;
  title: string;
  chips: Skill[];
  image?: string;
  imageAlt: string;
  description: string;
  documentation?: string;
  github?: string;
};

export const projects: Project[] = [
  {
    name: 'Truck Signs API',
    title: 'Project Truck Signs',
    chips: [skill('Python'), skill('Container'), skill('Yaml'), skill('Shell scripting')],
    image: truckSignsImage,
    imageAlt: 'The Django admin panel of the Truck Signs store',
    description:
      'A Django store backend that had to learn to start itself. The container waits for Postgres, applies the migrations, collects the static files and creates the admin user — because a stack that needs a human on first boot is not a stack, it is a ritual. Every secret arrives from the environment; the image knows nothing about where it runs.',
    documentation: '/docs/projects/truck-signs-api',
    github: 'https://github.com/raawer/dso-truck-signs-api-v2',
  },
  {
    name: 'Conduit Deployment',
    title: 'Project Conduit',
    chips: [
      skill('Container'),
      skill('CI/CD with GitHub Actions'),
      skill('Yaml'),
      skill('Shell scripting'),
    ],
    image: conduitImage,
    imageAlt: 'The Conduit application running in the browser',
    description:
     'Two applications, two images, one workflow. A push to main builds both, ships them to a virtual server and clears away what the previous release left behind. The part I am actually pleased with is the smallest one: the registry login leaves no credentials on the host. A deployment that tidies up after itself is one you dare to run again tomorrow.',
    documentation: '/docs/projects/conduit-deployment',
    github: 'https://github.com/raawer/dso-conduit-container',
  },
  {
    name: 'Juice Shop Master',
    title: 'Project Juice Shop',
    chips: [skill('IT Security'), skill('Container'), skill('Shell scripting')],
    image: juiceShopImage,
    imageAlt: 'The product listing of the OWASP Juice Shop',
    description:
      'Challenge after challenge in a shop that was built to be broken, isolated in my own VM. The lasting lesson was not any single exploit — it was how ordinary the flawed code looks. An ID in a URL. A filter applied in the browser. An error message that says one sentence too much. I read backend code differently since.',
    documentation: '/docs/projects/juice-shop-master',
    github: 'https://github.com/raawer/my-dso-blog/tree/main/docs/projects/juice-shop-master',
  },
  {
    name: 'Minecraft Server',
    title: 'Project Minecraft',
    chips: [skill('Container'), skill('Yaml'), skill('Shell scripting'), skill('IT Security')],
    image: minecraftImage,
    imageAlt: 'The Minecraft server project',
    description:
     'A game server, and a small lesson in supply chain security. I build the image myself instead of trusting a ready-made one: the server JAR comes from the vendor and is verified against a pinned SHA-256, the process runs as a non-root user, and the world outlives the container. Nobody attacks a Minecraft server — which is precisely why it was a good place to practise.',
    documentation: '/docs/projects/minecraft-server',
    github: 'https://github.com/raawer/dso-minecraft-server',
  },
  {
    name: 'V-Server Setup',
    title: 'Project V-Server',
    chips: [skill('Shell scripting'), skill('IT Security')],
    image: vServerImage,
    imageAlt: 'A terminal session on the configured server',
    description:
      'My first own server, and the first time I locked a door behind me. A dedicated ed25519 key pair, password authentication switched off, nginx on a port of my choosing, GitHub reachable over SSH. Every step written down while I took it — because the lasting value of this project is the runbook, not the server.',
    documentation: '/docs/projects/vserver-setup',
    github: 'https://github.com/raawer/v-server-setup',
  },
];
