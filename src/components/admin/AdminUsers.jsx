import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  Lock, 
  Mail, 
  Phone, 
  Calendar,
  Sparkles,
  Key 
} from 'lucide-react';
import salonDB from '../../db/salonDatabase';

export default function AdminUsers() {
  const [users, setUsers] = useState(() => salonDB.getUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const sync = () => setUsers(salonDB.getUsers());
    sync();
    const unsub = salonDB.subscribe(sync);
    return () => unsub();
  }, []);

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.phone && u.phone.toLowerCase().includes(q));

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Registered Users & Patrons</h2>
          <p className="text-white/60 text-xs sm:text-sm">Manage user directory, customer profiles, and administrator credentials.</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#1C1418] rounded-2xl p-4 border border-white/10 shadow-lg grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name, email, or phone number..."
            className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:border-[#CFA46A] outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full h-10 px-3 bg-[#24151E] border border-white/10 rounded-xl text-xs text-white focus:border-[#CFA46A] outline-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="staff">Staff Members</option>
            <option value="customer">Registered Patrons</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1C1418] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-white/60 uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">User</th>
                <th className="py-4 px-4 font-semibold">Contact Info</th>
                <th className="py-4 px-4 font-semibold">Role</th>
                <th className="py-4 px-4 font-semibold">Registered</th>
                <th className="py-4 px-4 font-semibold text-right">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white text-sm">{user.name}</div>
                      <div className="text-[10px] font-mono text-white/40">{user.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-white/90">
                        <Mail className="w-3.5 h-3.5 text-[#CFA46A]" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-white/50 text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-[#CFA46A]" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : user.role === 'staff'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white/50 text-[11px]">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-medium">
                        <Lock className="w-3 h-3" />
                        <span>SHA-256 Secured</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/50">
                    No users found matching your filters.
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
