// Catálogo de apps (aplicaciones.html): todas las apps en una cuadrícula compacta.
// Los datos vienen de apps-data.js (APPS, WA, DEMO), los mismos que usa la portada.

/* ---------- Tarjetas ---------- */
const grid = document.getElementById("catalogo");
grid.innerHTML = APPS.map((a) => `
  <article class="app-tile" id="${a.id}">
    <div class="app-tile-shot">
      <img src="assets/img/${a.shot}.webp" alt="Pantalla de ${a.name}" loading="lazy" decoding="async">
      <span class="card-icon" aria-hidden="true"><svg><use href="#${a.icon}"/></svg></span>
    </div>
    <div class="app-tile-body">
      <span class="card-tag">${a.tag}${a.nuevo ? ` <em class="new-tag">Nuevo</em>` : ""}</span>
      <h2>${a.name}</h2>
      <p>${a.desc}</p>
      <ul>${a.feats.map((f) => `<li>${f}</li>`).join("")}</ul>
      <div class="card-actions">
        <a class="btn-circle demo" href="${DEMO(a)}" target="_blank" rel="noopener"><span class="circle"><svg><use href="#i-arrow-up"/></svg></span>Probar demo</a>
        ${a.video === false ? "" : `<button class="text-link" type="button" data-video="${a.id}">Ver video <svg><use href="#i-play"/></svg></button>`}
        <a class="text-link" href="${WA}?text=${encodeURIComponent(`Hola Santec, me interesa la app ${a.name}`)}" target="_blank" rel="noopener">La quiero <svg><use href="#i-arrow-up"/></svg></a>
      </div>
    </div>
  </article>`).join("");

// Si se llega desde la portada con #id-de-la-app, ir a esa tarjeta y resaltarla un momento
const destino = location.hash && document.getElementById(location.hash.slice(1));
if (destino) {
  requestAnimationFrame(() => {
    destino.scrollIntoView({ block: "center" });
    destino.classList.add("flash");
    setTimeout(() => destino.classList.remove("flash"), 2200);
  });
}

/* ---------- Video ---------- */
const modal = document.getElementById("videoModal");
const video = modal.querySelector("video");
grid.addEventListener("click", (e) => {
  const b = e.target.closest("[data-video]");
  if (!b) return;
  video.src = `assets/video/${b.dataset.video}.mp4`;
  modal.showModal();
  video.play().catch(() => {});
});
const cerrarVideo = () => { video.pause(); video.removeAttribute("src"); video.load(); modal.close(); };
modal.querySelector(".modal-close").addEventListener("click", cerrarVideo);
modal.addEventListener("click", (e) => { if (e.target === modal) cerrarVideo(); });
modal.addEventListener("close", () => video.pause());

/* ---------- Navegación (igual que la portada) ---------- */
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

document.getElementById("year").textContent = new Date().getFullYear();
