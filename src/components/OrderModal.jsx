import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "../data/perfumes.js";
import { PRECIO_INDIVIDUAL, formatARS, getTierLabel } from "../lib/pricing.js";

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.04c0-5.21 4.24-9.45 9.46-9.45 2.52 0 4.9.99 6.68 2.77a9.4 9.4 0 0 1 2.76 6.69c0 5.21-4.24 9.46-9.42 9.46zM20.52 3.45A11.35 11.35 0 0 0 12.05 0C5.78 0 .68 5.1.68 11.37c0 2 .52 3.96 1.52 5.69L.58 23l6.08-1.59a11.36 11.36 0 0 0 5.39 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.89-3.33-8.04z" />
    </svg>
  );
}

export function buildWhatsAppMessage({ items, totalUnits, unitPrice, total, ahorro, nombre, modalidad, direccion, notas }) {
  const lines = [];
  lines.push("*🛍️ NUEVO PEDIDO — OUDRA PERFUMERÍA*");
  lines.push("");
  lines.push(`*Cliente:* ${nombre.trim()}`);
  lines.push(`*Modalidad:* ${modalidad === "envio" ? "Envío a domicilio" : "Retiro"}`);
  if (modalidad === "envio" && direccion.trim()) {
    lines.push(`*Localidad / Dirección:* ${direccion.trim()}`);
  }
  lines.push("");
  lines.push("*Detalle del pedido:*");
  for (const it of items) {
    lines.push(`• ${it.cantidad} x ${it.nombre} (${it.categoria})`);
  }
  lines.push("");
  lines.push(`*Total de perfumes:* ${totalUnits}`);
  lines.push(`*Tarifa aplicada:* ${getTierLabel(totalUnits)}`);
  lines.push(`*Precio unitario:* ${formatARS(unitPrice)}`);
  if (ahorro > 0) lines.push(`*Ahorro:* ${formatARS(ahorro)}`);
  lines.push(`*TOTAL A PAGAR:* ${formatARS(total)}`);
  if (notas.trim()) {
    lines.push("");
    lines.push(`*Notas:* ${notas.trim()}`);
  }
  lines.push("");
  lines.push("¡Gracias! Quedo atento/a a la confirmación. 🙌");
  return lines.join("\n");
}

export default function OrderModal({ items, totalUnits, unitPrice, total, onInc, onDec, onRemove, onClose }) {
  const [nombre, setNombre] = useState("");
  const [modalidad, setModalidad] = useState("retiro");
  const [direccion, setDireccion] = useState("");
  const [notas, setNotas] = useState("");
  const [error, setError] = useState("");

  const ahorro = Math.max(0, totalUnits * PRECIO_INDIVIDUAL - total);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const send = () => {
    if (!nombre.trim()) {
      setError("Ingresá tu nombre para enviar el pedido.");
      return;
    }
    setError("");
    const text = buildWhatsAppMessage({
      items, totalUnits, unitPrice, total, ahorro, nombre, modalidad, direccion, notas,
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputCls =
    "w-full rounded-xl border border-oudra-border bg-oudra-bg px-3.5 py-3 text-white placeholder:text-oudra-muted focus:border-white focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Resumen del pedido">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-3xl border border-oudra-border bg-oudra-card sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-oudra-border px-5 py-4">
          <h2 className="font-serif text-2xl font-semibold tracking-wide">Tu pedido</h2>
          <button onClick={onClose} aria-label="Cerrar" className="flex h-9 w-9 items-center justify-center rounded-full text-oudra-muted hover:bg-oudra-border hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="divide-y divide-oudra-border">
            {items.map((it) => (
              <li key={it.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{it.nombre}</p>
                  <p className="text-xs text-oudra-muted">
                    {it.categoria} • {formatARS(unitPrice)} c/u
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => onDec(it.id)} aria-label="Restar" className="flex h-8 w-8 items-center justify-center rounded-md border border-oudra-border hover:bg-oudra-border">
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center text-sm font-semibold tabular-nums">{it.cantidad}</span>
                  <button onClick={() => onInc(it.id)} aria-label="Sumar" className="flex h-8 w-8 items-center justify-center rounded-md border border-oudra-border hover:bg-oudra-border">
                    <Plus size={15} />
                  </button>
                  <button onClick={() => onRemove(it.id)} aria-label={`Eliminar ${it.nombre}`} className="ml-1 flex h-8 w-8 items-center justify-center rounded-md text-oudra-muted hover:text-white">
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-2 rounded-xl border border-oudra-border bg-oudra-bg p-4 text-sm">
            <div className="flex justify-between text-oudra-muted">
              <span>{totalUnits} {totalUnits === 1 ? "perfume" : "perfumes"} • {getTierLabel(totalUnits)}</span>
              <span>{formatARS(unitPrice)} c/u</span>
            </div>
            {ahorro > 0 && (
              <div className="mt-2 flex justify-between font-medium text-white">
                <span>Ahorrás vs. precio individual</span>
                <span>{formatARS(ahorro)}</span>
              </div>
            )}
            <div className="mt-3 flex items-baseline justify-between border-t border-oudra-border pt-3">
              <span className="text-oudra-muted">Total</span>
              <span className="text-2xl font-semibold">{formatARS(total)}</span>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-oudra-muted" htmlFor="nombre">
                Nombre <span className="text-white">*</span>
              </label>
              <input
                id="nombre"
                className={inputCls}
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Tu nombre"
                autoComplete="name"
              />
              {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
            </div>

            <div>
              <span className="mb-1.5 block text-sm text-oudra-muted">Modalidad</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["retiro", "Retiro"],
                  ["envio", "Envío a domicilio"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setModalidad(val)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                      modalidad === val
                        ? "border-white bg-white text-black"
                        : "border-oudra-border bg-oudra-bg text-white"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {modalidad === "envio" && (
              <div>
                <label className="mb-1.5 block text-sm text-oudra-muted" htmlFor="dir">
                  Localidad / dirección (opcional)
                </label>
                <input id="dir" className={inputCls} value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Ej: José C. Paz, Calle 123" />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm text-oudra-muted" htmlFor="notas">
                Notas adicionales (opcional)
              </label>
              <textarea id="notas" rows={2} className={inputCls} value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Aclaraciones, horario, etc." />
            </div>
          </div>
        </div>

        <div className="border-t border-oudra-border p-4 [padding-bottom:max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={send}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-base font-semibold text-black active:scale-[0.98]"
          >
            <WhatsAppIcon />
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
