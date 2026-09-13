document.documentElement.classList.add("js");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      /* Load veil */
      window.addEventListener("load", () => {
        const veil = document.getElementById("veil");
        setTimeout(() => veil.classList.add("hide"), 500);
      });

      /* Navbar scroll state */
      const nav = document.getElementById("siteNav");
      const toTop = document.getElementById("toTop");
      window.addEventListener(
        "scroll",
        () => {
          const y = window.scrollY;
          nav.classList.toggle("scrolled", y > 40);
          toTop.classList.toggle("show", y > 700);
        },
        { passive: true },
      );

      /* Mobile menu */
      const burger = document.getElementById("burgerBtn");
      const mobileMenu = document.getElementById("mobileMenu");
      const scrim = document.getElementById("scrim");
      function closeMenu() {
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        mobileMenu.classList.remove("open");
        scrim.classList.remove("show");
      }
      burger.addEventListener("click", () => {
        const open = mobileMenu.classList.toggle("open");
        burger.classList.toggle("open", open);
        burger.setAttribute("aria-expanded", String(open));
        scrim.classList.toggle("show", open);
      });
      scrim.addEventListener("click", closeMenu);
      mobileMenu
        .querySelectorAll("a")
        .forEach((a) => a.addEventListener("click", closeMenu));

      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }),
      );

      /* Scroll reveal */
      const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
      if ("IntersectionObserver" in window && !reduceMotion) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                e.target.classList.add("in");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        revealEls.forEach((el) => io.observe(el));
      } else {
        revealEls.forEach((el) => el.classList.add("in"));
      }

      /* Counters */
      const counters = document.querySelectorAll(".counter");
      const counterIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            if (reduceMotion) {
              el.textContent = target;
              counterIO.unobserve(el);
              return;
            }
            const dur = 1600;
            const start = performance.now();
            function step(now) {
              const p = Math.min((now - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.floor(eased * target);
              if (p < 1) requestAnimationFrame(step);
              else el.textContent = target;
            }
            requestAnimationFrame(step);
            counterIO.unobserve(el);
          });
        },
        { threshold: 0.4 },
      );
      counters.forEach((c) => counterIO.observe(c));

      /* Hero parallax */
      const heroBg = document.getElementById("heroBg");
      if (!reduceMotion) {
        window.addEventListener(
          "scroll",
          () => {
            const y = window.scrollY;
            if (y < window.innerHeight * 1.2) {
              heroBg.style.transform = `translateY(${y * 0.25}px) scale(1.05)`;
            }
          },
          { passive: true },
        );
      }

      /* Hero particles */
      (function particles() {
        const canvas = document.getElementById("particleCanvas");
        const ctx = canvas.getContext("2d");
        let w,
          h,
          pts = [];
        function resize() {
          w = canvas.width = canvas.offsetWidth;
          h = canvas.height = canvas.offsetHeight;
        }
        function init() {
          resize();
          const count = reduceMotion ? 0 : Math.min(60, Math.floor(w / 22));
          pts = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            r: Math.random() * 1.6 + 0.6,
          }));
        }
        function draw() {
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = "rgba(228,201,131,0.55)";
          pts.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.strokeStyle = "rgba(200,162,74,0.12)";
          for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
              const dx = pts[i].x - pts[j].x,
                dy = pts[i].y - pts[j].y;
              const d = Math.hypot(dx, dy);
              if (d < 110) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
              }
            }
          }
          if (!reduceMotion) requestAnimationFrame(draw);
        }
        window.addEventListener("resize", init);
        init();
        draw();
      })();

      /* Node canvas (research section) */
      (function nodes() {
        const canvas = document.getElementById("nodeCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w,
          h,
          pts = [];
        function resize() {
          w = canvas.width = canvas.offsetWidth;
          h = canvas.height = canvas.offsetHeight;
        }
        function init() {
          resize();
          const count = reduceMotion ? 12 : 26;
          pts = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: Math.random() * 2 + 1,
          }));
        }
        function draw() {
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = "#e4c983";
          pts.forEach((p) => {
            if (!reduceMotion) {
              p.x += p.vx;
              p.y += p.vy;
            }
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.strokeStyle = "rgba(228,201,131,0.18)";
          for (let i = 0; i < pts.length; i++)
            for (let j = i + 1; j < pts.length; j++) {
              const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
              if (d < 130) {
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
              }
            }
          if (!reduceMotion) requestAnimationFrame(draw);
        }
        window.addEventListener("resize", init);
        init();
        draw();
      })();

      /* Course filter */
      const chips = document.querySelectorAll(".filter-chip");
      const cards = document.querySelectorAll("#courseGrid .course-card");
      chips.forEach((chip) =>
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("active"));
          chip.classList.add("active");
          const f = chip.dataset.filter;
          cards.forEach((card) => {
            const show = f === "all" || card.dataset.cat === f;
            card.style.display = show ? "" : "none";
          });
        }),
      );

      /* Contact form validation */
      const form = document.getElementById("contactForm");
      const submitBtn = document.getElementById("submitBtn");
      function validateField(field) {
        const input = field.querySelector("input,textarea");
        let valid = input.value.trim().length > 0;
        if (field.dataset.field === "email") {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
        }
        if (field.dataset.field === "phone") {
          valid = /^[0-9+\-\s]{7,15}$/.test(input.value.trim());
        }
        field.classList.toggle("error", !valid);
        return valid;
      }
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll(".field");
        let allValid = true;
        fields.forEach((f) => {
          if (!validateField(f)) allValid = false;
        });
        if (!allValid) return;
        submitBtn.textContent = "Sending…";
        setTimeout(() => {
          submitBtn.classList.add("success");
          submitBtn.textContent = "Message sent ✓";
          setTimeout(() => {
            form.reset();
            submitBtn.classList.remove("success");
            submitBtn.textContent = "Send message";
          }, 2200);
        }, 700);
      });
      form.querySelectorAll("input,textarea").forEach((el) => {
        el.addEventListener("blur", () => validateField(el.closest(".field")));
      });

(function () {
        /* =========================================================
   Kashi AI — demo knowledge base (sourced from this page's
   own content). No live backend / official data connected.
   ========================================================= */
        const KAI_KB = [
          {
            id: "about",
            keywords: [
              "about",
              "college",
              "institution",
              "jssaten",
              "history",
              "established",
              "when was it founded",
              "who are you",
              "what is this college",
            ],
            answer: `<b>JSS Academy of Technical Education, Noida (JSSATEN)</b> is presented on this site as a technical institution located in Sector-62, Noida, established in 1998 and affiliated to Dr. A.P.J. Abdul Kalam Technical University. You can see the full write-up in the <b>About</b> section.`,
            nav: "about",
          },
          {
            id: "vision",
            keywords: ["vision", "mission", "purpose", "goal", "philosophy"],
            answer: `The <b>Vision &amp; Mission</b> section covers the institution's stated vision (outcome-based education empowering students with knowledge, skills, research, aptitude and ethical values) and three mission pillars: Technological Competence, Research &amp; Innovation, and Ethics &amp; Positive Attitude.`,
            nav: "vision",
          },
          {
            id: "academics",
            keywords: [
              "academics",
              "course",
              "courses",
              "programme",
              "program",
              "degree",
              "btech",
              "mca",
              "mba",
              "undergraduate",
              "postgraduate",
              "branches",
              "stream",
              "study",
            ],
            answer: `The <b>Academics</b> section lists sample undergraduate and postgraduate programme cards (like B.Tech, MCA, MBA) with filters for Undergraduate, Postgraduate and Other Programmes. These are demo entries for this practice project — not a confirmed current course list.`,
            nav: "academics",
          },
          {
            id: "facilities",
            keywords: [
              "facilities",
              "campus",
              "hostel",
              "library",
              "lab",
              "laboratory",
              "infrastructure",
              "amenities",
              "boys hostel",
              "girls hostel",
            ],
            answer: `The <b>Campus Life / Facilities</b> section showcases cards for the campus, hostels, library, laboratories, innovation spaces, student support and campus activities.`,
            nav: "facilities",
          },
          {
            id: "research",
            keywords: [
              "research",
              "innovation",
              "r&d",
              "projects",
              "idea lab",
              "innovation council",
            ],
            answer: `The <b>Research</b> section highlights Research &amp; Development, innovation initiatives, student projects and the innovation ecosystem shown on this page.`,
            nav: "research",
          },
          {
            id: "placements",
            keywords: [
              "placement",
              "placements",
              "job",
              "career",
              "package",
              "salary",
              "training and placement",
            ],
            answer: `The <b>Placements</b> section describes the training &amp; placement approach. The placement rate, recruiter count and package figures shown are placeholders — I don't have verified real placement numbers.`,
            nav: "placements",
          },
          {
            id: "recruiters",
            keywords: ["recruiter", "recruiters", "companies", "who recruits"],
            answer: `The scrolling logo strip in the Placements section is where recruiter logos are displayed. On this demo they're placeholder pills — not a confirmed recruiter list.`,
            nav: "recruiters",
          },
          {
            id: "highlights",
            keywords: [
              "achievement",
              "achievements",
              "accreditation",
              "accredited",
              "aicte",
              "nba",
              "nirf",
              "ranking",
              "rating",
              "recognition",
              "highlight",
              "highlights",
            ],
            answer: `The <b>Highlights</b> section lists institutional recognitions referenced on this page (AICTE approval, NBA accreditation, NIRF participation, QS I-GAUGE rating, Smart India Hackathon nodal centre status, and more). Treat these as sample content pending verification.`,
            nav: "highlights",
          },
          {
            id: "announcements",
            keywords: [
              "announcement",
              "announcements",
              "update",
              "updates",
              "news",
              "latest",
            ],
            answer: `Recent updates are shown in the <b>Latest Updates</b> section, plus the scrolling ticker near the top of the page. These are demo announcements for this project.`,
            nav: "announcements",
          },
          {
            id: "admissions",
            keywords: [
              "admission",
              "admissions",
              "apply",
              "how to apply",
              "eligibility",
              "entrance",
              "application",
            ],
            answer: `The <b>Admissions</b> section is the call-to-action area with "Apply Now" and "Contact Admissions" buttons. I don't have real eligibility criteria or deadlines to share for this demo.`,
            nav: "admissions",
          },
          {
            id: "contact",
            keywords: [
              "contact",
              "address",
              "location",
              "where is",
              "phone",
              "email",
              "reach",
              "map",
            ],
            answer: `The <b>Contact</b> section shows the address listed on this page (Sector-62, Noida) along with a contact form. The phone number and email shown are placeholders for this practice project.`,
            nav: "contact",
          },
          {
            id: "fees",
            keywords: ["fee", "fees", "fee structure", "tuition", "cost"],
            answer: `I don't currently have verified fee information in my website knowledge. You can explore the available sections, or try asking me about academics, facilities, research, placements, admissions, announcements or contact information.`,
          },
          {
            id: "stats",
            keywords: [
              "how many students",
              "student count",
              "faculty count",
              "how many faculty",
              "strength",
            ],
            answer: `This page shows sample figures (4000+ students, 250+ faculty, 28-acre campus, 25+ years) in the Quick Highlights section — these are demo statistics for this practice project, not confirmed official numbers.`,
          },
          {
            id: "help",
            keywords: [
              "what can you do",
              "help",
              "what can you help",
              "capabilities",
            ],
            answer: `I can help you explore this website! Ask me about the college, academics, courses, facilities, research, placements, admissions, announcements or contact information — I can also take you directly to a section. Try "take me to placements" or tap a chip below.`,
          },
          {
            id: "official",
            keywords: [
              "official",
              "is this real",
              "is this accurate",
              "real data",
              "is this true",
              "accurate",
            ],
            answer: `This chatbot is part of a frontend practice project. The information displayed here may include sample or demo content and should not be considered official college information.`,
          },
          {
            id: "greeting",
            keywords: [
              "hi",
              "hello",
              "hey",
              "namaste",
              "good morning",
              "good evening",
            ],
            answer: `Hi there! Ask me about academics, facilities, research, placements, admissions or contact info — or tell me where you'd like to go, like "take me to research".`,
          },
          {
            id: "thanks",
            keywords: [
              "thanks",
              "thank you",
              "great",
              "helpful",
              "nice",
              "cool",
            ],
            answer: `You're welcome! Let me know if there's anything else you'd like to explore on the site.`,
          },
        ];

        const KAI_FALLBACK = `I currently don't have that information in my website knowledge. You can explore the available sections, or try asking me about academics, facilities, research, placements, admissions, announcements or contact information.`;

        /* Section navigation map -> element id on this page */
        const KAI_SECTION_MAP = {
          home: "home",
          about: "about",
          vision: "vision",
          mission: "vision",
          academics: "academics",
          courses: "academics",
          facilities: "facilities",
          campus: "facilities",
          research: "research",
          placements: "placements",
          recruiters: "recruiters",
          announcements: "announcements",
          updates: "announcements",
          highlights: "highlights",
          achievements: "highlights",
          admissions: "admissions",
          contact: "contact",
        };
        const KAI_SECTION_LABELS = {
          home: "Home",
          about: "About",
          vision: "Vision &amp; Mission",
          academics: "Academics",
          facilities: "Facilities",
          research: "Research",
          placements: "Placements",
          recruiters: "Recruiters",
          announcements: "Announcements",
          highlights: "Highlights",
          admissions: "Admissions",
          contact: "Contact",
        };

        function kaiNormalize(str) {
          return str
            .toLowerCase()
            .replace(/[^\w\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        }

        function kaiDetectNav(query) {
          const q = kaiNormalize(query);
          const goPhrases = [
            "take me to",
            "go to",
            "navigate to",
            "show me",
            "scroll to",
            "open the",
            "open ",
          ];
          const isNavIntent = goPhrases.some((p) => q.includes(p));
          for (const key in KAI_SECTION_MAP) {
            if (q.includes(key)) {
              if (isNavIntent || q.split(" ").length <= 3) return key;
            }
          }
          return null;
        }

        function kaiMatchKB(query) {
          const q = kaiNormalize(query);
          const tokens = q.split(" ").filter(Boolean);
          let best = null,
            bestScore = 0;
          KAI_KB.forEach((entry) => {
            let score = 0;
            entry.keywords.forEach((kw) => {
              const kwNorm = kaiNormalize(kw);
              if (q.includes(kwNorm)) score += kwNorm.split(" ").length * 2;
              else
                kwNorm.split(" ").forEach((t) => {
                  if (tokens.includes(t)) score += 1;
                });
            });
            if (score > bestScore) {
              bestScore = score;
              best = entry;
            }
          });
          return bestScore > 0 ? best : null;
        }

        /* ===== DOM refs ===== */
        const launcher = document.getElementById("kaiLauncher");
        const win = document.getElementById("kaiWindow");
        const body = document.getElementById("kaiBody");
        const form = document.getElementById("kaiForm");
        const input = document.getElementById("kaiInput");
        const sendBtn = document.getElementById("kaiSend");
        const minBtn = document.getElementById("kaiMinBtn");
        const closeBtn = document.getElementById("kaiCloseBtn");
        const suggestRow = document.getElementById("kaiSuggest");
        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        let seeded = false;

        function kaiOpen() {
          win.classList.add("open");
          win.classList.remove("minimized");
          win.setAttribute("aria-hidden", "false");
          launcher.setAttribute("aria-expanded", "true");
          if (!seeded) {
            kaiSeed();
            seeded = true;
          }
          setTimeout(() => input.focus(), 250);
        }
        function kaiClose() {
          win.classList.remove("open");
          win.setAttribute("aria-hidden", "true");
          launcher.setAttribute("aria-expanded", "false");
        }
        function kaiToggleMinimize() {
          win.classList.toggle("minimized");
        }
        launcher.addEventListener("click", () => {
          win.classList.contains("open") ? kaiClose() : kaiOpen();
        });
        closeBtn.addEventListener("click", kaiClose);
        minBtn.addEventListener("click", kaiToggleMinimize);
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && win.classList.contains("open")) kaiClose();
        });

        function kaiAddMsg(role, html) {
          const row = document.createElement("div");
          row.className = "kai-row " + role;
          const av = document.createElement("div");
          av.className = "kai-mav";
          av.textContent = role === "bot" ? "K" : "Y";
          const bubble = document.createElement("div");
          bubble.className = "kai-bubble";
          bubble.innerHTML = html;
          row.appendChild(av);
          row.appendChild(bubble);
          body.appendChild(row);
          body.scrollTop = body.scrollHeight;
          return bubble;
        }
        function kaiShowTyping() {
          const row = document.createElement("div");
          row.className = "kai-typing";
          row.id = "kaiTypingRow";
          row.innerHTML = `<div class="kai-mav" style="background:linear-gradient(155deg,var(--gold-300),var(--gold-500));color:var(--navy-950);">K</div>
    <div class="kai-typing-dots"><span></span><span></span><span></span></div>`;
          body.appendChild(row);
          body.scrollTop = body.scrollHeight;
        }
        function kaiHideTyping() {
          const r = document.getElementById("kaiTypingRow");
          if (r) r.remove();
        }
        function kaiEscape(str) {
          const d = document.createElement("div");
          d.textContent = str;
          return d.innerHTML;
        }

        function kaiGoToSection(sectionKey) {
          const targetId = KAI_SECTION_MAP[sectionKey];
          const el = document.getElementById(targetId);
          if (!el) return false;
          el.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
          el.classList.remove("nav-flash");
          void el.offsetWidth;
          el.classList.add("nav-flash");
          setTimeout(() => el.classList.remove("nav-flash"), 1700);
          return true;
        }

        function kaiRespond(query) {
          kaiAddMsg("user", kaiEscape(query));
          input.value = "";
          sendBtn.disabled = true;
          kaiShowTyping();
          const delay = reduceMotion ? 50 : 450 + Math.random() * 450;
          setTimeout(() => {
            kaiHideTyping();
            const navKey = kaiDetectNav(query);
            if (navKey) {
              const label =
                KAI_SECTION_LABELS[KAI_SECTION_MAP[navKey]] || navKey;
              kaiAddMsg(
                "bot",
                `Sure! Taking you to the ${label} section. ${navEmoji(navKey)}`,
              );
              kaiGoToSection(navKey);
            } else {
              const match = kaiMatchKB(query);
              kaiAddMsg("bot", match ? match.answer : KAI_FALLBACK);
            }
            sendBtn.disabled = false;
            input.focus();
          }, delay);
        }
        function navEmoji(key) {
          const map = {
            placements: "💼",
            admissions: "📩",
            contact: "📍",
            research: "🔬",
            facilities: "🏫",
            academics: "📚",
            announcements: "📢",
          };
          return map[key] || "➡️";
        }

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const val = input.value.trim();
          if (!val) return;
          kaiRespond(val);
        });

        suggestRow.querySelectorAll(".kai-chip").forEach((chip) => {
          chip.addEventListener("click", () => kaiRespond(chip.dataset.q));
        });

        function kaiSeed() {
          kaiAddMsg(
            "bot",
            `Hi! 👋 I'm <b>Kashi AI</b>, your college website assistant. I can help you explore information about academics, courses, facilities, research, placements, admissions and more. What would you like to know?`,
          );
        }
      })();

