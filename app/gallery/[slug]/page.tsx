import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import ProjectArticle from "@/components/project/ProjectArticle";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Clément Poudrée`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { default: MdxContent } = await import(
    `@/content/projects/${slug}.md`
  );

  return (
    <ProjectArticle project={project}>
      <MdxContent />
    </ProjectArticle>
  );
}
