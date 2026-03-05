import React, { useState } from 'react';
import Navbar, { PageId } from './components/Navbar';
import MatchHeader from './components/MatchHeader';
import PlayerList from './components/PlayerList';
import PlayerProfile from './components/PlayerProfile';
import HistoryPage from './components/HistoryPage';
import PlayersPage from './components/PlayersPage';
import TrueStretchPage from './components/TrueStretchPage';
import SettingsPage from './components/SettingsPage';
import Footer from './components/Footer';
import { useValorant } from './hooks/useValorant';
import { Player } from './data/types';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('live');
  const [selectedPlayer, setSelectedPlayer] = useState<{ player: Player; isEnemy: boolean } | null>(null);

  const { gameState, match, history, loading, error, refresh, lastUpdated } = useValorant();

  const inMatch = gameState === 'INGAME' || gameState === 'PREGAME';

  const renderLivePage = () => {
    if (gameState === 'loading' || loading) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm uppercase tracking-widest opacity-50 font-bold">Connecting...</p>
          </div>
        </div>
      );
    }

    if (gameState === 'NOT_RUNNING' || !error === false) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 border border-primary/30 rounded-lg flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-primary text-3xl">videogame_asset_off</span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest">VALORANT Not Running</h2>
            <p className="text-sm opacity-40">Launch VALORANT and start a match to see live data.</p>
            <button
              onClick={refresh}
              className="px-6 py-2 bg-primary/10 border border-primary/30 text-primary text-xs uppercase font-bold tracking-wider rounded hover:bg-primary/20 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    if (gameState === 'MENUS' || gameState === 'DISCONNECTED') {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <div className="w-16 h-16 border border-accent-cyan/30 rounded-lg flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-accent-cyan text-3xl">sports_esports</span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-accent-cyan">Waiting for Match</h2>
            <p className="text-sm opacity-40">Queue up for a game to see live match data.</p>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest opacity-30 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              VALORANT Connected
            </div>
          </div>
        </div>
      );
    }

    if (inMatch && !match) {
      return (
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm uppercase tracking-widest opacity-50 font-bold">
              {gameState === 'PREGAME' ? 'Loading Agent Select...' : 'Loading Match Data...'}
            </p>
          </div>
        </div>
      );
    }

    if (inMatch && match) {
      return (
        <>
          <MatchHeader
            mapName={match.mapName}
            gameMode={match.gameMode}
            isPregame={match.isPregame}
          />
          <main className="flex-grow p-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <PlayerList
              teamName="Your Team"
              avgRank={match.myTeamAvgRank}
              players={match.myTeam}
              onPlayerClick={(player) => setSelectedPlayer({ player, isEnemy: false })}
            />
            <PlayerList
              teamName="Enemy Team"
              avgRank={match.enemyTeamAvgRank}
              players={match.enemyTeam}
              isEnemy
              onPlayerClick={(player) => setSelectedPlayer({ player, isEnemy: true })}
            />
          </main>
          {lastUpdated > 0 && (
            <div className="px-12 pb-2 text-[9px] opacity-20 font-mono uppercase">
              Updated {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  const renderPage = () => {
    switch (activePage) {
      case 'live': return renderLivePage();
      case 'history': return <HistoryPage matches={history} />;
      case 'players': return <PlayersPage />;
      case 'stretch': return <TrueStretchPage />;
      case 'settings': return <SettingsPage />;
      default: return null;
    }
  };

  return (
    <>
      <Navbar activePage={activePage} onNavigate={setActivePage} gameState={gameState} />
      {renderPage()}
      <Footer />

      {selectedPlayer && (
        <PlayerProfile
          player={selectedPlayer.player}
          isEnemy={selectedPlayer.isEnemy}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </>
  );
}
