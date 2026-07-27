import { useState } from "react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

const PAYMENT_METHODS = ["Cash", "Card", "UPI"];

export default function BillModal({ order, onClose }) {
  const { updateOrder, updateOrderStatus } = useApp();
  const [discount, setDiscount] = useState(order.discount || 0);
  const [splitCount, setSplitCount] = useState(1);
  const [payment, setPayment] = useState("Cash");
  const [paid, setPaid] = useState(false);

  const subtotal = order.items.reduce((s, i) => s + i.qty * i.price, 0);
  const discountAmt = subtotal * (discount / 100);
  const tax = (subtotal - discountAmt) * 0.05;
  const total = subtotal - discountAmt + tax;
  const perPerson = total / splitCount;

  function applyDiscount() {
    updateOrder(order.id, { discount });
  }
  function closeBill() {
    updateOrder(order.id, { discount, paymentMethod: payment });
    updateOrderStatus(order.id, "completed");
    onClose();
  }

  return (
    <Modal title={`Bill · ${order.id}`} onClose={onClose} width="max-w-md">
      <div className="flex flex-col gap-4">
        <div className="ticket p-4 pt-5">
          <div className="ticket-corner" style={{ borderColor: "var(--color-cooking) transparent transparent transparent" }} />
          {order.items.map((i, idx) => (
            <div key={idx} className="flex justify-between text-sm py-1">
              <span>{i.qty}× {i.name}</span>
              <span className="font-mono text-[var(--color-mute)]">₹{i.qty * i.price}</span>
            </div>
          ))}
          <div className="border-t border-dashed border-[var(--color-line)] mt-2 pt-2 flex flex-col gap-1 text-sm">
            <div className="flex justify-between"><span className="text-[var(--color-mute)]">Subtotal</span><span className="font-mono">₹{subtotal.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-mute)]">Discount ({discount}%)</span><span className="font-mono text-[var(--color-ready)]">-₹{discountAmt.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-[var(--color-mute)]">Tax (5%)</span><span className="font-mono">₹{tax.toFixed(0)}</span></div>
            <div className="flex justify-between text-base pt-1 border-t border-[var(--color-line)] mt-1"><span>Total</span><span className="font-mono">₹{total.toFixed(0)}</span></div>
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--color-mute)]">Apply discount</label>
          <div className="flex gap-2 mt-1">
            {[0, 5, 10, 15].map((d) => (
              <button key={d} onClick={() => setDiscount(d)}
                className={`flex-1 text-xs py-1.5 rounded-md border ${discount === d ? "border-[var(--color-cooking)] bg-[var(--color-cooking-dim)]" : "border-[var(--color-line)] text-[var(--color-mute)]"}`}>
                {d === 0 ? "None" : `${d}%`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs text-[var(--color-mute)]">Split bill between</label>
          <div className="flex items-center gap-2 mt-1">
            <input type="range" min={1} max={6} value={splitCount} onChange={(e) => setSplitCount(+e.target.value)} className="flex-1" />
            <span className="font-mono text-sm w-16 text-right">{splitCount} {splitCount === 1 ? "guest" : "guests"}</span>
          </div>
          {splitCount > 1 && (
            <p className="text-xs text-[var(--color-mute)] mt-1">₹{perPerson.toFixed(0)} per person</p>
          )}
        </div>

        <div>
          <label className="text-xs text-[var(--color-mute)]">Payment method</label>
          <div className="flex gap-2 mt-1">
            {PAYMENT_METHODS.map((m) => (
              <button key={m} onClick={() => setPayment(m)}
                className={`flex-1 text-xs py-1.5 rounded-md border ${payment === m ? "border-[var(--color-cooking)] bg-[var(--color-cooking-dim)]" : "border-[var(--color-line)] text-[var(--color-mute)]"}`}>
                {m}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
          Payment received in full
        </label>

        <div className="flex gap-2">
          <button onClick={applyDiscount} className="flex-1 border border-[var(--color-line)] text-sm py-2 rounded-md">Save discount</button>
          <button onClick={closeBill} disabled={!paid}
            className="flex-1 bg-[var(--color-ready)] text-[var(--color-ink)] text-sm font-medium py-2 rounded-md disabled:opacity-40">
            Close bill
          </button>
        </div>
      </div>
    </Modal>
  );
}
