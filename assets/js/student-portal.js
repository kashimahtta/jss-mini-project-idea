(() => {
  const form = document.getElementById("portalSearch");
  const input = document.getElementById("portalRollNumber");
  const result = document.getElementById("portalStudentName");
  if (!form || !input || !result) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rollNumber = input.value.trim().toUpperCase();
    if (rollNumber === "JSS2024CSE001") {
      result.textContent = "Aarav Sharma · JSS2024CSE001";
      result.dataset.found = "true";
    } else {
      result.textContent = "Demo record shown · try JSS2024CSE001";
      result.dataset.found = "false";
    }
  });
})();
