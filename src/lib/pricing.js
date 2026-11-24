// Lógica de precios y utilidades de formato

export const PRECIO_INDIVIDUAL = 15000;
export const PRECIO_MAYORISTA_10 = 9500;
export const PRECIO_MAYORISTA_20 = 9000;

export function formatARS(n) {
  return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getUnitPrice(totalUnits) {
  if (totalUnits >= 20) return PRECIO_MAYORISTA_20;
  if (totalUnits >= 10) return PRECIO_MAYORISTA_10;
  return PRECIO_INDIVIDUAL;
}

export function getTierLabel(totalUnits) {
  if (totalUnits >= 20) return "Mayorista 20+";
  if (totalUnits >= 10) return "Mayorista 10+";
  return "Individual";
}

// Mensaje de la barra superior según cantidad en el carrito
export function getPriceBarMessage(x) {
  if (x <= 0) {
    return `Precios: ${formatARS(PRECIO_INDIVIDUAL)} c/u • 10+ unid: ${formatARS(PRECIO_MAYORISTA_10)} c/u • 20+ unid: ${formatARS(PRECIO_MAYORISTA_20)} c/u`;
  }
  if (x < 10) {
    return `Llevás ${x} unid. (${formatARS(PRECIO_INDIVIDUAL)} c/u) — ¡Sumá ${10 - x} más y bajás todos a ${formatARS(PRECIO_MAYORISTA_10)} c/u!`;
  }
  if (x < 20) {
    return `¡Tarifa Mayorista activa! (${formatARS(PRECIO_MAYORISTA_10)} c/u) — Sumá ${20 - x} más para bajarlos a ${formatARS(PRECIO_MAYORISTA_20)} c/u`;
  }
  return `¡Precio Mayorista Máximo activo! (${formatARS(PRECIO_MAYORISTA_20)} c/u)`;
}

export function normalizeText(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}
