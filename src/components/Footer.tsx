import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-300 dark:border-border-dark p-4 flex justify-between items-center text-[10px] uppercase font-bold opacity-40">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span>DEVELOPED BY</span>
          <span className="text-primary ml-1">OPD1</span>
        </div>
        <div className="flex items-center">
          <span className="material-symbols-outlined text-sm mr-1">chat_bubble</span>
          <span>TRAOPD1 DISCORD</span>
        </div>
      </div>
      <div className="tracking-widest">
        v1.0.0
      </div>
    </footer>
  );
}
