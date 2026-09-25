import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero({ onNavigate }) {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet/25 via-white/[.06] to-cyan/10 px-6 py-16 md:px-14 md:py-24"
    >
      <div className="absolute -right-16 -top-20 h-72 w-72 animate-float rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative max-w-4xl">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-cyan">
          <Sparkles size={15} /> JSS Academy of Technical Education, Noida
        </p>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
          Shape your future.
          <br />
          <span className="bg-gradient-to-r from-white via-violet-200 to-cyan bg-clip-text text-transparent">
            Build what’s next.
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300">
          A future-ready technical institution empowering students with
          knowledge, skills, research, aptitude and ethical values since 1998.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate("about")}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-ink transition hover:scale-105"
          >
            Explore JSSATEN <ArrowRight size={16} />
          </button>
          <button
            onClick={() => onNavigate("student-portal")}
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
          >
            Open student portal
          </button>
        </div>
      </div>
    </section>
  );
}
