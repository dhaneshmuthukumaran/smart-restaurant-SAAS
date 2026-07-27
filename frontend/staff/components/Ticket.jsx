import StatusPill from "./StatusPill";

const CORNER_COLOR = {
  new: "var(--color-new)",
  cooking: "var(--color-cooking)",
  ready: "var(--color-ready)",
  billing: "var(--color-cooking)",
  completed: "var(--color-line)",
  cancelled: "var(--color-rush)",
};

const TYPE_LABEL = { "dine-in": "Dine-in", takeaway: "Takeaway", delivery: "Delivery" };

function elapsed(createdAt) {
  const mins = Math.floor((Date.now() - createdAt) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
}

export default function Ticket({ order, onClick, actions }) {
  const isUrgent = order.status !== "completed" && order.status !== "cancelled" && Date.now() - order.createdAt > 1000 * 60 * 15;
  return (
    <div
      onClick={onClick}
      className="ticket p-4 pt-5 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg transition-transform duration-150 flex flex-col gap-3"
    >
      <div className="ticket-corner" style={{ borderColor: `${CORNER_COLOR[order.status] ?? "var(--color-line)"} transparent transparent transparent` }} />
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-sm text-[var(--color-paper)] tracking-wide">{order.id}</p>
          <p className="text-xs text-[var(--color-mute)] mt-0.5">{TYPE_LABEL[order.type]} · {order.customer}</p>
        </div>
        <StatusPill status={order.status} />
      </div>

      <div className="border-t border-dashed border-[var(--color-line)] pt-2 flex flex-col gap-1">
        {order.items.slice(0, 3).map((it, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-[var(--color-paper)]/90">{it.qty}× {it.name}</span>
            <span className="font-mono text-[var(--color-mute)]">₹{it.qty * it.price}</span>
          </div>
        ))}
        {order.items.length > 3 && (
          <p className="text-xs text-[var(--color-mute)]">+{order.items.length - 3} more item(s)</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={isUrgent ? "text-[var(--color-rush)] font-medium" : "text-[var(--color-mute)]"}>
          {isUrgent ? "⚠ " : ""}{elapsed(order.createdAt)}
        </span>
        <span className="font-mono text-[var(--color-paper)]">
          ₹{order.items.reduce((s, i) => s + i.qty * i.price, 0)}
        </span>
      </div>

      {actions && <div className="flex gap-2 pt-1" onClick={(e) => e.stopPropagation()}>{actions}</div>}
    </div>
  );
}
