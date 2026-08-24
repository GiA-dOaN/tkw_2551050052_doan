export function initPricingToggle() {
  const toggle = document.querySelector(".pricing-switch");
  const priceEls = document.querySelectorAll("[data-price]");
  const suffixEls = document.querySelectorAll("[data-price-suffix]");
  if (!toggle || !priceEls.length) return;

  const dong = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  function render(yearly) {
    priceEls.forEach((el) => {
      const value = Number(yearly ? el.dataset.yearly : el.dataset.monthly);
      el.textContent = dong.format(value);
    });
    suffixEls.forEach((el) => {
      el.textContent = yearly ? "/năm" : "/tháng";
    });
  }

  toggle.addEventListener("click", () => {
    const yearly = toggle.getAttribute("aria-checked") !== "true";
    toggle.setAttribute("aria-checked", String(yearly));
    render(yearly);
  });

  render(false);
}

export function initPricingReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  });

  items.forEach((el) => observer.observe(el));
}