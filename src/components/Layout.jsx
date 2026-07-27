import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function Layout() {
  const { currentStaff, unreadCount } = useApp();
  if (!currentStaff) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-[var(--color-ink)] text-[var(--color-paper)] font-body">
      <Sidebar unreadCount={unreadCount} />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
      <MobileNav unreadCount={unreadCount} />
    </div>
  );
}
