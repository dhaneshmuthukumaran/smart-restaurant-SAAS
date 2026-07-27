import { useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";
import Ticket from "../components/Ticket";
import BillModal from "../components/BillModal";

export default function Billing() {
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [billOrder, setBillOrder] = useState(null);

  const billable = orders
    .filter((o) => ["ready", "billing"].includes(o.status))
    .filter((o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.createdAt - b.createdAt);

  return (
    <>
      <TopBar search={search} onSearch={setSearch} searchPlaceholder="Search orders ready for billing…" />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <h1 className="font-display text-xl mb-4">Orders awaiting payment</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {billable.map((o) => (
            <Ticket key={o.id} order={o} onClick={() => setBillOrder(o)}
              actions={
                <button onClick={() => setBillOrder(o)}
                  className="flex-1 bg-[var(--color-cooking)] text-[var(--color-ink)] text-xs font-medium py-1.5 rounded-md">
                  Generate bill
                </button>
              }
            />
          ))}
          {billable.length === 0 && (
            <p className="text-sm text-[var(--color-mute)] col-span-full py-10 text-center">Nothing ready for billing right now.</p>
          )}
        </div>
      </main>
      {billOrder && <BillModal order={billOrder} onClose={() => setBillOrder(null)} />}
    </>
  );
}
