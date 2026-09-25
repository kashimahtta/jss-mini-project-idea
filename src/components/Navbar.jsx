import { Menu, MessageCircle, X } from "lucide-react";
import { navLinks, student } from "../data";

export default function Navbar({
  mobileOpen,
  setMobileOpen,
  onNavigate,
  onOpenKashi,
  onOpenProfile,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan text-xl font-black text-white shadow-glow">
            J
          </span>
          <span>
            <strong className="block tracking-wide">JSSATEN</strong>
            <small className="block text-[10px] uppercase tracking-[.22em] text-slate-500">
              Noida · Est. 1998
            </small>
          </span>
        </button>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map(([label, id]) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="text-sm text-slate-400 transition hover:text-white"
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenKashi}
            className="hidden items-center gap-2 rounded-full border border-cyan/30 px-4 py-2 text-xs font-semibold text-cyan transition hover:bg-cyan/10 sm:flex"
          >
            <MessageCircle size={15} /> Ask Kashi AI
          </button>
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 rounded-full p-1 transition hover:bg-white/10"
            aria-label={`Open ${student.name}'s private profile`}
          >
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{student.name}</p>
              <p className="text-[10px] text-slate-500">Private profile</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber to-orange-400 font-bold text-ink">
              K
            </div>
          </button>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="border-t border-white/10 px-5 py-4 lg:hidden">
          {navLinks.map(([label, id]) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className="block w-full py-3 text-left text-sm text-slate-300"
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
