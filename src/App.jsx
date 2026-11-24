import { useEffect, useMemo, useState } from "react";
import { perfumes } from "./data/perfumes.js";
import { getUnitPrice, normalizeText } from "./lib/pricing.js";
import Header from "./components/Header.jsx";
import PriceBar from "./components/PriceBar.jsx";
import SearchFilters from "./components/SearchFilters.jsx";
import PerfumeItem from "./components/PerfumeItem.jsx";
import CartBar from "./components/CartBar.jsx";
import OrderModal from "./components/OrderModal.jsx";

const STORAGE_KEY = "oudra-cart-v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const valid = {};
    for (const p of perfumes) {
      const q = Number(parsed[p.id]);
      if (p.disponible && q > 0) valid[p.id] = Math.floor(q);
    }
    return valid;
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, setCart] = useState(loadCart);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* sin storage disponible: no pasa nada */
    }
  }, [cart]);

  const disponibles = useMemo(() => perfumes.filter((p) => p.disponible), []);

  const counts = useMemo(() => {
    const c = { Todos: disponibles.length, Masculinos: 0, Femeninos: 0, Unisex: 0 };
    for (const p of disponibles) c[p.categoria] = (c[p.categoria] || 0) + 1;
    return c;
  }, [disponibles]);

  const filtered = useMemo(() => {
    const q = normalizeText(query.trim());
    return disponibles.filter(
      (p) =>
        (category === "Todos" || p.categoria === category) &&
        (q === "" || normalizeText(p.nombre).includes(q))
    );
  }, [disponibles, query, category]);

  const totalUnits = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  );
  const unitPrice = getUnitPrice(totalUnits);
  const total = totalUnits * unitPrice;

  const setQty = (id, qty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };
  const inc = (id) => setQty(id, (cart[id] || 0) + 1);
  const dec = (id) => setQty(id, (cart[id] || 0) - 1);
  const remove = (id) => setQty(id, 0);

  const items = useMemo(
    () =>
      disponibles
        .filter((p) => cart[p.id] > 0)
        .map((p) => ({ ...p, cantidad: cart[p.id] })),
    [disponibles, cart]
  );

  // Si el carrito queda vacío con el modal abierto, lo cerramos
  useEffect(() => {
    if (totalUnits === 0) setModalOpen(false);
  }, [totalUnits]);

  return (
    <div className="min-h-screen bg-oudra-bg text-white">
      <PriceBar totalUnits={totalUnits} />
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-32 pt-4">
        <SearchFilters
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          counts={counts}
        />

        {filtered.length === 0 ? (
          <div className="mt-12 text-center text-oudra-muted">
            <p className="text-base">No encontramos aromas con esa búsqueda.</p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("Todos");
              }}
              className="mt-3 text-sm text-white underline underline-offset-4"
            >
              Ver todos los perfumes
            </button>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PerfumeItem
                key={p.id}
                perfume={p}
                qty={cart[p.id] || 0}
                onInc={() => inc(p.id)}
                onDec={() => dec(p.id)}
              />
            ))}
          </ul>
        )}

        <footer className="mt-12 text-center text-xs text-oudra-muted">
          Oudra Perfumería • Perfumes Tester 50 ml
        </footer>
      </main>

      {totalUnits > 0 && (
        <CartBar
          totalUnits={totalUnits}
          unitPrice={unitPrice}
          total={total}
          onOpen={() => setModalOpen(true)}
        />
      )}

      {modalOpen && (
        <OrderModal
          items={items}
          totalUnits={totalUnits}
          unitPrice={unitPrice}
          total={total}
          onInc={inc}
          onDec={dec}
          onRemove={remove}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
