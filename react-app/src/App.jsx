import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  BookOpen,
  BriefcaseBusiness,
  CalendarCheck,
  ChevronRight,
  GraduationCap,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const sections = ["Overview", "Attendance", "Marks", "Internship"];
const marks = [
  ["Data Structures", "24 / 30", "58 / 70", "A"],
  ["Operating Systems", "26 / 30", "55 / 70", "A"],
  ["Database Management", "25 / 30", "61 / 70", "A+"],
  ["Computer Networks", "22 / 30", "54 / 70", "B+"],
];
const navItems = ["Dashboard", "Attendance", "Marks", "Internship", "Notices"];

function Metric({ icon: Icon, label, value, detail, tone }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[.06] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[.1] hover:shadow-glow">
      <div
        className={`mb-7 flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}
      >
        <Icon size={20} />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function Assistant({ kind, onClose }) {
  const navigation = kind === "navigation";
  return (
    <div className="fixed bottom-24 right-5 z-30 w-[min(360px,calc(100vw-40px))] animate-[fadeUp_.25s_ease-out] rounded-3xl border border-white/10 bg-[#171d3d]/95 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${navigation ? "bg-cyan/15 text-cyan" : "bg-violet/20 text-violet-200"}`}
          >
            {navigation ? <MapPin size={19} /> : <Bot size={19} />}
          </div>
          <div>
            <p className="font-semibold">
              {navigation ? "Website Assistant" : "Kashi AI"}
            </p>
            <p className="text-xs text-slate-400">
              {navigation
                ? "Find your way around"
                : "Answers JSSATEN questions"}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-300">
        {navigation
          ? "Choose a destination and I will guide you to the right portal section."
          : "Ask about courses, attendance, marks, internships, admissions or campus facilities."}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {(navigation
          ? navItems
          : [
              "What is my attendance?",
              "Show my marks",
              "Internship status",
              "Contact admissions",
            ]
        ).map((item) => (
          <button
            key={item}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left text-xs text-slate-200 transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            {item}
            <ChevronRight
              size={13}
              className="float-right mt-0.5 text-slate-500"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("Overview");
  const [assistant, setAssistant] = useState(null);
  const [roll, setRoll] = useState("");
  const [searched, setSearched] = useState(false);
  const [mobile, setMobile] = useState(false);

  const go = (item) => {
    setActive(item === "Dashboard" ? "Overview" : item);
    setMobile(false);
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white selection:bg-violet/40">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(109,93,252,.2),transparent_33%),radial-gradient(circle_at_10%_80%,rgba(73,215,208,.1),transparent_30%)]" />
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-[#10152f]/90 p-6 backdrop-blur-xl transition-transform md:translate-x-0 ${mobile ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan font-black shadow-glow">
            J
          </div>
          <div>
            <p className="font-bold tracking-wide">JSSATEN</p>
            <p className="text-[10px] uppercase tracking-[.25em] text-slate-500">
              Student hub
            </p>
          </div>
        </div>
        <div className="mt-12 space-y-2">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => go(item)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${active === (item === "Dashboard" ? "Overview" : item) ? "bg-white/10 text-white shadow-inner" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
            >
              <span
                className={`h-2 w-2 rounded-full ${i === 0 ? "bg-cyan" : "bg-slate-600"}`}
              />
              {item}
            </button>
          ))}
        </div>
        <div className="absolute bottom-7 left-6 right-6 rounded-2xl border border-amber/20 bg-amber/10 p-4">
          <Sparkles size={17} className="text-amber" />
          <p className="mt-3 text-xs leading-5 text-slate-300">
            Your new semester journey starts here. Stay consistent.
          </p>
        </div>
      </aside>
      <main className="relative md:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-white/10 bg-ink/70 px-5 backdrop-blur-xl md:px-10">
          <button className="md:hidden" onClick={() => setMobile(!mobile)}>
            {mobile ? <X /> : <Menu />}
          </button>
          <div className="hidden text-sm text-slate-400 md:block">
            Friday, 25 September 2026{" "}
            <span className="mx-2 text-slate-600">/</span> Semester VI
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAssistant("navigation")}
              className="hidden rounded-full border border-cyan/30 px-4 py-2 text-xs text-cyan transition hover:bg-cyan/10 sm:block"
            >
              Website Assistant
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber to-orange-400 font-bold text-ink">
              AS
            </div>
          </div>
        </header>
        <div id="content" className="mx-auto max-w-7xl px-5 py-9 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm text-cyan">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />{" "}
                All systems updated
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Good morning,{" "}
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan bg-clip-text text-transparent">
                  Aarav.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-slate-400">
                Here is your academic snapshot. Keep your momentum going.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearched(true);
              }}
              className="flex rounded-2xl border border-white/10 bg-white/5 p-1.5"
            >
              <Search className="m-2.5 text-slate-500" size={17} />
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="Search roll number"
                className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-600"
              />
              <button className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-ink">
                Search
              </button>
            </form>
          </div>
          {searched && (
            <div className="mb-6 rounded-2xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm text-cyan">
              Showing demo record for <b>{roll || "JSS2024CSE001"}</b>.
            </div>
          )}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              icon={CalendarCheck}
              label="Attendance"
              value="86%"
              detail="172 of 200 classes attended"
              tone="bg-cyan/15 text-cyan"
            />
            <Metric
              icon={BookOpen}
              label="Current CGPA"
              value="8.18"
              detail="+0.24 from last semester"
              tone="bg-violet/20 text-violet-200"
            />
            <Metric
              icon={BriefcaseBusiness}
              label="Internship"
              value="In progress"
              detail="TechNova Solutions"
              tone="bg-amber/15 text-amber"
            />
            <Metric
              icon={GraduationCap}
              label="Credits earned"
              value="96/160"
              detail="60% programme complete"
              tone="bg-rose-400/15 text-rose-200"
            />
          </div>
          <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[.2em] text-slate-500">
                    Academic record
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Marks & performance
                  </h2>
                </div>
                <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">
                  Semester VI
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="pb-4">Subject</th>
                      <th className="pb-4">Internal</th>
                      <th className="pb-4">End semester</th>
                      <th className="pb-4">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {marks.map((row) => (
                      <tr key={row[0]} className="transition hover:bg-white/5">
                        <td className="py-4 font-medium text-slate-200">
                          {row[0]}
                        </td>
                        <td className="py-4 text-slate-400">{row[1]}</td>
                        <td className="py-4 text-slate-400">{row[2]}</td>
                        <td className="py-4 font-bold text-cyan">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 to-cyan/10 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Student profile</h2>
                <button className="text-slate-400 hover:text-white">
                  <ArrowUpRight size={18} />
                </button>
              </div>
              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-orange-400 text-xl font-bold text-ink">
                  AS
                </div>
                <div>
                  <p className="text-lg font-semibold">Aarav Sharma</p>
                  <p className="text-sm text-slate-400">
                    B.Tech Computer Science
                  </p>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-y-5 text-sm">
                <div>
                  <p className="text-xs text-slate-500">Roll number</p>
                  <p className="mt-1 font-medium">JSS2024CSE001</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Year / section</p>
                  <p className="mt-1 font-medium">3rd Year · CSE-A</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Mentor</p>
                  <p className="mt-1 font-medium">Dr. Neha Verma</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Academic year</p>
                  <p className="mt-1 font-medium">2026–27</p>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Internship tracker</h2>
                <span className="rounded-full bg-amber/15 px-3 py-1 text-xs text-amber">
                  In progress
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Frontend Developer Intern · TechNova Solutions
              </p>
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet to-cyan" />
              </div>
              <div className="mt-3 flex justify-between text-xs text-slate-500">
                <span>May 12, 2026</span>
                <span>66% complete</span>
                <span>Jul 30, 2026</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
              <h2 className="text-xl font-semibold">Attendance overview</h2>
              <div className="mt-6 flex items-center gap-6">
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#49d7d0 0 86%, #ffffff12 86% 100%)",
                  }}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink text-2xl font-bold">
                    86<span className="text-sm text-cyan">%</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan" />
                    Present <b>172</b>
                  </p>
                  <p>
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-600" />
                    Absent <b>28</b>
                  </p>
                  <p className="text-xs text-slate-500">
                    Minimum required: 75%
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <button
        onClick={() => setAssistant("kashi")}
        className="fixed bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
      >
        <MessageCircle size={18} /> Ask Kashi AI
      </button>
      {assistant && (
        <Assistant
          kind={assistant === "navigation" ? "navigation" : "kashi"}
          onClose={() => setAssistant(null)}
        />
      )}
    </div>
  );
}

export default App;
