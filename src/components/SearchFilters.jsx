import { Search, X } from "lucide-react";

const CATEGORIES = ["Todos", "Masculinos", "Femeninos", "Unisex"];

export default function SearchFilters({ query, onQuery, category, onCategory, counts }) {
  return (
    <div>
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-oudra-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Buscar perfume..."
          aria-label="Buscar perfume"
          className="w-full rounded-xl border border-oudra-border bg-oudra-card py-3 pl-10 pr-11 text-white placeholder:text-oudra-muted focus:border-white focus:outline-none"
        />
        {query && (
          <button
            onClick={() => onQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-oudra-muted hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-white bg-white text-black"
                  : "border-oudra-border bg-oudra-card text-white hover:border-oudra-muted"
              }`}
            >
              {c}
              <span className={active ? "text-black/60" : "text-oudra-muted"}>
                {counts[c] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
