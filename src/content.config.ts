import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
import config from "@/config";
import { PROJECT_SECTION_IDS } from "@/site";

export const BLOG_PATH = "src/content/posts";

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.site.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      /** Pre-2020 Squarespace-era post; shows an "out of date" banner. */
      archived: z.boolean().optional(),
      /** Optional project this post belongs to; listed on the project page. */
      project: reference("projects").optional(),
    }),
});

export const PROJECTS_PATH = "src/content/projects";

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `./${PROJECTS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      section: z.enum(PROJECT_SECTION_IDS),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      status: z.enum(["active", "done", "shelved"]).default("active"),
      featured: z.boolean().optional(),
      startDate: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().optional(),
  }),
});

export const collections = { posts, projects, pages };
