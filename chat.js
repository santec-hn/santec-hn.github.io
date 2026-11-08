// Asistente de Santec: burbuja flotante que abre el chat del bot (el mismo que atiende por WhatsApp).
(() => {
  const BOT = "https://santec-bot.onrender.com";

  // El servidor gratuito se duerme tras 15 min sin uso: lo despertamos al entrar a la página
  // para que, cuando el visitante abra el chat, ya responda rápido.
  setTimeout(() => fetch(BOT + "/salud", { mode: "no-cors" }).catch(() => {}), 1500);

  const html = document.documentElement;
  const raiz = document.createElement("div");
  raiz.className = "sc";
  raiz.innerHTML = `
    <div class="sc-tip" role="status">
      <span><b>¿Tienes un proyecto?</b> Cotiza con el asistente</span>
      <button type="button" class="sc-tip-x" aria-label="Ocultar mensaje">×</button>
    </div>
    <section class="sc-panel" id="sc-panel" role="dialog" aria-modal="false" aria-label="Asistente de Santec" aria-hidden="true">
      <header class="sc-head">
        <div class="sc-av"><img src="assets/brand/santec-mark.png" alt=""></div>
        <div><b>Asistente Santec</b><small>En línea, responde al instante</small></div>
        <button type="button" class="sc-close" aria-label="Cerrar el chat">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </header>
      <div class="sc-body">
        <div class="sc-wait"><i></i><span>Conectando con el asistente…</span></div>
      </div>
    </section>
    <button type="button" class="sc-fab" aria-label="Abrir el chat con el asistente de Santec" aria-controls="sc-panel" aria-expanded="false">
      <svg class="sc-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>
      <svg class="sc-x" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
      <span class="sc-dot"></span>
    </button>`;
  document.body.append(raiz);

  const fab = raiz.querySelector(".sc-fab");
  const panel = raiz.querySelector(".sc-panel");
  const cuerpo = raiz.querySelector(".sc-body");
  const tip = raiz.querySelector(".sc-tip");
  let cargado = false;

  function abrir() {
    if (!cargado) {
      const frame = document.createElement("iframe");
      frame.src = BOT + "/chat?embed=1";
      frame.title = "Chat con el asistente de Santec";
      frame.addEventListener("load", () => cuerpo.querySelector(".sc-wait")?.remove());
      cuerpo.append(frame);
      cargado = true;
    }
    html.classList.add("sc-open");
    panel.setAttribute("aria-hidden", "false");
    fab.setAttribute("aria-expanded", "true");
    fab.setAttribute("aria-label", "Cerrar el chat");
    ocultarTip();
    setTimeout(() => cuerpo.querySelector("iframe")?.focus(), 300);
  }
  function cerrar() {
    html.classList.remove("sc-open");
    panel.setAttribute("aria-hidden", "true");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Abrir el chat con el asistente de Santec");
    fab.focus();
  }
  function ocultarTip() {
    tip.classList.remove("show");
    try { sessionStorage.setItem("sc-tip", "visto"); } catch {}
  }

  fab.addEventListener("click", () => (html.classList.contains("sc-open") ? cerrar() : abrir()));
  raiz.querySelector(".sc-close").addEventListener("click", cerrar);
  raiz.querySelector(".sc-tip-x").addEventListener("click", ocultarTip);
  tip.addEventListener("click", (e) => { if (!e.target.closest("button")) abrir(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && html.classList.contains("sc-open")) cerrar(); });
  // Cualquier botón de la página con data-chat abre el asistente
  document.addEventListener("click", (e) => { if (e.target.closest("[data-chat]")) { e.preventDefault(); abrir(); } });

  // Invitación discreta a los 6 segundos, una vez por visita
  let visto = false;
  try { visto = sessionStorage.getItem("sc-tip") === "visto"; } catch {}
  if (!visto) setTimeout(() => { if (!html.classList.contains("sc-open")) tip.classList.add("show"); }, 6000);
})();
