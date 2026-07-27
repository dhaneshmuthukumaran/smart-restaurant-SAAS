import { useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import Ticket from "../components/Ticket";

const COLUMNS = [
  { status: "new", label: "New", next: "cooking", nextLabel: "Start cooking" },
  { status: "cooking", label: "Cooking", next: "ready", nextLabel: "Mark ready" },
  { status: "ready", label: "Ready for pickup", next: null, nextLabel: null },
];

export default function KDS() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");

  const q = search.toLowerCase();
  const visible = orders.filter((o) => !["completed", "cancelled"].includes(o.status) &&
    (o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || !q));

  return (
    <>
      <TopBar search={search} onSearch={setSearch} searchPlaceholder="Filter kitchen tickets…" />
      <main className="flex-1 overflow-x-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <div className="flex gap-5 min-w-[900px] md:min-w-0">
          {COLUMNS.map((col) => {
            const items = visible.filter((o) => o.status === col.status).sort((a, b) => a.createdAt - b.createdAt);
            return (
              <div key={col.status} className="flex-1 min-w-[280px]">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base">{col.label}</h2>
                  <span className="font-mono text-xs text-[var(--color-mute)] bg-[var(--color-panel)] px-2 py-0.5 rounded-full">{items.length}</span>
                </div>
                <div className="flex flex-col gap-3">
                  {items.map((o) => (
                    <Ticket key={o.id} order={o}
                      actions={col.next && (
                        <button onClick={() => updateOrderStatus(o.id, col.next)}
                          className="flex-1 bg-[var(--color-panel-2)] text-xs py-1.5 rounded-md hover:bg-[var(--color-line)]">
                          {col.nextLabel}
                        </button>
                      )}
                    />
                  ))}
                  {items.length === 0 && <p className="text-xs text-[var(--color-mute)] text-center py-6 border border-dashed border-[var(--color-line)] rounded-lg">Nothing here</p>}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
