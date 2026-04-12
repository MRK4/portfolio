import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryClient from "@/components/gallery/GalleryClient";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import { getAllProjects } from "@/lib/projects";

export default function GalleryPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />

      <main style={{ background: "var(--surface)" }}>
        <GalleryHeader />
        <GalleryClient projects={projects} />
      </main>

      <Footer />
    </>
  );
}
