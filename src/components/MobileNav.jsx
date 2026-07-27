import { NavLink } from "react-router-dom";
import { LayoutGrid, ClipboardList, ChefHat, Receipt, Bell } from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: LayoutGrid },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/kds", label: "KDS", icon: ChefHat },
  { to: "/billing", label: "Bill", icon: Receipt },
  { to: "/notifications", label: "Alerts", icon: Bell, badge: true },
];

export default function MobileNav({ unreadCount }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-panel)] border-t border-[var(--color-line)] flex z-40">
      {NAV.map(({ to, label, icon: Icon, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] relative ${
              isActive ? "text-[var(--color-cooking)]" : "text-[var(--color-mute)]"
            }`
          }
        >
          <Icon className="w-[18px] h-[18px]" />
          {label}
          {badge && unreadCount > 0 && (
            <span className="absolute top-1 right-5 w-2 h-2 rounded-full bg-[var(--color-rush)]" />
          )}
        </NavLink>
      ))}
    </nav>
  );
}
