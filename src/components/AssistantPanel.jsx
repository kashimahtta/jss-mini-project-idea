import { useState } from "react";
import { Bot, ChevronRight, MapPin, X } from "lucide-react";
import { navLinks } from "../data";

const faq = [
  "What is JSSATEN?",
  "What courses are offered?",
  "Tell me about facilities",
  "How do I contact admissions?",
];
export default function AssistantPanel({ kind, onClose, onNavigate }) {
  const navigation = kind === "navigation";
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const answer = (value) => {
    const text = value.toLowerCase();
    if (text.includes("course") || text.includes("academic"))
      return "JSSATEN offers undergraduate and postgraduate technical education programmes across engineering, computer applications and management.";
    if (text.includes("facilit"))
      return "The campus includes laboratories, library, hostels, innovation spaces, student support and activity areas.";
    if (text.includes("admission") || text.includes("contact"))
      return "For verified deadlines and documents, connect with the JSSATEN admissions office through the Contact section.";
    if (text.includes("vision") || text.includes("mission"))
      return "JSSATEN focuses on outcome-based education, technological competence, research, innovation and ethical values.";
    return "JSS Academy of Technical Education, Noida is a technical institution in Sector 62, established in 1998 and affiliated with AKTU.";
  };
  const submit = (value) => {
    if (!value.trim()) return;
    setReply(navigation ? `Opening ${value} section.` : answer(value));
    setQuestion("");
    if (navigation) onNavigate(value);
  };
  const items = navigation ? navLinks.map(([label]) => label) : faq;
  return (
    <div className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-40px))] animate-[fadeUp_.25s_ease-out] rounded-3xl border border-white/10 bg-[#171d3d]/95 p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${navigation ? "bg-cyan/15 text-cyan" : "bg-violet/20 text-violet-200"}`}
          >
            {navigation ? <MapPin size={19} /> : <Bot size={19} />}
          </div>
          <div>
            <p className="font-semibold">
              {navigation ? "Website Navigator" : "Kashi AI"}
            </p>
            <p className="text-xs text-slate-400">
              {navigation ? "Move around the JSS website" : "Ask about JSSATEN"}
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-300">
        {navigation
          ? "Choose a section and I will take you there."
          : "Ask a question about JSSATEN, academics, facilities or admissions."}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => submit(item)}
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
      {reply && (
        <div className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/10 p-3 text-xs leading-5 text-cyan-100">
          {reply}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(question);
        }}
        className="mt-4 flex gap-2"
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            navigation
              ? "Where should I take you?"
              : "Ask Kashi about JSSATEN..."
          }
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-600 focus:border-cyan/40"
        />
        <button className="rounded-xl bg-cyan px-3 text-xs font-bold text-ink">
          Ask
        </button>
      </form>
    </div>
  );
}
