import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { StatCard } from '../components/StatCard';
import {
  DollarSign,
  ShoppingBag,
  AlertTriangle,
  Users,
  Utensils,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useSearch();

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/dashboard/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const filteredRecentOrders = stats?.recentOrders?.filter(o => 
    !query || 
    o.customerName?.toLowerCase().includes(query.toLowerCase()) || 
    o.orderNumber?.toLowerCase().includes(query.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3 text-indigo-400 font-semibold animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Loading Real-time Analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-card p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="badge badge-indigo mb-2">Live AI Assistant Enabled</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Smart Restaurant Operations</h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Real-time capacity tracking, inventory optimization, and dynamic surge pricing active for optimal cover yield.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="btn-secondary text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Stats
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue ? stats.totalRevenue.toFixed(2) : '0.00'}`}
          subtitle="All orders processed"
          icon={DollarSign}
          color="emerald"
          trend={{ isPositive: true, text: '14.2%' }}
        />
        <StatCard
          title="Active Kitchen Orders"
          value={stats?.activeOrders || 0}
          subtitle={`${stats?.totalOrders || 0} total lifetime`}
          icon={ShoppingBag}
          color="amber"
          trend={{ isPositive: true, text: '8 active now' }}
        />
        <StatCard
          title="Table Utilization"
          value={`${stats?.tableUtilization || 0}%`}
          subtitle={`${stats?.occupiedTables || 0} of ${stats?.totalTables || 15} tables occupied`}
          icon={Utensils}
          color="indigo"
        />
        <StatCard
          title="Stock Alerts"
          value={stats?.lowStockCount || 0}
          subtitle="Items below min threshold"
          icon={AlertTriangle}
          color={stats?.lowStockCount > 0 ? 'rose' : 'emerald'}
        />
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Active Orders */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Live Kitchen Orders</h3>
              <p className="text-xs text-slate-400">Most recent order tickets</p>
            </div>
            <Link to="/orders" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              View All Orders <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {filteredRecentOrders.length > 0 ? (
              filteredRecentOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between hover:border-indigo-500/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center">
                      T{order.tableNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{order.customerName || 'Guest'}</span>
                        <span className="text-xs text-slate-400">• #{order.orderNumber}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`badge ${
                        order.status === 'pending'
                          ? 'badge-amber'
                          : order.status === 'preparing'
                          ? 'badge-indigo'
                          : order.status === 'ready'
                          ? 'badge-emerald'
                          : 'badge-cyan'
                      }`}
                    >
                      {order.status}
                    </span>
                    <p className="text-sm font-extrabold text-white mt-1.5">${order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8 text-sm">No active orders right now.</p>
            )}
          </div>
        </div>

        {/* Low Stock Warning Box */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Smart Inventory Monitor</h3>
              </div>
              <Link to="/inventory" className="text-xs text-indigo-400 font-semibold hover:underline">
                Manage
              </Link>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Automated reorder alerts triggered by stock velocity algorithms.
            </p>

            <div className="space-y-3">
              {stats?.lowStockAlerts && stats.lowStockAlerts.length > 0 ? (
                stats.lowStockAlerts.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/20 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400">Supplier: {item.supplier}</p>
                    </div>
                    <div className="text-right">
                      <span className="badge badge-amber">{item.quantity} {item.unit} left</span>
                      <p className="text-[11px] text-slate-500 mt-1">Min: {item.minThreshold} {item.unit}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-400 text-xs font-semibold">
                  All inventory stock levels are healthy!
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Dynamic Pricing Status
              </span>
              <span className="text-indigo-400 font-bold">{stats?.activeSurgeItems || 0} Surge Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
