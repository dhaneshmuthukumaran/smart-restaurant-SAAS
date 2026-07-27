import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, X, CheckCheck, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

// Global notification store (singleton pattern for cross-component usage)
export const notificationStore = {
  _listeners: [],
  _notifications: [],
  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  },
  add(notification) {
    const notif = {
      id: Date.now() + Math.random(),
      time: new Date(),
      read: false,
      ...notification,
    };
    this._notifications = [notif, ...this._notifications].slice(0, 30);
    this._listeners.forEach(fn => fn([...this._notifications]));
    return notif;
  },
  markRead(id) {
    this._notifications = this._notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this._listeners.forEach(fn => fn([...this._notifications]));
  },
  markAllRead() {
    this._notifications = this._notifications.map(n => ({ ...n, read: true }));
    this._listeners.forEach(fn => fn([...this._notifications]));
  },
  getAll() { return [...this._notifications]; },
};

const getPageSearchConfig = (pathname) => {
  switch (pathname) {
    case '/orders':
      return { placeholder: 'Search by customer, table...', key: 'orders' };
    case '/tables':
      return { placeholder: 'Search by table number, customer...', key: 'tables' };
    case '/menu':
      return { placeholder: 'Search menu items...', key: 'menu' };
    case '/inventory':
      return { placeholder: 'Search inventory...', key: 'inventory' };
    case '/staff':
      return { placeholder: 'Search staff...', key: 'staff' };
    case '/reports':
      return { placeholder: 'Search reports, items, staff...', key: 'reports' };
    default:
      return { placeholder: 'Search...', key: 'default' };
  }
};

export const Navbar = ({ title, user }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [notifications, setNotifications] = useState(() => notificationStore.getAll());
  const [showPanel, setShowPanel] = useState(false);
  const { query, setQuery } = useSearch();
  const panelRef = useRef(null);
  const location = useLocation();

  const searchConfig = getPageSearchConfig(location.pathname);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subscribe to notification store
  useEffect(() => {
    const unsub = notificationStore.subscribe(setNotifications);
    return unsub;
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    if (showPanel) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showPanel]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getNotifColor = (type) => {
    switch (type) {
      case 'ready': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'preparing': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'served': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
      default: return 'text-slate-300 bg-slate-800/60 border-slate-700';
    }
  };

  return (
    <header className="h-20 border-b border-slate-800/80 px-8 flex items-center justify-between sticky top-0 bg-slate-950/70 backdrop-blur-md z-30">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
        <p className="text-xs text-slate-400">
          Real-time operations for{' '}
          <span className="text-indigo-400 font-medium">
            {user ? user.restaurantName : 'Gourmet Bistro'}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <span className="live-dot"></span>
          <span>System Live</span>
          <span className="text-slate-400 ml-2 font-mono">{time}</span>
        </div>

        {/* Context-Aware Search */}
        <div className="relative w-64 hidden md:flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none z-10" />
          <input
            type="text"
            placeholder={searchConfig.placeholder}
            value={query}
            onChange={handleSearch}
            className="input-field !pl-9 py-1.5 text-xs bg-slate-900/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={panelRef}>
          <button
            id="notification-bell"
            onClick={() => setShowPanel(v => !v)}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500"></span>
              </>
            )}
          </button>

          {/* Notification Panel */}
          {showPanel && (
            <div
              className="absolute right-0 top-12 w-96 max-h-[480px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden flex flex-col z-50"
              style={{ animation: 'slideDown 0.18s ease' }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <span className="font-bold text-white text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => notificationStore.markAllRead()}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="overflow-y-auto flex-1">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-slate-800/60 flex items-start justify-between gap-3 ${
                        !notif.read ? 'bg-slate-800/30' : 'opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-indigo-500 animate-pulse' : 'bg-slate-600'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border inline-block ${getNotifColor(notif.type)}`}>
                              {notif.title}
                            </span>
                            {notif.read && (
                              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-bold">
                                ✓ Done
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{notif.message}</p>
                          <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-400 font-mono">
                            <Clock className="w-3 h-3 text-indigo-400" />
                            <span>{new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            <span>·</span>
                            <span className="text-slate-500 font-sans">{formatTime(notif.time)}</span>
                          </div>
                        </div>
                      </div>

                      {!notif.read ? (
                        <button
                          onClick={() => notificationStore.markRead(notif.id)}
                          className="px-2 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-300 border border-indigo-500/40 text-[11px] font-semibold shrink-0 transition-colors"
                          title="Mark as Done"
                        >
                          Mark Done
                        </button>
                      ) : (
                        <span className="text-slate-500 text-[11px] shrink-0">Done</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};
