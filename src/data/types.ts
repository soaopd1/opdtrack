export interface HistoryEntry {
  result: 'win' | 'loss';
  rrChange: number;
  matchId?: string;
}

export interface SkinInfo {
  name: string;
  iconUrl: string | null;
}

export interface PlayerSkins {
  phantom: SkinInfo | null;
  vandal: SkinInfo | null;
  operator: SkinInfo | null;
  melee: SkinInfo | null;
}

export interface Player {
  puuid: string;
  name: string;
  tag: string;
  agentName: string;
  agentIconUrl: string | null;
  rankTier: number;
  rankName: string;
  rr: number;
  leaderboard: number;
  peakRankTier: number;
  peakRankName: string;
  wr: number | string;
  games: number;
  accountLevel: number;
  incognito: boolean;
  history: HistoryEntry[];
  skins: PlayerSkins | null;
  isLocal: boolean;
  teamId: string;
}

export interface LiveMatchData {
  mapName: string;
  gameMode: string;
  isPregame: boolean;
  myTeam: Player[];
  enemyTeam: Player[];
  myTeamAvgRank: string;
  enemyTeamAvgRank: string;
}

export interface MatchHistoryEntry {
  matchId: string;
  mapName: string;
  gameMode: string;
  result: 'win' | 'loss';
  score: string;
  agentName: string;
  agentIconUrl: string | null;
  kills: number;
  deaths: number;
  assists: number;
  rrChange: number;
  time: string;
}

export type GameState = 'NOT_RUNNING' | 'MENUS' | 'PREGAME' | 'INGAME' | 'DISCONNECTED' | 'loading';
