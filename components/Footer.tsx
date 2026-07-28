import { nav, contact } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/50 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <a href="#top" className="font-display font-bold text-lg text-white">
          pen<span className="text-violet-400">a</span>xis
        </a>
        <nav className="flex flex-wrap gap-6 text-xs">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <p className="text-xs">
          © {new Date().getFullYear()} Penaxis. {contact.website}
        </p>
      </div>
    </footer>
  );
}
