import { useState } from "react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";

function fmtDuration(ms) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function Profile() {
  const { currentStaff, shift, isClockedIn, clockIn, clockOut, orders, staffDirectory } = useApp();
  const [notifPrefs, setNotifPrefs] = useState({ orders: true, kitchen: true, inventory: true, tables: false });

  const myOrders = orders.filter((o) => o.staffId === currentStaff?.id);
  const completedToday = myOrders.filter((o) => o.status === "completed").length;

  return (
    <>
      <TopBar />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold text-[var(--color-ink)]" style={{ background: currentStaff?.avatarColor }}>
            {currentStaff?.name?.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h1 className="font-display text-xl">{currentStaff?.name}</h1>
            <p className="text-sm text-[var(--color-mute)]">{currentStaff?.role} · {currentStaff?.email}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
            <p className="text-xs text-[var(--color-mute)]">Orders handled</p>
            <p className="font-display text-2xl">{myOrders.length}</p>
          </div>
          <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
            <p className="text-xs text-[var(--color-mute)]">Completed</p>
            <p className="font-display text-2xl">{completedToday}</p>
          </div>
          <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
            <p className="text-xs text-[var(--color-mute)]">Current shift</p>
            <p className="font-display text-2xl">{isClockedIn ? fmtDuration(Date.now() - shift.clockIn) : "—"}</p>
          </div>
        </div>

        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4 mb-6">
          <h2 className="font-display text-base mb-3">Shift</h2>
          {isClockedIn ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-mute)]">Clocked in at {new Date(shift.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <button onClick={clockOut} className="text-xs bg-[var(--color-rush-dim)] text-[#e9a9a4] px-3 py-1.5 rounded-md">Clock out</button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-mute)]">You're currently off shift.</p>
              <button onClick={clockIn} className="text-xs bg-[var(--color-ready-dim)] text-[#a4d9b8] px-3 py-1.5 rounded-md">Clock in</button>
            </div>
          )}
        </div>

        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4 mb-6">
          <h2 className="font-display text-base mb-3">Notification preferences</h2>
          <div className="flex flex-col gap-2">
            {Object.entries({ orders: "New orders", kitchen: "Kitchen updates", inventory: "Inventory alerts", tables: "Table & reservation alerts" }).map(([key, label]) => (
              <label key={key} className="flex items-center justify-between text-sm">
                {label}
                <input type="checkbox" checked={notifPrefs[key]} onChange={(e) => setNotifPrefs((p) => ({ ...p, [key]: e.target.checked }))} />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-panel)] border border-[var(--color-line)] rounded-lg p-4">
          <h2 className="font-display text-base mb-3">Team on shift</h2>
          <div className="flex flex-col gap-2">
            {staffDirectory.map((s) => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-[var(--color-ink)]" style={{ background: s.avatarColor }}>
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span>{s.name}</span>
                <span className="text-[var(--color-mute)] text-xs">{s.role}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
