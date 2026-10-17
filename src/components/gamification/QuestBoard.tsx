import React from 'react';
import { Quest } from '../../types';
import { sound } from '../../services/soundEngine';
import { X, CheckCircle, Clock, Zap, Coins, Sparkles } from 'lucide-react';

interface QuestBoardProps {
  quests: Quest[];
  onClaimQuest: (questId: string) => void;
  onClose: () => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onClaimQuest, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1022] border-2 border-amber-500/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 p-5 border-b border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xl">
              📜
            </div>
            <div>
              <div className="font-pixel text-sm text-amber-300 tracking-wide">Venture Quest Log</div>
              <div className="text-xs text-slate-400 font-mono">
                Complete ecosystem milestones to claim XP, Gold & Mana
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quest List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {quests.map((q) => {
            const isReadyToClaim = !q.completed && q.progress >= q.maxProgress;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition ${
                  q.completed
                    ? 'bg-slate-900/40 border-slate-800/80 opacity-60'
                    : isReadyToClaim
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-400/80 shadow-neon-gold'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                          q.category === 'growth_loop'
                            ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                            : q.category === 'epic'
                            ? 'bg-pink-900/60 text-pink-300 border border-pink-700/50'
                            : 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50'
                        }`}
                      >
                        {q.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-100">{q.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{q.description}</p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                      <div className="w-36 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, (q.progress / q.maxProgress) * 100)}%` }}
                        />
                      </div>
                      <span>
                        {q.progress} / {q.maxProgress}
                      </span>
                    </div>
                  </div>

                  {/* Rewards & Claim Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-cyan-300 flex items-center gap-0.5">
                        <Sparkles className="w-3.5 h-3.5" /> +{q.xpReward} XP
                      </span>
                      <span className="text-amber-400 flex items-center gap-0.5">
                        <Coins className="w-3.5 h-3.5" /> +{q.goldReward}
                      </span>
                      <span className="text-blue-400 flex items-center gap-0.5">
                        <Zap className="w-3.5 h-3.5" /> +{q.manaReward} MP
                      </span>
                    </div>

                    {q.completed ? (
                      <span className="px-3 py-1 rounded bg-slate-800 text-emerald-400 text-xs font-mono flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : isReadyToClaim ? (
                      <button
                        onClick={() => {
                          sound.playQuestComplete();
                          onClaimQuest(q.id);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-md animate-pulse transition"
                      >
                        Claim Bounty!
                      </button>
                    ) : (
                      <span className="px-3 py-1 rounded bg-slate-800/80 text-slate-400 text-xs font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> In Progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
