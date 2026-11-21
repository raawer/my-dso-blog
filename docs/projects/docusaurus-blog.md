import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

# Docusaurus Learning Diary and Project Portfolio

The site you are reading. A Docusaurus project that carries three things at once: a
hand-built portfolio landing page following a Figma design, one report per project
completed during the training, and the knowledge base written along the way. It is
deployed to GitHub Pages by a GitHub Actions workflow on every push to `main`.

## Table of Contents

- [Quickstart](#quickstart)
- [Description](#description)
- [Key Takeaways](#key-takeaways)
- [Further References](#further-references)

<GithubLinkAdmonition
    link="https://github.com/raawer/my-dso-blog"
    title="Github Repository"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

```bash
git clone https://github.com/raawer/my-dso-blog.git
cd my-dso-blog
npm ci
cp example.env .env
npm start
```

The site opens at `http://localhost:3000/my-dso-blog/` — under that path, not at the
root, because it is the `baseUrl` GitHub Pages requires. The repository's README
documents the build, the configuration and all three deployment routes in detail.

## Description

### A landing page instead of the default one

Docusaurus ships a home page; this project replaces it. `src/pages/index.tsx`
assembles six sections — header, hero, skills, project highlights, contact and footer
— each a React component in its own folder with a CSS Module beside it. The theme's
own navbar and footer are hidden on that page only, scoped with
`body:has(.homepage)`, so the documentation pages keep them.

The design came from Figma as a set of frames and measurements. Translating it was
the actual work, and it was rarely a matter of copying numbers.

### Where Figma and the browser disagree

Figma has no grid. To align the right-hand column of two rows in the contact section,
the design used a hand-tuned gap of 280px in one row and 50px in the other. Copied
literally, that alignment breaks the moment a heading changes length. One
`grid-template-columns: 1fr auto` replaces both numbers and keeps holding.

Other places where the design could not be taken at face value: a section's padding
of `0` works on a Figma canvas, where every section sits on the same background, but
not in a browser, where padding lives inside the section's own colour and text ends
up touching the edge. A `line-height` of 1.2 on a single-line heading reads as extra
space above it, because the browser splits the leading evenly above and below the
glyphs.

### Responsiveness without JavaScript

The breakpoint is 996px. The skills grid turns into a swipeable carousel with
`grid-auto-flow: column` and `scroll-snap-type: x mandatory`, which needs no
JavaScript at all — only the page indicator keeps state. The project highlights
switch from a selectable list to numbered cards, with CSS counters doing the
numbering. The back-to-top control is an
anchor rather than a button with `scrollTo`, so it inherits the existing
`prefers-reduced-motion` guard instead of having to re-check the setting in code.

### Decisions that were not about layout

The font is self-hosted. Loading Quicksand from Google Fonts would send every
visitor's IP address to a third party, which a German court ruled on in 2022. The
contact section is a `mailto:` link, not a form: GitHub Pages serves static files, and
any form service would mean processing visitor data on someone else's infrastructure.
The build loads no external resource at all, which was verified against the output
rather than assumed — and it is what makes the privacy statement short.

A legal notice and a privacy statement were added as separate German pages, linked
from the footer. The design foresaw only one legal link; the second was added because
the privacy information has to be easily accessible.

## Key Takeaways

- **The development server and the production build are not the same site.** The
  deployed page showed every project card stacked while `npm start` looked correct.
  The minifier merges rules with identical declarations and had moved
  `.cardHidden{display:none}` ahead of `.card{display:flex}`. Both had the same
  specificity, so the later rule won. `npm run serve` now runs before every push.
- **Never rely on source order between two equal-specificity selectors.** Order does
  not survive an optimisation step; specificity does, because it is part of the
  language rather than an accident of the file.
- **Figma values are a claim, not a result.** Between the design and the browser sit
  line boxes, background colours and font metrics that no design tool accounts for.
  Every number was checked on screen, and several were wrong.
- **A check that cannot fail is not a check.** The template's `create-pr.yaml` calls
  `curl` without `--fail`, so the job reports success while GitHub answers 403. It was
  green for weeks without ever having worked.
- **Write `:focus-visible` wherever you write `:hover`.** Hover reaches whoever has a
  mouse; the person navigating by keyboard is the one who needs the feedback most.

## Further References

- [Repository README](https://github.com/raawer/my-dso-blog#readme)
- [Developer Akademie Docusaurus template](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template)
- [Docusaurus documentation](https://docusaurus.io/docs)
