import { NavLink } from "react-router-dom";
import {
  LayoutGrid, ClipboardList, UtensilsCrossed, ChefHat, Receipt,
  History, Bell, User, Store,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutGrid },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/floor-plan", label: "Floor Plan", icon: UtensilsCrossed },
  { to: "/kds", label: "Kitchen Display", icon: ChefHat },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/history", label: "Order History", icon: History },
  { to: "/notifications", label: "Notifications", icon: Bell, badge: true },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar({ unreadCount }) {
  return (
    <aside className="hidden md:flex md:w-56 flex-col bg-[var(--color-panel)] border-r border-[var(--color-line)] shrink-0">
      <div className="flex items-center gap-2 px-5 py-5">
        <Store className="w-5 h-5 text-[var(--color-cooking)]" />
        <span className="font-display text-lg tracking-wide">FloorOps</span>
      </div>
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {NAV.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-[var(--color-panel-2)] text-[var(--color-paper)]"
                  : "text-[var(--color-mute)] hover:text-[var(--color-paper)] hover:bg-[var(--color-panel-2)]/60"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            <span className="flex-1">{label}</span>
            {badge && unreadCount > 0 && (
              <span className="text-[10px] font-mono bg-[var(--color-rush)] text-white rounded-full px-1.5 py-0.5 leading-none">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-5 py-4 text-[10px] text-[var(--color-mute)] border-t border-[var(--color-line)] font-mono">
        FloorOps v1.0 · Staff Console
      </div>
    </aside>
  );
}
