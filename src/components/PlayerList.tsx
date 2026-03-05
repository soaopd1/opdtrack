import React from 'react';
import { Player } from '../data/types';
import PlayerCard from './PlayerCard';

interface PlayerListProps {
  teamName: string;
  avgRank: string;
  players: Player[];
  isEnemy?: boolean;
  onPlayerClick?: (player: Player) => void;
}

export default function PlayerList({ teamName, avgRank, players, isEnemy = false, onPlayerClick }: PlayerListProps) {
  if (!players || players.length === 0) {
    return (
      <section className="space-y-4">
        <div className={`flex justify-between items-end border-b ${isEnemy ? 'border-primary/30' : 'border-accent-cyan/30'} pb-2`}>
          {isEnemy ? (
            <>
              <span className="stat-label">Avg: {avgRank}</span>
              <h2 className="text-primary font-bold uppercase tracking-widest flex items-center text-sm">
                {teamName}<span className="w-1.5 h-1.5 bg-primary ml-2"></span>
              </h2>
            </>
          ) : (
            <>
              <h2 className="text-accent-cyan font-bold uppercase tracking-widest flex items-center text-sm">
                <span className="w-1.5 h-1.5 bg-accent-cyan mr-2"></span>{teamName}
              </h2>
              <span className="stat-label">Avg: {avgRank}</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-center py-8 opacity-30">
          <p className="text-xs uppercase tracking-wider font-bold">No data available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className={`flex justify-between items-end border-b ${isEnemy ? 'border-primary/30' : 'border-accent-cyan/30'} pb-2`}>
        {isEnemy ? (
          <>
            <span className="stat-label">Avg: {avgRank}</span>
            <h2 className="text-primary font-bold uppercase tracking-widest flex items-center text-sm">
              {teamName}<span className="w-1.5 h-1.5 bg-primary ml-2"></span>
            </h2>
          </>
        ) : (
          <>
            <h2 className="text-accent-cyan font-bold uppercase tracking-widest flex items-center text-sm">
              <span className="w-1.5 h-1.5 bg-accent-cyan mr-2"></span>{teamName}
            </h2>
            <span className="stat-label">Avg: {avgRank}</span>
          </>
        )}
      </div>
      {players.map((player) => (
        <PlayerCard
          key={player.puuid}
          player={player}
          isEnemy={isEnemy}
          onClick={() => onPlayerClick?.(player)}
        />
      ))}
    </section>
  );
}
