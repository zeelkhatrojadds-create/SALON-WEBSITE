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
    <div className="space-y-6 animate-fade-in text-[#10110F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F]">Registered Users & Patrons</h2>
          <p className="text-[#6B7068] text-xs sm:text-sm mt-1">Manage user directory, customer profiles, and administrator credentials.</p>
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
            placeholder="Search users by name, email, or phone number..."
            className="w-full h-10 pl-10 pr-4 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] placeholder-[#6B7068] focus:border-[#263D2B] outline-none"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full h-10 px-3 bg-[#F7F4ED] border border-[#DCE1D8] rounded-xl text-xs text-[#10110F] focus:border-[#263D2B] outline-none cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="staff">Staff Members</option>
            <option value="customer">Registered Patrons</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#DCE1D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#DCE1D8] bg-[#F7F4ED] text-[#6B7068] uppercase text-[10px] tracking-wider">
                <th className="py-4 px-4 font-semibold">User</th>
                <th className="py-4 px-4 font-semibold">Contact Info</th>
                <th className="py-4 px-4 font-semibold">Role</th>
                <th className="py-4 px-4 font-semibold">Registered</th>
                <th className="py-4 px-4 font-semibold text-right">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE1D8]/60">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F7F4ED]/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-[#10110F] text-sm">{user.name}</div>
                      <div className="text-[10px] font-mono text-[#6B7068]">{user.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-[#10110F]">
                        <Mail className="w-3.5 h-3.5 text-[#263D2B]" />
                        <span>{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-1.5 text-[#6B7068] text-[11px] mt-0.5">
                          <Phone className="w-3 h-3 text-[#263D2B]" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'admin'
                          ? 'bg-[#263D2B]/10 text-[#263D2B] border border-[#263D2B]/20'
                          : user.role === 'staff'
                          ? 'bg-[#465640]/15 text-[#465640] border border-[#465640]/30'
                          : 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[#6B7068] text-[11px]">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-[#263D2B] bg-[#263D2B]/10 px-2.5 py-1 rounded-lg border border-[#263D2B]/20 font-medium">
                        <Lock className="w-3 h-3" />
                        <span>SHA-256 Secured</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#6B7068]">
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
