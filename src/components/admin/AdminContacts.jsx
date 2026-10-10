import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Trash2, 
  CheckCircle, 
  Search, 
  Clock, 
  MessageSquare, 
  Calendar,
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminContacts() {
  const [messages, setMessages] = useState(() => salonDB.getContactMessages());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const sync = () => setMessages(salonDB.getContactMessages());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const handleUpdateStatus = (id, status) => {
    salonDB.updateContactMessageStatus(id, status);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete message from ${name}?`)) {
      salonDB.deleteContactMessage(id);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.phone && m.phone.toLowerCase().includes(q)) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      (m.message && m.message.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">Contact & Atelier Inquiries</h2>
          <p className="text-[#6B7068] text-xs sm:text-sm">Manage incoming inquiries submitted via the Contact page.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl p-4 border border-[#DCE1D8] shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-[#6B7068] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by guest name, email, phone, subject..."
            className="w-full h-10 pl-10 pr-4 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068]/50 focus:border-[#263D2B] outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full h-10 px-3 bg-[#F7F4ED]/50 border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="New">★ New Messages</option>
            <option value="Read">✓ Read</option>
            <option value="Replied">✉ Replied</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => {
            const cleanPhone = String(msg.phone || '').replace(/\D/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${msg.name}! Thank you for contacting GLAM GIRL BY JANKI regarding "${msg.subject}". How may we assist you?`)}`;

            return (
              <div
                key={msg.id}
                className={`p-5 rounded-2xl bg-white border transition-colors space-y-3 shadow-sm ${
                  msg.status === 'New' ? 'border-[#263D2B]/50 bg-[#F7F4ED]/50' : 'border-[#DCE1D8]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE1D8] pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-base text-[#10110F]">{msg.name}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        msg.status === 'New'
                          ? 'bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20'
                          : msg.status === 'Replied'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-[#F7F4ED] text-[#6B7068] border border-[#DCE1D8]'
                      }`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#263D2B] font-semibold">{msg.subject}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B7068]">
                    <Clock className="w-3.5 h-3.5 text-[#263D2B]" />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-[#10110F] leading-relaxed bg-[#F7F4ED]/60 p-3.5 rounded-xl border border-[#DCE1D8]">
                  "{msg.message}"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                  <div className="flex flex-wrap items-center gap-4 text-[#6B7068]">
                    {msg.phone && (
                      <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-[#263D2B]">
                        <Phone className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>{msg.phone}</span>
                      </a>
                    )}
                    {msg.email && (
                      <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-[#263D2B]">
                        <Mail className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>{msg.email}</span>
                      </a>
                    )}
                    {msg.targetDate && (
                      <span className="flex items-center gap-1.5 text-[#6B7068]">
                        <Calendar className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>Target: {msg.targetDate}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {msg.phone && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-[#263D2B] text-[#263D2B] hover:text-white border border-[#DCE1D8] text-[11px] font-bold transition-all"
                      >
                        WhatsApp
                      </a>
                    )}

                    <select
                      value={msg.status}
                      onChange={(e) => handleUpdateStatus(msg.id, e.target.value)}
                      className="text-[11px] bg-white text-[#10110F] border border-[#DCE1D8] rounded-xl px-2.5 py-1.5 focus:border-[#263D2B] outline-none cursor-pointer"
                    >
                      <option value="New">Set New</option>
                      <option value="Read">Set Read</option>
                      <option value="Replied">Set Replied</option>
                    </select>

                    <button
                      onClick={() => handleDelete(msg.id, msg.name)}
                      className="p-1.5 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center text-[#6B7068] text-xs bg-white rounded-3xl border border-[#DCE1D8]">
            No contact inquiries found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
