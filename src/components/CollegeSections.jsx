import {
  ArrowUpRight,
  BookOpen,
  Building2,
  FlaskConical,
  GraduationCap,
  Utensils,
} from "lucide-react";

const campusFacts = [
  "Established in 1998",
  "28-acre published campus",
  "5 academic blocks",
  "9 undergraduate engineering disciplines",
  "Affiliated with AKTU",
  "Located in Sector 62, Noida",
];

const facilities = [
  {
    title: "Campus & main entrance",
    category: "A place to belong",
    description:
      "Explore the campus setting and welcoming main entrance at JSSATEN, Sector 62, Noida.",
    image: "/main%20gate.jpg",
    alt: "Main entrance gate at JSS Academy of Technical Education, Noida",
    icon: Building2,
  },
  {
    title: "Classrooms",
    category: "Learn together",
    description:
      "Classroom spaces support lectures, collaborative learning and everyday academic life.",
    image: "/classrooms.jpg",
    alt: "Students attending a class at JSSATEN",
    icon: GraduationCap,
  },
  {
    title: "Engineering laboratories",
    category: "Build and experiment",
    description:
      "Department laboratories give students room for practical learning, experiments and projects.",
    image: "/lab.jpg",
    alt: "Students working in an engineering laboratory",
    icon: FlaskConical,
  },
  {
    title: "Auditorium",
    category: "Gather and share ideas",
    description:
      "An indoor venue for academic gatherings, talks, cultural programmes and campus events.",
    image: "/auditorium.jpg",
    alt: "Auditorium seating and stage",
    icon: Building2,
  },
  {
    title: "Hostel accommodation",
    category: "Campus living",
    description:
      "Hostel facilities offer residential accommodation for students. Availability and current rules should be confirmed with the college.",
    image: "/hostel%20rooms.jpg",
    alt: "Student hostel room",
    icon: Building2,
  },
  {
    title: "Cafeteria",
    category: "Take a break",
    description:
      "A campus space for meals and breaks between classes. Menu and timings may change.",
    image: "/cafeterial.jpg",
    alt: "Campus cafeteria building",
    icon: Utensils,
  },
];

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
      <section
        aria-label="JSSATEN campus facts"
        className="rolling-facts mt-8 overflow-hidden rounded-2xl border border-cyan/15 bg-cyan/[.04] py-4"
      >
        <div className="rolling-track flex w-max items-center gap-4">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-4 pr-4"
            >
              {campusFacts.map((fact) => (
                <span
                  key={fact}
                  className="flex items-center gap-4 whitespace-nowrap text-xs font-medium uppercase tracking-[.12em] text-slate-300 sm:text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                  {fact}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
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
      <section id="academics" className="mt-5">
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-7">
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Academics
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Programmes built for the next decade.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Explore undergraduate and postgraduate learning across engineering,
            computer applications, management and emerging technologies.
            Programme availability and specialisations can vary by admission
            year.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Computer Science",
              "Artificial Intelligence",
              "Data Science",
              "Information Technology",
              "Electronics & Communication",
              "Electrical Engineering",
              "Mechanical Engineering",
              "Civil Engineering",
              "MCA · MBA · M.Tech",
            ].map((programme) => (
              <span
                key={programme}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan/40 hover:bg-cyan/10 hover:text-white"
              >
                {programme}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section
        id="facilities"
        className="mt-5 scroll-mt-24 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan/[.07] via-white/[.03] to-violet/[.08] p-5 sm:p-8"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-violet-200">
              Campus facilities
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Take a look around JSSATEN.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              Learning spaces, student accommodation and places to connect —
              explore the campus through these facility highlights.
            </p>
          </div>
          <span className="rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs text-cyan">
            Noida · Sector 62
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {facilities.map(({ title, category, description, image, alt, icon: Icon }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#151b38] transition duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-glow"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11162f] via-[#11162f]/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-[.16em] text-white backdrop-blur">
                  {category}
                </span>
                <Icon
                  aria-hidden="true"
                  className="absolute bottom-4 right-4 text-white drop-shadow"
                  size={20}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <details className="group/details mt-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold text-cyan outline-none focus-visible:ring-2 focus-visible:ring-cyan">
                    <span>Explore facility</span>
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-open/details:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </details>
              </div>
            </article>
          ))}
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
