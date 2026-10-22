import { useEffect, useRef, useState } from "react";
import { Bot, ChevronRight, MapPin, Plus, Send, X } from "lucide-react";
import { navLinks } from "../data";
import {
  askKnowledgeBase,
  completeKeyword,
  suggestedKeywords,
} from "../kashiKnowledgeBase";

const faq = [
  "What is JSSATEN?",
  "What courses are offered?",
  "Tell me about facilities",
  "How do I contact admissions?",
];
const sectionAliases = {
  home: ["home", "start", "top", "main", "hero"],
  about: ["about", "overview", "history", "jss", "students", "enrolment", "enrollment", "intake"],
  vision: ["vision", "mission", "values", "goal"],
  academics: ["academics", "academic", "course", "courses", "programme", "program", "branch", "btech", "mca", "mba", "department"],
  facilities: ["facilities", "facility", "hostel", "cafe", "canteen", "campus", "infrastructure", "gate", "location", "sports", "library"],
  research: ["research", "lab", "labs", "laboratory", "publication", "innovation"],
  "campus-life": ["campus", "life", "student", "clubs", "events", "culture"],
  placements: ["placement", "placements", "career", "careers", "job", "jobs", "recruiter", "package", "salary"],
  announcements: ["announcement", "announcements", "update", "updates", "news", "notice", "cie", "exam"],
  contact: ["contact", "admission", "admissions", "apply", "phone", "email", "address", "location", "reach"],
};

const dashboardId = "student-dashboard";
const dashboardTerms = ["dashboard", "portal", "profile", "attendance", "result", "results", "marks", "fee", "fees"];

function findSection(value) {
  const text = value.toLowerCase().trim();
  const words = text.match(/[a-z]+/g) ?? [];
  if (
    text === "student dashboard" ||
    words.some((w) => dashboardTerms.includes(w))
  ) {
    return ["Student Dashboard", dashboardId];
  }
  const exact = navLinks.find(
    ([label, id]) => label.toLowerCase() === text || id === text,
  );
  if (exact) return exact;
  for (const [label, id] of navLinks) {
    const terms = [...(sectionAliases[id] ?? []), ...label.toLowerCase().match(/[a-z]+/g)];
    if (words.some((word) => terms.includes(word) || (word.length > 3 && terms.some((t) => t.startsWith(word))))) {
      return [label, id];
    }
  }
  return null;
}

export default function AssistantPanel({ kind, onClose, onNavigate, onOpenProfile }) {
  const navigation = kind === "navigation";
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const submit = (value) => {
    if (!value.trim()) return;
    const target = navigation ? findSection(value) : null;
    const reply = navigation
      ? {
          text: target
            ? `Opening ${target[0]} section.`
            : "I couldn't find that section. Try a key term like academics, hostel, placements or contact.",
          sources: [],
        }
      : (({ answer, sources }) => ({ text: answer, sources }))(
          askKnowledgeBase(value),
        );
    setMessages((current) => [
      ...current,
      { role: "user", text: value.trim() },
      { role: "bot", ...reply },
    ]);
    setQuestion("");
    if (target) {
      if (target[1] === dashboardId) onOpenProfile?.();
      else onNavigate(target[1]);
    }
  };

  const addTerm = (term) =>
    setQuestion((current) => `${current.trim()} ${term}`.trim() + " ");

  const partial = question.endsWith(" ") ? "" : question.split(/\s+/).pop();
  const completions = navigation ? [] : completeKeyword(partial);
  const items = navigation
    ? [...navLinks.map(([label]) => label), "Student Dashboard"]
    : faq;
  return (
    <div
      className={`fixed bottom-24 right-5 z-50 flex animate-[fadeUp_.25s_ease-out] flex-col rounded-3xl border border-white/10 bg-[#171d3d]/95 p-5 shadow-2xl backdrop-blur-xl ${
        navigation
          ? "max-h-[calc(100vh-8rem)] w-[min(380px,calc(100vw-40px))] overflow-y-auto"
          : "h-[min(82vh,780px)] w-[min(760px,calc(100vw-40px))]"
      }`}
    >
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
      <div className={navigation ? "" : "min-h-0 flex-1 overflow-y-auto pr-1"}>
        <p className="mt-5 text-sm leading-6 text-slate-300">
          {navigation
            ? "Choose a section or type a key term like “hostel”, “placements” or “contact” and I will take you there."
            : "Ask about JSSATEN, AKTU, programmes, fees, facilities, admissions or placements. Type a question or add key terms like “hostel fee scholarship”."}
        </p>
        <div
          className={`mt-4 grid gap-2 ${navigation ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}
        >
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
        <div className="mt-4 space-y-3">
          {messages.map((message, index) =>
            message.role === "user" ? (
              <div key={index} className="flex justify-end">
                <p className="max-w-[85%] rounded-2xl rounded-br-md bg-violet/40 px-4 py-2.5 text-sm text-white">
                  {message.text}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="max-w-[92%] rounded-2xl rounded-bl-md border border-cyan/20 bg-cyan/10 p-4 text-sm leading-6 text-cyan-100"
              >
                <p className="whitespace-pre-line">{message.text}</p>
                {message.sources.length > 0 && (
                  <p className="mt-3 border-t border-cyan/15 pt-2 text-[11px] text-slate-400">
                    Sources:{" "}
                    {[...new Set(message.sources.map((s) => s.section))].join(
                      " · ",
                    )}
                  </p>
                )}
              </div>
            ),
          )}
          <div ref={endRef} />
        </div>
      </div>
      {!navigation && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-slate-500">
            Key terms
          </span>
          {(completions.length ? completions : suggestedKeywords).map((term) => (
            <button
              key={term}
              type="button"
              onClick={() =>
                completions.length
                  ? setQuestion(
                      (current) =>
                        `${current.slice(0, current.length - partial.length)}${term} `,
                    )
                  : addTerm(term)
              }
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 transition hover:border-cyan/40 hover:text-white"
            >
              <Plus size={11} /> {term}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(question);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder={
            navigation
              ? "Where should I take you?"
              : "Ask a question or add key terms…"
          }
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan/40"
        />
        <button
          aria-label="Ask"
          className="flex items-center gap-2 rounded-xl bg-cyan px-4 text-sm font-bold text-ink"
        >
          <Send size={15} /> Ask
        </button>
      </form>
    </div>
  );
}
