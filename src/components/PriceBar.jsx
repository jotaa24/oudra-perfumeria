import { getPriceBarMessage } from "../lib/pricing.js";

export default function PriceBar({ totalUnits }) {
  const active = totalUnits >= 10;
  return (
    <div
      className={`sticky top-0 z-30 border-b px-4 py-2.5 text-center text-xs font-medium leading-snug transition-colors sm:text-sm ${
        active
          ? "border-white bg-white text-black"
          : "border-oudra-border bg-oudra-card text-white"
      }`}
      role="status"
      aria-live="polite"
    >
      {getPriceBarMessage(totalUnits)}
    </div>
  );
}
