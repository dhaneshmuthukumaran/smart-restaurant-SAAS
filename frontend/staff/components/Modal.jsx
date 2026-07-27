import { X } from "lucide-react";

export default function Modal({ title, onClose, children, width = "max-w-lg" }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className={`bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg w-full ${width} max-h-[85vh] overflow-y-auto scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-line)] sticky top-0 bg-[var(--color-panel)]">
          <h2 className="font-display text-lg">{title}</h2>
          <button onClick={onClose} className="text-[var(--color-mute)] hover:text-[var(--color-paper)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
