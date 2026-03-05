import React from 'react';
import { MatchHistoryEntry } from '../data/types';

interface HistoryPageProps {
  matches: MatchHistoryEntry[];
}

export default function HistoryPage({ matches }: HistoryPageProps) {
  if (!matches || matches.length === 0) {
    return (
      <div className="p-6 md:px-12">
        <h1 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-base">history</span>
          Match History
        </h1>
        <div className="flex items-center justify-center py-16 opacity-30">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl mb-2 block">history</span>
            <p className="text-xs uppercase tracking-wider font-bold">No match history available</p>
            <p className="text-[10px] mt-1">Play some competitive matches to see your history.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:px-12">
      <h1 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">history</span>
        Match History
      </h1>

      <div className="flex flex-col gap-2">
        {matches.map((match) => (
          <div
            key={match.matchId}
            className={`flex items-center justify-between p-4 rounded border transition-colors hover:bg-white/[0.02] ${
              match.result === 'win'
                ? 'bg-emerald-500/5 border-emerald-500/15'
                : 'bg-primary/5 border-primary/15'
            }`}
          >
            {/* Left: Result + Map */}
            <div className="flex items-center gap-4 min-w-[200px]">
              <div className={`text-xs font-bold uppercase px-2.5 py-1 rounded ${
                match.result === 'win' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-primary/20 text-primary'
              }`}>
                {match.result === 'win' ? 'WIN' : 'LOSS'}
              </div>
              <div>
                <span className="font-bold text-sm">{match.mapName}</span>
                <span className="text-[10px] opacity-40 font-mono block">{match.gameMode}</span>
              </div>
            </div>

            {/* Score */}
            <div className="text-center min-w-[80px]">
              <span className="font-mono font-bold text-base">{match.score}</span>
            </div>

            {/* Agent */}
            <div className="flex items-center gap-2 min-w-[100px]">
              <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center border border-slate-700 overflow-hidden">
                {match.agentIconUrl ? (
                  <img src={match.agentIconUrl} alt={match.agentName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[7px] font-bold opacity-40 uppercase">{match.agentName?.slice(0, 3)}</span>
                )}
              </div>
              <span className="text-xs font-bold opacity-60">{match.agentName}</span>
            </div>

            {/* KDA */}
            <div className="text-center min-w-[100px]">
              <span className="text-[9px] uppercase opacity-40 block font-bold">KDA</span>
              <span className="font-mono text-xs font-bold">{match.kills}/{match.deaths}/{match.assists}</span>
            </div>

            {/* RR */}
            <div className="text-center min-w-[60px]">
              <span className={`font-mono text-sm font-bold ${
                match.rrChange >= 0 ? 'text-emerald-500' : 'text-primary'
              }`}>
                {match.rrChange >= 0 ? '+' : ''}{match.rrChange} RR
              </span>
            </div>

            {/* Time */}
            <div className="min-w-[60px] text-right">
              <span className="text-[10px] opacity-30 font-mono">{match.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
