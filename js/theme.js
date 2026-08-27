export function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const isDark = () => document.documentElement.classList.contains("dark");

  function syncLabel() {
    const dark = isDark();
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute(
      "aria-label",
      dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
    );
  }

  syncLabel();

  toggle.addEventListener("click", () => {
    const dark = !isDark();
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    syncLabel();
  });
}