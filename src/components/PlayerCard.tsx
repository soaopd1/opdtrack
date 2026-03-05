import React from 'react';
import { Player } from '../data/types';
import { getTierName, getTierShort, getTierColor } from '../utils/rank';

interface PlayerCardProps {
  player: Player;
  isEnemy?: boolean;
  onClick?: () => void;
}

export default function PlayerCard({ player, isEnemy = false, onClick }: PlayerCardProps) {
  const rankName = getTierName(player.rankTier);
  const rankShort = getTierShort(player.rankTier);
  const rankColor = getTierColor(player.rankTier);
  const peakName = getTierName(player.peakRankTier);

  const displayName = player.incognito ? '— Incognito —' : player.name;

  // ─── Avatar ───────────────────────────────────────────────────────────────
  const avatarBlock = (
    <div className="flex flex-col items-center shrink-0">
      <div className="w-[72px] h-[72px] bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center relative border border-slate-300 dark:border-slate-700 overflow-hidden">
        {player.agentIconUrl ? (
          <img src={player.agentIconUrl} alt={player.agentName} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[11px] font-bold opacity-40 uppercase">
            {player.agentName?.slice(0, 3) || '???'}
          </span>
        )}
        {player.isLocal && (
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-cyan border-2 border-card-dark rounded-full" />
        )}
      </div>
    </div>
  );

  // ─── Stats ────────────────────────────────────────────────────────────────
  const statsBlock = (
    <div className={`flex space-x-3 mt-1.5 ${isEnemy ? 'justify-end' : ''}`}>
      <div className={`flex flex-col ${isEnemy ? 'items-end' : ''}`}>
        <span className="stat-label">WR</span>
        <span className={`font-mono text-xs font-bold ${typeof player.wr === 'number' && player.wr > 50 ? 'text-emerald-500' : 'text-primary'}`}>
          {player.wr === 'N/A' ? 'N/A' : `${player.wr}%`}
        </span>
      </div>
      <div className={`flex flex-col ${isEnemy ? 'items-end' : ''}`}>
        <span className="stat-label">Games</span>
        <span className="font-mono text-xs font-bold">{player.games}</span>
      </div>
      {player.leaderboard > 0 && (
        <div className={`flex flex-col ${isEnemy ? 'items-end' : ''}`}>
          <span className="stat-label">LB</span>
          <span className="font-mono text-xs font-bold text-yellow-400">#{player.leaderboard}</span>
        </div>
      )}
    </div>
  );

  // ─── Name block ───────────────────────────────────────────────────────────
  const nameBlock = (
    <div className={`flex flex-col ${isEnemy ? 'items-end' : ''}`}>
      <div className={`flex items-baseline gap-1.5 flex-wrap ${isEnemy ? 'flex-row-reverse' : ''}`}>
        <span className="font-bold text-base leading-none">{displayName}</span>
        {!player.incognito && player.tag && (
          <span className="text-[10px] opacity-40 font-mono">{player.tag}</span>
        )}
        {player.isLocal && (
          <span className="text-[9px] bg-accent-cyan/20 text-accent-cyan px-1 rounded uppercase font-bold">You</span>
        )}
      </div>

      {/* Peak Rank */}
      {player.peakRankTier >= 3 && (
        <div className={`flex items-center gap-1.5 mt-1 ${isEnemy ? 'flex-row-reverse' : ''}`}>
          <div className="w-4 h-4 bg-amber-900/30 rounded-sm flex items-center justify-center border border-amber-700/30">
            <span className="text-[6px] font-bold text-amber-500/70">▲</span>
          </div>
          <span className="text-[9px] opacity-40 font-mono">Peak: {peakName}</span>
        </div>
      )}

      {statsBlock}
    </div>
  );

  // ─── RR block ─────────────────────────────────────────────────────────────
  const rrHistoryBlock = (
    <div className="flex flex-col items-center gap-1 min-w-[150px] shrink-0">
      {player.rankTier >= 3 && (
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className={`text-[10px] font-bold uppercase tracking-wide ${rankColor}`}>
            {rankName}
          </span>
        </div>
      )}
      {player.rankTier < 3 && (
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Unranked</span>
        </div>
      )}

      {/* RR bar */}
      <div className="w-full flex items-center gap-2">
        <span className="text-[8px] uppercase tracking-wider opacity-40 font-bold shrink-0">RR</span>
        <div className="flex-1 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-cyan/50 to-accent-cyan transition-all"
            style={{ width: `${Math.min(player.rr, 100)}%` }}
          />
        </div>
        <span className="text-[9px] font-mono font-bold opacity-50 shrink-0">{player.rr}</span>
      </div>

      {/* History dots */}
      {player.history.length > 0 && (
        <div className="flex space-x-2 mt-1">
          {player.history.map((entry) => (
            <div key={entry.matchId} className="flex flex-col items-center gap-0.5">
              <div className={`w-2.5 h-2.5 rounded-full ${entry.result === 'win' ? 'bg-emerald-500' : 'bg-primary'}`} />
              <span className={`text-[8px] font-mono font-bold leading-none ${entry.result === 'win' ? 'text-emerald-500' : 'text-primary'}`}>
                {entry.result === 'win' ? '+' : '-'}{entry.rrChange}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ─── Weapon skins 2×2 ─────────────────────────────────────────────────────
  const weaponSkinsBlock = (
    <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
      <span className="text-[8px] uppercase tracking-wider opacity-30 font-bold">Skins</span>
      <div className="grid grid-cols-2 gap-2.5 w-full max-w-[260px]">
        {(['phantom', 'vandal', 'operator', 'melee'] as const).map((wKey) => {
          const skin = player.skins?.[wKey];
          return (
            <div
              key={wKey}
              className="h-14 bg-slate-800/60 rounded border border-slate-700/40 flex flex-col items-center justify-center hover:border-accent-cyan/30 transition-colors cursor-pointer overflow-hidden"
              title={skin?.name || wKey}
            >
              {skin?.iconUrl ? (
                <img src={skin.iconUrl} alt={skin.name} className="h-8 object-contain opacity-80" />
              ) : (
                <span className="text-[8px] font-bold opacity-30 uppercase">{wKey}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className={`player-card ${isEnemy ? 'enemy-card' : ''} bg-white dark:bg-card-dark border border-slate-300 dark:border-border-dark p-4 flex items-center justify-between gap-4 cursor-pointer`}
      onClick={onClick}
    >
      {isEnemy ? (
        <>
          {rrHistoryBlock}
          {weaponSkinsBlock}
          <div className="flex items-center space-x-4 text-right">
            {nameBlock}
            {avatarBlock}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center space-x-4">
            {avatarBlock}
            {nameBlock}
          </div>
          {weaponSkinsBlock}
          {rrHistoryBlock}
        </>
      )}
    </div>
  );
}
