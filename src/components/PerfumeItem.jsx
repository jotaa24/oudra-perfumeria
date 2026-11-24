import { Minus, Plus } from "lucide-react";

export default function PerfumeItem({ perfume, qty, onInc, onDec }) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border bg-oudra-card px-3.5 py-3 transition-colors ${
        qty > 0 ? "border-white/70" : "border-oudra-border"
      }`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tracking-wide text-white">
          {perfume.nombre}
        </p>
        <span className="mt-1 inline-block rounded-full border border-oudra-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-oudra-muted">
          {perfume.categoria}
        </span>
      </div>

      {qty === 0 ? (
        <button
          onClick={onInc}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-black active:scale-95"
        >
          <Plus size={15} />
          Agregar
        </button>
      ) : (
        <div className="flex shrink-0 items-center gap-1 rounded-lg border border-oudra-border bg-oudra-bg p-1">
          <button
            onClick={onDec}
            aria-label={`Quitar uno de ${perfume.nombre}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-oudra-border active:scale-95"
          >
            <Minus size={16} />
          </button>
          <span className="w-7 text-center text-sm font-semibold tabular-nums">{qty}</span>
          <button
            onClick={onInc}
            aria-label={`Sumar uno de ${perfume.nombre}`}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      )}
    </li>
  );
}
