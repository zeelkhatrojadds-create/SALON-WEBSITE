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
    <div className="space-y-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">VIP Newsletter Subscribers</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage emails submitted via "STAY IN THE GLOW" newsletter forms.</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Subscribers ({subscribers.length})</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscribers by email address..."
            className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:border-[#CFA46A] outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1C1418] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">Subscriber Email</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Topics</th>
                <th className="py-4 px-4 font-semibold">Subscribed Date</th>
                <th className="py-4 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length > 0 ? (
                filtered.map((sub) => (
                  <tr key={sub.id || sub.email} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-4 font-medium text-white flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#CFA46A]" />
                      <span>{sub.email}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {sub.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/60">
                      {Array.isArray(sub.topics) ? sub.topics.join(', ') : 'All Updates'}
                    </td>
                    <td className="py-4 px-4 text-white/50 text-[11px]">
                      {sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id || sub.email)}
                        className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors cursor-pointer"
                        title="Delete subscriber"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/50">
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
