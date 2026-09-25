import { BriefcaseBusiness, CalendarCheck, GraduationCap } from "lucide-react";
import { marks, student } from "../data";

function Metric({ icon: Icon, label, value, detail, tone }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[.06] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[.1]">
      <div
        className={`mb-6 flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}
      >
        <Icon size={20} />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

export default function StudentPortal() {
  return (
    <section
      id="student-portal"
      className="mt-12 border-t border-white/10 pt-12"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Student services
          </p>
          <h2 className="mt-3 text-4xl font-semibold">
            Kashi’s Student Portal
          </h2>
          <p className="mt-3 text-slate-400">
            A quick view of your academic progress, attendance and internship.
          </p>
        </div>
        <span className="rounded-full border border-amber/20 bg-amber/10 px-4 py-2 text-xs text-amber">
          Demo student data
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={CalendarCheck}
          label="Attendance"
          value={student.attendance}
          detail={`${student.present} classes attended`}
          tone="bg-cyan/15 text-cyan"
        />
        <Metric
          icon={GraduationCap}
          label="Current CGPA"
          value={student.cgpa}
          detail={`SGPA ${student.sgpa}`}
          tone="bg-violet/20 text-violet-200"
        />
        <Metric
          icon={BriefcaseBusiness}
          label="Internship"
          value="In progress"
          detail={student.organisation}
          tone="bg-amber/15 text-amber"
        />
        <Metric
          icon={GraduationCap}
          label="Credits earned"
          value="96 / 160"
          detail="60% programme complete"
          tone="bg-rose-400/15 text-rose-200"
        />
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 to-cyan/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-orange-400 text-xl font-bold text-ink">
              K
            </div>
            <div>
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <p className="text-sm text-slate-400">{student.programme}</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 text-sm">
            <div>
              <p className="text-xs text-slate-500">Roll number</p>
              <p className="mt-1">{student.rollNumber}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Year / section</p>
              <p className="mt-1">{student.year}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Mentor</p>
              <p className="mt-1">{student.mentor}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Internship</p>
              <p className="mt-1">{student.internship}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-slate-500">
                Academic record
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                Marks & semester performance
              </h3>
            </div>
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">
              Semester VI
            </span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Internal</th>
                  <th className="pb-3">End semester</th>
                  <th className="pb-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {marks.map((row) => (
                  <tr key={row[0]}>
                    <td className="py-3 font-medium text-slate-200">
                      {row[0]}
                    </td>
                    <td className="py-3 text-slate-400">{row[1]}</td>
                    <td className="py-3 text-slate-400">{row[2]}</td>
                    <td className="py-3 font-bold text-cyan">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
