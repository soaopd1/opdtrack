import React from 'react';

interface MatchHeaderProps {
  mapName?: string;
  gameMode?: string;
  isPregame?: boolean;
}

export default function MatchHeader({ mapName = 'Loading...', gameMode = 'Competitive', isPregame = false }: MatchHeaderProps) {
  return (
    <header className="p-6 md:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center relative">
        <div className="text-left w-full md:w-1/3">
          <h1 className="text-4xl font-black italic uppercase tracking-widest text-slate-900 dark:text-white leading-none">{mapName}</h1>
          <p className="text-[10px] font-mono uppercase opacity-50 tracking-[0.2em] mt-1">{gameMode}</p>
        </div>
        <div className="flex flex-col items-center justify-center py-4 md:py-0">
          <div className="text-[10px] font-mono uppercase opacity-50 mb-1 tracking-widest">{gameMode}</div>
          {isPregame ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded border border-amber-500/20">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Agent Select</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Live Match</span>
              </div>
            </div>
          )}
        </div>
        <div className="text-right w-full md:w-1/3 flex flex-col items-end">
          <div className="text-[10px] font-mono uppercase opacity-40 tracking-wider">traopd1 Tracker</div>
        </div>
      </div>
    </header>
  );
}
