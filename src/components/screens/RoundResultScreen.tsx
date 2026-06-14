import { useGameStore } from '../../store/gameStore';

export default function RoundResultScreen() {
  const { roundResults, teams, currentRound, settings, getCurrentTeam, getAllWordBanks, nextTurn } = useGameStore();
  const lastResult = roundResults[roundResults.length - 1];
  const team = getCurrentTeam();

  if (!lastResult || !team) return null;

  const word = getAllWordBanks().flatMap((b) => b.words).find((w) => w.id === lastResult.wordId);
  const guessed = lastResult.guessed;
  const timedOut = !lastResult.guessed && !lastResult.skipped;

  const isLastTurn = (() => {
    const nextTeamIdx = (teams.findIndex((t) => t.id === lastResult.teamId) + 1) % teams.length;
    const nextRound = nextTeamIdx === 0 ? currentRound + 1 : currentRound;
    return nextRound > settings.totalRounds;
  })();

  // Sort teams by score
  const sorted = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="screen fade-in" style={{ alignItems: 'center', textAlign: 'center', gap: 24 }}>

      {/* Result icon */}
      <div className="bounce-in" style={{ fontSize: '5rem', marginTop: 16 }}>
        {guessed ? '🎉' : timedOut ? '⏰' : '⏭'}
      </div>

      {/* Result text */}
      <div className="col" style={{ gap: 4 }}>
        <h2 className="title-lg" style={{ color: guessed ? 'var(--green)' : 'var(--coral)' }}>
          {guessed ? '猜中！Correct!' : timedOut ? '時間到！Time Up!' : '跳過 Skipped'}
        </h2>
        {word && (
          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', fontWeight: 700 }}>
            題目係: <span style={{ color: 'var(--yellow)' }}>{word.zh} / {word.en}</span>
          </p>
        )}
      </div>

      {/* Score update */}
      <div className="dashed-card" style={{ width: '100%', maxWidth: 320 }}>
        <p className="label" style={{ marginBottom: 12 }}>目前分數 Current Scores</p>
        <div className="col" style={{ gap: 10 }}>
          {sorted.map((t, i) => (
            <div key={t.id} className="row-between" style={{
              padding: '10px 16px',
              borderRadius: 12,
              background: t.id === lastResult.teamId ? t.color + '22' : 'var(--surface2)',
              border: t.id === lastResult.teamId ? `2px solid ${t.color}` : '2px solid transparent',
            }}>
              <div className="row" style={{ gap: 10 }}>
                <span style={{ fontWeight: 800, color: 'var(--text-dim)' }}>#{i + 1}</span>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
                <span style={{ fontWeight: 800, color: t.id === lastResult.teamId ? t.color : 'var(--text)' }}>
                  {t.name}
                </span>
              </div>
              <span style={{ fontFamily: 'Fredoka One, cursive', fontSize: '1.4rem', color: t.color }}>
                {t.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <button
        className="btn btn-primary btn-lg btn-block"
        onClick={nextTurn}
        style={{ marginBottom: 8 }}
      >
        {isLastTurn ? '🏆 睇結果 See Results' : '下一輪 Next Turn →'}
      </button>
    </div>
  );
}
