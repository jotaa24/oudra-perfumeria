export default function Header() {
  return (
    <header className="border-b border-oudra-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-6 text-center">
        <h1 className="font-serif text-4xl font-semibold tracking-[0.18em] text-white sm:text-5xl">
          OUDRA
        </h1>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.45em] text-white sm:text-xs">
          Perfumería
        </p>
        <span className="mt-4 rounded-full border border-oudra-border px-3 py-1 text-[11px] text-oudra-muted sm:text-xs">
          Perfumes Tester 50 ml • Sin mínimo de compra
        </span>
      </div>
    </header>
  );
}
