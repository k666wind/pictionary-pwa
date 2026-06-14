import { useGameStore } from '../../store/gameStore';
import { CATEGORY_EMOJIS, DIFFICULTY_COLORS } from '../../utils/game';

export default function WordCardScreen() {
  const { getCurrentWord, getCurrentTeam, setScreen } = useGameStore();
  const word = getCurrentWord();
  const team = getCurrentTeam();

  if (!word || !team) return null;

  return (
    <div className="screen fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 28 }}>

      {/* Team indicator */}
      <div className="badge" style={{ background: team.color + '33', color: team.color, fontSize: '1rem' }}>
        {team.name} 畫緊
      </div>

      {/* Word card */}
      <div className="bounce-in" style={{
        background: 'var(--surface)',
        border: `3px solid ${team.color}`,
        borderRadius: 24,
        padding: '40px 32px',
        width: '100%',
        maxWidth: 340,
        boxShadow: `0 8px 40px ${team.color}33`,
      }}>
        {/* Category + difficulty */}
        <div className="row" style={{ justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <span className="badge" style={{ background: 'var(--surface2)', color: 'var(--text-dim)' }}>
            {CATEGORY_EMOJIS[word.category]} {word.category}
          </span>
          <span className="badge" style={{
            background: DIFFICULTY_COLORS[word.difficulty] + '33',
            color: DIFFICULTY_COLORS[word.difficulty],
          }}>
            {word.difficulty === 'easy' ? '😊 Easy' : word.difficulty === 'medium' ? '🤔 Medium' : '😅 Hard'}
          </span>
        </div>

        {/* Chinese word — big */}
        <p style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: '3.5rem',
          color: 'var(--yellow)',
          lineHeight: 1.1,
          marginBottom: 12,
        }}>
          {word.zh}
        </p>

        {/* English word */}
        <p style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: '2rem',
          color: 'var(--text-dim)',
        }}>
          {word.en}
        </p>
      </div>

      {/* Warning */}
      <div className="dashed-card" style={{ maxWidth: 300 }}>
        <p style={{ color: 'var(--coral)', fontWeight: 800, fontSize: '0.95rem' }}>
          ⚠️ 唔可以講出題目！<br />
          <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>No speaking the word!</span>
        </p>
      </div>

      <button
        className="btn btn-green btn-lg"
        onClick={() => setScreen('timer')}
      >
        開始畫！Start Drawing! ✏️
      </button>
    </div>
  );
}
