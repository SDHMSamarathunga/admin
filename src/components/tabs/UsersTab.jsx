import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Download,
  UserCheck,
  UserX
} from 'lucide-react';

export default function UsersTab({
  users,
  setUsers,
  onOpenNewUserModal,
  onTriggerToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((u) => u.id));
    }
  };

  const handleToggleSelectOne = (id) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((item) => item !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  const handleDeleteUser = (id, name) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setSelectedUserIds((prev) => prev.filter((item) => item !== id));
    onTriggerToast(`User ${name} removed from organization`);
  };

  const handleToggleStatus = (id, currentStatus, name) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
    );
    onTriggerToast(`Status for ${name} set to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm flex-1 max-w-md">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search members by name, email, department..."
              className="bg-transparent border-0 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* Filters & Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="DevOps Lead">DevOps Lead</option>
              <option value="Security Architect">Security Architect</option>
              <option value="Senior Engineer">Senior Engineer</option>
              <option value="Product Manager">Product Manager</option>
            </select>

            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Pending">Pending</option>
            </select>

            <button
              type="button"
              onClick={() => onTriggerToast(`Exporting ${filteredUsers.length} user records...`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewUserModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all"
            >
              <Plus size={14} />
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions Banner */}
        {selectedUserIds.length > 0 && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
            <span className="text-slate-300">
              <strong className="text-white">{selectedUserIds.length}</strong> accounts selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setUsers((prev) =>
                    prev.map((u) =>
                      selectedUserIds.includes(u.id) ? { ...u, status: 'Active' } : u
                    )
                  );
                  onTriggerToast(`Activated ${selectedUserIds.length} accounts`);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-emerald-400 hover:bg-slate-700"
              >
                <UserCheck size={13} />
                <span>Activate</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsers((prev) =>
                    prev.map((u) =>
                      selectedUserIds.includes(u.id) ? { ...u, status: 'Suspended' } : u
                    )
                  );
                  onTriggerToast(`Suspended ${selectedUserIds.length} accounts`);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700"
              >
                <UserX size={13} />
                <span>Suspend</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsers((prev) => prev.filter((u) => !selectedUserIds.includes(u.id)));
                  onTriggerToast(`Removed ${selectedUserIds.length} accounts`);
                  setSelectedUserIds([]);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 w-8">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUserIds.length === filteredUsers.length
                    }
                    onChange={handleToggleSelectAll}
                  />
                </th>
                <th className="pb-3">Member Profile</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">2FA Security</th>
                <th className="pb-3">Last Active</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-10 text-center text-slate-500 text-xs">
                    <Users size={28} className="mx-auto mb-2 text-slate-600" />
                    <span>No members found matching criteria</span>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-emerald-500/5' : ''
                      }`}
                    >
                      <td className="py-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(user.id)}
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
                          />
                          <div>
                            <div className="font-semibold text-white text-xs">{user.name}</div>
                            <div className="text-[11px] text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            user.role === 'Super Admin'
                              ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30'
                              : user.role === 'Security Architect'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-300 border border-slate-700'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-slate-400">{user.department}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            user.status === 'Active'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                              : user.status === 'Suspended'
                              ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td className="py-3">
                        {user.twoFactor ? (
                          <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                            <ShieldCheck size={14} />
                            <span>Enforced</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-medium">
                            <ShieldAlert size={14} />
                            <span>Missing</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-xs text-slate-400">{user.lastActive}</td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(user.id, user.status, user.name)}
                            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white transition-colors"
                            title={user.status === 'Active' ? 'Suspend' : 'Activate'}
                          >
                            {user.status === 'Active' ? (
                              <UserX size={14} className="text-amber-400" />
                            ) : (
                              <UserCheck size={14} className="text-emerald-400" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Remove Member"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer pagination */}
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-800 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredUsers.length}</strong> of{' '}
            <strong className="text-white">{users.length}</strong> team members
          </span>
          <div className="flex items-center gap-2">
            <button type="button" disabled className="px-2.5 py-1 rounded bg-slate-800 text-slate-500 cursor-not-allowed">
              Prev
            </button>
            <span className="text-slate-300 font-medium">Page 1 of 1</span>
            <button type="button" disabled className="px-2.5 py-1 rounded bg-slate-800 text-slate-500 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
