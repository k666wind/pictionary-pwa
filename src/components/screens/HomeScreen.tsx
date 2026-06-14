import { useGameStore } from '../../store/gameStore';

export default function HomeScreen() {
  const setScreen = useGameStore((s) => s.setScreen);

  return (
    <div className="screen fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 32 }}>
      {/* Logo */}
      <div className="col" style={{ alignItems: 'center', gap: 8 }}>
        <div style={{ fontSize: '5rem' }}>🎨</div>
        <h1 className="title-xl" style={{ color: 'var(--yellow)' }}>
          Pictionary
        </h1>
        <p style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: '1.4rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.05em',
        }}>
          畫畫猜猜
        </p>
      </div>

      {/* Dashed card tagline */}
      <div className="dashed-card" style={{ maxWidth: 280, textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          睇題目 → 拎支筆 → 係紙上畫<br />
          <span style={{ color: 'var(--yellow)' }}>Let the guessing begin!</span>
        </p>
      </div>

      {/* Main actions */}
      <div className="col" style={{ width: '100%', maxWidth: 300, gap: 14 }}>
        <button className="btn btn-primary btn-lg btn-block" onClick={() => setScreen('setup')}>
          🎮 開始遊戲 Play
        </button>
        <button className="btn btn-ghost btn-block" onClick={() => setScreen('leaderboard')}>
          🏆 排行榜 Leaderboard
        </button>
        <button className="btn btn-ghost btn-block" onClick={() => setScreen('word-bank-manager')}>
          📚 題目庫 Word Banks
        </button>
      </div>

      {/* Footer */}
      <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 'auto' }}>
        本地多人 Local Multiplayer · Phase 1
      </p>
    </div>
  );
}
