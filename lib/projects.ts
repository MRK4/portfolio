import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Category } from "@/components/gallery/GalleryCard";
import type { Status } from "@/components/gallery/StatusPill";

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: Category;
  status: Status;
  year: string;
  date: string;
  tags: string[];
  coverGradient: string;
  coverImage?: string;
  stats: Array<{ label: string; value: string }>;
  links?: {
    github?: string;
    live?: string;
    demo?: string;
  };
}

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

function readProjectFile(filename: string): ProjectMeta | null {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  if (!data.title) return null;
  return {
    slug,
    title: data.title,
    subtitle: data.subtitle,
    description: data.description ?? "",
    category: data.category as Category,
    status: data.status as Status,
    year: String(data.year),
    date: data.date ?? "",
    tags: data.tags ?? [],
    coverGradient: data.coverGradient ?? "linear-gradient(145deg, #111316, #1a1c22)",
    coverImage: data.coverImage,
    stats: data.stats ?? [],
    links: data.links,
  };
}

export function getAllProjects(): ProjectMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(readProjectFile)
    .filter((p): p is ProjectMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): ProjectMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readProjectFile(`${slug}.md`);
}

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
