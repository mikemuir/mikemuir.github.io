import { getCollection, type CollectionEntry } from "astro:content";
import { PROJECT_SECTIONS } from "@/site";

export type Project = CollectionEntry<"projects">;

/** Published projects, newest first. Drafts show only in `npm run dev`. */
export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection(
    "projects",
    ({ data }) => import.meta.env.DEV || !data.draft
  );
  return projects.sort(
    (a, b) => b.data.startDate.valueOf() - a.data.startDate.valueOf()
  );
}

/** Sections that have at least one published project, in configured order. */
export async function getProjectSections() {
  const projects = await getProjects();
  return PROJECT_SECTIONS.map(section => ({
    ...section,
    projects: projects.filter(p => p.data.section === section.id),
  })).filter(section => section.projects.length > 0);
}

export const projectUrl = (id: string) => `/projects/${id}/`;
