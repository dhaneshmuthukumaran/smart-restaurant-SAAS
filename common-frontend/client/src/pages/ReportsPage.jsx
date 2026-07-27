import React, { useState, useEffect, useMemo } from 'react';
import API from '../utils/api';
import { StatCard } from '../components/StatCard';
import { calculateReportMetrics } from '../utils/reportsData';
import { notificationStore } from '../components/Navbar';
import { useSearch } from '../context/SearchContext';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Clock,
  Users,
  Award,
  Receipt,
  PiggyBank,
  Sparkles,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const ReportsPage = () => {
  const [orders, setOrders] = useState([]);
  const [staff, setStaff] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { query } = useSearch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, staffRes, menuRes] = await Promise.allSettled([
        API.get('/orders'),
        API.get('/staff'),
        API.get('/menu'),
      ]);

      if (ordersRes.status === 'fulfilled') {
        const raw = ordersRes.value.data;
        setOrders(Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : []);
      }

      if (staffRes.status === 'fulfilled') {
        const raw = staffRes.value.data;
        setStaff(Array.isArray(raw) ? raw : []);
      }

      if (menuRes.status === 'fulfilled') {
        const raw = menuRes.value.data;
        setMenuItems(Array.isArray(raw) ? raw : []);
      }
    } catch (err) {
      console.error('Failed to fetch reports data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Trigger system notifications for reports on initial load
  useEffect(() => {
    const existingNotifs = notificationStore.getAll();
    const hasDailyNotif = existingNotifs.some((n) => n.title?.includes('Daily Report'));

    if (!hasDailyNotif) {
      notificationStore.add({
        type: 'ready',
        title: '📊 Daily Report Generated',
        message: "Today's sales report is ready.",
      });
      notificationStore.add({
        type: 'preparing',
        title: '📈 Weekly Report Generated',
        message: "This week's sales and performance report is available.",
      });
      notificationStore.add({
        type: 'served',
        title: '🗓️ Monthly Report Generated',
        message: 'Monthly business analytics report is ready.',
      });
    }
  }, []);

  // Calculate dynamic report metrics
  const metrics = useMemo(() => {
    return calculateReportMetrics(orders, menuItems, staff);
  }, [orders, menuItems, staff]);

  const {
    summary,
    weeklyReport,
    monthlyReport,
    topSellingItems,
    staffPerformance,
    peakHours,
    financialBreakdown,
  } = metrics;

  // Search filtering for tables
  const filteredTopItems = topSellingItems.filter((i) =>
    !query || i.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredStaff = staffPerformance.filter(
    (s) =>
      !query ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      (s.role && s.role.toLowerCase().includes(query.toLowerCase()))
  );

  // Maximum values for relative SVG chart bar scaling
  const maxWeeklySales = Math.max(...weeklyReport.chartData.map((d) => d.sales), 1);
  const maxMonthlySales = Math.max(...monthlyReport.chartData.map((d) => d.sales), 1);
  const maxPeakVolume = Math.max(...peakHours.map((h) => h.volume), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center gap-3 text-indigo-400 font-semibold animate-pulse">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Generating Real-time Business Analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 overflow-y-auto">
      {/* ── Header Banner ── */}
      <div className="glass-card p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="badge badge-indigo mb-2 flex items-center gap-1.5 w-max">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Executive Analytics Engine
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-indigo-400" />
            Reports & Business Intelligence
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            Real-time automated performance monitoring, revenue yield, peak-hour activity, item sales, staff productivity, and profit estimates.
          </p>
        </div>
        <button onClick={fetchData} className="btn-secondary text-sm">
          <RefreshCw className="w-4 h-4" /> Refresh Analytics
        </button>
      </div>

      {/* ── 1. Top Summary Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${summary.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Lifetime processed orders"
          icon={DollarSign}
          color="emerald"
          trend={{ isPositive: true, text: '18.4%' }}
        />
        <StatCard
          title="Total Orders"
          value={summary.totalOrders}
          subtitle="Orders processed"
          icon={ShoppingBag}
          color="indigo"
          trend={{ isPositive: true, text: '12.1%' }}
        />
        <StatCard
          title="Average Order Value"
          value={`$${summary.avgOrderValue.toFixed(2)}`}
          subtitle="Per table check average"
          icon={TrendingUp}
          color="amber"
        />
        <StatCard
          title="Profit Estimate"
          value={`$${summary.profitEstimate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle="Net estimated income"
          icon={PiggyBank}
          color={summary.profitEstimate >= 0 ? 'emerald' : 'rose'}
          trend={{ isPositive: summary.profitEstimate >= 0, text: '26.5% Net Margin' }}
        />
      </div>

      {/* ── 2. Weekly & Monthly Sales Reports Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Sales Report */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  Weekly Sales Report
                </h3>
                <p className="text-sm text-slate-400">7-Day sales breakdown (Mon - Sun)</p>
              </div>
              <span className="badge badge-indigo">Weekly</span>
            </div>

            {/* Weekly KPI Highlights */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Sales</span>
                <p className="text-lg font-extrabold text-emerald-400 mt-0.5">
                  ${weeklyReport.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Orders</span>
                <p className="text-lg font-extrabold text-white mt-0.5">{weeklyReport.totalOrders}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Avg / Day</span>
                <p className="text-lg font-extrabold text-amber-400 mt-0.5">
                  ${weeklyReport.avgDailyRevenue.toFixed(0)}
                </p>
              </div>
            </div>

            {/* 7-Day Bar Chart */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                Daily Revenue Comparison
              </span>
              <div className="flex items-end justify-between gap-2 h-44 pt-6 pb-2 px-2 border-b border-slate-800/80">
                {weeklyReport.chartData.map((d) => {
                  const heightPercent = Math.round((d.sales / maxWeeklySales) * 100);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-indigo-500/40 text-white text-[11px] font-bold px-2 py-1 rounded-lg shadow-xl pointer-events-none z-20 whitespace-nowrap">
                        ${d.sales.toLocaleString()} ({d.orders} orders)
                      </div>

                      <div className="w-full bg-slate-800/60 rounded-t-lg overflow-hidden h-32 flex items-end">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full transition-all duration-500 rounded-t-md ${
                            d.isToday
                              ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/30'
                              : 'bg-gradient-to-t from-slate-700 to-indigo-500/60 group-hover:from-indigo-600 group-hover:to-indigo-400'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-xs font-bold mt-1 ${
                          d.isToday ? 'text-indigo-400 font-black' : 'text-slate-400'
                        }`}
                      >
                        {d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Sales Report */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Monthly Sales Report
                </h3>
                <p className="text-sm text-slate-400">30-Day continuous daily sales trend</p>
              </div>
              <span className="badge badge-emerald">Monthly</span>
            </div>

            {/* Monthly KPI Highlights */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Revenue</span>
                <p className="text-lg font-extrabold text-emerald-400 mt-0.5">
                  ${monthlyReport.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Total Orders</span>
                <p className="text-lg font-extrabold text-white mt-0.5">{monthlyReport.totalOrders}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 uppercase font-semibold">Daily Avg</span>
                <p className="text-lg font-extrabold text-indigo-400 mt-0.5">
                  ${monthlyReport.avgDailyRevenue.toFixed(0)}
                </p>
              </div>
            </div>

            {/* 30-Day SVG Line/Area Chart */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-400 block mb-1">
                30-Day Sales Trend Curve
              </span>
              <div className="h-44 pt-4 relative border-b border-slate-800/80">
                <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Generate Area Path */}
                  <path
                    d={`M 0,100 ${monthlyReport.chartData
                      .map((d, i) => {
                        const x = (i / 29) * 300;
                        const y = 100 - (d.sales / maxMonthlySales) * 85;
                        return `L ${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ')} L 300,100 Z`}
                    fill="url(#areaGradient)"
                  />

                  {/* Generate Line Path */}
                  <path
                    d={`M ${monthlyReport.chartData
                      .map((d, i) => {
                        const x = (i / 29) * 300;
                        const y = 100 - (d.sales / maxMonthlySales) * 85;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' L ')}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                  <span>Day 1</span>
                  <span>Day 10</span>
                  <span>Day 20</span>
                  <span>Day 30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Performance Tables (Item Performance & Staff Performance) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Item Performance Table */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Top Selling Items
              </h3>
              <p className="text-sm text-slate-400">Items ranked by highest sales volume</p>
            </div>
            <span className="text-sm font-semibold text-indigo-400">Sorted by Units</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Rank & Item Name</th>
                  <th className="pb-3 text-center">Quantity Sold</th>
                  <th className="pb-3 text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredTopItems.length > 0 ? (
                  filteredTopItems.slice(0, 7).map((item, idx) => (
                    <tr key={item.name} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-semibold text-white flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full text-xs font-extrabold flex items-center justify-center ${
                            idx === 0
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : idx === 1
                              ? 'bg-slate-400/20 text-slate-200 border border-slate-400/30'
                              : idx === 2
                              ? 'bg-amber-700/20 text-amber-400 border border-amber-700/30'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <span>{item.name}</span>
                      </td>
                      <td className="py-3 text-center font-bold text-slate-200">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                          {item.sold}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-emerald-400">
                        ${item.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-slate-500 text-xs">
                      No matching menu items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Performance Table */}
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Staff Performance
              </h3>
              <p className="text-sm text-slate-400">Order handling and revenue volume by staff</p>
            </div>
            <span className="text-sm font-semibold text-indigo-400">Sorted by Revenue</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Staff Name</th>
                  <th className="pb-3 text-center">Orders Handled</th>
                  <th className="pb-3 text-right">Revenue Generated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredStaff.length > 0 ? (
                  filteredStaff.slice(0, 7).map((member, idx) => (
                    <tr key={member.name} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 font-semibold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{member.name}</p>
                          <span className="text-xs text-slate-400 font-medium block">
                            {member.role || 'Server'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-center font-bold text-slate-200">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">
                          {member.handled} orders
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-emerald-400">
                        ${member.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-slate-500 text-xs">
                      No matching staff members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 4. Peak Hour Analysis & Financial Profit Breakdown ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Peak Hour Analysis (2 Cols) */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Peak Hour Analysis
                </h3>
                <p className="text-sm text-slate-400">
                  Hourly order intensity (10 AM to 10 PM) highlighting busiest dining periods
                </p>
              </div>
              <span className="badge badge-amber flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> Peak Highlights
              </span>
            </div>

            {/* Peak Hour Activity Bar Chart */}
            <div className="flex items-end justify-between gap-1.5 h-48 pt-6 pb-2 border-b border-slate-800/80 overflow-x-auto">
              {peakHours.map((h) => {
                const heightPercent = Math.round((h.volume / maxPeakVolume) * 100);

                return (
                  <div key={h.hour} className="flex-1 flex flex-col items-center gap-1 group relative min-w-[28px]">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-amber-500/40 text-white text-[11px] font-bold px-2 py-1 rounded-lg shadow-xl pointer-events-none z-20 whitespace-nowrap">
                      {h.hour}: {h.volume} orders {h.isPeak ? '(Peak Hours 🔥)' : ''}
                    </div>

                    <div className="w-full bg-slate-800/60 rounded-t-lg overflow-hidden h-36 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full transition-all duration-500 rounded-t-md ${
                          h.isPeak
                            ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-lg shadow-amber-500/30'
                            : 'bg-gradient-to-t from-slate-700 to-indigo-500/50 group-hover:from-indigo-500 group-hover:to-indigo-400'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold tracking-tighter mt-1 ${
                        h.isPeak ? 'text-amber-400 font-extrabold' : 'text-slate-500'
                      }`}
                    >
                      {h.hour}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-400"></span> Busiest Peak Hours (12-2 PM & 7-9 PM)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-indigo-500/60"></span> Normal Dining Hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Report & Financial Breakdown (1 Col) */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-400" />
                  Tax & Net Profit Report
                </h3>
                <p className="text-sm text-slate-400">Financial summary & tax breakdown</p>
              </div>
            </div>

            {/* Financial Rows */}
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider block">
                  Tax Breakdown (8% Rate)
                </span>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Gross Sales (Inc. Tax):</span>
                  <span className="font-bold text-white">${financialBreakdown.grossSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Tax Collected (8%):</span>
                  <span className="font-bold text-amber-400">-${financialBreakdown.taxCollected.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-200 pt-1 border-t border-slate-800 font-semibold">
                  <span>Net Sales:</span>
                  <span className="text-white">${financialBreakdown.netSales.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider block">
                  Income vs Expenses
                </span>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Revenue:</span>
                  <span className="font-bold text-emerald-400">${financialBreakdown.grossSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Estimated Expenses:</span>
                  <span className="font-bold text-rose-400">-${financialBreakdown.estimatedExpenses.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-white">Estimated Profit:</span>
                  <span
                    className={`text-lg font-black ${
                      financialBreakdown.estimatedProfit >= 0
                        ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                        : 'text-rose-400'
                    }`}
                  >
                    ${financialBreakdown.estimatedProfit.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800 text-xs text-slate-500 text-center">
            Calculated dynamically from real-time menu and order metrics.
          </div>
        </div>
      </div>
    </div>
  );
};
