import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { notificationStore } from '../components/Navbar';
import { useSearch } from '../context/SearchContext';
import {
  ShoppingBag, Clock, CheckCircle2, ChefHat, CheckSquare,
  ArrowRight, Utensils, Bell,
} from 'lucide-react';

// ── Status colour helpers ──────────────────────────────────────────────────
const STATUS_STYLES = {
  pending:   { dot: 'bg-amber-400',   badge: 'bg-amber-500/15 text-amber-300 border-amber-500/25',   ring: 'border-amber-500/30 hover:border-amber-400/60' },
  preparing: { dot: 'bg-indigo-400',  badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25', ring: 'border-indigo-500/30 hover:border-indigo-400/60' },
  ready:     { dot: 'bg-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25', ring: 'border-emerald-500/30 hover:border-emerald-400/60' },
  served:    { dot: 'bg-cyan-400',    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',      ring: 'border-cyan-500/30 hover:border-cyan-400/60' },
};

const COL_HEADERS = {
  pending:   { label: 'Pending Kitchen',    icon: Clock,         color: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
  preparing: { label: 'Preparing / Cooking', icon: ChefHat,       color: 'text-indigo-400',  bg: 'bg-indigo-500/10 border-indigo-500/20' },
  ready:     { label: 'Ready for Service',  icon: CheckCircle2,  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  served:    { label: 'Served / Completed', icon: CheckSquare,   color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20' },
};

// ── Notification builder ───────────────────────────────────────────────────
const fireNotification = (order, toStatus) => {
  const num = order.orderNumber || `#${order._id?.slice(-4)}`;
  const table = order.tableNumber ? ` · Table ${order.tableNumber}` : '';

  const config = {
    preparing: {
      type: 'preparing',
      title: '🍳 Now Preparing',
      message: `${num}${table} — sent to kitchen. Chef is cooking!`,
    },
    ready: {
      type: 'ready',
      title: '✅ Ready for Service',
      message: `${num}${table} — food is ready. Serve the guest now!`,
    },
    served: {
      type: 'served',
      title: '🎉 Order Served',
      message: `${num}${table} — order complete and delivered to the table.`,
    },
  };

  if (config[toStatus]) notificationStore.add(config[toStatus]);
};

// ── Main Component ─────────────────────────────────────────────────────────
export const OrdersPage = () => {
  const [orders, setOrders]   = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [updating, setUpdating]   = useState(null);
  const { query } = useSearch();

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data) ? data.data : [];
      setOrders(list);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (order, toStatus) => {
    setUpdating(order._id);
    try {
      await API.patch(`/orders/${order._id}/status`, { status: toStatus });
      fireNotification(order, toStatus);
      await fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(null);
    }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const filteredOrders = safeOrders.filter(o => 
    !query || 
    o.customerName?.toLowerCase().includes(query.toLowerCase()) || 
    o.orderNumber?.toLowerCase().includes(query.toLowerCase())
  );
  const tabs = ['All', 'pending', 'preparing', 'ready', 'served'];

  // Counts for tab badges
  const counts = tabs.reduce((acc, t) => {
    acc[t] = t === 'All' ? filteredOrders.length : filteredOrders.filter(o => o.status === t).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
            Orders
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time status tracking — actions trigger bell notifications instantly.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab}
              {counts[tab] > 0 && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Kanban Columns ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(COL_HEADERS).map(([key, col]) => {
          const Icon = col.icon;
          const colOrders = filteredOrders.filter(o =>
            o.status === key && (activeTab === 'All' || activeTab === key)
          );
          const styles = STATUS_STYLES[key];

          return (
            <div key={key} className="glass-card p-4 rounded-2xl flex flex-col h-[75vh]">

              {/* Column Header */}
              <div className={`flex items-center justify-between p-3 rounded-xl border mb-4 ${col.bg}`}>
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${col.color}`} />
                  <h3 className="text-sm font-bold text-white">{col.label}</h3>
                </div>
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${col.bg} ${col.color}`}>
                  {colOrders.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-4 overflow-y-auto flex-1 pr-1">
                {colOrders.length > 0 ? (
                  colOrders.map((order) => (
                    <div
                      key={order._id}
                      className={`p-4 rounded-xl bg-slate-950/70 border transition-all shadow-lg ${styles.ring}`}
                    >
                      {/* Card top */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`} />
                          <span className="font-extrabold text-white text-sm">{order.customerName || 'Guest'}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 font-bold text-xs">
                          Table {order.tableNumber}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-3">
                        Order: <span className="text-slate-200 font-medium">#{order.orderNumber}</span>
                      </p>

                      {/* Items */}
                      <div className="space-y-1.5 mb-4 border-t border-b border-slate-800/80 py-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-slate-200">
                            <span>{item.quantity}× {item.name}</span>
                            <span className="text-slate-400 font-mono">
                              ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <p className="text-[11px] text-amber-300 italic mb-3 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                          Note: "{order.notes}"
                        </p>
                      )}

                      {/* Footer / Action */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="font-bold text-white">
                          ${(order.totalAmount || 0).toFixed(2)}
                        </span>

                        {key === 'pending' && (
                          <ActionButton
                            label="Start Cooking"
                            icon={<ChefHat className="w-3.5 h-3.5" />}
                            className="bg-amber-500/20 hover:bg-amber-500/35 text-amber-300 border border-amber-500/30"
                            loading={updating === order._id}
                            onClick={() => handleUpdateStatus(order, 'preparing')}
                          />
                        )}
                        {key === 'preparing' && (
                          <ActionButton
                            label="Mark Ready"
                            icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                            className="bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border border-emerald-500/30"
                            loading={updating === order._id}
                            onClick={() => handleUpdateStatus(order, 'ready')}
                          />
                        )}
                        {key === 'ready' && (
                          <ActionButton
                            label="Mark Served"
                            icon={<Utensils className="w-3.5 h-3.5" />}
                            className="bg-cyan-500/20 hover:bg-cyan-500/35 text-cyan-300 border border-cyan-500/30"
                            loading={updating === order._id}
                            onClick={() => handleUpdateStatus(order, 'served')}
                          />
                        )}
                        {key === 'served' && (
                          <span className="flex items-center gap-1 text-cyan-400 text-[11px] font-semibold">
                            <CheckSquare className="w-3.5 h-3.5" /> Complete
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-slate-700">
                    <Bell className="w-6 h-6 mb-2 opacity-30" />
                    <p className="text-xs">No orders here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Reusable action button ─────────────────────────────────────────────────
const ActionButton = ({ label, icon, className, loading, onClick }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg font-semibold transition-all text-xs ${className} ${
      loading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {loading ? (
      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      icon
    )}
    {label}
  </button>
);
