const STATUS_MAP = {
  new: { label: "New", dot: "var(--color-new)", bg: "var(--color-new-dim)", fg: "#a9cbe4" },
  cooking: { label: "Cooking", dot: "var(--color-cooking)", bg: "var(--color-cooking-dim)", fg: "#f3cf99" },
  ready: { label: "Ready", dot: "var(--color-ready)", bg: "var(--color-ready-dim)", fg: "#a4d9b8" },
  billing: { label: "Billing", dot: "var(--color-cooking)", bg: "var(--color-cooking-dim)", fg: "#f3cf99" },
  completed: { label: "Completed", dot: "var(--color-mute)", bg: "#2c2f34", fg: "var(--color-mute)" },
  cancelled: { label: "Cancelled", dot: "var(--color-rush)", bg: "var(--color-rush-dim)", fg: "#e9a9a4" },
  free: { label: "Free", dot: "var(--color-ready)", bg: "var(--color-ready-dim)", fg: "#a4d9b8" },
  occupied: { label: "Occupied", dot: "var(--color-cooking)", bg: "var(--color-cooking-dim)", fg: "#f3cf99" },
  reserved: { label: "Reserved", dot: "var(--color-new)", bg: "var(--color-new-dim)", fg: "#a9cbe4" },
  low: { label: "Low stock", dot: "var(--color-cooking)", bg: "var(--color-cooking-dim)", fg: "#f3cf99" },
  out: { label: "Out of stock", dot: "var(--color-rush)", bg: "var(--color-rush-dim)", fg: "#e9a9a4" },
};

export default function StatusPill({ status, size = "sm" }) {
  const cfg = STATUS_MAP[status] ?? { label: status, dot: "var(--color-mute)", bg: "#2c2f34", fg: "var(--color-mute)" };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"}`}
      style={{ background: cfg.bg, color: cfg.fg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}
