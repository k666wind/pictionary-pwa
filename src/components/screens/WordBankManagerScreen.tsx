import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { BUILT_IN_WORD_BANKS } from '../../data/wordBanks';
import { generateId } from '../../utils/game';
import type { Difficulty, Word } from '../../types';

export default function WordBankManagerScreen() {
  const { customWordBanks, addCustomWordBank, deleteCustomWordBank, addWordToBank, deleteWordFromBank, setScreen } = useGameStore();

  const [expandedBank, setExpandedBank] = useState<string | null>(null);
  const [newBankNameZh, setNewBankNameZh] = useState('');
  const [newBankNameEn, setNewBankNameEn] = useState('');
  const [showNewBank, setShowNewBank] = useState(false);

  // Add word form state
  const [addingWordTo, setAddingWordTo] = useState<string | null>(null);
  const [newWordZh, setNewWordZh] = useState('');
  const [newWordEn, setNewWordEn] = useState('');
  const [newWordDiff, setNewWordDiff] = useState<Difficulty>('easy');

  function handleCreateBank() {
    if (!newBankNameZh.trim()) return;
    addCustomWordBank({
      id: generateId(),
      name: { zh: newBankNameZh.trim(), en: newBankNameEn.trim() || newBankNameZh.trim() },
      isCustom: true,
      words: [],
    });
    setNewBankNameZh('');
    setNewBankNameEn('');
    setShowNewBank(false);
  }

  function handleAddWord(bankId: string) {
    if (!newWordZh.trim()) return;
    const word: Word = {
      id: generateId(),
      zh: newWordZh.trim(),
      en: newWordEn.trim() || newWordZh.trim(),
      difficulty: newWordDiff,
      category: 'custom',
    };
    addWordToBank(bankId, word);
    setNewWordZh('');
    setNewWordEn('');
    setNewWordDiff('easy');
    setAddingWordTo(null);
  }

  const allBanks = [...BUILT_IN_WORD_BANKS, ...customWordBanks];

  return (
    <div className="screen fade-in" style={{ gap: 20 }}>
      {/* Header */}
      <div className="row">
        <button className="btn btn-ghost btn-sm" onClick={() => setScreen('home')}>← 返回</button>
        <h2 className="title-md" style={{ color: 'var(--yellow)' }}>📚 題目庫</h2>
      </div>

      {/* Create new bank */}
      {showNewBank ? (
        <div className="dashed-card col" style={{ gap: 12 }}>
          <p style={{ fontWeight: 800, color: 'var(--yellow)' }}>新增題目庫 New Bank</p>
          <input className="input" placeholder="中文名稱 Chinese Name" value={newBankNameZh}
            onChange={(e) => setNewBankNameZh(e.target.value)} maxLength={20} />
          <input className="input" placeholder="English Name (optional)" value={newBankNameEn}
            onChange={(e) => setNewBankNameEn(e.target.value)} maxLength={20} />
          <div className="row">
            <button className="btn btn-primary" onClick={handleCreateBank}>✓ 新增 Create</button>
            <button className="btn btn-ghost" onClick={() => setShowNewBank(false)}>取消 Cancel</button>
          </div>
        </div>
      ) : (
        <button className="btn btn-ghost btn-block" onClick={() => setShowNewBank(true)}>
          ➕ 新增自定義題目庫 Add Custom Bank
        </button>
      )}

      {/* Banks list */}
      <div className="scroll-list">
        {allBanks.map((bank) => (
          <div key={bank.id} className="card col" style={{ gap: 12 }}>
            {/* Bank header */}
            <div className="row-between">
              <div className="row" style={{ gap: 10 }}>
                <span style={{ fontSize: '1.3rem' }}>{bank.isCustom ? '⭐' : '📖'}</span>
                <div className="col" style={{ gap: 2 }}>
                  <span style={{ fontWeight: 800, fontSize: '1rem' }}>{bank.name.zh} / {bank.name.en}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {bank.words.length} 題 words · {bank.isCustom ? '自定義' : '內建'}
                  </span>
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                {bank.isCustom && (
                  <button className="btn btn-ghost btn-sm" style={{ color: 'var(--coral)' }}
                    onClick={() => { if (confirm(`刪除 ${bank.name.zh}？`)) deleteCustomWordBank(bank.id); }}>
                    🗑
                  </button>
                )}
                <button className="btn btn-ghost btn-sm"
                  onClick={() => setExpandedBank(expandedBank === bank.id ? null : bank.id)}>
                  {expandedBank === bank.id ? '▲' : '▼'}
                </button>
              </div>
            </div>

            {/* Expanded words */}
            {expandedBank === bank.id && (
              <div className="col" style={{ gap: 8, paddingTop: 4 }}>
                {bank.words.length === 0 && (
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>未有題目</p>
                )}
                {bank.words.map((w) => (
                  <div key={w.id} className="row-between" style={{
                    padding: '8px 12px',
                    background: 'var(--surface2)',
                    borderRadius: 10,
                  }}>
                    <span style={{ fontWeight: 700 }}>{w.zh} / {w.en}</span>
                    <div className="row" style={{ gap: 8 }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{w.difficulty}</span>
                      {bank.isCustom && (
                        <button className="btn btn-ghost btn-sm" style={{ color: 'var(--coral)', padding: '4px 8px', fontSize: '0.75rem' }}
                          onClick={() => deleteWordFromBank(bank.id, w.id)}>✕</button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add word form for custom banks */}
                {bank.isCustom && (
                  addingWordTo === bank.id ? (
                    <div className="col" style={{ gap: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <input className="input" placeholder="中文題目" value={newWordZh}
                        onChange={(e) => setNewWordZh(e.target.value)} maxLength={20} />
                      <input className="input" placeholder="English word" value={newWordEn}
                        onChange={(e) => setNewWordEn(e.target.value)} maxLength={30} />
                      <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                        {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                          <button key={d} className={`chip ${newWordDiff === d ? 'active' : ''}`}
                            onClick={() => setNewWordDiff(d)}>
                            {d === 'easy' ? '😊' : d === 'medium' ? '🤔' : '😅'} {d}
                          </button>
                        ))}
                      </div>
                      <div className="row">
                        <button className="btn btn-primary btn-sm" onClick={() => handleAddWord(bank.id)}>✓ 加入</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setAddingWordTo(null)}>取消</button>
                      </div>
                    </div>
                  ) : (
                    <button className="btn btn-ghost btn-sm" onClick={() => setAddingWordTo(bank.id)}>
                      ➕ 加題目 Add Word
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
