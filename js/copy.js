export function initCopy() {
  const buttons = document.querySelectorAll("[data-copy]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    const original = btn.textContent;
    let resetTimer = null;
    btn.setAttribute("aria-live", "polite");

    btn.addEventListener("click", async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return;
      }

      window.clearTimeout(resetTimer);
      btn.textContent = "Đã copy!";
      resetTimer = window.setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    });
  });
}