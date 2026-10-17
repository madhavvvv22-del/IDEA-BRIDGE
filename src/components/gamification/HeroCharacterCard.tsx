import React from 'react';
import { GameCharacter, AchievementBadge } from '../../types';
import { sound } from '../../services/soundEngine';
import { X, Award, Shield, Zap, Sparkles, Sword, BookOpen, Brain, Flame } from 'lucide-react';

interface HeroCharacterCardProps {
  character: GameCharacter;
  badges: AchievementBadge[];
  onClose: () => void;
}

export const HeroCharacterCard: React.FC<HeroCharacterCardProps> = ({
  character,
  badges,
  onClose,
}) => {
  const statIcons = {
    innovation: Brain,
    execution: Sword,
    charisma: Sparkles,
    technical: Zap,
    strategy: BookOpen,
  };

  const statLabels = {
    innovation: 'Idea Innovation',
    execution: 'Sprint Execution',
    charisma: 'Investor Charisma',
    technical: 'Technical Power',
    strategy: 'Venture Strategy',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1022] border-2 border-indigo-500/80 rounded-xl shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-purple-900 to-indigo-950 p-6 border-b border-indigo-500/40 relative">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-pink-500 p-1 shadow-neon-cyan">
              <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center text-3xl">
                🧙‍♂️
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-lg text-cyan-300">{character.name}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-xs border border-amber-500/50">
                  Level {character.level}
                </span>
              </div>
              <div className="text-slate-300 text-sm font-medium mt-0.5">{character.title}</div>
              <div className="text-xs text-indigo-300 font-mono mt-1 flex items-center gap-2">
                <span>Class: <strong className="text-white">{character.activeClassTitle}</strong></span>
                <span>•</span>
                <span>Reputation: <strong className="text-emerald-400">{character.reputation} Karma</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Passive Ability */}
          <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-lg p-3.5 flex items-start gap-3">
            <div className="p-2 rounded bg-indigo-900/60 text-indigo-300">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-cyan-300 tracking-wider">
                Active Passive Special
              </div>
              <div className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                {character.passiveAbility}
              </div>
            </div>
          </div>

          {/* RPG Stats Breakdown */}
          <div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Hero Stat Matrix</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(Object.keys(character.stats) as (keyof typeof character.stats)[]).map((key) => {
                const Icon = statIcons[key];
                const val = character.stats[key];
                return (
                  <div key={key} className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-lg flex items-center gap-3">
                    <div className="p-2 rounded bg-slate-800 text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 font-medium">{statLabels[key]}</span>
                        <span className="font-mono text-cyan-300 font-bold">{val} / 100</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Badge Showcase */}
          <div>
            <div className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-pink-400" />
              <span>Achievement Badges Unlocked ({badges.filter(b => b.unlocked).length} / {badges.length})</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-lg border text-center transition ${
                    b.unlocked
                      ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-400/50 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <div className="font-bold text-xs text-slate-200">{b.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-2">
                    {b.description}
                  </div>
                  <div className="mt-2 text-[9px] font-mono uppercase">
                    {b.unlocked ? (
                      <span className="text-emerald-400">Unlocked</span>
                    ) : (
                      <span className="text-slate-500">Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 text-right">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition"
          >
            Close Character Card
          </button>
        </div>
      </div>
    </div>
  );
};
