import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPosts, excerpt } from "../lib/posts";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post),
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
