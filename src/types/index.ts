export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category =
  | 'animals'
  | 'food'
  | 'sports'
  | 'home'
  | 'places'
  | 'actions'
  | 'nature'
  | 'custom';

export interface Word {
  id: string;
  en: string;
  zh: string;
  difficulty: Difficulty;
  category: Category;
}

export interface WordBank {
  id: string;
  name: { en: string; zh: string };
  isCustom: boolean;
  words: Word[];
}

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  playerIds: string[];
  color: string;
}

export type GameMode = 'teams' | 'individuals';

export interface GameSettings {
  mode: GameMode;
  timerSeconds: number;
  totalRounds: number;
  difficulty: Difficulty | 'all';
  categories: Category[];
  wordBankIds: string[];
}

export interface RoundResult {
  round: number;
  teamId: string;
  drawerId: string;
  wordId: string;
  guessed: boolean;
  skipped: boolean;
  timeLeft: number;
}

export type Screen =
  | 'home'
  | 'setup'
  | 'team-display'
  | 'word-card'
  | 'timer'
  | 'round-result'
  | 'game-over'
  | 'leaderboard'
  | 'word-bank-manager'
  | 'add-word';

export interface LeaderboardEntry {
  id: string;
  teamName: string;
  score: number;
  date: string;
  mode: GameMode;
}
