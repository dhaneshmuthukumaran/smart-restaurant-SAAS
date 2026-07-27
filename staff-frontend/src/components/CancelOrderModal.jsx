import { useState } from "react";
import { useApp } from "../context/AppContext";
import Modal from "./Modal";

const REASONS = ["Customer changed their mind", "Item unavailable", "Order placed by mistake", "Kitchen delay — customer left", "Other"];

export default function CancelOrderModal({ order, onClose }) {
  const { cancelOrder } = useApp();
  const [reason, setReason] = useState(REASONS[0]);

  return (
    <Modal title={`Cancel ${order.id}?`} onClose={onClose} width="max-w-sm">
      <p className="text-sm text-[var(--color-mute)] mb-3">This will free up the table (if any) and notify the kitchen. Choose a reason:</p>
      <div className="flex flex-col gap-2 mb-4">
        {REASONS.map((r) => (
          <label key={r} className="flex items-center gap-2 text-sm">
            <input type="radio" checked={reason === r} onChange={() => setReason(r)} />
            {r}
          </label>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 border border-[var(--color-line)] text-sm py-2 rounded-md">Keep order</button>
        <button onClick={() => { cancelOrder(order.id, reason); onClose(); }}
          className="flex-1 bg-[var(--color-rush)] text-white text-sm py-2 rounded-md">Cancel order</button>
      </div>
    </Modal>
  );
}
