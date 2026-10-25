import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import config from "./astro-paper.config";
import legacyMap from "./src/redirects.json" with { type: "json" };

// Old Squarespace (/mikemuirmaccom/..., /life/...) and Jekyll (/tech|life/YYYY/MM/DD/slug.html)
// URLs. Directory-style paths use Astro redirects; *.html paths must exist as literal files on
// GitHub Pages, so they're written after the build.
const SITE = config.site.url.replace(/\/$/, "");
const legacy = Object.entries(legacyMap as Record<string, string>).map(
  ([from, slug]) => [from, `/posts/${slug}/`] as const
);
const dirRedirects = Object.fromEntries(
  legacy.filter(([from]) => !from.endsWith(".html"))
);
const fileRedirects = legacy.filter(([from]) => from.endsWith(".html"));

const redirectPage = (to: string) =>
  `<!doctype html><meta charset="utf-8"><title>Redirecting…</title>` +
  `<meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="${SITE}${to}">` +
  `<meta name="robots" content="noindex"><a href="${to}">Moved here</a>\n`;

const legacyHtmlRedirects: AstroIntegration = {
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

const LEGACY_PREFIX = /^\/(mikemuirmaccom|life|tech)\//;

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        !LEGACY_PREFIX.test(new URL(page).pathname) &&
        (config.features?.showArchives !== false ||
          !page.endsWith("/archives/")),
    }),
    legacyHtmlRedirects,
  ],
  redirects: {
    ...dirRedirects,
    "/mikemuirmaccom": "/posts/",
    "/life": "/tags/life/",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
