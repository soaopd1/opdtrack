import React from 'react';
import { Player } from '../data/types';
import { getTierName, getTierColor } from '../utils/rank';

interface PlayerProfileProps {
  player: Player;
  isEnemy: boolean;
  onClose: () => void;
}

function WeaponSlot({ name, iconUrl }: { name: string; iconUrl?: string | null }) {
  return (
    <div className="bg-[#1a2332] border border-[#2a3544] rounded-sm h-[68px] flex flex-col items-center justify-center p-2 hover:border-[#3a4554] transition-colors overflow-hidden">
      {iconUrl ? (
        <img src={iconUrl} alt={name} className="h-8 object-contain opacity-80 mb-1" />
      ) : null}
      <span className="text-[8px] text-white/50 uppercase tracking-wide font-medium">{name}</span>
    </div>
  );
}



export default function PlayerProfile({ player, isEnemy, onClose }: PlayerProfileProps) {
  const rankName = getTierName(player.rankTier);
  const rankColor = getTierColor(player.rankTier);
  const peakName = getTierName(player.peakRankTier);

  const statItem = (label: string, value: string | number, color?: string) => (
    <div className="flex flex-col items-center bg-slate-800/50 rounded-lg p-2.5 border border-slate-700/30">
      <span className="text-[8px] uppercase tracking-wider opacity-40 font-bold">{label}</span>
      <span className={`font-mono text-base font-bold mt-0.5 ${color || 'text-white'}`}>{value}</span>
    </div>
  );

  // For ally with real skins, build loadout columns from skins data
  const renderLoadout = () => {
    if (!player.skins) {
      return (
        <div className="text-center py-4 opacity-30">
          <p className="text-xs uppercase tracking-wider font-bold">Loadout data loading...</p>
        </div>
      );
    }

    const S = 0.75;
    const colW = Math.round(170 * S);
    const gap = Math.round(190 * S);

    return (
      <div className="relative w-full" style={{ height: `${Math.round(560 * S)}px` }}>
        {/* SIDEARMS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: '0px', top: '0px', width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Sidearms</h4>
          {['Classic','Shorty','Frenzy','Ghost','Sheriff'].map(n => <WeaponSlot key={n} name={n} />)}
        </div>
        {/* SMGS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap}px`, top: '0px', width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">SMGs</h4>
          {['Stinger','Spectre'].map(n => <WeaponSlot key={n} name={n} />)}
        </div>
        {/* SHOTGUNS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap}px`, top: `${Math.round(240 * S)}px`, width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Shotguns</h4>
          {['Bucky','Judge'].map(n => <WeaponSlot key={n} name={n} />)}
        </div>
        {/* RIFLES */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 2}px`, top: '0px', width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Rifles</h4>
          {[
            { name: 'Phantom', skin: player.skins.phantom },
            { name: 'Vandal', skin: player.skins.vandal },
            { name: 'Bulldog', skin: null },
            { name: 'Guardian', skin: null },
          ].map(({ name, skin }) => <WeaponSlot key={name} name={skin?.name || name} iconUrl={skin?.iconUrl} />)}
        </div>
        {/* MELEE */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 2}px`, top: `${Math.round(432 * S)}px`, width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Melee</h4>
          <WeaponSlot name={player.skins.melee?.name || 'Melee'} iconUrl={player.skins.melee?.iconUrl} />
        </div>
        {/* SNIPER RIFLES */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 3}px`, top: '0px', width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Sniper Rifles</h4>
          {[
            { name: 'Operator', skin: player.skins.operator },
            { name: 'Marshal', skin: null },
            { name: 'Outlaw', skin: null },
          ].map(({ name, skin }) => <WeaponSlot key={name} name={skin?.name || name} iconUrl={skin?.iconUrl} />)}
        </div>
        {/* MACHINE GUNS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 3}px`, top: `${Math.round(336 * S)}px`, width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Machine Guns</h4>
          {['Ares','Odin'].map(n => <WeaponSlot key={n} name={n} />)}
        </div>
        {/* PLAYER CARDS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 4}px`, top: '0px', width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Player Cards</h4>
          <div className="bg-[#1a2332] border border-[#2a3544] rounded-sm" style={{ height: `${Math.round(340 * S)}px` }} />
        </div>
        {/* EXPRESSIONS */}
        <div className="absolute flex flex-col gap-1.5" style={{ left: `${gap * 4}px`, top: `${Math.round(370 * S)}px`, width: `${colW}px` }}>
          <h4 className="text-white text-[9px] uppercase tracking-widest font-bold mb-1">Expressions</h4>
          <div className="relative flex items-center justify-center" style={{ width: `${colW}px`, height: `${colW}px` }}>
            <div className="absolute rounded-full border border-[#2a3544]" style={{ width: `${Math.round(150 * S)}px`, height: `${Math.round(150 * S)}px` }} />
            <div className="absolute rounded-full border border-[#2a3544] bg-[#0f1923] z-10" style={{ width: `${Math.round(48 * S)}px`, height: `${Math.round(48 * S)}px` }} />
            <div className="absolute bg-[#2a3544]" style={{ width: `${Math.round(150 * S)}px`, height: '1px' }} />
            <div className="absolute bg-[#2a3544]" style={{ width: '1px', height: `${Math.round(150 * S)}px` }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#0f1923] border border-[#2a3544] rounded-lg w-full max-w-[800px] max-h-[90vh] overflow-y-auto shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-7 h-7 bg-[#1a2332] hover:bg-[#2a3544] border border-[#2a3544] rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
          >
            ✕
          </button>

          {/* Stats section */}
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#1a2332] rounded-lg border border-[#2a3544] flex items-center justify-center shrink-0 overflow-hidden">
                {player.agentIconUrl ? (
                  <img src={player.agentIconUrl} alt={player.agentName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-bold opacity-30 uppercase">{player.agentName?.slice(0,3)}</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-white">
                    {player.incognito ? '— Incognito —' : player.name}
                  </h2>
                  {!player.incognito && player.tag && (
                    <span className="text-xs opacity-40 font-mono">{player.tag}</span>
                  )}
                  {player.isLocal && (
                    <span className="text-[9px] bg-accent-cyan/20 text-accent-cyan px-1.5 py-0.5 rounded uppercase font-bold">You</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {player.rankTier >= 3 && (
                    <div className="flex items-center gap-1 bg-[#1a2332] border border-[#2a3544] rounded px-2 py-0.5">
                      <span className={`text-[10px] font-bold uppercase ${rankColor}`}>{rankName}</span>
                      <span className="text-[9px] font-mono text-accent-cyan/70">{player.rr} RR</span>
                    </div>
                  )}
                  {player.peakRankTier >= 3 && (
                    <div className="flex items-center gap-1 bg-amber-900/20 border border-amber-700/30 rounded px-2 py-0.5">
                      <span className="text-[9px] font-bold text-amber-400/70 uppercase">Peak: {peakName}</span>
                    </div>
                  )}
                  {player.accountLevel > 0 && (
                    <span className="text-[9px] opacity-40 font-mono">Lv. {player.accountLevel}</span>
                  )}
                  {player.leaderboard > 0 && (
                    <span className="text-[9px] font-bold text-yellow-400">LB #{player.leaderboard}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {statItem('Games', player.games)}
              {statItem('WR', player.wr === 'N/A' ? 'N/A' : `${player.wr}%`, typeof player.wr === 'number' && player.wr > 50 ? 'text-emerald-500' : 'text-primary')}
              {statItem('RR', player.rr, 'text-accent-cyan')}
              {statItem('Agent', player.agentName || '-')}
            </div>

            {/* Recent matches */}
            {player.history.length > 0 && (
              <div className="mb-2">
                <h3 className="text-[9px] uppercase tracking-widest opacity-40 font-bold mb-1.5">Recent Matches</h3>
                <div className="flex gap-1.5">
                  {player.history.map((entry, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded p-1.5 text-center border ${entry.result === 'win' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-primary/10 border-primary/20'}`}
                    >
                      <div className={`text-[9px] font-bold uppercase ${entry.result === 'win' ? 'text-emerald-500' : 'text-primary'}`}>
                        {entry.result === 'win' ? 'WIN' : 'LOSS'}
                      </div>
                      <div className={`text-xs font-mono font-bold ${entry.result === 'win' ? 'text-emerald-400' : 'text-primary'}`}>
                        {entry.result === 'win' ? '+' : '-'}{entry.rrChange} RR
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Loadout section */}
          {!isEnemy && (
            <div className="border-t border-[#2a3544] p-5 bg-[#0a0e14]/50">
              <h3 className="text-xs uppercase tracking-widest font-bold text-white/60 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full" />
                Loadout
              </h3>
              {renderLoadout()}
            </div>
          )}

          {isEnemy && (
            <div className="border-t border-[#2a3544] p-5 bg-[#0a0e14]/50">
              <div className="text-center py-6 opacity-30">
                <p className="text-xs uppercase tracking-wider font-bold">Loadout not available for enemy players</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
