import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Modal } from '../components/Modal';
import { useSearch } from '../context/SearchContext';
import { Utensils, Plus, Zap, Trash2, Edit, Search, CheckCircle, XCircle } from 'lucide-react';

export const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const { query } = useSearch();
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Main Course',
    basePrice: '',
    description: '',
    preparationTimeMinutes: 15,
  });

  const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/menu?category=${category}&search=${query || ''}`);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [category, query]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/menu', formData);
      setIsModalOpen(false);
      setFormData({ name: '', category: 'Main Course', basePrice: '', description: '', preparationTimeMinutes: 15 });
      fetchMenu();
    } catch (error) {
      alert('Error creating menu item');
    }
  };

  const handleToggleSurge = async (id) => {
    try {
      await API.patch(`/menu/${id}/surge`);
      fetchMenu();
    } catch (error) {
      console.error('Failed to toggle surge pricing:', error);
    }
  };

  const handleToggleAvailability = async (item) => {
    try {
      await API.put(`/menu/${item._id}`, { isAvailable: !item.isAvailable });
      fetchMenu();
    } catch (error) {
      console.error('Failed to toggle availability:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await API.delete(`/menu/${id}`);
      fetchMenu();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Menu</h1>
          <p className="text-xs text-slate-400">
            Manage dishes, toggle dynamic peak-hour surge pricing, and control item availability.
          </p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Menu Item
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                category === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-indigo-500/40">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="badge badge-indigo">{item.category}</span>
                <button
                  onClick={() => handleToggleSurge(item._id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    item.isSurgePricingActive
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-amber-400'
                  }`}
                  title="Toggle Dynamic Surge Pricing (+15%)"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {item.isSurgePricingActive ? 'Surge Active (+15%)' : 'Surge Off'}
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4">{item.description}</p>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-extrabold text-white">${item.currentPrice.toFixed(2)}</span>
                {item.isSurgePricingActive && (
                  <span className="text-xs text-slate-500 line-through">${item.basePrice.toFixed(2)}</span>
                )}
                <span className="text-xs text-slate-400 ml-auto">{item.preparationTimeMinutes} min prep</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleToggleAvailability(item)}
                className={`text-xs font-semibold flex items-center gap-1.5 ${
                  item.isAvailable ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {item.isAvailable ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {item.isAvailable ? 'Available' : 'Sold Out'}
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Delete Item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Menu Item">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Item Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g. Lobster Bisque"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
              >
                <option value="Appetizer">Appetizer</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                className="input-field"
                placeholder="24.50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              placeholder="Detailed description of flavors and ingredients..."
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Est. Preparation Time (min)</label>
            <input
              type="number"
              value={formData.preparationTimeMinutes}
              onChange={(e) => setFormData({ ...formData, preparationTimeMinutes: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Menu Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
