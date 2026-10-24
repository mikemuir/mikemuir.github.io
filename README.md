# MuirSandwich

Personal site and blog for Mike Muir. Built with [Astro](https://astro.build), deployed to GitHub Pages by a GitHub Actions workflow on every push to `main`.

**Before merging this branch:** move `.github/deploy-pages.yml` to `.github/workflows/deploy.yml`, delete
`.github/workflows/jekyll.yml`, and set Settings → Pages → Source to **GitHub Actions**. (The automation
token lacks `workflow` scope, so the workflow file couldn't be pushed into place.)

## Writing a post

Add `src/content/posts/<slug>.md`:

```markdown
---
title: "Post title"
date: 2026-10-24
description: "Optional one-line summary (used for previews/RSS; otherwise auto-excerpted)."
tags: ["homelab", "3dprinting"]
draft: true   # optional; drafts render in `npm run dev` only
---

Body in Markdown. Put images in `src/assets/img/` and reference them as `../../assets/img/name.jpg`
so Astro optimizes them.
```

The URL becomes `/posts/<slug>/`. Posts dated before 2020 get an "archived" banner automatically.

## Local dev

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```

## Legacy URLs

`src/redirects.json` maps old Squarespace (`/mikemuirmaccom/...`, `/life/...`) and Jekyll
(`/tech/YYYY/MM/DD/slug.html`) URLs to the new paths. Keep it until search engines have caught up.

The previous Jekyll site is preserved at tag `jekyll-final` and branch `gh-pages`.
