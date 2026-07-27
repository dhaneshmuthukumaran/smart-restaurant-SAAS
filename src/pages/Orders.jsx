import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import Ticket from "../components/Ticket";
import OrderFormModal from "../components/OrderFormModal";
import CancelOrderModal from "../components/CancelOrderModal";

const TYPE_TABS = [
  { key: "all", label: "All" },
  { key: "dine-in", label: "Dine-in" },
  { key: "takeaway", label: "Takeaway" },
  { key: "delivery", label: "Delivery" },
];
const NEXT_STATUS = { new: "cooking", cooking: "ready", ready: "billing", billing: "completed" };
const NEXT_LABEL = { new: "Start cooking", cooking: "Mark ready", ready: "Move to billing", billing: "Close & complete" };

export default function Orders() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");
  const [typeTab, setTypeTab] = useState("all");
  const [formOrder, setFormOrder] = useState(null); // null = closed, {} = new, order = edit
  const [cancelTarget, setCancelTarget] = useState(null);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => !["completed", "cancelled"].includes(o.status))
      .filter((o) => typeTab === "all" || o.type === typeTab)
      .filter((o) => {
        const q = search.toLowerCase();
        if (!q) return true;
        return o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.items.some((i) => i.name.toLowerCase().includes(q));
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, typeTab, search]);

  return (
    <>
      <TopBar search={search} onSearch={setSearch} searchPlaceholder="Search order ID, customer, item…" />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-[var(--color-panel)] p-1 rounded-md">
            {TYPE_TABS.map((t) => (
              <button key={t.key} onClick={() => setTypeTab(t.key)}
                className={`text-xs px-3 py-1.5 rounded-md ${typeTab === t.key ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]" : "text-[var(--color-mute)]"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={() => setFormOrder({})}
            className="flex items-center gap-1.5 bg-[var(--color-cooking)] text-[var(--color-ink)] text-sm font-medium px-4 py-2 rounded-md hover:brightness-110">
            <Plus className="w-4 h-4" /> New order
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((o) => (
            <Ticket
              key={o.id}
              order={o}
              onClick={() => setFormOrder(o)}
              actions={
                <>
                  {NEXT_STATUS[o.status] && (
                    <button onClick={() => updateOrderStatus(o.id, NEXT_STATUS[o.status])}
                      className="flex-1 bg-[var(--color-panel-2)] text-xs py-1.5 rounded-md hover:bg-[var(--color-line)]">
                      {NEXT_LABEL[o.status]}
                    </button>
                  )}
                  <button onClick={() => setCancelTarget(o)}
                    className="text-xs px-2 py-1.5 rounded-md text-[var(--color-rush)] hover:bg-[var(--color-rush-dim)]">
                    Cancel
                  </button>
                </>
              }
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-[var(--color-mute)] col-span-full py-10 text-center">No matching orders. Try a different filter or search.</p>
          )}
        </div>
      </main>

      {formOrder !== null && (
        <OrderFormModal order={formOrder.id ? formOrder : null} onClose={() => setFormOrder(null)} />
      )}
      {cancelTarget && <CancelOrderModal order={cancelTarget} onClose={() => setCancelTarget(null)} />}
    </>
  );
}
