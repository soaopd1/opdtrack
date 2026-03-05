import React from 'react';
import { GameState } from '../data/types';

export type PageId = 'live' | 'history' | 'players' | 'stretch' | 'settings';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  gameState: GameState;
}

const navItems: { id: PageId; icon: string; label: string }[] = [
  { id: 'live', icon: 'monitor_heart', label: 'Live Match' },
  { id: 'history', icon: 'history', label: 'History' },
  { id: 'players', icon: 'group', label: 'Players' },
  { id: 'stretch', icon: 'fitness_center', label: 'True Stretch' },
  { id: 'settings', icon: 'settings', label: 'Settings' },
];

export default function Navbar({ activePage, onNavigate, gameState }: NavbarProps) {
  const inMatch = gameState === 'INGAME' || gameState === 'PREGAME';
  const connected = gameState !== 'NOT_RUNNING' && gameState !== 'loading';

  return (
    <nav className="border-b border-slate-300 dark:border-border-dark bg-white dark:bg-background-dark px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rotate-45 flex items-center justify-center">
            <span className="text-white font-bold -rotate-45">&nbsp;O</span>
          </div>
          <div className="font-display font-bold text-xl tracking-tighter">
            traopd1 <span className="text-xs opacity-50 block -mt-1 uppercase">Tracker</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-2 transition-opacity ${activePage === item.id
                ? 'text-primary border-b-2 border-primary pb-1'
                : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="uppercase text-sm font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {inMatch && (
          <div className="flex items-center bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
            {gameState === 'PREGAME' ? 'Agent Select' : 'In Match'}
          </div>
        )}
        {!inMatch && connected && (
          <div className="flex items-center text-accent-cyan/50 px-3 py-1 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 bg-accent-cyan/50 rounded-full mr-2"></span>
            Connected
          </div>
        )}
        {gameState === 'NOT_RUNNING' && (
          <div className="flex items-center text-slate-500 px-3 py-1 text-[10px] font-bold uppercase">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full mr-2"></span>
            Offline
          </div>
        )}
      </div>
    </nav>
  );
}
