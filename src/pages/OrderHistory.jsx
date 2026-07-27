import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import StatusPill from "../components/StatusPill";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrderHistory() {
  const { orders, staffDirectory } = useApp();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const staffName = (id) => staffDirectory.find((s) => s.id === id)?.name ?? "—";

  const history = useMemo(() => {
    return orders
      .filter((o) => ["completed", "cancelled"].includes(o.status))
      .filter((o) => filter === "all" || o.status === filter)
      .filter((o) => {
        const q = search.toLowerCase();
        if (!q) return true;
        return o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.items.some((i) => i.name.toLowerCase().includes(q));
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, filter, search]);

  return (
    <>
      <TopBar search={search} onSearch={setSearch} searchPlaceholder="Search past orders by ID, customer, item…" />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <div className="flex gap-1 bg-[var(--color-panel)] p-1 rounded-md w-fit mb-4">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className={`text-xs px-3 py-1.5 rounded-md ${filter === f.key ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-mute)] text-xs border-b border-[var(--color-line)]">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Handled by</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">When</th>
              </tr>
            </thead>
            <tbody>
              {history.map((o) => (
                <tr key={o.id} className="border-b border-[var(--color-line)] last:border-0 hover:bg-[var(--color-panel-2)]/50">
                  <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3 capitalize text-[var(--color-mute)]">{o.type.replace("-", " ")}</td>
                  <td className="px-4 py-3 text-[var(--color-mute)]">{staffName(o.staffId)}</td>
                  <td className="px-4 py-3 font-mono">₹{o.items.reduce((s, i) => s + i.qty * i.price, 0)}</td>
                  <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                  <td className="px-4 py-3 text-xs text-[var(--color-mute)]">{new Date(o.createdAt).toLocaleString([], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-[var(--color-mute)]">No orders match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
