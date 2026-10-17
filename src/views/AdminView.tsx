import React, { useState } from 'react';
import { ShieldCheck, Plus, Check, Clock, AlertCircle, Trash2, Edit3, Lock, Unlock, Database } from 'lucide-react';
import { allStates } from '../data/statesData.ts';
import { thematicItems } from '../data/categoriesData.ts';

interface AdminRecord {
  id: string;
  title: string;
  category: string;
  state: string;
  status: 'Published' | 'Draft' | 'Under Review';
  lastReviewed: string;
  sourceAuthority: string;
}

export const AdminView: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  const [records, setRecords] = useState<AdminRecord[]>([
    {
      id: 'rec-1',
      title: 'Brihadisvara Temple Granite Inscriptions',
      category: 'Monuments',
      state: 'Tamil Nadu',
      status: 'Published',
      lastReviewed: '2026-03-10',
      sourceAuthority: 'Archaeological Survey of India (ASI)',
    },
    {
      id: 'rec-2',
      title: 'Patan Patola Natural Vegetable Dye Formulas',
      category: 'Craft',
      state: 'Gujarat',
      status: 'Published',
      lastReviewed: '2026-02-28',
      sourceAuthority: 'Ministry of Textiles, GI Registry',
    },
    {
      id: 'rec-3',
      title: 'Singhanpur Neolithic Cave Paintings',
      category: 'Monument',
      state: 'Chhattisgarh',
      status: 'Under Review',
      lastReviewed: '2026-04-01',
      sourceAuthority: 'State Archaeology Department',
    },
    {
      id: 'rec-4',
      title: 'Moidams of the Ahom Dynasty (Royal Burials)',
      category: 'UNESCO Site',
      state: 'Assam',
      status: 'Draft',
      lastReviewed: '2026-04-12',
      sourceAuthority: 'UNESCO World Heritage Dossier 2024',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<'All' | 'Published' | 'Draft' | 'Under Review'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Monuments');
  const [newState, setNewState] = useState('Rajasthan');
  const [newSource, setNewSource] = useState('Archaeological Survey of India');
  const [newStatus, setNewStatus] = useState<'Published' | 'Draft'>('Draft');
  const [formError, setFormError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode for curators: "heritage2026" or "admin"
    if (passcode === 'heritage2026' || passcode === 'admin' || passcode === 'curator') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError('Please provide a title for the heritage record.');
      return;
    }

    const newRecord: AdminRecord = {
      id: `rec-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      state: newState,
      status: newStatus,
      lastReviewed: new Date().toISOString().split('T')[0],
      sourceAuthority: newSource,
    };

    setRecords([newRecord, ...records]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setFormError('');
  };

  const toggleStatus = (id: string) => {
    setRecords(records.map(r => {
      if (r.id === id) {
        const nextStatus = r.status === 'Published' ? 'Draft' : 'Published';
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const deleteRecord = (id: string) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const filtered = filterStatus === 'All' ? records : records.filter(r => r.status === filterStatus);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 animate-in fade-in">
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-md space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-700">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900">Curator & Admin Portal</h1>
            <p className="text-xs text-stone-500 mt-1">
              Authorized access for cultural researchers and content editors.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Curator Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin or curator)"
                className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
              />
              {passcodeError && (
                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Incorrect passcode. Try "admin" or "curator".
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Sign In to Curator Workspace
            </button>
          </form>

          <p className="text-[11px] text-stone-400">
            Tip: Use demo credential <code className="text-stone-700 font-mono">admin</code> to test the content review system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Content Editor Session</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-1">
            Curatorial Content Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#C85A32] hover:bg-[#A5431E] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Heritage Entry</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Lock Session</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
          <span className="text-xs text-stone-500 font-medium">Total Entities Managed</span>
          <p className="text-2xl font-serif font-bold text-stone-900">36 States & UTs</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
          <span className="text-xs text-stone-500 font-medium">Published Records</span>
          <p className="text-2xl font-serif font-bold text-emerald-700">
            {records.filter(r => r.status === 'Published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
          <span className="text-xs text-stone-500 font-medium">Under Review / Drafts</span>
          <p className="text-2xl font-serif font-bold text-amber-700">
            {records.filter(r => r.status !== 'Published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
          <span className="text-xs text-stone-500 font-medium">Citations Authority</span>
          <p className="text-2xl font-serif font-bold text-[#1E3A5F]">ASI & UNESCO</p>
        </div>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex items-center gap-2">
        {(['All', 'Published', 'Draft', 'Under Review'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filterStatus === status
                ? 'bg-stone-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-stone-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-stone-600">
          <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Title & Classification</th>
              <th className="p-4">State / Region</th>
              <th className="p-4">Authority Citation</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Reviewed</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-stone-50/80 transition-colors">
                <td className="p-4">
                  <strong className="text-stone-900 block text-sm">{r.title}</strong>
                  <span className="text-stone-500">{r.category}</span>
                </td>
                <td className="p-4 text-stone-800 font-medium">{r.state}</td>
                <td className="p-4 text-stone-500">{r.sourceAuthority}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                      r.status === 'Published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : r.status === 'Under Review'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-4 font-mono text-[11px] text-stone-500">{r.lastReviewed}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => toggleStatus(r.id)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
                    title="Toggle Publish / Draft"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRecord(r.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-md transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 p-6 space-y-4 animate-in zoom-in-95">
            <h3 className="text-lg font-serif font-bold text-stone-900">Add New Cultural Heritage Record</h3>
            <form onSubmit={handleCreateRecord} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Lepakshi Hanging Pillar Inscription"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                  >
                    <option value="Monuments">Monuments</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Cuisines">Cuisines</option>
                    <option value="Performing Arts">Performing Arts</option>
                    <option value="Textiles & Crafts">Textiles & Crafts</option>
                    <option value="Languages">Languages</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Associated State</label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                  >
                    {allStates.map(s => (
                      <option key={s.slug} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Citation Authority</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="e.g., Archaeological Survey of India (ASI)"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
                />
              </div>

              {formError && <p className="text-xs text-rose-600">{formError}</p>}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] text-white rounded-lg text-xs font-medium hover:bg-[#A5431E]"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
