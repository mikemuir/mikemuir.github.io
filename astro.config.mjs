import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import redirects from "./src/redirects.json" with { type: "json" };

const SITE = "https://mikemuir.github.io";

// Old Squarespace (/mikemuirmaccom/..., /life/...) and Jekyll (/tech|life/YYYY/MM/DD/slug.html) URLs.
// Directory-style paths go through Astro's redirects; *.html paths must exist as literal files on
// GitHub Pages, so they're written after the build.
const legacy = Object.entries(redirects).map(([from, slug]) => [from, `/posts/${slug}/`]);
const dirRedirects = Object.fromEntries(legacy.filter(([from]) => !from.endsWith(".html")));
const fileRedirects = legacy.filter(([from]) => from.endsWith(".html"));

const redirectPage = (to) =>
  `<!doctype html><meta charset="utf-8"><title>Redirecting…</title>` +
  `<meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="${SITE}${to}">` +
  `<meta name="robots" content="noindex"><a href="${to}">Moved here</a>\n`;

const legacyHtmlRedirects = {
  name: "legacy-html-redirects",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      for (const [from, to] of fileRedirects) {
        const file = fileURLToPath(new URL("." + from, dir));
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, redirectPage(to));
      }
    },
  },
};

export default defineConfig({
  site: SITE,
  trailingSlash: "always",
  integrations: [
    sitemap({ filter: (page) => !/^\/(mikemuirmaccom|life|tech)\//.test(new URL(page).pathname) }),
    legacyHtmlRedirects,
  ],
  redirects: {
    ...dirRedirects,
    "/mikemuirmaccom": "/posts/",
    "/life": "/tags/life/",
  },
  markdown: {
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
});
