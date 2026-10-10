import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  Download, 
  Search, 
  Calendar,
  Sparkles,
  Users 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState(() => salonDB.getNewsletterSubscribers());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const sync = () => setSubscribers(salonDB.getNewsletterSubscribers());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const handleDelete = (idOrEmail) => {
    if (window.confirm(`Unsubscribe / remove ${idOrEmail}?`)) {
      salonDB.deleteNewsletterSubscriber(idOrEmail);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ['Subscriber Email', 'Status', 'Subscribed Date', 'Topics'];
    const rows = subscribers.map(s => [
      `"${s.email || ''}"`,
      `"${s.status || 'Active'}"`,
      `"${s.subscribedAt || ''}"`,
      `"${Array.isArray(s.topics) ? s.topics.join(', ') : ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `glam_girl_newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = subscribers.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    return !q || (s.email && s.email.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">VIP Newsletter Subscribers</h2>
          <p className="text-[#6B7068] text-xs sm:text-sm">Manage emails submitted via "STAY IN THE GLOW" newsletter forms.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="global-button-secondary inline-flex items-center gap-1.5 !px-4 !py-2.5 text-xs font-semibold cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Subscribers ({subscribers.length})</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscribers by email address..."
            className="w-full h-10 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068]/50 focus:border-[#263D2B] outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#DCE1D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DCE1D8] bg-[#F7F4ED] text-[#6B7068] uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">Subscriber Email</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Topics</th>
                <th className="py-4 px-4 font-semibold">Subscribed Date</th>
                <th className="py-4 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE1D8]">
              {filtered.length > 0 ? (
                filtered.map((sub) => (
                  <tr key={sub.id || sub.email} className="hover:bg-[#F7F4ED]/40 transition-colors">
                    <td className="py-4 px-4 font-medium text-[#10110F] flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#263D2B]" />
                      <span>{sub.email}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {sub.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#6B7068]">
                      {Array.isArray(sub.topics) ? sub.topics.join(', ') : 'All Updates'}
                    </td>
                    <td className="py-4 px-4 text-[#6B7068] text-[11px]">
                      {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id || sub.email)}
                        className="p-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors cursor-pointer"
                        title="Delete subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#6B7068]">
                    No newsletter subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
