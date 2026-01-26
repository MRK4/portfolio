"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-800 py-6 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {currentYear} Clément Poudrée. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500">
            Built with ❤️ and Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
