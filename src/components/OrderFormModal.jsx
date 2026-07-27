import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

export default function OrderFormModal({ order, onClose }) {
  const { menu, tables, createOrder, updateOrder } = useApp();
  const isEdit = !!order?.id;
  const [type, setType] = useState(order?.type ?? "dine-in");
  const [tableId, setTableId] = useState(order?.tableId ?? "");
  const [customer, setCustomer] = useState(order?.customer ?? "");
  const [phone, setPhone] = useState(order?.phone ?? "");
  const [address, setAddress] = useState(order?.address ?? "");
  const [items, setItems] = useState(order?.items ?? []);
  const [menuFilter, setMenuFilter] = useState("");

  const availableTables = tables.filter((t) => t.status === "free" || t.id === order?.tableId);
  const filteredMenu = menu.filter((m) => m.name.toLowerCase().includes(menuFilter.toLowerCase()));

  function addItem(m) {
    if (!m.available) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.menuId === m.id);
      if (existing) return prev.map((i) => (i.menuId === m.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { menuId: m.id, name: m.name, price: m.price, qty: 1, notes: "" }];
    });
  }
  function changeQty(menuId, delta) {
    setItems((prev) => prev.flatMap((i) => {
      if (i.menuId !== menuId) return [i];
      const qty = i.qty + delta;
      return qty <= 0 ? [] : [{ ...i, qty }];
    }));
  }
  function updateNotes(menuId, notes) {
    setItems((prev) => prev.map((i) => (i.menuId === menuId ? { ...i, notes } : i)));
  }

  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const canSubmit = items.length > 0 && (type !== "dine-in" || tableId) && (type === "dine-in" || customer.trim());

  function handleSubmit() {
    if (!canSubmit) return;
    const draft = {
      type,
      tableId: type === "dine-in" ? tableId : null,
      customer: type === "dine-in" ? `Table ${tables.find((t) => t.id === tableId)?.number ?? ""}` : customer,
      phone: type === "delivery" ? phone : undefined,
      address: type === "delivery" ? address : undefined,
      items,
    };
    if (isEdit) updateOrder(order.id, draft);
    else createOrder(draft);
    onClose();
  }

  return (
    <Modal title={isEdit ? `Edit ${order.id}` : "New order"} onClose={onClose} width="max-w-3xl">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[var(--color-mute)]">Order type</label>
            <div className="flex gap-2 mt-1">
              {["dine-in", "takeaway", "delivery"].map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={`flex-1 text-xs py-2 rounded-md border capitalize ${type === t ? "border-[var(--color-cooking)] bg-[var(--color-cooking-dim)] text-[#f3cf99]" : "border-[var(--color-line)] text-[var(--color-mute)]"}`}>
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {type === "dine-in" && (
            <div>
              <label className="text-xs text-[var(--color-mute)]">Table</label>
              <select value={tableId} onChange={(e) => setTableId(e.target.value)}
                className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none">
                <option value="">Select a free table…</option>
                {availableTables.map((t) => (
                  <option key={t.id} value={t.id}>Table {t.number} · {t.zone} · {t.seats} seats</option>
                ))}
              </select>
            </div>
          )}
          {type !== "dine-in" && (
            <div className="flex flex-col gap-3">
              <label className="text-xs text-[var(--color-mute)]">Customer name
                <input value={customer} onChange={(e) => setCustomer(e.target.value)}
                  className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
              </label>
              {type === "delivery" && (
                <>
                  <label className="text-xs text-[var(--color-mute)]">Phone
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
                  </label>
                  <label className="text-xs text-[var(--color-mute)]">Delivery address
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
                      className="mt-1 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
                  </label>
                </>
              )}
            </div>
          )}

          <div>
            <label className="text-xs text-[var(--color-mute)]">Menu</label>
            <input value={menuFilter} onChange={(e) => setMenuFilter(e.target.value)} placeholder="Search menu…"
              className="mt-1 mb-2 w-full bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
            <div className="flex flex-col gap-1 max-h-52 overflow-y-auto scrollbar-thin">
              {filteredMenu.map((m) => (
                <button key={m.id} onClick={() => addItem(m)} disabled={!m.available}
                  className={`flex items-center justify-between text-sm px-3 py-2 rounded-md text-left ${m.available ? "hover:bg-[var(--color-panel-2)]" : "opacity-40 cursor-not-allowed"}`}>
                  <span>{m.name}</span>
                  <span className="font-mono text-[var(--color-mute)]">{m.available ? `₹${m.price}` : "Unavailable"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-[var(--color-mute)] mb-1">Items on this order</label>
          <div className="flex-1 flex flex-col gap-2 max-h-72 overflow-y-auto scrollbar-thin pr-1">
            {items.length === 0 && <p className="text-sm text-[var(--color-mute)] py-6 text-center">Add items from the menu.</p>}
            {items.map((i) => (
              <div key={i.menuId} className="bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{i.name}</span>
                  <button onClick={() => changeQty(i.menuId, -i.qty)} className="text-[var(--color-mute)] hover:text-[var(--color-rush)]">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(i.menuId, -1)} className="w-6 h-6 flex items-center justify-center bg-[var(--color-panel-2)] rounded-md"><Minus className="w-3 h-3" /></button>
                    <span className="font-mono text-sm w-5 text-center">{i.qty}</span>
                    <button onClick={() => changeQty(i.menuId, 1)} className="w-6 h-6 flex items-center justify-center bg-[var(--color-panel-2)] rounded-md"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="font-mono text-sm text-[var(--color-mute)]">₹{i.qty * i.price}</span>
                </div>
                <input value={i.notes} onChange={(e) => updateNotes(i.menuId, e.target.value)} placeholder="Notes (e.g. no onions)"
                  className="mt-2 w-full bg-transparent border-b border-[var(--color-line)] text-xs outline-none pb-1 placeholder:text-[var(--color-mute)]" />
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-line)] mt-3 pt-3 flex items-center justify-between">
            <span className="text-sm text-[var(--color-mute)]">Total</span>
            <span className="font-mono text-lg">₹{total}</span>
          </div>
          <button onClick={handleSubmit} disabled={!canSubmit}
            className="mt-3 bg-[var(--color-cooking)] text-[var(--color-ink)] font-medium text-sm py-2.5 rounded-md disabled:opacity-40 hover:brightness-110">
            {isEdit ? "Save changes" : "Send to kitchen"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
