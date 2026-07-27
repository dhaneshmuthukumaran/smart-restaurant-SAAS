import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'indigo' }) => {
  const colorMap = {
    indigo: 'from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30',
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
    rose: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
  };

  return (
    <div className="glass-card glass-card-glow p-6 rounded-2xl relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br border ${colorMap[color]} shadow-inner`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className={trend.isPositive ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
            {trend.isPositive ? '↑' : '↓'} {trend.text}
          </span>
          <span className="text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
};
