import React, { useState } from 'react';
import { sampleTables } from '../utils/tablesData';
import { StatCard } from '../components/StatCard';
import { Modal } from '../components/Modal';
import { useSearch } from '../context/SearchContext';
import {
  Grid,
  CheckCircle2,
  UserX,
  Clock,
  Users,
  Calendar,
  Eye,
  Info,
  Sparkles,
} from 'lucide-react';

export const TablesPage = () => {
  const [tables] = useState(sampleTables);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTable, setSelectedTable] = useState(null);
  const { query } = useSearch();

  // Summary Metrics
  const totalTables = tables.length;
  const availableCount = tables.filter((t) => t.status === 'Available').length;
  const occupiedCount = tables.filter((t) => t.status === 'Occupied').length;
  const reservedCount = tables.filter((t) => t.status === 'Reserved').length;

  // Search and status tab filter logic
  const filteredTables = tables.filter((t) => {
    const matchesTab = activeTab === 'All' || t.status === activeTab;
    const matchesSearch =
      !query ||
      t.tableNumber.toLowerCase().includes(query.toLowerCase()) ||
      t.status.toLowerCase().includes(query.toLowerCase()) ||
      (t.customerName && t.customerName.toLowerCase().includes(query.toLowerCase())) ||
      `seats ${t.seats}`.includes(query.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const tabs = ['All', 'Available', 'Occupied', 'Reserved'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span className="badge badge-emerald flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            🟢 Available
          </span>
        );
      case 'Occupied':
        return (
          <span className="badge badge-rose flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            🔴 Occupied
          </span>
        );
      case 'Reserved':
        return (
          <span className="badge badge-amber flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            🟡 Reserved
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusCardBorder = (status) => {
    switch (status) {
      case 'Available':
        return 'hover:border-emerald-500/50 hover:shadow-emerald-500/10';
      case 'Occupied':
        return 'hover:border-rose-500/50 hover:shadow-rose-500/10';
      case 'Reserved':
        return 'hover:border-amber-500/50 hover:shadow-amber-500/10';
      default:
        return 'hover:border-indigo-500/50';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            <Grid className="w-6 h-6 text-indigo-400" />
            Tables
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Read-only live table floor layout and reservation status monitoring.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab) => {
            const count =
              tab === 'All'
                ? tables.length
                : tables.filter((t) => t.status === tab).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    activeTab === tab
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tables"
          value={totalTables}
          subtitle="All dining floor tables"
          icon={Grid}
          color="indigo"
        />
        <StatCard
          title="Available Tables"
          value={availableCount}
          subtitle="Ready for guests"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Occupied Tables"
          value={occupiedCount}
          subtitle="Currently seated"
          icon={Users}
          color="rose"
        />
        <StatCard
          title="Reserved Tables"
          value={reservedCount}
          subtitle="Upcoming bookings"
          icon={Calendar}
          color="amber"
        />
      </div>

      {/* Table Cards Responsive Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <span>Floor Layout</span>
            <span className="text-xs font-normal text-slate-400">
              ({filteredTables.length} {filteredTables.length === 1 ? 'table' : 'tables'})
            </span>
          </h2>
          <span className="text-xs text-slate-400 italic flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-400" /> Click any table to view details
          </span>
        </div>

        {filteredTables.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredTables.map((table) => (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`glass-card p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-1 ${getStatusCardBorder(
                  table.status
                )} relative overflow-hidden group`}
              >
                {/* Top Card Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center font-extrabold text-white text-lg group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40 transition-colors">
                    {table.tableNumber}
                  </div>
                  {getStatusBadge(table.status)}
                </div>

                {/* Table Content */}
                <div className="space-y-1.5 mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="text-slate-400 font-medium">Seating:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      {table.seats} Seats
                    </span>
                  </div>

                  {table.status === 'Occupied' && (
                    <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <p className="truncate text-slate-200 font-medium">
                        Customer: <span className="text-rose-400 font-bold">{table.customerName}</span>
                      </p>
                    </div>
                  )}

                  {table.status === 'Reserved' && (
                    <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                      <p className="truncate text-slate-200 font-medium">
                        Guest: <span className="text-amber-400 font-bold">{table.customerName}</span>
                      </p>
                    </div>
                  )}

                  {table.status === 'Available' && (
                    <div className="text-[11px] text-emerald-400/80 pt-2 border-t border-slate-800/80 font-medium">
                      Ready for seating
                    </div>
                  )}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-x-0 bottom-0 py-1 bg-indigo-600/10 text-indigo-300 text-[10px] font-semibold text-center opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 border-t border-indigo-500/20">
                  <Eye className="w-3 h-3" /> View Details
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 rounded-2xl text-center text-slate-500">
            <UserX className="w-10 h-10 mx-auto mb-3 opacity-40 text-slate-400" />
            <p className="text-base font-semibold text-slate-300">No tables found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or filter settings.
            </p>
          </div>
        )}
      </div>

      {/* Read-Only Table Details Modal */}
      <Modal
        isOpen={!!selectedTable}
        onClose={() => setSelectedTable(null)}
        title={selectedTable ? `Table ${selectedTable.tableNumber} Details` : ''}
      >
        {selectedTable && (
          <div className="space-y-6">
            {/* Header info card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">Table ID</span>
                <h3 className="text-2xl font-extrabold text-white tracking-wide">
                  Table {selectedTable.tableNumber}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block mb-1">Current Status</span>
                {getStatusBadge(selectedTable.status)}
              </div>
            </div>

            {/* General Specs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-400" /> Seating Capacity
                </p>
                <p className="text-lg font-bold text-white">{selectedTable.seats} Persons</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Mode
                </p>
                <p className="text-sm font-bold text-indigo-400">Monitoring Only (Read-Only)</p>
              </div>
            </div>

            {/* Dynamic Status Detail Section */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                Occupancy & Booking Details
              </h4>

              {selectedTable.status === 'Available' && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-emerald-300">
                    This table is currently available.
                  </p>
                </div>
              )}

              {selectedTable.status === 'Occupied' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Customer Name:</span>
                    <span className="font-bold text-white">{selectedTable.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Number of Customers:</span>
                    <span className="font-bold text-white">{selectedTable.customerCount} Guests</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-rose-400" /> Occupied Since:
                    </span>
                    <span className="font-bold text-rose-300">{selectedTable.occupiedSince}</span>
                  </div>
                </div>
              )}

              {selectedTable.status === 'Reserved' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Customer Name:</span>
                    <span className="font-bold text-white">{selectedTable.customerName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Number of Customers:</span>
                    <span className="font-bold text-white">{selectedTable.customerCount} Guests</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1 border-b border-slate-800/60">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> Reservation Date:
                    </span>
                    <span className="font-bold text-amber-300">{selectedTable.reservationDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Reservation Time:
                    </span>
                    <span className="font-bold text-amber-300">{selectedTable.reservationTime}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Read-Only Modal Footer Notice */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTable(null)}
                className="btn-secondary text-xs px-5 py-2"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
