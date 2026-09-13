export function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="grid-texture absolute inset-0 h-full w-full" />
      <div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-blue), transparent)" }}
      />
      <div
        className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full opacity-15 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, var(--color-accent-violet), transparent)" }}
      />
    </div>
  );
}
