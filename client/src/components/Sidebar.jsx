import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Grid,
  Boxes,
  Users,
  BarChart3,
  LogOut,
  Sparkles,
} from 'lucide-react';

export const Sidebar = ({ user, onLogout }) => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Tables', path: '/tables', icon: Grid },
    { label: 'Menu', path: '/menu', icon: UtensilsCrossed },
    { label: 'Inventory Control', path: '/inventory', icon: Boxes },
    { label: 'Staff', path: '/staff', icon: Users },
    { label: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 z-40 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-white tracking-wide">SmartResto</h1>
              <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">SaaS Platform</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800/80">
        <div className="glass-card p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold">
              {user ? user.name.charAt(0) : 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">{user ? user.name : 'Admin'}</p>
              <p className="text-[11px] text-slate-400 truncate">{user ? user.restaurantName : 'Bistro'}</p>
            </div>
          </div>
          {user && (
            <button
              onClick={onLogout}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
