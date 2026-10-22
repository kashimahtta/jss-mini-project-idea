import { useEffect, useRef, useState } from "react";
import { BookOpen, Building2, Library, Users } from "lucide-react";
import SectionBackground from "./SectionBackground";

const panelImages = {
  about: "/main gate.jpg",
  "campus-life": "/classrooms.jpg",
  research: "/lab.jpg",
  placements: "/auditorium.jpg",
  announcements: "/multipurpose hall.jpg",
};

const intake = [
  { label: "CSE", value: 180, color: "#6d5dfc" },
  { label: "CSE (AI & ML)", value: 180, color: "#49d7d0" },
  { label: "CSE (Data Science)", value: 60, color: "#f6c85f" },
  { label: "IT", value: 180, color: "#a78bfa" },
];

const genderSplit = [
  { label: "Male", value: 3359, color: "#6d5dfc" },
  { label: "Female", value: 837, color: "#49d7d0" },
];

const stateSplit = [
  { label: "Uttar Pradesh", value: 3724, color: "#f6c85f" },
  { label: "Other states", value: 472, color: "#a78bfa" },
];

const keyStats = [
  { icon: Building2, value: "28", unit: "acres", label: "Campus area" },
  { icon: Users, value: "4,196", unit: "UG", label: "NIRF 2026 enrolment" },
  { icon: BookOpen, value: "5", unit: "blocks", label: "Academic blocks" },
];

const library = [
  { value: "133,562", label: "Volumes" },
  { value: "13,132", label: "Distinct titles" },
  { value: "137", label: "Printed journals" },
];

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, seen];
}

function BarChart({ title, data, unit }) {
  const [ref, seen] = useInView();
  const max = Math.max(...data.map((d) => d.value));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));

  return (
    <figure
      ref={ref}
      className="rounded-3xl border border-white/10 bg-white/[.06] p-6"
    >
      <figcaption className="text-sm font-semibold">{title}</figcaption>
      <div className="mt-6 flex gap-3">
        <div className="flex h-56 flex-col-reverse justify-between text-[10px] text-slate-500">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="relative flex h-56 flex-1 items-end gap-3 border-b border-l border-white/15 px-3 sm:gap-6">
          {data.map((d, i) => (
            <div
              key={d.label}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <span className="mb-1 text-xs font-semibold">{d.value}</span>
              <div
                role="img"
                aria-label={`${d.label}: ${d.value} ${unit}`}
                className="w-full max-w-[64px] rounded-t-lg transition-[height] duration-1000 ease-out"
                style={{
                  height: seen ? `${(d.value / max) * 85}%` : "0%",
                  background: `linear-gradient(to top, ${d.color}55, ${d.color})`,
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 flex gap-3 pl-8">
        <div className="flex flex-1 gap-3 px-3 sm:gap-6">
          {data.map((d) => (
            <span
              key={d.label}
              className="flex-1 text-center text-[10px] leading-4 text-slate-400"
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}

function PieChart({ title, data }) {
  const [ref, seen] = useInView();
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 15.9155;
  let offset = 0;

  return (
    <figure
      ref={ref}
      className="rounded-3xl border border-white/10 bg-white/[.06] p-6"
    >
      <figcaption className="text-sm font-semibold">{title}</figcaption>
      <div className="mt-5 flex flex-wrap items-center gap-6">
        <svg
          viewBox="0 0 42 42"
          className="h-44 w-44 -rotate-90"
          role="img"
          aria-label={`${title}: ${data
            .map((d) => `${d.label} ${d.value}`)
            .join(", ")}`}
        >
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,.06)"
            strokeWidth="6"
          />
          {data.map((d) => {
            const share = (d.value / total) * 100;
            const segment = (
              <circle
                key={d.label}
                cx="21"
                cy="21"
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="6"
                strokeDasharray={`${seen ? share : 0} ${100 - (seen ? share : 0)}`}
                strokeDashoffset={-offset}
                style={{ transition: "stroke-dasharray 1.2s ease-out" }}
              />
            );
            offset += share;
            return segment;
          })}
        </svg>
        <ul className="space-y-3 text-sm">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ background: d.color }}
              />
              <span className="text-slate-300">{d.label}</span>
              <span className="font-semibold">
                {d.value.toLocaleString("en-IN")}
                <span className="ml-1 text-xs font-normal text-slate-400">
                  ({((d.value / total) * 100).toFixed(1)}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

function Panel({ id, tone, kicker, title, children, text }) {
  return (
    <section
      id={id}
      data-story-panel
      className="story-panel relative isolate my-5 overflow-hidden rounded-3xl border border-white/10 px-5 sm:px-8"
    >
      <SectionBackground image={panelImages[id]} />
      <div className="grid w-full items-center gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className={`text-xs uppercase tracking-[.2em] ${tone}`}>{kicker}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-400">{text}</p>
        </div>
        <div className="space-y-5">{children}</div>
      </div>
    </section>
  );
}

function SourceNote({ children }) {
  return <p className="text-xs leading-5 text-slate-500">{children}</p>;
}

const panels = [
  ["about", "About"],
  ["campus-life", "Students"],
  ["research", "Research"],
  ["placements", "Careers"],
  ["announcements", "Updates"],
];

export default function FullScreenStory() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-story-panel]");
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { threshold: 0.5 },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story-root mt-8">
      <nav
        aria-label="Section progress"
        className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {panels.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            title={label}
            className={`h-3 w-3 rounded-full border border-white/40 transition ${
              active === id ? "scale-125 bg-cyan" : "bg-transparent"
            }`}
          />
        ))}
      </nav>

      <Panel
        id="about"
        tone="text-cyan"
        kicker="About JSSATEN"
        title="A technical education landmark in Delhi NCR."
        text="JSS Academy of Technical Education, Noida is located in Sector 62 and combines disciplined academics, industry connect, research and an active campus culture."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {keyStats.map(({ icon: Icon, value, unit, label }) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 to-cyan/10 p-5"
            >
              <Icon className="text-cyan" size={22} />
              <p className="mt-5 text-3xl font-semibold">
                {value}{" "}
                <span className="text-sm text-slate-400">{unit}</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
        <BarChart
          title="Published undergraduate intake (seats)"
          data={intake}
          unit="seats"
        />
        <SourceNote>
          Intake shown for the four branches with published figures. Check
          current AICTE approvals for other branches and admission years.
        </SourceNote>
      </Panel>

      <Panel
        id="campus-life"
        tone="text-cyan"
        kicker="Campus life"
        title="A campus with room to grow."
        text="Clubs, events, hostels, student communities and campus activities create a balanced college experience across a 28-acre campus."
      >
        <div className="grid gap-5 xl:grid-cols-2">
          <PieChart title="Undergraduate students by gender" data={genderSplit} />
          <PieChart title="Students by home state" data={stateSplit} />
        </div>
        <SourceNote>
          Source: NIRF 2026 Engineering submission, 4,196 undergraduate
          students in the reporting period. Not necessarily current enrolment.
        </SourceNote>
      </Panel>

      <Panel
        id="research"
        tone="text-violet-200"
        kicker="Research & innovation"
        title="Ideas that move beyond the classroom."
        text="Student projects, innovation spaces, faculty research and collaborative challenges help turn curiosity into useful work, supported by a central library and learning resources."
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/15 to-white/[.06] p-6">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Library size={18} className="text-violet-200" /> Central Library
            holdings
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {library.map(({ value, label }) => (
              <div key={label} className="rounded-2xl bg-white/5 p-5">
                <p className="text-3xl font-semibold">{value}</p>
                <p className="mt-1 text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <SourceNote>
          Reported on the college infrastructure page; not independently
          audited.
        </SourceNote>
      </Panel>

      <Panel
        id="placements"
        tone="text-amber"
        kicker="Placements"
        title="Prepare for meaningful careers."
        text="Training, industry interaction, internships and career guidance support students as they move from campus to workplace."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {["Training", "Industry interaction", "Internships"].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-white/10 bg-white/[.06] p-6"
            >
              <p className="text-lg font-semibold text-amber">{item}</p>
            </div>
          ))}
        </div>
        <SourceNote>
          Placement statistics vary by branch and batch. Verified figures will
          appear here once published by the college.
        </SourceNote>
      </Panel>

      <Panel
        id="announcements"
        tone="text-cyan"
        kicker="Announcements"
        title="What’s happening at JSSATEN."
        text="Admissions updates, events, research opportunities and important campus notices will appear here."
      >
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-8 text-sm leading-6 text-slate-400">
          No new announcements right now. Check back soon, or ask Kashi AI for
          basic questions.
        </div>
      </Panel>
    </div>
  );
}
