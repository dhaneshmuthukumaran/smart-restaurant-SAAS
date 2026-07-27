import { AlertTriangle, Bell, ChefHat, ClipboardList, Table2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import TopBar from "../components/TopBar";

const ICONS = { order: ClipboardList, kitchen: ChefHat, inventory: AlertTriangle, table: Table2, system: Bell };
const ICON_COLOR = { order: "var(--color-new)", kitchen: "var(--color-cooking)", inventory: "var(--color-rush)", table: "var(--color-ready)", system: "var(--color-mute)" };

function timeAgo(t) {
  const mins = Math.floor((Date.now() - t) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useApp();

  return (
    <>
      <TopBar />
      <main className="flex-1 overflow-y-auto scrollbar-thin p-6 pb-20 md:pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-xl">Notifications {unreadCount > 0 && <span className="text-sm text-[var(--color-mute)] font-body">({unreadCount} unread)</span>}</h1>
          {unreadCount > 0 && (
            <button onClick={markAllNotificationsRead} className="text-xs text-[var(--color-cooking)]">Mark all as read</button>
          )}
        </div>
        <div className="flex flex-col gap-2 max-w-2xl">
          {notifications.map((n) => {
            const Icon = ICONS[n.type] ?? Bell;
            return (
              <button key={n.id} onClick={() => markNotificationRead(n.id)}
                className={`flex items-start gap-3 text-left px-4 py-3 rounded-lg border transition-colors ${n.read ? "border-[var(--color-line)] bg-[var(--color-panel)]" : "border-[var(--color-cooking)]/40 bg-[var(--color-panel-2)]"}`}>
                <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: ICON_COLOR[n.type] }} />
                <div className="flex-1">
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-[var(--color-mute)] mt-0.5">{timeAgo(n.time)}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-[var(--color-cooking)] mt-1.5 shrink-0" />}
              </button>
            );
          })}
          {notifications.length === 0 && <p className="text-sm text-[var(--color-mute)] py-10 text-center">You're all caught up.</p>}
        </div>
      </main>
    </>
  );
}
