import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, LiveMatchData, MatchHistoryEntry } from '../data/types';

const API_BASE = 'http://127.0.0.1:3001';

interface ValorantState {
  gameState: GameState;
  queueId: string;
  match: LiveMatchData | null;
  history: MatchHistoryEntry[];
  loading: boolean;
  error: string | null;
  lastUpdated: number;
}

export function useValorant() {
  const [state, setState] = useState<ValorantState>({
    gameState: 'loading',
    queueId: '',
    match: null,
    history: [],
    loading: true,
    error: null,
    lastUpdated: 0,
  });

  const prevGameState = useRef<GameState>('loading');
  const isFetchingMatch = useRef(false);
  const wasInMatch = useRef(false);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/status`, { signal: AbortSignal.timeout(5000) });
      const data = await res.json();
      return { running: data.running, gameState: data.gameState as GameState, queueId: data.queueId || '' };
    } catch {
      return { running: false, gameState: 'NOT_RUNNING' as GameState, queueId: '' };
    }
  }, []);

  const fetchMatch = useCallback(async () => {
    if (isFetchingMatch.current) return null;
    isFetchingMatch.current = true;
    try {
      const res = await fetch(`${API_BASE}/api/live-match`, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) return null;
      return await res.json() as LiveMatchData;
    } catch {
      return null;
    } finally {
      isFetchingMatch.current = false;
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/history`, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) return [];
      const data = await res.json();
      return data.matches as MatchHistoryEntry[];
    } catch {
      return [];
    }
  }, []);

  const poll = useCallback(async () => {
    const { running, gameState, queueId } = await fetchStatus();

    const inMatch = gameState === 'INGAME' || gameState === 'PREGAME';
    const stateChanged = gameState !== prevGameState.current;
    prevGameState.current = gameState;

    setState(prev => ({
      ...prev,
      gameState,
      queueId,
      loading: false,
      error: running ? null : 'VALORANT is not running',
      // Clear match data when leaving a match, but not while a fetch is in-flight
      match: (stateChanged && !inMatch && !isFetchingMatch.current) ? null : prev.match,
    }));

    // Track match → menus transition for history refetch
    if (inMatch) {
      wasInMatch.current = true;
    }

    if (inMatch) {
      const match = await fetchMatch();
      if (match) {
        setState(prev => ({ ...prev, match, lastUpdated: Date.now() }));
      }
    }
  }, [fetchStatus, fetchMatch]);

  // Load history once on mount and when we leave a match
  useEffect(() => {
    fetchHistory().then(history => {
      setState(prev => ({ ...prev, history }));
    });
  }, [fetchHistory]);

  // Refresh history only when transitioning from INGAME/PREGAME → MENUS
  useEffect(() => {
    if (state.gameState === 'MENUS' && wasInMatch.current) {
      wasInMatch.current = false;
      // Small delay to let Riot update their API
      const timer = setTimeout(() => {
        fetchHistory().then(history => {
          setState(prev => ({ ...prev, history }));
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.gameState, fetchHistory]);

  // Poll for status every 5 seconds, match data every 5 seconds when in game
  useEffect(() => {
    poll(); // immediate first poll
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);
  }, [poll]);

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    await poll();
  }, [poll]);

  return { ...state, refresh };
}
