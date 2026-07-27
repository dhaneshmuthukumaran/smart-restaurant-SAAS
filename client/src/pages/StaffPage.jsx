import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Modal } from '../components/Modal';
import { useSearch } from '../context/SearchContext';
import { Users, Plus, Mail, Phone, Clock, DollarSign, Trash2, CheckCircle2 } from 'lucide-react';

export const StaffPage = () => {
  const [staff, setStaff] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { query } = useSearch();

  const filteredStaff = staff.filter(member => 
    !query || 
    member.name.toLowerCase().includes(query.toLowerCase()) || 
    member.role.toLowerCase().includes(query.toLowerCase()) ||
    member.email.toLowerCase().includes(query.toLowerCase())
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Waiter',
    shift: 'Evening (16:00 - 00:00)',
    hourlyRate: 18.5,
  });

  const fetchStaff = async () => {
    try {
      const { data } = await API.get('/staff');
      setStaff(data);
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/staff', formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', role: 'Waiter', shift: 'Evening (16:00 - 00:00)', hourlyRate: 18.5 });
      fetchStaff();
    } catch (error) {
      alert('Failed to add staff member');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove staff member?')) return;
    try {
      await API.delete(`/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Staff</h1>
          <p className="text-xs text-slate-400">Oversee kitchen and front-of-house staff, shift schedules, and roles.</p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Staff Member
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member._id} className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/40">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-indigo">{member.role}</span>
                <span
                  className={`badge ${
                    member.status === 'Active'
                      ? 'badge-emerald'
                      : member.status === 'On Break'
                      ? 'badge-amber'
                      : 'badge-rose'
                  }`}
                >
                  {member.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5" /> {member.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-b border-slate-800/80 py-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> Shift:
                  </span>
                  <span className="font-semibold text-white">{member.shift}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Hourly Rate:
                  </span>
                  <span className="font-mono font-semibold text-emerald-400">${member.hourlyRate.toFixed(2)} / hr</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => handleDelete(member._id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 rounded hover:bg-slate-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Staff Member">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g. Marcus Vance"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                placeholder="marcus@bistro.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input-field"
              >
                <option value="Head Chef">Head Chef</option>
                <option value="Sous Chef">Sous Chef</option>
                <option value="Head Waiter">Head Waiter</option>
                <option value="Waiter">Waiter</option>
                <option value="Barista">Barista</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Shift Schedule</label>
              <select
                value={formData.shift}
                onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                className="input-field"
              >
                <option value="Morning (08:00 - 16:00)">Morning (08:00 - 16:00)</option>
                <option value="Evening (16:00 - 00:00)">Evening (16:00 - 00:00)</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hourly Rate ($)</label>
              <input
                type="number"
                step="0.50"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Staff Member
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
