import { useState } from "react";
import { MessageCircle, Navigation, X } from "lucide-react";
import AssistantPanel from "./components/AssistantPanel";
import CollegeSections from "./components/CollegeSections";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import StudentPortal from "./components/StudentPortal";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [assistant, setAssistant] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = (id) => {
    setMobileOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-ink text-white selection:bg-violet/40">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(109,93,252,.2),transparent_33%),radial-gradient(circle_at_10%_80%,rgba(73,215,208,.1),transparent_30%)]" />
      <Navbar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onNavigate={navigate}
        onOpenKashi={() => setAssistant("kashi")}
        onOpenProfile={() => setProfileOpen(true)}
      />
      <main className="relative mx-auto max-w-7xl px-5 py-7 md:px-10">
        <Hero onNavigate={navigate} />
        <CollegeSections />
      </main>
      <footer className="relative mt-16 border-t border-white/10 px-5 py-8 text-center text-xs text-slate-500">
        © 2026 JSSATEN · Demo content for the React website experience
      </footer>
      <button
        onClick={() => setAssistant("navigation")}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-cyan/30 bg-[#111b3d]/90 px-4 py-3 text-xs font-semibold text-cyan shadow-xl backdrop-blur transition hover:scale-105"
      >
        <Navigation size={16} /> Website Navigator
      </button>
      <button
        onClick={() => setAssistant("kashi")}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-105"
      >
        <MessageCircle size={18} /> Ask Kashi AI
      </button>
      {assistant && (
        <AssistantPanel
          kind={assistant}
          onNavigate={navigate}
          onClose={() => setAssistant(null)}
        />
      )}
      {profileOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 p-5 backdrop-blur-md md:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.2em] text-cyan">
                  Private student area
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Welcome, Kashi</h2>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                className="rounded-full border border-white/10 p-2 text-slate-400 hover:text-white"
                aria-label="Close private profile"
              >
                <X size={20} />
              </button>
            </div>
            <StudentPortal />
          </div>
        </div>
      )}
    </div>
  );
}
