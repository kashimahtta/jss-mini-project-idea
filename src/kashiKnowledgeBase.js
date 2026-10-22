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
  ["location", "located", "address", "where", "map", "direction", "reach", "route", "noida", "sector", "campus"],
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

const K1 = 1.4;
const B = 0.75;
const SECTION_WEIGHT = 2;

const documents = knowledgeEntries.map((entry) => {
  const sectionTokens = tokenize(entry.section);
  const contentTokens = tokenize(entry.content);
  const frequencies = new Map();
  for (const token of contentTokens) {
    frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
  }
  for (const token of sectionTokens) {
    frequencies.set(token, (frequencies.get(token) ?? 0) + SECTION_WEIGHT);
  }
  const sequence = [...sectionTokens, ...contentTokens];
  const bigrams = new Set();
  for (let index = 0; index < sequence.length - 1; index += 1) {
    bigrams.add(`${sequence[index]} ${sequence[index + 1]}`);
  }
  return {
    ...entry,
    frequencies,
    bigrams,
    length: sequence.length,
    sectionTerms: new Set(sectionTokens),
  };
});

const averageLength =
  documents.reduce((sum, doc) => sum + doc.length, 0) /
  Math.max(documents.length, 1);

const documentFrequency = new Map();
for (const doc of documents) {
  for (const term of doc.frequencies.keys()) {
    documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
  }
}

function idf(term) {
  const df = documentFrequency.get(term) ?? 0;
  return Math.log(1 + (documents.length - df + 0.5) / (df + 0.5));
}

function editDistanceAtMost(a, b, limit) {
  if (Math.abs(a.length - b.length) > limit) return false;
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        previous[j] + 1,
        current[j - 1] + 1,
        previous[j - 1] + cost,
      );
      rowMin = Math.min(rowMin, current[j]);
    }
    if (rowMin > limit) return false;
    previous = current;
  }
  return previous[b.length] <= limit;
}

const vocabulary = [...documentFrequency.keys()];

// Each query term maps to weighted vocabulary terms: itself, synonyms, close spellings.
function expandQueryTerm(term) {
  const variants = new Map();
  const normalized = normalizeTerm(term);
  if (documentFrequency.has(normalized)) variants.set(normalized, 1);

  for (const synonym of expandTerm(term)) {
    if (documentFrequency.has(synonym) && !variants.has(synonym)) {
      variants.set(synonym, 0.55);
    }
  }

  if (variants.size === 0 && normalized.length >= 4) {
    const limit = normalized.length >= 9 ? 2 : 1;
    for (const candidate of vocabulary) {
      if (editDistanceAtMost(normalized, candidate, limit)) {
        variants.set(candidate, 0.7);
      }
    }
  }

  if (variants.size === 0 && normalized.length >= 4) {
    for (const candidate of vocabulary) {
      if (candidate.startsWith(normalized)) variants.set(candidate, 0.6);
    }
  }

  return variants;
}

function scoreDocument(doc, expandedTerms, queryTokens) {
  let score = 0;
  let matchedWeight = 0;
  let totalWeight = 0;

  for (const variants of expandedTerms) {
    let best = 0;
    let termIdf = 0;
    for (const [candidate, weight] of variants) {
      termIdf = Math.max(termIdf, idf(candidate));
      const frequency = doc.frequencies.get(candidate) ?? 0;
      if (!frequency) continue;
      const saturation =
        (frequency * (K1 + 1)) /
        (frequency + K1 * (1 - B + (B * doc.length) / averageLength));
      const contribution = idf(candidate) * saturation * weight;
      best = Math.max(best, contribution);
      if (doc.sectionTerms.has(candidate)) best += idf(candidate) * 1.2 * weight;
    }
    score += best;
    totalWeight += termIdf || 1;
    if (best > 0) matchedWeight += termIdf || 1;
  }

  for (let index = 0; index < queryTokens.length - 1; index += 1) {
    if (doc.bigrams.has(`${queryTokens[index]} ${queryTokens[index + 1]}`)) {
      score += 1.5;
    }
  }

  return { score, coverage: totalWeight ? matchedWeight / totalWeight : 0 };
}

export function searchKnowledge(query, limit = 3) {
  const queryTokens = tokenize(query);
  const uniqueTokens = [...new Set(queryTokens)];
  const expandedTerms = uniqueTokens
    .map(expandQueryTerm)
    .filter((variants) => variants.size > 0);

  if (expandedTerms.length === 0) return [];

  const ranked = documents
    .map((doc) => ({ doc, ...scoreDocument(doc, expandedTerms, queryTokens) }))
    .filter((result) => result.score > 0 && result.coverage >= 0.5)
    .sort((first, second) => second.score - first.score);

  if (ranked.length === 0) return [];
  const threshold = ranked[0].score * 0.45;
  return ranked
    .filter((result) => result.score >= threshold)
    .slice(0, limit)
    .map(({ doc, score, coverage }) => ({
      section: doc.section,
      content: doc.content,
      score,
      coverage,
    }));
}

const popularKeywords = [
  "admission",
  "fee",
  "hostel",
  "placement",
  "scholarship",
  "library",
  "laboratory",
  "faculty",
  "course",
  "contact",
  "location",
  "accreditation",
  "sports",
];

export const suggestedKeywords = popularKeywords.filter((keyword) =>
  expandQueryTerm(keyword).size > 0,
);

// Autocomplete for the term currently being typed, ranked by how often it appears.
export function completeKeyword(partial) {
  const prefix = partial.toLowerCase().trim();
  if (prefix.length < 2) return [];
  return vocabulary
    .filter((term) => term.startsWith(prefix) && term !== prefix)
    .sort(
      (first, second) =>
        documentFrequency.get(second) - documentFrequency.get(first),
    )
    .slice(0, 6);
}

const fallbackAnswer =
  "I couldn't find a reliable answer to that in my JSSATEN knowledge base. For current information, check the official college website at https://www.jssaten.ac.in/ or contact admission@jssaten.ac.in.";

const locationPattern = /\b(locations?|located|address|where|directions?|map|reach)\b/i;

function locationSources() {
  return knowledgeEntries
    .filter((entry) => /Address:\s*C-20\/1/i.test(entry.content))
    .slice(0, 1)
    .map(({ section, content }) => ({ section, content, score: 1, coverage: 1 }));
}

export function askKnowledgeBase(question) {
  if (locationPattern.test(question)) {
    const found = locationSources();
    if (found.length) {
      return {
        answer: found.map(({ content }) => content).join("\n\n"),
        sources: found,
      };
    }
  }
  if (tokenize(question).length === 0) {
    if (/\b(jss|jssaten|jssate|college|institution)\b/i.test(question)) {
      const overview = knowledgeEntries.find((entry) =>
        entry.section.includes("Overview of JSS Academy"),
      );
      if (overview) {
        return {
          answer: overview.content,
          sources: [{ section: overview.section, content: overview.content }],
        };
      }
    }
    return {
      answer:
        "Ask me about JSSATEN or AKTU programmes, admissions, fees, facilities, placements, and more. You can also add key terms like “hostel fee scholarship”.",
      sources: [],
    };
  }

  const sources = searchKnowledge(question);
  if (sources.length === 0) return { answer: fallbackAnswer, sources: [] };

  return {
    answer: sources.map(({ content }) => content).join("\n\n"),
    sources,
  };
}

export function answerFromKnowledgeBase(question) {
  const { answer, sources } = askKnowledgeBase(question);
  if (sources.length === 0) return answer;
  return sources
    .map(({ section, content }) => `${section}: ${content}`)
    .join("\n\n");
}
