import { BookOpen, Building2, FlaskConical, GraduationCap } from "lucide-react";

const cards = [
  [
    "Technological competence",
    "Building globally relevant knowledge, skills and intellectual confidence.",
    "text-cyan",
    FlaskConical,
  ],
  [
    "Research & innovation",
    "Creating an inspiring environment for meaningful research and projects.",
    "text-violet-200",
    BookOpen,
  ],
  [
    "Ethics & attitude",
    "Developing empathy, integrity and a positive approach to challenges.",
    "text-amber",
    GraduationCap,
  ],
];

export default function CollegeSections() {
  return (
    <>
      <section id="about" className="mt-8 grid gap-5 md:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-7">
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            About JSSATEN
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            A technical education landmark in Delhi NCR.
          </h2>
          <p className="mt-4 leading-7 text-slate-400">
            JSS Academy of Technical Education, Noida is located in Sector 62
            and combines disciplined academics, industry connect, research and
            an active campus culture.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 to-cyan/10 p-7">
          <Building2 className="text-cyan" size={24} />
          <p className="mt-8 text-4xl font-semibold">
            28 <span className="text-base text-slate-400">acres</span>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            A connected campus for 4000+ students.
          </p>
        </div>
      </section>
      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <div
          id="research"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/15 to-white/[.06] p-7"
        >
          <p className="text-xs uppercase tracking-[.2em] text-violet-200">
            Research & innovation
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Ideas that move beyond the classroom.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Student projects, innovation spaces, faculty research and
            collaborative challenges help turn curiosity into useful work.
          </p>
        </div>
        <div
          id="campus-life"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan/10 to-white/[.06] p-7"
        >
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Campus life
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            A campus with room to grow.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Clubs, events, hostels, student communities and campus activities
            create a balanced college experience.
          </p>
        </div>
      </section>
      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <div
          id="placements"
          className="rounded-3xl border border-white/10 bg-white/[.06] p-7"
        >
          <p className="text-xs uppercase tracking-[.2em] text-amber">
            Placements
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Prepare for meaningful careers.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Training, industry interaction, internships and career guidance
            support students as they move from campus to workplace.
          </p>
        </div>
        <div
          id="announcements"
          className="rounded-3xl border border-white/10 bg-white/[.06] p-7"
        >
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Announcements
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            What’s happening at JSSATEN.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Admissions updates, events, research opportunities and important
            campus notices will appear here.
          </p>
        </div>
      </section>
      <section
        id="vision"
        className="mt-5 rounded-3xl border border-white/10 bg-white/[.06] p-7"
      >
        <p className="text-xs uppercase tracking-[.2em] text-amber">
          Vision & Mission
        </p>
        <h2 className="mt-3 text-3xl font-semibold">
          Learning that creates responsible problem-solvers.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map(([title, text, color, Icon]) => (
            <div key={title} className="rounded-2xl bg-white/5 p-5">
              <Icon className={color} size={20} />
              <h3 className={`mt-4 font-semibold ${color}`}>{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="academics" className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-7">
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Academics
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Programmes built for the next decade.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Explore undergraduate and postgraduate learning across engineering,
            computer applications, management and emerging technologies.
          </p>
        </div>
        <div
          id="facilities"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan/10 to-violet/15 p-7"
        >
          <p className="text-xs uppercase tracking-[.2em] text-violet-200">
            Campus facilities
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Spaces to learn, build and belong.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Laboratories, library, hostels, innovation spaces, student support
            and campus activities are part of everyday JSSATEN life.
          </p>
        </div>
      </section>
      <section
        id="contact"
        className="mt-5 rounded-3xl border border-white/10 bg-white/[.06] p-7"
      >
        <p className="text-xs uppercase tracking-[.2em] text-cyan">
          Contact & admissions
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          Ready to take the next step?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Use Kashi AI for basic questions, or connect with the JSSATEN
          admissions office for verified deadlines, documents and applications.
        </p>
      </section>
    </>
  );
}
