# MuirSandwich

Personal site for Mike Muir. Built on [AstroPaper](https://github.com/satnaing/astro-paper) v6.1.0
(upstream commit `35cfa7f`) with a Sphere-style **Projects** section added. GitHub Actions deploys it to
GitHub Pages on every push to `main` (`.github/workflows/deploy-pages.yml`).

## Local dev

Needs Node >= 22.23.4 (`.nvmrc` pins 24; fnm picks it up automatically).

```sh
npm ci
npm run dev      # http://localhost:4321  (search only works after a build)
npm run build    # astro check + build + pagefind index -> dist/
```

## Writing a post

`src/content/posts/<slug>.md` becomes `/posts/<slug>/`:

```markdown
---
title: "Post title"
pubDatetime: 2026-10-25T09:00:00-07:00
description: "One-line summary for cards, RSS, and social previews."
tags: ["homelab"]
project: "voron-24" # optional: lists this post under that project's Write-ups
draft: true # optional
---
```

Images go in `src/assets/img/` and are referenced as `@/assets/img/name.jpg`.

## Projects (hidden until the first one exists)

Copy `src/content/projects/_template.md` to `src/content/projects/<slug>.md` and remove `draft: true`.
Cover photos go in `src/assets/projects/`. Until at least one non-draft project exists, the Projects
nav link, the homepage sections, and the `/projects/` page aren't built at all.

Sections and their order, blurbs, and the Etsy link are in `src/site.ts`. A section only appears once it
has a project.

## What differs from upstream AstroPaper

Kept small so upstream updates can be merged:

- New files: `src/site.ts`, `src/utils/projects.ts`, `src/components/Project*.astro`,
  `src/components/ArchivedNotice.astro`, `src/pages/projects/`, `src/content/projects/`.
- Edited: `astro-paper.config.ts`, `astro.config.ts` (legacy redirects), `src/content.config.ts`
  (`archived`, `project`, projects collection), `src/pages/index.astro` (hero, archive, project
  sections), `src/components/Header.astro` (Projects link), `src/pages/posts/[...slug]/index.astro`
  (archived banner), `src/content/pages/about.md`.

## Legacy URLs

`src/redirects.json` maps the old Squarespace (`/mikemuirmaccom/...`, `/life/...`) and Jekyll
(`/tech/YYYY/MM/DD/slug.html`) URLs to `/posts/<slug>/`. The previous Jekyll site is preserved at tag
`jekyll-final` and branch `gh-pages`.
