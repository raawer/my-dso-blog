# DevSecOps Learning Diary

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It documents my learning progress, projects, and work in the field of DevSecOps during my training at Developer Akademie.

## Repository Description

This repository hosts my personal DevSecOps learning diary, blog, and portfolio. It uses Docusaurus to create and manage static documentation and blog content with a custom theme and automated GitHub Pages deployment.

## Table of Contents

- [DevSecOps Learning Diary](#devsecops-learning-diary)
  - [Repository Description](#repository-description)
  - [Table of Contents](#table-of-contents)
  - [Quickstart](#quickstart)
    - [Prerequisites](#prerequisites)
  - [Repository Structure](#repository-structure)
  - [Deployment](#deployment)
  - [Further References](#further-references)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/)

1. Install the dependencies:

   ```bash
   pnpm install
   ```

2. Start the local development server:

   ```bash
   pnpm start
   ```

   This command starts a local development server and opens the website in a browser. Most changes are reflected live without restarting the server.

3. Create a production build:

   ```bash
   pnpm build
   ```

   This command generates the static website in the `build` directory.

## Repository Structure

The repository is organized as follows:

- `blog/`: Contains Markdown files for blog posts.
- `docs/`: Contains Markdown and MDX files for documentation and project pages.
- `src/`: Contains custom React components, CSS, and JavaScript for additional functionality and theming.
- `static/`: Stores static assets such as images and icons.
- `sidebars.ts`: Configures the structure of the documentation sidebars.
- `docusaurus.config.ts`: Contains the main website configuration.
- `build/`: Generated after running `pnpm build`; contains the static website files ready for deployment.

New content can be added as follows:

- Add documentation files to the `docs/` folder.
- Add blog posts to the `blog/` folder.

## Deployment

The website is automatically deployed to GitHub Pages through a preconfigured GitHub Actions workflow whenever a commit is pushed to the main branch.

## Further References

- [Project Documentation](docs/projects/docusaurus-blog.md)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Developer Akademie Docusaurus Template](https://github.com/spmse/dev-blog-template)