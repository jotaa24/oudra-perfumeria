import { ShoppingBag } from "lucide-react";
import { formatARS } from "../lib/pricing.js";

export default function CartBar({ totalUnits, unitPrice, total, onOpen }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2 [padding-bottom:max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-oudra-border bg-oudra-card/95 p-3 shadow-2xl shadow-black/60 backdrop-blur">
        <div className="min-w-0 pl-1">
          <p className="flex items-center gap-1.5 text-xs text-oudra-muted">
            <ShoppingBag size={13} />
            {totalUnits} {totalUnits === 1 ? "perfume" : "perfumes"} • {formatARS(unitPrice)} c/u
          </p>
          <p className="text-xl font-semibold leading-tight text-white">{formatARS(total)}</p>
        </div>
        <button
          onClick={onOpen}
          className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black active:scale-95"
        >
          Ver pedido
        </button>
      </div>
    </div>
  );
}
