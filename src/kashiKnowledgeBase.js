import knowledgeText from "../data.txt?raw";

const ignoredTerms = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "be",
  "been",
  "being",
  "can",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "how",
  "i",
  "in",
  "include",
  "included",
  "includes",
  "including",
  "is",
  "it",
  "last",
  "list",
  "listed",
  "me",
  "offer",
  "offered",
  "offers",
  "of",
  "on",
  "please",
  "provide",
  "provided",
  "provides",
  "tell",
  "the",
  "their",
  "there",
  "they",
  "to",
  "what",
  "when",
  "where",
  "which",
  "who",
  "was",
  "were",
  "with",
  "you",
  "your",
  "jss",
  "jssaten",
  "college",
]);

const relatedTerms = [
  ["admission", "counselling", "counseling", "apply", "application", "entrance", "uptac"],
  ["programme", "program", "course", "branch", "degree", "undergraduate", "postgraduate", "engineering"],
  ["btech", "tech"],
  ["fee", "tuition", "cost", "charge", "payment", "price"],
  ["facility", "facilities", "infrastructure", "amenity", "amenities"],
  ["hostel", "accommodation", "dormitory", "room", "mess"],
  ["placement", "career", "job", "recruitment", "salary", "package"],
  ["scholarship", "reimbursement", "financial", "aid"],
  ["library", "book", "journal", "reading"],
  ["laboratory", "lab", "equipment", "computer"],
  ["sport", "sports", "fitness", "athletics", "game"],
  ["contact", "phone", "telephone", "email", "address"],
  ["student", "enrolment", "enrollment", "population", "strength"],
  ["faculty", "teacher", "professor", "staff"],
  ["accreditation", "approval", "aicte", "nba", "affiliation"],
  ["exam", "examination", "assessment", "semester", "aktu"],
];

const termGroups = new Map();
for (const group of relatedTerms) {
  for (const term of group) {
    termGroups.set(term, group);
  }
}

function normalizeTerm(term) {
  if (term.endsWith("ies") && term.length > 4) return `${term.slice(0, -3)}y`;
  if (term.endsWith("s") && term.length > 3) return term.slice(0, -1);
  return term;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.map(normalizeTerm)
    .filter((term) => term.length > 1 && !ignoredTerms.has(term)) ?? [];
}

function createKnowledgeEntries(text) {
  const entries = [];
  let section = "JSSATEN and AKTU";
  let paragraph = [];

  const addParagraph = () => {
    const content = paragraph.join(" ").trim();
    if (content) {
      const previousEntry = entries.at(-1);
      const isListItem = /^(?:\d+\.|-)\s/.test(content);
      const previousIsListItem =
        previousEntry && /^(?:\d+\.|-)\s/.test(previousEntry.content);
      if (isListItem && previousIsListItem && previousEntry.section === section) {
        previousEntry.content += ` ${content}`;
      } else {
        entries.push({ section, content });
      }
    }
    paragraph = [];
  };

  for (const line of text.split(/\r?\n/)) {
    const heading = line.match(/^#{1,2}\s+(.+)/);
    if (heading) {
      addParagraph();
      section = heading[1].replace(/^\d+\.\s*/, "").trim();
    } else if (line.trim()) {
      paragraph.push(line.trim());
    } else {
      addParagraph();
    }
  }

  addParagraph();
  return entries;
}

const knowledgeEntries = createKnowledgeEntries(knowledgeText);

function expandTerm(term) {
  const normalized = normalizeTerm(term);
  const group = termGroups.get(normalized);
  return group ? group.map(normalizeTerm) : [normalized];
}

export function answerFromKnowledgeBase(question) {
  const queryTerms = [...new Set(tokenize(question))];

  if (queryTerms.length === 0) {
    if (/\b(jss|jssaten|jssate|college|institution)\b/i.test(question)) {
      const overview = knowledgeEntries.find((entry) =>
        entry.section.includes("Overview of JSS Academy"),
      );
      if (overview) return `${overview.section}: ${overview.content}`;
    }
    return "Ask me about JSSATEN or AKTU programmes, admissions, fees, facilities, placements, and more.";
  }

  const matches = knowledgeEntries
    .map((entry) => {
      const sectionTerms = new Set(tokenize(entry.section));
      const contentTerms = new Set(tokenize(entry.content));
      let score = 0;
      let matchedTerms = 0;

      for (const term of queryTerms) {
        const alternatives = expandTerm(term);
        const contentMatch = alternatives.some((alternative) =>
          contentTerms.has(alternative),
        );
        const sectionMatch = alternatives.some((alternative) =>
          sectionTerms.has(alternative),
        );
        if (contentMatch || sectionMatch) matchedTerms += 1;
        if (contentMatch) {
          score += 1;
        }
        if (sectionMatch) score += 1;
      }

      const isList = /^(?:\d+\.|-)\s/.test(entry.content);
      if (isList && queryTerms.some((term) => expandTerm(term).includes("course"))) {
        score += 1;
      }

      return { ...entry, score, matchedTerms, coverage: matchedTerms / queryTerms.length };
    })
    .filter((entry) => entry.score > 0 && entry.coverage >= 0.7)
    .sort((first, second) => second.score - first.score);

  if (matches.length === 0) {
    return "I couldn't find a reliable answer to that in my JSSATEN knowledge base. For current information, check the official college website at https://www.jssaten.ac.in/ or contact admission@jssaten.ac.in.";
  }

  const selected = [];
  const seen = new Set();
  for (const match of matches) {
    const key = `${match.section}:${match.content}`;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(match);
    if (selected.length === 3) break;
  }

  return selected
    .map(({ section, content }) => `${section}: ${content}`)
    .join("\n\n");
}
