import { useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  CalendarCheck,
  GraduationCap,
  Wallet,
} from "lucide-react";
import { students } from "../data";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function Metric({ icon: Icon, label, value, detail, tone }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[.06] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[.1]">
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${tone}`}
      >
        <Icon size={20} />
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm text-slate-200">{value}</p>
    </div>
  );
}

export default function StudentPortal() {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [selectedSemester, setSelectedSemester] = useState(
    String(students[0].currentSemester),
  );
  const student =
    students.find((item) => item.id === selectedStudentId) ?? students[0];
  const semester =
    student.semesterHistory.find(
      (item) => item.semester === Number(selectedSemester),
    ) ?? student.semesterHistory.at(-1);
  const activeBacklogs = student.backlogs.filter(
    (backlog) => backlog.status === "Active",
  );

  const changeStudent = (event) => {
    const nextStudent = students.find((item) => item.id === event.target.value);
    if (!nextStudent) return;
    setSelectedStudentId(nextStudent.id);
    setSelectedSemester(String(nextStudent.currentSemester));
  };

  return (
    <section
      id="student-portal"
      className="mt-12 border-t border-white/10 pt-12"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-cyan">
            Student services
          </p>
          <h2 className="mt-3 text-4xl font-semibold">Student Dashboard</h2>
          <p className="mt-3 text-slate-400">
            Review demo academic records, fees, attendance and student details.
          </p>
        </div>
        <label className="grid gap-2 text-xs text-slate-400">
          Choose a student
          <select
            value={student.id}
            onChange={changeStudent}
            className="min-w-64 rounded-xl border border-white/10 bg-[#171d3d] px-4 py-3 text-sm text-white outline-none focus:border-cyan/50"
          >
            {students.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.rollNumber}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-5 rounded-2xl border border-amber/20 bg-amber/10 px-4 py-3 text-xs leading-5 text-amber">
        Fictional sample records for demonstration only. Fees, contacts, marks
        and student details are not official JSSATEN records or fee notices.
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Metric
          icon={CalendarCheck}
          label="Current semester attendance"
          value={semester.attendance}
          detail={`${semester.present} / ${semester.totalClasses} classes attended`}
          tone="bg-cyan/15 text-cyan"
        />
        <Metric
          icon={GraduationCap}
          label="Current CGPA"
          value={student.cgpa}
          detail={`Semester ${semester.semester} SGPA ${semester.sgpa}`}
          tone="bg-violet/20 text-violet-200"
        />
        <Metric
          icon={BriefcaseBusiness}
          label="Internship"
          value={student.internship.status}
          detail={`${student.internship.title} · ${student.internship.organisation}`}
          tone="bg-amber/15 text-amber"
        />
        <Metric
          icon={Wallet}
          label="Fees remaining"
          value={currency.format(student.fees.remaining)}
          detail={`${currency.format(student.fees.paid)} paid`}
          tone="bg-rose-400/15 text-rose-200"
        />
        <Metric
          icon={AlertTriangle}
          label="Active backlogs"
          value={activeBacklogs.length}
          detail={`${student.backlogs.length} backlog record(s)`}
          tone="bg-orange-400/15 text-orange-200"
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet/20 to-cyan/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber to-orange-400 text-xl font-bold text-ink">
              {student.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold">{student.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{student.programme}</p>
            </div>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Detail label="Roll number" value={student.rollNumber} />
            <Detail label="Year / section" value={student.year} />
            <Detail label="Student email" value={student.email} />
            <Detail
              label="Date of birth"
              value={new Date(`${student.dateOfBirth}T00:00:00`).toLocaleDateString(
                "en-IN",
                { day: "numeric", month: "long", year: "numeric" },
              )}
            />
            <Detail label="Mentor" value={student.mentor} />
            <Detail
              label="Father / guardian"
              value={student.parents.father}
            />
            <Detail label="Mother / guardian" value={student.parents.mother} />
            <Detail label="Parent contact" value={student.parents.phone} />
            <Detail label="Parent email" value={student.parents.email} />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[.2em] text-slate-500">
                Academic record
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                Semester subject performance
              </h3>
            </div>
            <label className="grid gap-1 text-xs text-slate-400">
              Semester
              <select
                value={semester.semester}
                onChange={(event) => setSelectedSemester(event.target.value)}
                className="rounded-lg border border-white/10 bg-[#171d3d] px-3 py-2 text-sm text-white outline-none focus:border-cyan/50"
              >
                {student.semesterHistory.map((item) => (
                  <option key={item.semester} value={item.semester}>
                    Semester {item.semester}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full bg-cyan/10 px-3 py-1.5 text-cyan">
              Attendance {semester.attendance}
            </span>
            <span className="rounded-full bg-violet/15 px-3 py-1.5 text-violet-200">
              SGPA {semester.sgpa}
            </span>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3">Internal</th>
                  <th className="pb-3">End semester</th>
                  <th className="pb-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {semester.subjects.map((row) => (
                  <tr key={row.subject}>
                    <td className="py-3 pr-3 font-medium text-slate-200">
                      {row.subject}
                    </td>
                    <td className="py-3 text-slate-400">{row.internal}</td>
                    <td className="py-3 text-slate-400">{row.endSemester}</td>
                    <td className="py-3 font-bold text-cyan">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
          <h3 className="text-xl font-semibold">Semester-wise attendance & SGPA</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3">Semester</th>
                  <th className="pb-3">Attendance</th>
                  <th className="pb-3">Classes attended</th>
                  <th className="pb-3">SGPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {student.semesterHistory.map((item) => (
                  <tr key={item.semester}>
                    <td className="py-3 text-slate-200">
                      Semester {item.semester}
                    </td>
                    <td className="py-3 text-slate-400">{item.attendance}</td>
                    <td className="py-3 text-slate-400">
                      {item.present} / {item.totalClasses}
                    </td>
                    <td className="py-3 font-bold text-cyan">{item.sgpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">Fee structure & balance</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Demo amounts only · not an official college fee schedule
                </p>
              </div>
              <span className="rounded-full bg-amber/10 px-3 py-1.5 text-xs text-amber">
                Due {new Date(`${student.fees.dueDate}T00:00:00`).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "short", year: "numeric" },
                )}
              </span>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              {student.fees.breakdown.map(([label, amount]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-slate-400">{label}</span>
                  <span>{currency.format(amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-white/10 pt-3 font-semibold">
                <span>Total</span>
                <span>{currency.format(student.fees.total)}</span>
              </div>
              <div className="flex justify-between text-cyan">
                <span>Paid</span>
                <span>{currency.format(student.fees.paid)}</span>
              </div>
              <div className="flex justify-between font-semibold text-amber">
                <span>Remaining</span>
                <span>{currency.format(student.fees.remaining)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[.06] p-6">
            <h3 className="text-xl font-semibold">Backlog history</h3>
            {student.backlogs.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">
                No backlogs recorded in this demo profile.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {student.backlogs.map((backlog) => (
                  <li
                    key={`${backlog.semester}-${backlog.subject}`}
                    className="flex flex-wrap justify-between gap-2 text-sm"
                  >
                    <span className="text-slate-300">
                      Semester {backlog.semester} · {backlog.subject}
                    </span>
                    <span
                      className={
                        backlog.status === "Active"
                          ? "text-amber"
                          : "text-cyan"
                      }
                    >
                      {backlog.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
