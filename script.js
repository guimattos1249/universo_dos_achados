// Cole abaixo a URL completa do grupo, por exemplo:
// const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/SEU_CODIGO";
const WHATSAPP_GROUP_URL = "";

const groupLinks = document.querySelectorAll(".js-group-link");
const toast = document.querySelector(".toast");
let toastTimer;

groupLinks.forEach((link) => {
  if (WHATSAPP_GROUP_URL) {
    link.href = WHATSAPP_GROUP_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();
    clearTimeout(toastTimer);
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3600);
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

const mobileBar = document.querySelector(".mobile-bar");
const hero = document.querySelector(".hero");
const footer = document.querySelector(".final-cta");

if (mobileBar && hero && footer && "IntersectionObserver" in window) {
  let heroVisible = true;
  let footerVisible = false;

  const updateMobileBar = () => {
    mobileBar.classList.toggle("is-visible", !heroVisible && !footerVisible);
  };

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === hero) heroVisible = entry.isIntersecting;
      if (entry.target === footer) footerVisible = entry.isIntersecting;
    });
    updateMobileBar();
  }, { threshold: 0 });

  visibilityObserver.observe(hero);
  visibilityObserver.observe(footer);
}
