(() => {
  const sections = [
    ["Home", "home"],
    ["About", "about"],
    ["Vision & Mission", "vision"],
    ["Academics", "academics"],
    ["Admissions", "admissions"],
    ["Campus Life", "campus"],
    ["Research", "research"],
    ["Placements", "placements"],
    ["Facilities", "facilities"],
    ["Contact", "contact"],
  ];

  const style = document.createElement("style");
  style.textContent = `
    .site-assistant-launcher { position:fixed; left:24px; bottom:24px; z-index:950; border:0; border-radius:999px; padding:13px 17px; background:#162552; color:#fff; box-shadow:0 8px 24px #07122d55; cursor:pointer; font:700 13px Manrope, sans-serif; }
    .site-assistant-panel { position:fixed; left:24px; bottom:78px; z-index:951; width:min(310px,calc(100vw - 32px)); padding:18px; border-radius:18px; background:#fff; box-shadow:0 14px 40px #07122d35; display:none; font-family:Manrope, sans-serif; }
    .site-assistant-panel.open { display:block; }
    .site-assistant-panel h3 { margin:0 0 5px; color:#162552; font-size:16px; }
    .site-assistant-panel p { margin:0 0 12px; color:#5c6372; font-size:12px; }
    .site-assistant-links { display:grid; grid-template-columns:1fr 1fr; gap:7px; }
    .site-assistant-links button { border:1px solid #e3e5eb; border-radius:9px; background:#fafafa; color:#162552; padding:9px 7px; cursor:pointer; font:600 12px Manrope, sans-serif; }
    .site-assistant-links button:hover { background:#f1e4bd; }
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.className = "site-assistant-launcher";
  launcher.type = "button";
  launcher.textContent = "☰ Website Assistant";
  launcher.setAttribute("aria-expanded", "false");

  const panel = document.createElement("div");
  panel.className = "site-assistant-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Website navigation assistant");
  panel.innerHTML = `<h3>Website Assistant</h3><p>Choose a section and I will take you there.</p><div class="site-assistant-links"></div>`;

  const links = panel.querySelector(".site-assistant-links");
  sections.forEach(([label, id]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        target.classList.remove("nav-flash");
        void target.offsetWidth;
        target.classList.add("nav-flash");
      }
      panel.classList.remove("open");
      launcher.setAttribute("aria-expanded", "false");
    });
    links.appendChild(button);
  });

  launcher.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    launcher.setAttribute("aria-expanded", String(open));
  });

  document.body.append(launcher, panel);
})();
