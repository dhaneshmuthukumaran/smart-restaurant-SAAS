import { useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowUpRight, ChefHat, Clock3, Table2, TrendingUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import StatusPill from "../components/StatusPill";

export default function Dashboard() {
  const { currentStaff, orders, tables, inventoryAlerts, notifications } = useApp();
  const navigate = useNavigate();

  const activeOrders = orders.filter((o) => !["completed", "cancelled"].includes(o.status));
  const newOrders = orders.filter((o) => o.status === "new").length;
  const cooking = orders.filter((o) => o.status === "cooking").length;
  const readyToServe = orders.filter((o) => o.status === "ready").length;
  const occupiedTables = tables.filter((t) => t.status === "occupied").length;
  const todaySales = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty * i.price, 0) * (1 - (o.discount || 0) / 100), 0);

  const cards = [
    { label: "Active orders", value: activeOrders.length, icon: ClipboardIcon, to: "/orders" },
    { label: "In the kitchen", value: cooking, icon: ChefHat, to: "/kds" },
    { label: "Ready to serve", value: readyToServe, icon: TrendingUp, to: "/kds" },
    { label: "Tables occupied", value: `${occupiedTables}/${tables.length}`, icon: Table2, to: "/floor-plan" },
  ];

  return (
    <>
      <TopBar />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <div className="mb-6">
          <p className="text-[var(--color-mute)] text-sm">Welcome back,</p>
          <h1 className="font-display text-2xl">{currentStaff?.name} <span className="text-[var(--color-mute)] text-base font-body">· {currentStaff?.role}</span></h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {cards.map((c) => (
            <button key={c.label} onClick={() => navigate(c.to)}
              className="ticket p-4 pt-5 text-left hover:-translate-y-0.5 transition-transform">
              <div className="ticket-corner" style={{ borderColor: "var(--color-line) transparent transparent transparent" }} />
              <c.icon className="w-4 h-4 text-[var(--color-cooking)] mb-2" />
              <p className="font-display text-2xl">{c.value}</p>
              <p className="text-xs text-[var(--color-mute)]">{c.label}</p>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-base">New &amp; cooking orders</h2>
              <button onClick={() => navigate("/orders")} className="text-xs text-[var(--color-cooking)] flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {orders.filter((o) => ["new", "cooking"].includes(o.status)).slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-[var(--color-line)] last:border-0 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[var(--color-mute)] text-xs">{o.id}</span>
                    <span>{o.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="w-3 h-3 text-[var(--color-mute)]" />
                    <StatusPill status={o.status} />
                  </div>
                </div>
              ))}
              {newOrders + cooking === 0 && <p className="text-sm text-[var(--color-mute)] py-4 text-center">No active kitchen orders right now.</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
              <h2 className="font-display text-base mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--color-rush)]" /> Inventory alerts
              </h2>
              <div className="flex flex-col gap-2">
                {inventoryAlerts.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-paper)]/90">{a.item}</span>
                    <StatusPill status={a.level} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
              <h2 className="font-display text-base mb-3">Today's completed sales</h2>
              <p className="font-mono text-3xl text-[var(--color-ready)]">₹{todaySales.toFixed(0)}</p>
              <p className="text-xs text-[var(--color-mute)] mt-1">{orders.filter((o) => o.status === "completed").length} orders closed</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function ClipboardIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 11h6M9 15h4" />
    </svg>
  );
}
