import { useState } from "react";
import { Bell, X } from "lucide-react";

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-md"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#111b3d] shadow-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-ink/60 p-2 text-slate-300 backdrop-blur transition hover:text-white"
          aria-label="Close announcement"
        >
          <X size={18} />
        </button>
        <img
          src="/announcements.jpeg"
          alt="JSSATEN announcement"
          className="h-48 w-full object-cover"
        />
        <div className="p-7">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-amber">
            <Bell size={14} /> Important Announcement
          </p>
          <h2 className="mt-3 text-xl font-semibold">
            CIE-2 Scheduled for 5th Semester
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            CIE2 is scheduled for all 5th semester students. Check your
            department notice board or the student portal for the detailed
            timetable and syllabus coverage. Prepare well!
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-5 w-full rounded-full bg-gradient-to-r from-violet to-cyan py-2.5 text-sm font-bold text-white transition hover:scale-[1.02]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
