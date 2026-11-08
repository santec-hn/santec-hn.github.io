// Santec · base común de las apps: navegación, estado guardado, panel/ventana y avisos.
// Uso: SantecApp({ id, nombre:"Lava<span>Fácil</span>", sub:"Carwash", tabs:[[ruta,"Texto",icono]], vistas:{ruta(arg){return html}}, semilla:()=>({...}) })
const ICONOS = {
  agenda: '<path d="M3 5h18v16H3zM3 10h18M8 3v4M16 3v4"/>',
  plus: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4a3.5 3.5 0 0 1 0 7M22 20c0-3-2-5-5-5.7"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  car: '<path d="M5 17h14M3 13l2-6h14l2 6v5h-3M3 13v5h3M3 13h18"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/>',
  drop: '<path d="M12 3s7 7 7 12a7 7 0 0 1-14 0c0-5 7-12 7-12z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  table: '<rect x="3" y="7" width="18" height="4" rx="1"/><path d="M6 11v8M18 11v8"/>',
  fire: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  menu: '<path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>',
};
const ico = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[n] || ""}</svg>`;
const L = (n) => "L " + Math.round(n).toLocaleString("es-HN");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ahora = () => { const d = new Date(); return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0"); };
const mins = (t) => { const [h, m] = String(t).split(":").map(Number); return h * 60 + (m || 0); };
const hhmm = (m) => Math.floor(m / 60) + ":" + String(m % 60).padStart(2, "0");
const iniciales = (n) => String(n).split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function SantecApp(cfg) {
  const $ = (i) => document.getElementById(i);
  const KEY = "santec-" + cfg.id + "-v1";
  let S;
  try { S = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (!S) S = cfg.semilla();
  const app = {
    get S() { return S; },
    save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} },
    go(h) { location.hash = h; },
    toast(t) { const el = $("toast"); el.textContent = t; el.classList.add("on"); clearTimeout(app._t); app._t = setTimeout(() => el.classList.remove("on"), 2400); },
    hero(t, sub, back) {
      return `<header class="hero"><div class="top">${back ? `<button class="back" onclick="history.back()">← Atrás</button>` : `<div class="logo">${cfg.nombre}</div>`}<span class="pill">${cfg.pill || "Demo · Santec"}</span></div>
        <h1>${t}</h1>${sub ? `<p>${sub}</p>` : ""}</header>`;
    },
    sheet(html) { $("sheet").innerHTML = html; document.body.classList.add("sheet-open"); setTimeout(() => $("sheet").querySelector("button,input,select")?.focus(), 350); },
    cerrar() { document.body.classList.remove("sheet-open"); },
    render() {
      const [r, a] = (location.hash.slice(1) || cfg.tabs[0][0]).split("/");
      const vista = cfg.vistas[r] || cfg.vistas[cfg.tabs[0][0]];
      $("view").innerHTML = vista(a) + `<p class="demo-note">Demo de Santec · los datos se guardan solo en este dispositivo · <button type="button" onclick="SANTEC.reiniciar()">Reiniciar demo</button></p>`;
      const activo = (t) => t[0] === r || (cfg.padre && cfg.padre[r] === t[0]);
      const badge = (t) => { const n = cfg.badges?.[t[0]]?.(); return n ? `<span class="badge">${n}</span>` : ""; };
      $("tabs").innerHTML = cfg.tabs.map((t) => `<button class="${activo(t) ? "on" : ""}" onclick="SANTEC.go('#${t[0]}')" aria-label="${t[1]}">${ico(t[2])}${badge(t)}${t[1]}</button>`).join("");
      $("side").innerHTML = `<div class="logo">${cfg.nombre}</div>` + cfg.tabs.map((t) => `<button class="${activo(t) ? "on" : ""}" onclick="SANTEC.go('#${t[0]}')">${ico(t[2])}${t[1]}${badge(t)}</button>`).join("") +
        `<div class="foot">${cfg.negocio || ""}<br>Hecho por Santec · Honduras</div>`;
      if (app._ruta !== r + "/" + (a || "")) scrollTo(0, 0);   // solo al cambiar de sección
      app._ruta = r + "/" + (a || "");
      cfg.despues?.(r, a);
    },
    reiniciar() { S = cfg.semilla(); app.save(); app.cerrar(); app.render(); app.toast("Demo reiniciada"); },
  };
  window.SANTEC = app;
  document.title = cfg.titulo;
  document.body.insertAdjacentHTML("afterbegin", `<div class="shell"><aside class="side" id="side"></aside><div class="content"><div id="view"></div></div></div>
    <nav class="tabs" id="tabs"></nav><div class="sheet-bg" id="sheetbg"></div><section class="sheet" id="sheet" role="dialog" aria-modal="true"></section><div class="toast" id="toast" role="status"></div>`);
  $("sheetbg").addEventListener("click", app.cerrar);
  addEventListener("keydown", (e) => { if (e.key === "Escape") app.cerrar(); });
  addEventListener("hashchange", () => { app.cerrar(); app.render(); });
  app.render();
  return app;
}
