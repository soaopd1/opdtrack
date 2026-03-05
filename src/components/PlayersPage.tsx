import React, { useState } from 'react';

interface PlayerEntry {
  id: string;
  name: string;
  tag: string;
  rank: string;
  timesPlayed: number;
  lastSeen: string;
  note: 'friend' | 'neutral' | 'toxic' | 'avoid';
  winRate: number;
}

export default function PlayersPage() {
  const [filter, setFilter] = useState<'all' | 'friend' | 'toxic' | 'avoid'>('all');

  const players: PlayerEntry[] = [
    { id: '1', name: 'AcePlayer', tag: '#ACE', rank: 'Immortal 2', timesPlayed: 12, lastSeen: '2h ago', note: 'friend', winRate: 67 },
    { id: '2', name: 'ToxicAndy', tag: '#7440', rank: 'Diamond 2', timesPlayed: 8, lastSeen: '1h ago', note: 'toxic', winRate: 38 },
    { id: '3', name: 'SilentKill', tag: '#9021', rank: 'Ascendant 1', timesPlayed: 5, lastSeen: '1d ago', note: 'neutral', winRate: 60 },
    { id: '4', name: 'Dodger99', tag: '#1234', rank: 'Diamond 3', timesPlayed: 3, lastSeen: '3d ago', note: 'avoid', winRate: 33 },
    { id: '5', name: 'FlickMaster', tag: '#5555', rank: 'Immortal 1', timesPlayed: 15, lastSeen: '4h ago', note: 'friend', winRate: 73 },
    { id: '6', name: 'BotFragger', tag: '#0001', rank: 'Diamond 1', timesPlayed: 6, lastSeen: '2d ago', note: 'neutral', winRate: 50 },
  ];

  const noteColors: Record<string, string> = {
    friend: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
    toxic: 'bg-primary/20 text-primary border-primary/30',
    avoid: 'bg-amber-500/20 text-amber-500 border-amber-500/30',
    neutral: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  const filtered = filter === 'all' ? players : players.filter(p => p.note === filter);

  return (
    <div className="p-6 md:px-12">
      <h1 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">group</span>
        Players Database
      </h1>

      <div className="flex gap-2 mb-6">
        {(['all', 'friend', 'toxic', 'avoid'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded border transition-colors ${
              filter === f
                ? 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30'
                : 'bg-slate-800/50 text-white/40 border-slate-700/30 hover:text-white/60'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-[1fr_100px_80px_80px_80px_80px] gap-4 px-4 py-2 text-[9px] uppercase tracking-wider opacity-40 font-bold">
          <span>Player</span><span>Rank</span><span className="text-center">Played</span>
          <span className="text-center">Win Rate</span><span className="text-center">Note</span>
          <span className="text-right">Last Seen</span>
        </div>
        {filtered.map(player => (
          <div key={player.id} className="grid grid-cols-[1fr_100px_80px_80px_80px_80px] gap-4 items-center px-4 py-3 bg-card-dark border border-border-dark rounded hover:bg-white/[0.02] transition-colors">
            <div>
              <span className="font-bold text-sm">{player.name}</span>
              <span className="text-[10px] opacity-40 font-mono ml-1">{player.tag}</span>
            </div>
            <span className="text-xs font-bold opacity-70">{player.rank}</span>
            <span className="text-center font-mono text-xs font-bold">{player.timesPlayed}</span>
            <span className={`text-center font-mono text-xs font-bold ${player.winRate > 50 ? 'text-emerald-500' : 'text-primary'}`}>
              {player.winRate}%
            </span>
            <div className="text-center">
              <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${noteColors[player.note]}`}>
                {player.note}
              </span>
            </div>
            <span className="text-right text-[10px] opacity-30 font-mono">{player.lastSeen}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
