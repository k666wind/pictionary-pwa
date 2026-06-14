import type { LeaderboardEntry, WordBank } from '../types';

const KEYS = {
  LEADERBOARD: 'pictionary_leaderboard',
  CUSTOM_BANKS: 'pictionary_custom_banks',
};

// Leaderboard
export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.LEADERBOARD);
    return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveLeaderboardEntry(entry: LeaderboardEntry): void {
  const entries = getLeaderboard();
  entries.push(entry);
  entries.sort((a, b) => b.score - a.score);
  const top50 = entries.slice(0, 50);
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(top50));
}

export function clearLeaderboard(): void {
  localStorage.removeItem(KEYS.LEADERBOARD);
}

// Custom word banks
export function getCustomWordBanks(): WordBank[] {
  try {
    const raw = localStorage.getItem(KEYS.CUSTOM_BANKS);
    return raw ? (JSON.parse(raw) as WordBank[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomWordBanks(banks: WordBank[]): void {
  localStorage.setItem(KEYS.CUSTOM_BANKS, JSON.stringify(banks));
}
