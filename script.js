const WA = "https://wa.me/50497458718";

const APPS = [
  { id: "taller-mecanico", name: "Taller Mecánico", tag: "Talleres", icon: "i-wrench", shot: "mw-inicio",
    desc: "Recibe cada vehículo en segundos, cotiza y avisa al cliente por WhatsApp con un solo toque.",
    feats: ["Órdenes por estado: diagnóstico, reparación, listo", "Historial de cada carro por placa", "Reporte semanal de ganancias"] },
  { id: "santi", name: "Santi", tag: "Asistente con IA", icon: "i-chat", shot: "st-chat",
    desc: "Responde a tus clientes de WhatsApp al instante, las 24 horas, aunque tú estés ocupado.",
    feats: ["Muestra tu menú y toma pedidos", "Agenda citas fuera de horario", "Lo entrenas sin programar"] },
  { id: "medicita", name: "MediCita", tag: "Clínicas", icon: "i-pulse", shot: "mc-agenda",
    desc: "Tu clínica o consultorio organizado, con menos citas perdidas y pacientes mejor atendidos.",
    feats: ["Reservas en línea desde el celular", "Recordatorios automáticos por WhatsApp", "Expediente digital y cierre de caja"] },
  { id: "cajafacil", name: "CajaFácil", tag: "Comercio", icon: "i-cart", shot: "cf-vender",
    desc: "Punto de venta para pulperías, tiendas y mini súper. Vende en segundos y controla tu inventario.",
    feats: ["Cobro en efectivo, tarjeta o transferencia", "Inventario que se descuenta solo", "Factura por WhatsApp"] },
  { id: "rescate360", name: "Rescate 360", tag: "Emergencias", icon: "i-siren", shot: "r3-inicio",
    desc: "Para bomberos, municipalidades y equipos de rescate: cada emergencia atendida más rápido.",
    feats: ["Alertas ciudadanas con ubicación y fotos", "Mapa de emergencias en tiempo real", "Gestión de unidades y estadísticas"] }
];

/* ---------- Tarjetas de apps ---------- */
const cards = document.getElementById("cards");
cards.innerHTML = APPS.map((a, i) => `
  <article class="card" style="--i:${i}">
    <div class="card-body">
      <span class="card-tag">${a.tag}</span>
      <h3>${a.name}</h3>
      <p>${a.desc}</p>
      <ul>${a.feats.map((f) => `<li>${f}</li>`).join("")}</ul>
      <div class="card-actions">
        <button class="btn-circle" data-video="${a.id}"><span class="circle"><svg><use href="#i-play"/></svg></span>Ver video</button>
        <a class="text-link" href="${WA}?text=${encodeURIComponent(`Hola Santec, me interesa la app ${a.name}`)}" target="_blank" rel="noopener">La quiero <svg><use href="#i-arrow-up"/></svg></a>
      </div>
    </div>
    <div class="card-shot"><img src="assets/img/${a.shot}.webp" alt="Pantalla de ${a.name}" loading="lazy"></div>
    <span class="card-icon" aria-hidden="true"><svg><use href="#${a.icon}"/></svg></span>
  </article>`).join("");

/* ---------- Reproductor de apps (sección Nosotros) ---------- */
(() => {
  const vid = document.getElementById("reelVideo");
  const list = document.getElementById("reelList");
  const soundBtn = document.getElementById("reelSound");
  const toggleBtn = document.getElementById("reelToggle");
  let cur = 0, visible = false, userPaused = false;

  list.innerHTML = APPS.map((a, i) => `
    <li><button class="reel-item" data-i="${i}">
      <span class="n">0${i + 1}</span>
      <span class="t">${a.name}<small>${a.tag}</small></span>
      <span class="thumb"><img src="assets/img/${a.shot}.webp" alt="" loading="lazy"></span>
      <span class="bar"></span>
    </button></li>`).join("");
  const items = [...list.querySelectorAll(".reel-item")];

  const play = () => { if (visible && !userPaused) vid.play().catch(() => {}); };
  const load = (i) => {
    cur = i;
    items.forEach((b, k) => { b.classList.toggle("on", k === i); b.querySelector(".bar").style.transform = "scaleX(0)"; });
    vid.poster = `assets/img/${APPS[i].shot}.webp`;
    vid.src = `assets/video/${APPS[i].id}.mp4`;
    vid.load();
    play();
  };

  items.forEach((b) => b.addEventListener("click", () => {
    userPaused = false; toggleBtn.classList.remove("paused");
    load(+b.dataset.i);
  }));
  vid.addEventListener("ended", () => load((cur + 1) % APPS.length));
  vid.addEventListener("timeupdate", () => {
    if (vid.duration) items[cur].querySelector(".bar").style.transform = `scaleX(${vid.currentTime / vid.duration})`;
  });

  soundBtn.addEventListener("click", () => {
    vid.muted = !vid.muted;
    soundBtn.classList.toggle("on", !vid.muted);
    soundBtn.setAttribute("aria-label", vid.muted ? "Activar sonido" : "Silenciar");
    if (!vid.muted) { userPaused = false; toggleBtn.classList.remove("paused"); play(); }
  });
  toggleBtn.addEventListener("click", () => {
    userPaused = !vid.paused;
    toggleBtn.classList.toggle("paused", userPaused);
    toggleBtn.setAttribute("aria-label", userPaused ? "Reproducir video" : "Pausar video");
    userPaused ? vid.pause() : play();
  });

  // Solo carga y reproduce cuando el reproductor está en pantalla
  let started = false;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; load(0); }
    else if (visible) play();
    else vid.pause();
  }, { threshold: 0.35 }).observe(vid);

  // Si se abre el video grande de una tarjeta, pausar este
  document.getElementById("videoModal").addEventListener("toggle", () => vid.pause());
})();

/* ---------- Títulos: dividir en palabras ---------- */
document.querySelectorAll(".split").forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w"><span style="transition-delay:${i * 70}ms">${w}</span></span>`).join(" ");
});

/* ---------- Aparición al hacer scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".split:not(.hero .split), .fade:not(.hero .fade), .facts").forEach((el) => io.observe(el));

const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Portada: las pantallas siguen al cursor (solo con mouse) ---------- */
if (!quieto && matchMedia("(pointer: fine)").matches) {
  const hero = document.querySelector(".hero");
  const screens = document.querySelector(".screens");
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    screens.style.setProperty("--px", `${(-x * 28).toFixed(1)}px`);
    screens.style.setProperty("--py", `${(-y * 20).toFixed(1)}px`);
  });
  hero.addEventListener("pointerleave", () => { screens.style.setProperty("--px", "0px"); screens.style.setProperty("--py", "0px"); });
}

/* ---------- Apps: al apilarse, cada tarjeta se aleja un poco detrás de la siguiente ---------- */
if (!quieto) {
  const pila = [...document.querySelectorAll(".card")];
  const escritorio = matchMedia("(min-width: 992px)");
  let pendiente = false;
  const profundidad = () => {
    pendiente = false;
    pila.forEach((c, i) => {
      const sig = pila[i + 1];
      if (!escritorio.matches || !sig) { c.style.transform = ""; c.style.filter = ""; return; }
      const a = c.getBoundingClientRect(), b = sig.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
      c.style.transform = p ? `scale(${(1 - p * 0.05).toFixed(4)})` : "";
      c.style.filter = p ? `brightness(${(1 - p * 0.35).toFixed(3)})` : "";
    });
  };
  addEventListener("scroll", () => { if (!pendiente) { pendiente = true; requestAnimationFrame(profundidad); } }, { passive: true });
  escritorio.addEventListener("change", profundidad);
}

// Entrada del hero
requestAnimationFrame(() => {
  document.body.classList.add("loaded");
  setTimeout(() => document.querySelectorAll(".hero .split, .hero .fade").forEach((el) => el.classList.add("in")), 350);
});

/* ---------- Línea de tiempo del proceso ---------- */
const steps = [...document.querySelectorAll(".step")];
const tl = [...document.querySelectorAll("#tlSteps li")];
const fill = document.getElementById("tlFill");
const setStep = (n) => {
  tl.forEach((li, i) => { li.classList.toggle("on", i === n); li.classList.toggle("done", i < n); });
  fill.style.height = `${(n / (tl.length - 1)) * 100}%`;
};
const stepIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); setStep(+e.target.dataset.step); }
  });
}, { rootMargin: "-45% 0px -45% 0px" });
steps.forEach((s) => stepIO.observe(s));
setStep(0);

/* ---------- Navegación ---------- */
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("scrolled", y > 40);
  nav.classList.toggle("hide", y > lastY && y > 400 && !nav.classList.contains("open"));
  lastY = y;
}, { passive: true });

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = "";
}));

// Enlace activo según la sección visible
const links = [...document.querySelectorAll("#navLinks a")];
const secIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${e.target.id}`));
  });
}, { rootMargin: "-50% 0px -50% 0px" });
["nosotros", "proceso", "apps", "contacto"].forEach((id) => secIO.observe(document.getElementById(id)));

/* ---------- Parallax suave en la franja de valores ---------- */
const vImg = document.querySelector(".values-media img");
const values = document.querySelector(".values");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addEventListener("scroll", () => {
    const r = values.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = (innerHeight - r.top) / (innerHeight + r.height);
    vImg.style.transform = `translateY(${(p - 0.5) * -12}%)`;
  }, { passive: true });
}

/* ---------- Video ---------- */
const modal = document.getElementById("videoModal");
const video = modal.querySelector("video");
cards.addEventListener("click", (e) => {
  const b = e.target.closest("[data-video]");
  if (!b) return;
  video.src = `assets/video/${b.dataset.video}.mp4`;
  modal.showModal();
  video.play().catch(() => {});
});
const closeModal = () => { video.pause(); video.removeAttribute("src"); video.load(); modal.close(); };
modal.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
modal.addEventListener("close", () => video.pause());

document.getElementById("year").textContent = new Date().getFullYear();
