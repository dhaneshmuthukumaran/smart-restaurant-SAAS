import { useMemo, useState } from "react";
import { Users } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import Modal from "../components/Modal";
import StatusPill from "../components/StatusPill";
import OrderFormModal from "../components/OrderFormModal";

const STATUS_STYLE = {
  free: "border-[var(--color-ready)] bg-[var(--color-ready-dim)]",
  occupied: "border-[var(--color-cooking)] bg-[var(--color-cooking-dim)]",
  reserved: "border-[var(--color-new)] bg-[var(--color-new-dim)]",
  billing: "border-[var(--color-cooking)] bg-[var(--color-cooking-dim)]",
};

export default function FloorPlan() {
  const { tables, setTableStatus, orders } = useApp();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [newOrderTable, setNewOrderTable] = useState(null);

  const zones = useMemo(() => [...new Set(tables.map((t) => t.zone))], [tables]);
  const filteredTables = tables.filter((t) => `table ${t.number} ${t.zone}`.toLowerCase().includes(search.toLowerCase()));
  const orderForTable = (tableId) => orders.find((o) => o.tableId === tableId && !["completed", "cancelled"].includes(o.status));

  return (
    <>
      <TopBar search={search} onSearch={setSearch} searchPlaceholder="Search table number or zone…" />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        {zones.map((zone) => (
          <div key={zone} className="mb-8">
            <h2 className="font-display text-base mb-3">{zone}</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {filteredTables.filter((t) => t.zone === zone).map((t) => (
                <button key={t.id} onClick={() => setSelected(t)}
                  className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-1 hover:-translate-y-0.5 transition-transform ${STATUS_STYLE[t.status]}`}>
                  <span className="font-display text-xl">{t.number}</span>
                  <span className="flex items-center gap-1 text-[10px] text-[var(--color-paper)]/70"><Users className="w-3 h-3" />{t.seats}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>

      {selected && (
        <Modal title={`Table ${selected.number}`} onClose={() => setSelected(null)} width="max-w-sm">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-mute)]">Zone</span>
              <span>{selected.zone}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-mute)]">Seats</span>
              <span>{selected.seats}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-mute)]">Status</span>
              <StatusPill status={selected.status} />
            </div>
            {orderForTable(selected.id) && (
              <div className="bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md p-3 text-sm">
                Current order: <span className="font-mono">{orderForTable(selected.id).id}</span>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-2">
              {selected.status === "free" && (
                <>
                  <button onClick={() => { setNewOrderTable(selected.id); setSelected(null); }}
                    className="bg-[var(--color-cooking)] text-[var(--color-ink)] text-sm font-medium py-2 rounded-md">Seat &amp; start order</button>
                  <button onClick={() => { setTableStatus(selected.id, "reserved"); setSelected(null); }}
                    className="border border-[var(--color-line)] text-sm py-2 rounded-md">Mark reserved</button>
                </>
              )}
              {selected.status === "reserved" && (
                <button onClick={() => { setTableStatus(selected.id, "free"); setSelected(null); }}
                  className="border border-[var(--color-line)] text-sm py-2 rounded-md">Release reservation</button>
              )}
              {(selected.status === "occupied" || selected.status === "billing") && (
                <button onClick={() => { setTableStatus(selected.id, "free"); setSelected(null); }}
                  className="border border-[var(--color-line)] text-sm py-2 rounded-md">Clear &amp; free table</button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {newOrderTable && (
        <OrderFormModal order={{ type: "dine-in", tableId: newOrderTable, items: [] }} onClose={() => setNewOrderTable(null)} />
      )}
    </>
  );
}
