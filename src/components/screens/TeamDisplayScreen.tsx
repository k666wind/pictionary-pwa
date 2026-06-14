import { useGameStore } from '../../store/gameStore';

export default function TeamDisplayScreen() {
  const { getCurrentTeam, currentRound, settings, setScreen } = useGameStore();
  const team = getCurrentTeam();

  if (!team) return null;

  return (
    <div className="screen fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 32 }}>

      {/* Round indicator */}
      <div className="badge" style={{ background: 'var(--surface2)', color: 'var(--text-dim)', fontSize: '1rem' }}>
        回合 Round {currentRound} / {settings.totalRounds}
      </div>

      {/* Team color circle */}
      <div className="bounce-in" style={{
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: team.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
        boxShadow: `0 0 40px ${team.color}66`,
      }}>
        🎨
      </div>

      {/* Team name */}
      <div className="col" style={{ gap: 8 }}>
        <p className="label">輪到 It's time for</p>
        <h1 className="title-xl" style={{ color: team.color }}>
          {team.name}
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: 700 }}>
          準備好了嗎？ Ready?
        </p>
      </div>

      {/* Instructions */}
      <div className="dashed-card" style={{ maxWidth: 300 }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.7 }}>
          1️⃣ 畫者睇題目，唔可以出聲<br />
          2️⃣ 係紙上畫出題目<br />
          3️⃣ 隊友猜答案！
        </p>
      </div>

      <button
        className="btn btn-primary btn-lg"
        onClick={() => setScreen('word-card')}
      >
        睇題目 See Word →
      </button>
    </div>
  );
}
