import React, { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    autoLaunch: true,
    showOverlay: true,
    skinTracking: true,
    toxicAlerts: true,
    dodgeAlerts: false,
    theme: 'dark' as 'dark' | 'light',
    language: 'en',
    opacity: 85,
    hotkey: 'F2',
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ label, desc, value, onChange }: { label: string; desc: string; value: boolean; onChange: () => void }) => (
    <div className="flex items-center justify-between py-3 border-b border-slate-700/20">
      <div>
        <span className="text-sm font-bold">{label}</span>
        <span className="text-[10px] opacity-40 block mt-0.5">{desc}</span>
      </div>
      <button
        onClick={onChange}
        className={`w-10 h-5 rounded-full transition-colors relative ${value ? 'bg-accent-cyan/50' : 'bg-slate-700'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${value ? 'right-0.5' : 'left-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="p-6 md:px-12 max-w-[700px]">
      <h1 className="text-xl font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-base">settings</span>
        Settings
      </h1>

      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-widest font-bold opacity-50 mb-3">General</h2>
        <div className="bg-card-dark border border-border-dark rounded-lg px-4">
          <ToggleSwitch label="Auto Launch" desc="Start traopd1 with system" value={settings.autoLaunch} onChange={() => toggle('autoLaunch')} />
          <ToggleSwitch label="Show Overlay" desc="Display overlay during matches" value={settings.showOverlay} onChange={() => toggle('showOverlay')} />
          <ToggleSwitch label="Skin Tracking" desc="Track weapon skins for teammates" value={settings.skinTracking} onChange={() => toggle('skinTracking')} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-widest font-bold opacity-50 mb-3">Alerts</h2>
        <div className="bg-card-dark border border-border-dark rounded-lg px-4">
          <ToggleSwitch label="Toxic Player Alerts" desc="Warn when matched with toxic players" value={settings.toxicAlerts} onChange={() => toggle('toxicAlerts')} />
          <ToggleSwitch label="Dodge Alerts" desc="Alert when losing streak detected" value={settings.dodgeAlerts} onChange={() => toggle('dodgeAlerts')} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-sm uppercase tracking-widest font-bold opacity-50 mb-3">Overlay</h2>
        <div className="bg-card-dark border border-border-dark rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-bold">Overlay Opacity</span>
              <span className="text-[10px] opacity-40 block mt-0.5">Adjust overlay transparency</span>
            </div>
            <span className="font-mono text-sm font-bold text-accent-cyan">{settings.opacity}%</span>
          </div>
          <input
            type="range" min="20" max="100" value={settings.opacity}
            onChange={(e) => setSettings(prev => ({ ...prev, opacity: Number(e.target.value) }))}
            className="w-full accent-accent-cyan"
          />
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/20">
            <div>
              <span className="text-sm font-bold">Toggle Hotkey</span>
              <span className="text-[10px] opacity-40 block mt-0.5">Keyboard shortcut to toggle overlay</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded px-3 py-1.5 font-mono text-sm font-bold text-accent-cyan">
              {settings.hotkey}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card-dark border border-border-dark rounded-lg p-4 text-center">
        <span className="text-xs font-bold opacity-40">traopd1 Tracker v1.0.0</span>
        <span className="text-[9px] opacity-20 block mt-1">Built for Valorant — Not affiliated with Riot Games</span>
      </div>
    </div>
  );
}
