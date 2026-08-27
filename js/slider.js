export function initSlider() {
  const root = document.getElementById("cam-nhan-slider");
  if (!root) return;

  const track = root.querySelector("#cam-nhan-track");
  const slides = Array.from(track.children);
  const dotsBox = root.querySelector("[data-slider-dots]");
  const prevBtn = root.querySelector("[data-slider-prev]");
  const nextBtn = root.querySelector("[data-slider-next]");

  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 6000;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Đi tới cảm nhận ${i + 1}`);
    dot.className =
      "h-2.5 w-2.5 rounded-full bg-line transition-colors aria-current:bg-brand-600 dark:bg-line-invert";
    dot.addEventListener("click", () => go(i));
    dotsBox.appendChild(dot);
    return dot;
  });

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, i) => slide.toggleAttribute("inert", i !== index));
    dots.forEach((dot, i) => {
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function go(next) {
    index = (next + slides.length) % slides.length; // vong tron ca hai chieu
    render();
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(() => go(index + 1), AUTOPLAY_MS);
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  prevBtn.addEventListener("click", () => go(index - 1));
  nextBtn.addEventListener("click", () => go(index + 1));

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop); // ai do dang dung ban phim
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  render();
  start();
}