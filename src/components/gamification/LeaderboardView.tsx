import React, { useState } from 'react';
import { LeaderboardEntry } from '../../types';
import { sound } from '../../services/soundEngine';
import { Trophy, Award, Coins, Flame, Star, Shield, Sparkles } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  currentUserId,
}) => {
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredEntries = entries.filter((e) => {
    if (filterRole === 'all') return true;
    return e.role === filterRole;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-950/70 via-slate-900 to-indigo-950/70 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-yellow-400">Global Hall of Fame</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-900/60 text-yellow-300 border border-yellow-700/50">
                Season 1 Leaderboard
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE ARENA OF LEGENDS</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Recognizing the top founders, engineers, sages, and customer problem solvers in the Idea Bridge ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['all', 'entrepreneur', 'jobseeker', 'mentor'].map((roleKey) => (
              <button
                key={roleKey}
                onClick={() => {
                  sound.playClick();
                  setFilterRole(roleKey);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold capitalize transition ${
                  filterRole === roleKey
                    ? 'bg-yellow-500 text-slate-950 shadow-neon-gold'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {roleKey}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {/* Silver Rank 2 */}
        {filteredEntries[1] && (
          <div className="order-2 sm:order-1 bg-[#0e1022] border-2 border-slate-400/60 rounded-2xl p-6 text-center shadow-xl space-y-3 sm:mt-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-400 text-slate-950 font-pixel text-base flex items-center justify-center shadow-md">
              2
            </div>
            <div className="font-bold text-slate-100 text-base">{filteredEntries[1].name}</div>
            <div className="text-xs text-slate-400 font-mono">{filteredEntries[1].title}</div>
            <div className="text-xs font-mono text-cyan-300">
              {filteredEntries[1].xp.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* Gold Rank 1 */}
        {filteredEntries[0] && (
          <div className="order-1 sm:order-2 bg-gradient-to-b from-yellow-950/40 to-[#0e1022] border-2 border-yellow-400 rounded-2xl p-6 text-center shadow-neon-gold space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 text-slate-950 font-pixel text-xl flex items-center justify-center shadow-lg animate-bounce">
              👑
            </div>
            <div className="font-pixel text-sm text-yellow-300">{filteredEntries[0].name}</div>
            <div className="text-xs text-slate-300 font-mono">{filteredEntries[0].title}</div>
            <div className="text-sm font-mono text-amber-400 font-bold">
              {filteredEntries[0].xp.toLocaleString()} XP • Lv.{filteredEntries[0].level}
            </div>
          </div>
        )}

        {/* Bronze Rank 3 */}
        {filteredEntries[2] && (
          <div className="order-3 bg-[#0e1022] border-2 border-amber-700/60 rounded-2xl p-6 text-center shadow-xl space-y-3 sm:mt-10">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-700 text-white font-pixel text-base flex items-center justify-center shadow-md">
              3
            </div>
            <div className="font-bold text-slate-100 text-base">{filteredEntries[2].name}</div>
            <div className="text-xs text-slate-400 font-mono">{filteredEntries[2].title}</div>
            <div className="text-xs font-mono text-cyan-300">
              {filteredEntries[2].xp.toLocaleString()} XP
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Hero / Builder</th>
              <th className="p-3">Role Class</th>
              <th className="p-3">Level</th>
              <th className="p-3">Experience (XP)</th>
              <th className="p-3">Gold ($IB)</th>
              <th className="p-3">Reputation</th>
              <th className="p-3">Badges</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredEntries.map((e, idx) => {
              const isCurrentUser = e.id === currentUserId;
              return (
                <tr
                  key={e.id}
                  className={`transition ${
                    isCurrentUser
                      ? 'bg-indigo-950/60 border-l-4 border-l-cyan-400 text-white'
                      : 'hover:bg-slate-900/60 text-slate-300'
                  }`}
                >
                  <td className="p-3 font-bold font-pixel text-[11px] text-cyan-400">
                    #{idx + 1}
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <span>{e.name}</span>
                      {isCurrentUser && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-900 text-cyan-300">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">{e.title}</div>
                  </td>
                  <td className="p-3 capitalize">{e.role}</td>
                  <td className="p-3 text-amber-400 font-bold">Lv. {e.level}</td>
                  <td className="p-3 text-cyan-300 font-bold">{e.xp.toLocaleString()}</td>
                  <td className="p-3 text-amber-400">{e.gold.toLocaleString()}</td>
                  <td className="p-3 text-emerald-400">{e.reputation} Karma</td>
                  <td className="p-3 text-slate-200">{e.badgeCount} 🏅</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
