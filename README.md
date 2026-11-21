# My Project Portfolio

This repository holds my personal portfolio and learning diary from the DevSecOps
training at Developer Akademie: a hand-built React landing page following a Figma
design, one report per training project, and a knowledge base written along the way.
It is a [Docusaurus](https://docusaurus.io/) site, deployed automatically to GitHub
Pages at <https://raawer.github.io/my-dso-blog/>; every tracked top-level path is
listed under [Repository Contents](#repository-contents).

## Table of Contents

- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [How to Start](#how-to-start)
- [Usage](#usage)
  - [Building the Site](#building-the-site)
  - [Environment Variables](#environment-variables)
  - [Site Metadata and Navigation](#site-metadata-and-navigation)
  - [Design Tokens and Fonts](#design-tokens-and-fonts)
  - [Changing the Landing Page](#changing-the-landing-page)
  - [Adding Content](#adding-content)
- [Deployment](#deployment)
  - [GitHub Pages](#github-pages)
  - [Deploying by Hand](#deploying-by-hand)
  - [NGINX in a Container](#nginx-in-a-container)
- [Repository Contents](#repository-contents)
- [Further References](#further-references)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer; `.nvmrc` pins 26, which is what CI uses
- npm, which ships with Node.js
- Git

With [nvm](https://github.com/nvm-sh/nvm) installed, `nvm use` picks the right version
from `.nvmrc`.

### How to Start

```bash
git clone https://github.com/raawer/my-dso-blog.git
cd my-dso-blog
npm ci
cp example.env .env
npm start
```

The site opens at <http://localhost:3000/my-dso-blog/>. Note the path: the site is
served under `/my-dso-blog/`, not at the root, because that is the `baseUrl` the
GitHub Pages URL requires. Changes to components, styles and Markdown are reflected
without restarting.

Stop the server with `Ctrl+C`.

## Usage

### Building the Site

```bash
npm run build
```

This writes the complete static site to `build/`. Everything needed to serve it is in
that folder — HTML, CSS, JavaScript, images and fonts.

The build fails on a broken internal link, because `onBrokenLinks` is set to `'throw'`
in `docusaurus.config.ts`. Relax it to `'warn'` if a dead link should only be reported.
Note that it can only check links that are actually rendered into the output.

The build does **not** check types; `npm run typecheck` does that separately, and CI
runs it before building. To look at the finished build the way a web server serves it,
use `npm run serve` — the production CSS is minified, so it is not byte-for-byte what
`npm start` delivers.

### Environment Variables

`docusaurus.config.ts` reads six variables. Copy `example.env` to `.env` and adjust
them; `.env` is ignored by Git, `example.env` is the tracked template and holds no
secrets.

| Variable | Default | Effect |
| --- | --- | --- |
| `DEPLOYMENT_URL` | `https://raawer.github.io` | Origin of the deployed site, used for canonical and Open Graph URLs |
| `BASE_URL` | `/my-dso-blog/` | Path the site is served under. Set to `/` when serving at a domain root |
| `GITHUB_ORG` | `raawer` | GitHub user or organisation, used by `npm run deploy` |
| `GITHUB_PROJECT` | `my-dso-blog` | Repository name, used by `npm run deploy` |
| `DEPLOYMENT_BRANCH` | `main` | Branch `npm run deploy` pushes to |
| `GIT_REPOSITORY_URL` | `https://github.com/raawer/my-dso-blog` | Target of the "Edit this page" links |

To host the site under a different account, change `DEPLOYMENT_URL`, `BASE_URL`,
`GITHUB_ORG` and `GITHUB_PROJECT` together — they have to agree, or every asset
resolves to a path that does not exist.

A seventh variable, `BLOG_ENABLED`, is not part of `example.env`. The blog section is
built only when it is set to `true`, which is why the blog does not appear in the
navigation.

### Site Metadata and Navigation

In `docusaurus.config.ts`:

- `title` and `tagline` — the site name and the subtitle used in metadata
- `favicon` and `navbar.logo` — the browser icon and the logo beside the navbar title
- `navbar.items` and `footer` — the theme's own navigation, visible on the
  documentation pages and hidden on the landing page
- `svgr.svgrConfig.svgoConfig` — keeps `cleanupIds: false`. Docusaurus inlines every
  imported SVG into the same page while SVGO renames ids per file, so without this
  two icons can end up sharing an id and one of them renders empty. A custom
  `svgoConfig` *replaces* the default, which is why `removeTitle: false` and
  `removeViewBox: false` are repeated there

The landing page has its own navigation in `src/components/header/nav-links.ts`, one
array of `{ href, label }`. An entry added there appears in both the desktop bar and
the mobile overlay, provided a section on the page carries the matching `id`.

### Design Tokens and Fonts

All colours are custom properties on `:root` in `src/css/custom.css`. Changing one
there changes it everywhere; no component hardcodes a colour.

| Token | Value |
| --- | --- |
| `--color-dark-blue` | `#262e34` |
| `--color-vibrant-blue` | `#266ad9` |
| `--color-white` | `#ffffff` |
| `--color-bright-blue` | `#91c9f3` |
| `--color-sky-blue` | `#79b8ff` |
| `--color-muted-blue` | `#738398` |
| `--color-slate-blue` | `#2f4563` |
| `--color-light-blue` | `#5696ff` |

The same file declares Quicksand in four weights through `@font-face`, pointing at the
`.woff2` files in `src/css/fonts/` by relative path so that `baseUrl` is applied. The
font is self-hosted rather than loaded from Google Fonts, which would send every
visitor's IP address to a third party.

Two further rules there hide the theme's navbar and footer on the landing page only,
both scoped with `body:has(.homepage)`, and smooth anchor scrolling is enabled behind
a `prefers-reduced-motion: no-preference` query.

### Changing the Landing Page

`src/pages/index.tsx` assembles the six sections. Deleting an element there removes
that section; reordering the elements reorders the page.

Each section owns a folder under `src/components/`, with the component in `index.tsx`
and its styles in a matching `*.module.css`:

| Folder | What it renders |
| --- | --- |
| `header/` | Desktop navigation and, below 997px, a hamburger with a full-screen overlay |
| `hero/` | "About me" with the portrait and the contact button |
| `skills/` | Nine skills as a grid, a swipeable carousel with a page indicator on mobile |
| `projects/` | Project highlights: a selectable list on desktop, numbered cards on mobile |
| `contact/` | Contact details behind a `mailto:` link |
| `footer/` | Back-to-top link, copyright and the legal links |

Two of them read their content from a data file instead of from markup:
`skills/skill-list.ts` and `projects/project-list.ts`. Adding a skill or a project is
a matter of adding an entry there; the markup adapts.

### Adding Content

| What | Where |
| --- | --- |
| A project report | `docs/projects/<name>.md`. It appears in the overview automatically, which renders a `<DocCardList/>` |
| A knowledge base note | `docs/knowledge-base/<topic>/<nn>-<name>.md`. The numeric prefix sets the order |
| A standalone page | `src/pages/<name>.md` or `.tsx` becomes the route `/<name>` |
| A blog post | `blog/YYYY-MM-DD-<name>.md`, with `BLOG_ENABLED=true` |
| A sidebar category | A `_category_.yaml` beside the files, with `label` and optionally `position` |

The sidebar is generated from the folder structure — `sidebars.ts` holds a single
`autogenerated` entry — so new files need no registration.

## Deployment

### GitHub Pages

Every push to `main` triggers `.github/workflows/main.yml`, which calls `deploy.yaml`.
That workflow checks out the repository, installs with `npm ci`, runs
`npm run typecheck`, copies `example.env` to `.env`, builds, and uploads `build/` as a
Pages artifact. The deploy job runs only on the default branch, so a pull request is
built but not published.

No secrets are configured; the workflow uses the `GITHUB_TOKEN` that Actions provides.
In a fork, set *Settings → Pages → Build and deployment → Source* to GitHub Actions.

### Deploying by Hand

```bash
cp example.env .env
GIT_USER=<your-github-username> npm run deploy
```

This builds locally and pushes the result to the branch named in `DEPLOYMENT_BRANCH`.

### NGINX in a Container

The `Dockerfile` builds the site and serves it from NGINX, which is the route to take
when hosting on your own server rather than on Pages:

```bash
docker build -t my-dso-blog \
  --build-arg DEPLOYMENT_URL=https://example.com \
  --build-arg GITHUB_ORG=<org> \
  --build-arg GITHUB_PROJECT=<project> .
docker run --rm -p 8080:80 my-dso-blog
```

The image is built in two stages: `node:20.16-alpine` produces `build/`, and only that
folder is copied into the `nginx` image, so no build toolchain ends up in the running
container. When serving at a domain root rather than under a path, set `BASE_URL=/`.

`docs/guides/deploy-docusaurus-with-docker-and-nginx.md` walks through the setup step
by step.

## Repository Contents

| Path | Purpose |
| --- | --- |
| `src/` | The landing page and its six section components, the global stylesheet with the design tokens, the self-hosted Quicksand files, and the legal pages |
| `docs/` | The documentation served by the site: `projects/` holds one report per training project, `knowledge-base/` the notes taken during the course, `guides/` the how-to pages |
| `static/` | Assets copied to the site root: the portrait, the navbar avatar, the project screenshots, the skill and chip icons, the favicon, and `.nojekyll`, which stops GitHub Pages from running Jekyll over the output |
| `blog/` | Example posts from the course template. The blog is built only with `BLOG_ENABLED=true` and is therefore not part of the published site |
| `.github/workflows/` | The CI workflows, described under [Deployment](#deployment) |
| `docusaurus.config.ts` | Site configuration: metadata, presets, theme and SVGR settings |
| `sidebars.ts` | Sidebar definition; one `autogenerated` entry mirroring the `docs/` structure |
| `package.json` | Dependencies and the npm scripts used above |
| `package-lock.json` | The resolved dependency tree, committed so `npm ci` reproduces it exactly |
| `tsconfig.json` | TypeScript configuration, extending `@docusaurus/tsconfig` |
| `babel.config.js` | The Babel preset Docusaurus requires |
| `example.env` | Template for `.env`, listing every deployment variable. Holds no secrets and is the only `*.env` file tracked |
| `.nvmrc` | Node version, read by `nvm use` |
| `Dockerfile` | Two-stage build that serves the site from NGINX |
| `.dockerignore` | Keeps `node_modules/`, the git history, the workflows and local caches out of the build context |
| `.gitignore` | Excludes `node_modules/`, `build/`, `.docusaurus/` and every `*.env` except `example.env` |
| `.vscode/` | One setting, pointing the editor at the project's own TypeScript |
| `LICENSE` | MIT licence |
| `PORTFOLIO_CHECKLIST.md` | The requirements this project is graded against, with its state |
| `JUICE_SHOP_CHECKLIST.md` | Working checklist of the earlier Juice Shop Master project, referenced from its report under `docs/projects/juice-shop-master/` |
| `README.md` | This file |

`build/` and `.docusaurus/` are produced by the build and are not tracked.

## Further References

- [Project report on this repository](docs/projects/docusaurus-blog.md)
- [Docusaurus documentation](https://docusaurus.io/docs)
- [Developer Akademie Docusaurus template](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template)
