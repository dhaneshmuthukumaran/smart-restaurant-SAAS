import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { Modal } from '../components/Modal';
import { useSearch } from '../context/SearchContext';
import { Boxes, Plus, AlertTriangle, Trash2, Search, PlusCircle, MinusCircle } from 'lucide-react';

export const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('All');
  const { query } = useSearch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    quantity: 10,
    unit: 'kg',
    minThreshold: 5,
    unitCost: 10,
    supplier: '',
  });

  const categories = ['All', 'Produce', 'Meat & Seafood', 'Dairy', 'Dry Goods', 'Beverages'];

  const fetchInventory = async () => {
    try {
      const { data } = await API.get(`/inventory?category=${category}&search=${query || ''}`);
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [category, query]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/inventory', formData);
      setIsModalOpen(false);
      setFormData({ name: '', category: 'Produce', quantity: 10, unit: 'kg', minThreshold: 5, unitCost: 10, supplier: '' });
      fetchInventory();
    } catch (error) {
      alert('Failed to add inventory item');
    }
  };

  const handleAdjustStock = async (id, delta) => {
    try {
      await API.patch(`/inventory/${id}/stock`, { adjustment: delta });
      fetchInventory();
    } catch (error) {
      console.error('Failed to adjust stock:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inventory item?')) return;
    try {
      await API.delete(`/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Smart Inventory & Stock Control</h1>
          <p className="text-xs text-slate-400">Track stock counts, set min reorder thresholds, and prevent spoilage waste.</p>
        </div>

        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> Add Inventory Item
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

      {/* Inventory Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <th className="p-4">Item Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock Level</th>
              <th className="p-4">Status</th>
              <th className="p-4">Unit Cost</th>
              <th className="p-4">Supplier</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 font-bold text-white text-sm">{item.name}</td>
                <td className="p-4 text-slate-300">{item.category}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleAdjustStock(item._id, -1)}
                      className="text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-white text-sm">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      onClick={() => handleAdjustStock(item._id, 1)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`badge ${
                      item.status === 'in-stock'
                        ? 'badge-emerald'
                        : item.status === 'low-stock'
                        ? 'badge-amber'
                        : 'badge-rose'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-slate-300 font-mono">${item.unitCost.toFixed(2)} / {item.unit}</td>
                <td className="p-4 text-slate-400">{item.supplier || 'N/A'}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-slate-500 hover:text-rose-400 p-1.5 rounded hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Inventory Stock">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Item Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g. Avocadoes"
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
                <option value="Produce">Produce</option>
                <option value="Meat & Seafood">Meat & Seafood</option>
                <option value="Dairy">Dairy</option>
                <option value="Dry Goods">Dry Goods</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity</label>
              <input
                type="number"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit (kg, L, pack)</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Min Alert Threshold</label>
              <input
                type="number"
                value={formData.minThreshold}
                onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Unit Cost ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.unitCost}
                onChange={(e) => setFormData({ ...formData, unitCost: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Supplier</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                className="input-field"
                placeholder="e.g. FreshCo Distributors"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Inventory Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
