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
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm flex-1 max-w-md focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search members by name, email, department..."
              className="bg-transparent border-0 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-base"
              >
                ×
              </button>
            )}
          </div>

          {/* Filters & Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
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
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium focus:outline-none focus:border-emerald-500 focus:bg-white cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>

            <button
              type="button"
              onClick={() => onTriggerToast(`Exporting ${filteredUsers.length} user records...`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
            >
              <Download size={14} className="text-slate-500" />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={onOpenNewUserModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-semibold shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus size={14} />
              <span>Invite Member</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions Banner */}
        {selectedUserIds.length > 0 && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-600">
              <strong className="text-slate-900">{selectedUserIds.length}</strong> accounts selected
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-medium"
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 font-medium"
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium"
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-3 w-8">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    checked={
                      filteredUsers.length > 0 &&
                      selectedUserIds.length === filteredUsers.length
                    }
                    onChange={handleToggleSelectAll}
                  />
                </th>
                <th className="py-3 px-3">Member Profile</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">2FA Security</th>
                <th className="py-3 px-3">Last Active</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400 text-xs">
                    <Users size={32} className="mx-auto mb-2 text-slate-300" />
                    <span>No members found matching criteria</span>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  return (
                    <tr
                      key={user.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? 'bg-emerald-50/40' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleToggleSelectOne(user.id)}
                        />
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm">{user.name}</div>
                            <div className="text-[11px] text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                            user.role === 'Super Admin'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : user.role === 'Security Architect'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : user.role === 'DevOps Lead'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600 font-medium">{user.department}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            user.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : user.status === 'Suspended'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{user.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {user.twoFactor ? (
                          <div className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                            <ShieldCheck size={14} />
                            <span>Enforced</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
                            <ShieldAlert size={14} />
                            <span>Missing</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-500">{user.lastActive}</td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(user.id, user.status, user.name)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm transition-colors"
                            title={user.status === 'Active' ? 'Suspend' : 'Activate'}
                          >
                            {user.status === 'Active' ? (
                              <UserX size={14} className="text-amber-600" />
                            ) : (
                              <UserCheck size={14} className="text-emerald-600" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-rose-600 hover:bg-rose-50 shadow-sm transition-colors"
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
        <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredUsers.length}</strong> of{' '}
            <strong className="text-slate-800">{users.length}</strong> team members
          </span>
          <div className="flex items-center gap-2">
            <button type="button" disabled className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed font-medium">
              Prev
            </button>
            <span className="text-slate-700 font-semibold">Page 1 of 1</span>
            <button type="button" disabled className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
