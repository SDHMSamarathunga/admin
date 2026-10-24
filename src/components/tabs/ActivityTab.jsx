import React, { useState } from 'react';
import {
  Activity,
  Search,
  Download,
  Trash2,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Radio,
  Code2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ActivityTab({
  logs,
  setLogs,
  onTriggerToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const handleClearLogs = () => {
    setLogs([]);
    onTriggerToast('Audit event logs cleared');
  };

  const toggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Error':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/20">
            <AlertCircle size={11} />
            <span>ERROR</span>
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20">
            <AlertTriangle size={11} />
            <span>WARN</span>
          </span>
        );
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={11} />
            <span>OK</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-400 border border-teal-500/20">
            <Info size={11} />
            <span>INFO</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-sm flex-1 max-w-md">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search audit trail by event, actor, or IP..."
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

          <div className="flex items-center gap-2.5 flex-wrap">
            <select
              className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="ALL">All Severities</option>
              <option value="Error">Errors Only</option>
              <option value="Warning">Warnings</option>
              <option value="Success">Success / OK</option>
              <option value="Info">Informational</option>
            </select>

            <button
              type="button"
              onClick={() => {
                setIsLiveStreaming(!isLiveStreaming);
                onTriggerToast(isLiveStreaming ? 'Live stream paused' : 'Live stream active');
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border ${
                isLiveStreaming
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Radio size={14} className={isLiveStreaming ? 'animate-pulse' : ''} />
              <span>{isLiveStreaming ? 'Live Stream: On' : 'Paused'}</span>
            </button>

            <button
              type="button"
              onClick={() => onTriggerToast(`Exporting ${filteredLogs.length} audit records...`)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={handleClearLogs}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-rose-400 text-xs font-semibold transition-colors"
            >
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Immutable Audit Ledger</h2>
            <p className="text-xs text-slate-400">Zero-trust cryptographic trail of administrative and API actions</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">
            {filteredLogs.length} EVENTS RECORDED
          </span>
        </div>

        <div className="space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              <Activity size={28} className="mx-auto mb-2 text-slate-600" />
              <span>No audit logs match criteria</span>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div
                  key={log.id}
                  className="rounded-xl border border-slate-800 bg-slate-800/40 hover:border-slate-700 transition-colors overflow-hidden"
                >
                  <div
                    onClick={() => toggleExpand(log.id)}
                    className="p-3 sm:px-4 flex items-center justify-between gap-3 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500 shrink-0">
                        <Clock size={12} />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="shrink-0">{getSeverityBadge(log.severity)}</div>
                      <div className="min-w-0">
                        <span className="font-semibold text-white mr-2">{log.event}</span>
                        <span className="text-slate-400 hidden md:inline truncate">{log.details}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline">
                        {log.actor}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 hidden lg:inline">{log.ip}</span>
                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded JSON Inspector */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-950/80 border-t border-slate-800 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <Code2 size={13} className="text-emerald-400" />
                        <span className="font-bold text-slate-300">Telemetry Payload</span>
                        <span className="text-[10px] text-teal-400">ID: {log.id}</span>
                      </div>
                      <pre className="text-emerald-300/90 leading-relaxed overflow-x-auto p-3 rounded-lg bg-slate-900 border border-slate-800">
{JSON.stringify(
  {
    eventId: log.id,
    timestamp: log.timestamp,
    severity: log.severity,
    action: log.event,
    actorContext: {
      identity: log.actor,
      ip: log.ip,
      tlsVersion: 'TLSv1.3'
    },
    meta: {
      clusterNode: 'prod-us-east-1a',
      consensusHash: '0x8f2b74c9381ea64d0092f1b88e...'
    }
  },
  null,
  2
)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
