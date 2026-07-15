import TOCInline from '@theme/TOCInline';
import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

# Docusaurus Learning Diary and Project Portfolio

A personal learning diary built with Docusaurus to document my progress throughout the DevSecOps training at Developer Akademie. This static website documents my learning progress, projects, and work in the field of DevSecOps.

## TOC

<TOCInline toc={toc} />

<GithubLinkAdmonition 
    link="https://github.com/raawer/my-dso-blog"
    title="Github Repository" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

Install the dependencies and start the local development server:

```bash
npm install
npm run start
```

The website is then available at http://localhost:3000. Changes to the documentation and configuration are automatically reloaded during development.

To create a production build, run:

```bash
npm run build
```

## Description

The project was created from the Developer Akademie Docusaurus template and personalized in `docusaurus.config.ts`.

The following configuration values were updated:

- The website title and tagline were changed to reflect my personal portfolio and focus on test automation and software quality.
- The default deployment URL was set to my GitHub Pages website: `https://raawer.github.io`.
- A personal profile image was added as the website logo and its alternative text was updated accordingly.
- The navigation bar title, logo, and repository link were adjusted.
- The footer was updated with links to the project overview, my repository, and the original template repository.
- The copyright notice was personalized and extended with the reference to the `developer-akademie-starter`.

## Further References
- [Developer Akademie Docusaurus template](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template)
- [Introduction to Docusaurus](https://docusaurus.io/docs)
