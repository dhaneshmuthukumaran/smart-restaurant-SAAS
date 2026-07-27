import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";

function fmtDuration(ms) {
  const mins = Math.floor(ms / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

export default function TopBar({ search, onSearch, searchPlaceholder = "Search orders, tables, items…" }) {
  const { currentStaff, logout, shift, isClockedIn, clockIn, clockOut } = useApp();
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="flex items-center gap-4 px-5 py-3 bg-[var(--color-panel)] border-b border-[var(--color-line)]">
      {onSearch !== undefined && (
        <div className="flex items-center gap-2 bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-1.5 flex-1 max-w-md">
          <Search className="w-4 h-4 text-[var(--color-mute)]" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-[var(--color-mute)]"
          />
        </div>
      )}
      <div className="flex-1" />

      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-mute)]">
        <Clock className="w-3.5 h-3.5" />
        {new Date(now).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>

      {isClockedIn ? (
        <button
          onClick={clockOut}
          className="flex items-center gap-2 text-xs bg-[var(--color-ready-dim)] text-[#a4d9b8] px-3 py-1.5 rounded-md hover:brightness-110"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ready)] animate-pulse" />
          On shift · {fmtDuration(now - shift.clockIn)}
        </button>
      ) : (
        <button
          onClick={clockIn}
          className="flex items-center gap-2 text-xs bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-1.5 rounded-md hover:bg-[var(--color-line)]"
        >
          Clock in
        </button>
      )}

      <button
        onClick={() => navigate("/profile")}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-[var(--color-ink)]"
        style={{ background: currentStaff?.avatarColor }}
        title={currentStaff?.name}
      >
        {currentStaff?.name?.split(" ").map((n) => n[0]).join("")}
      </button>
      <button onClick={logout} title="Log out" className="text-[var(--color-mute)] hover:text-[var(--color-rush)]">
        <LogOut className="w-4 h-4" />
      </button>
    </header>
  );
}
