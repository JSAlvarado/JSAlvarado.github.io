// ---- Mobile menu: show/hide the nav links on small screens ----
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
// Close the menu after picking a section
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  })
);

// ---- Highlight the nav link for the section on screen ----
const sections = document.querySelectorAll("main section[id]");
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.querySelectorAll("a").forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

// ---- Reveal each block on its own as it scrolls into view ----
// Browsers with scroll-linked CSS animation do the motion in CSS; the observers below are only the fallback
const scrollLinked = window.CSS && CSS.supports("animation-timeline: view()");
const revealTargets = document.querySelectorAll([
  "main section:not(.contact) h2", ".about p", ".job", ".kicker", ".project",
  ".awards > .award", ".project-block > .gallery > figure", ".mini-projects > .card",
  ".skills > div", ".edu > .card", ".two-col > div", "#recognition .gallery > figure",
  "#goals > .lede", ".timeline > li", ".contact > div"
].join(", "));
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -8% 0px" }
);
revealTargets.forEach((el) => {
  el.classList.add("reveal");
  if (!scrollLinked) revealObserver.observe(el);
});

// ---- Photos start gray and fill with color as they come into view ----
const toneObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        toneObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.35 }
);
document.querySelectorAll(".gallery img, .project-photo img").forEach((img) => {
  img.classList.add("tone");
  if (!scrollLinked) toneObserver.observe(img);
});

// ---- Copy email button ----
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied!";
    } catch {
      btn.textContent = "Copy failed";
    }
    setTimeout(() => (btn.textContent = "Copy"), 2000);
  });
});

// ---- Lightbox: click a gallery photo to see it full size ----
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<img alt="">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector("img");

let lastFocused = null;
function openLightbox(img) {
  lastFocused = img;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add("open");
}
function closeLightbox() {
  if (!lightbox.classList.contains("open")) return;
  lightbox.classList.remove("open");
  if (lastFocused) lastFocused.focus();
}

// Photos open with a click, or with Enter/Space for keyboard users
document.querySelectorAll(".gallery img, .project-photo img").forEach((img) => {
  img.tabIndex = 0;
  img.setAttribute("role", "button");
  img.addEventListener("click", () => openLightbox(img));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(img);
    }
  });
});
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
