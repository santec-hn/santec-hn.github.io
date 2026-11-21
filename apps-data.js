// Datos de las apps de Santec: los usan la portada (index.html) y el catálogo (aplicaciones.html).
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
    feats: ["Alertas ciudadanas con ubicación y fotos", "Mapa de emergencias en tiempo real", "Gestión de unidades y estadísticas"] },
  { id: "tuturno", name: "TuTurno", tag: "Salones y barberías", icon: "i-scissors", shot: "tt-agenda", video: false, nuevo: true,
    desc: "Tus clientes reservan solos, a la hora que sí está libre, y les llega el recordatorio por WhatsApp.",
    feats: ["Agenda por barbero, estilista o manicurista", "Reservas en línea sin choques de horario", "Caja del día con comisión por profesional"] },
  { id: "lavafacil", name: "LavaFácil", tag: "Carwash", icon: "i-car", shot: "lf-cola", video: false, nuevo: true,
    desc: "Cada carro en su etapa, de la espera a la entrega, y el aviso de «tu carro está listo» por WhatsApp.",
    feats: ["Cola de lavado por bahías y etapas", "Placa con cliente frecuente y tarjeta de sellos", "Turnos, membresías y caja del día"] },
  { id: "mesalista", name: "MesaLista", tag: "Bares y restaurantes", icon: "i-glass", shot: "ml-mesas", video: false, nuevo: true,
    desc: "Mesas, comandas y cuentas en orden: la cocina y la barra reciben cada pedido al instante.",
    feats: ["Plano de mesas y comandas a cocina y barra", "Cuenta con ISV, propina y división entre personas", "Ventas por mesero y lo más vendido"] }
];
const DEMO = (a) => `apps/${a.id}/`;
