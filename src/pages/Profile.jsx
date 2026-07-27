import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";

const ROLES = ["Waiter", "Cashier", "Kitchen Staff", "Shift Manager"];

function fmtDuration(ms) {
  const mins = Math.max(0, Math.floor(ms / 60000));
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

export default function Profile() {
  const { currentStaff, shift, isClockedIn, clockIn, clockOut, orders, staffDirectory, registerStaff, removeStaff } = useApp();
  const [notifPrefs, setNotifPrefs] = useState({ orders: true, kitchen: true, inventory: true, tables: false });
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: ROLES[0], password: "" });
  const [addError, setAddError] = useState("");
  const [lastAdded, setLastAdded] = useState(null);

  const isManager = currentStaff?.role === "Shift Manager";
  const myOrders = orders.filter((o) => o.staffId === currentStaff?.id);
  const completedToday = myOrders.filter((o) => o.status === "completed").length;

  function handleAddStaff(e) {
    e.preventDefault();
    setAddError("");
    const res = registerStaff({ ...newStaff, password: newStaff.password || undefined });
    if (!res.ok) { setAddError(res.error); return; }
    setLastAdded(res.staff);
    setNewStaff({ name: "", email: "", role: ROLES[0], password: "" });
  }

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
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-base">Staff directory ({staffDirectory.length})</h2>
            <button onClick={() => { setShowAddStaff((v) => !v); setLastAdded(null); setAddError(""); }}
              className="flex items-center gap-1.5 text-xs bg-[var(--color-panel-2)] px-3 py-1.5 rounded-md hover:bg-[var(--color-line)]">
              <UserPlus className="w-3.5 h-3.5" /> {showAddStaff ? "Close" : "Add staff"}
            </button>
          </div>

          {showAddStaff && (
            <div className="bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md p-3 mb-4">
              {lastAdded ? (
                <div className="text-sm flex flex-col gap-2">
                  <p><span className="font-medium">{lastAdded.name}</span> can now log in.</p>
                  <div className="font-mono text-xs bg-[var(--color-panel)] rounded-md p-2 flex flex-col gap-0.5">
                    <span>Email: {lastAdded.email}</span>
                    <span>Password: {lastAdded.password}</span>
                  </div>
                  <button onClick={() => setLastAdded(null)} className="text-xs text-[var(--color-cooking)] self-start">Add another</button>
                </div>
              ) : (
                <form onSubmit={handleAddStaff} className="grid sm:grid-cols-2 gap-3">
                  <label className="text-xs text-[var(--color-mute)]">Name
                    <input value={newStaff.name} onChange={(e) => setNewStaff((s) => ({ ...s, name: e.target.value }))} required
                      className="mt-1 w-full bg-[var(--color-panel)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
                  </label>
                  <label className="text-xs text-[var(--color-mute)]">Email
                    <input value={newStaff.email} onChange={(e) => setNewStaff((s) => ({ ...s, email: e.target.value }))} type="email" required
                      className="mt-1 w-full bg-[var(--color-panel)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
                  </label>
                  <label className="text-xs text-[var(--color-mute)]">Role
                    <select value={newStaff.role} onChange={(e) => setNewStaff((s) => ({ ...s, role: e.target.value }))}
                      className="mt-1 w-full bg-[var(--color-panel)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none">
                      {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </label>
                  <label className="text-xs text-[var(--color-mute)]">Password
                    <input value={newStaff.password} onChange={(e) => setNewStaff((s) => ({ ...s, password: e.target.value }))}
                      type="password" placeholder="Leave blank to use the default"
                      className="mt-1 w-full bg-[var(--color-panel)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm outline-none" />
                  </label>
                  {addError && <p className="text-xs text-[var(--color-rush)] sm:col-span-2">{addError}</p>}
                  <button type="submit" className="sm:col-span-2 bg-[var(--color-cooking)] text-[var(--color-ink)] text-sm font-medium py-2 rounded-md hover:brightness-110">
                    Create account
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2">
            {staffDirectory.map((s) => (
              <div key={s.id} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-[var(--color-ink)] shrink-0" style={{ background: s.avatarColor }}>
                  {s.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <span className="flex-1">{s.name}{s.id === currentStaff?.id && <span className="text-[var(--color-mute)]"> (you)</span>}</span>
                <span className="text-[var(--color-mute)] text-xs">{s.role}</span>
                {isManager && s.id !== currentStaff?.id && (
                  <button onClick={() => removeStaff(s.id)} title="Remove from directory" className="text-[var(--color-mute)] hover:text-[var(--color-rush)]">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!isManager && <p className="text-[10px] text-[var(--color-mute)] mt-3">Only shift managers can remove staff. Anyone can add a new account.</p>}
        </div>
      </main>
    </>
  );
}
