import { useEffect, useRef } from 'react';
import { useGameStore } from '../../store/gameStore';
import { CATEGORY_EMOJIS } from '../../utils/game';

export default function TimerScreen() {
  const {
    timeLeft,
    settings,
    isTimerRunning,
    getCurrentWord,
    getCurrentTeam,
    tickTimer,
    pauseTimer,
    resumeTimer,
    markGuessed,
    markSkipped,
  } = useGameStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const word = getCurrentWord();
  const team = getCurrentTeam();

  // Auto-start timer on mount
  useEffect(() => {
    resumeTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Tick every second
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTimerRunning]);

  if (!word || !team) return null;

  const pct = timeLeft / settings.timerSeconds;
  const isDanger = timeLeft <= 10;
  const isWarning = timeLeft <= 30 && !isDanger;

  const timerColor = isDanger ? 'var(--coral)' : isWarning ? 'var(--orange)' : 'var(--green)';

  // SVG circle
  const r = 80;
  const circ = 2 * Math.PI * r;
  const dash = circ * pct;

  return (
    <div className="screen fade-in" style={{ alignItems: 'center', gap: 20 }}>

      {/* Team + word hint */}
      <div className="row" style={{ justifyContent: 'center', gap: 12 }}>
        <div className="badge" style={{ background: team.color + '33', color: team.color, fontSize: '0.95rem' }}>
          {team.name}
        </div>
        <div className="badge" style={{ background: 'var(--surface2)', color: 'var(--text-dim)', fontSize: '0.95rem' }}>
          {CATEGORY_EMOJIS[word.category]} {word.category}
        </div>
      </div>

      {/* Timer SVG */}
      <div style={{ position: 'relative', width: 200, height: 200, marginTop: 8 }}>
        <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r={r} fill="none" stroke="var(--surface2)" strokeWidth="12" />
          <circle
            cx="100" cy="100" r={r}
            fill="none"
            stroke={timerColor}
            strokeWidth="12"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.9s linear, stroke 0.3s' }}
          />
        </svg>
        {/* Center number */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Fredoka One, cursive',
            fontSize: isDanger ? '4rem' : '3.2rem',
            color: timerColor,
            lineHeight: 1,
            transition: 'color 0.3s, font-size 0.15s',
            animation: isDanger ? 'pulse-ring 1s infinite' : 'none',
          }}>
            {timeLeft}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>秒 sec</span>
        </div>
      </div>

      {/* Word reminder (small, for drawing team only) */}
      <div className="card" style={{ width: '100%', textAlign: 'center', padding: '16px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700, marginBottom: 6 }}>
          畫緊 Drawing:
        </p>
        <p style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.8rem', color: 'var(--yellow)' }}>
          {word.zh}
        </p>
        <p style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.1rem', color: 'var(--text-dim)' }}>
          {word.en}
        </p>
      </div>

      {/* Pause / resume */}
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => isTimerRunning ? pauseTimer() : resumeTimer()}
      >
        {isTimerRunning ? '⏸ 暫停 Pause' : '▶️ 繼續 Resume'}
      </button>

      {/* Action buttons */}
      <div className="col" style={{ width: '100%', gap: 12, marginTop: 'auto' }}>
        <button className="btn btn-green btn-lg btn-block" onClick={markGuessed}>
          ✅ 猜中！Correct!
        </button>
        <button className="btn btn-coral btn-block" onClick={markSkipped}>
          ⏭ 跳過 Skip
        </button>
      </div>
    </div>
  );
}
