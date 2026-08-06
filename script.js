document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Année dans le footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Lien de nav actif au scroll ---------- */
  const navAnchors = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navAnchors)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const link = document.querySelector(`[data-nav][href="${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove("is-active"));
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Onglets Compétences (élément signature) ---------- */
  const tabs = document.querySelectorAll(".skills__tab");
  const panes = document.querySelectorAll(".skills__pane");
  const vizs = document.querySelectorAll(".viz");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      panes.forEach((p) => p.classList.toggle("is-active", p.dataset.pane === target));
      vizs.forEach((v) => v.classList.toggle("is-active", v.classList.contains(`viz--${target}`)));
    });
  });

  /* ---------- Reveal au scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Formulaire de contact ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("contactNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        note.textContent = "Merci de remplir tous les champs.";
        return;
      }

      const subject = encodeURIComponent(`Prise de contact de ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:[email protected]?subject=${subject}&body=${body}`;

      note.textContent = "Ton client mail va s'ouvrir pour finaliser l'envoi.";
      form.reset();
    });
  }

});
