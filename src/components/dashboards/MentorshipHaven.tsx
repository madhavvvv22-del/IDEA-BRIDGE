import React, { useState } from 'react';
import { MentorshipSession, Venture } from '../../types';
import { sound } from '../../services/soundEngine';
import {
  GraduationCap,
  Calendar,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Send,
  X,
  MessageSquare,
  Award,
} from 'lucide-react';

interface MentorshipHavenProps {
  sessions: MentorshipSession[];
  ventures: Venture[];
  onRequestSession: (data: Partial<MentorshipSession>) => void;
}

export const MentorshipHaven: React.FC<MentorshipHavenProps> = ({
  sessions,
  ventures,
  onRequestSession,
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState('Sarah Lin, GP @ Horizon Seed');
  const [selectedTopic, setSelectedTopic] = useState('Pitch Deck & Seed Term Sheet Negotiation');
  const [sessionTime, setSessionTime] = useState('Next Thursday at 3:00 PM EST');

  const mentorsList = [
    {
      id: 'm-1',
      name: 'Sarah Lin',
      title: 'Lvl 19 Archmage of Capital (GP @ Horizon Seed)',
      expertise: ['Venture Capital', 'Pitching', 'SaaS Metrics', 'Board Governance'],
      rating: 4.9,
      sessionsCompleted: 42,
      avatar: '🧙‍♀️',
    },
    {
      id: 'm-2',
      name: 'Vikram Joshi',
      title: 'Lvl 22 High Warlock of Scale (VP Eng @ CloudScale)',
      expertise: ['System Architecture', 'PyTorch & AI Scale', 'Edge Compute', 'DevOps'],
      rating: 5.0,
      sessionsCompleted: 68,
      avatar: '🧙‍♂️',
    },
    {
      id: 'm-3',
      name: 'Chloe Davenport',
      title: 'Lvl 18 Enchanter of Growth (Ex-Head of Growth @ Stripe)',
      expertise: ['Go-To-Market', 'Product-Led Growth', 'B2B Sales', 'Pricing Power'],
      rating: 4.8,
      sessionsCompleted: 35,
      avatar: '🧝‍♀️',
    },
  ];

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playQuestComplete();
    onRequestSession({
      mentorName: selectedMentor,
      topic: selectedTopic,
      scheduledTime: sessionTime,
      ventureName: ventures[0]?.name || 'SynapseHealth AI',
    });
    setShowRequestModal(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-950/70 via-slate-900 to-indigo-950/70 border-2 border-violet-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-violet-400">Section 2 & 7: Mentorship</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-900/60 text-violet-300 border border-violet-700/50">
                High Temple of Sages
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE SAGES HAVEN</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Veteran founders, investors, and technical archmages offer office hours, venture audit
              scrolls, and tactical wisdom to fast-track your startup quest.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowRequestModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-2 transition"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Wisdom Session (+350 XP)</span>
          </button>
        </div>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mentorsList.map((m) => (
          <div
            key={m.id}
            className="bg-[#0e1022] border-2 border-slate-800 hover:border-violet-500/60 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                  {m.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-100">{m.name}</h3>
                  <div className="text-[11px] text-violet-400 font-mono">{m.title}</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                    ★ {m.rating} ({m.sessionsCompleted} Sittings)
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">
                  Domain Masteries:
                </span>
                <div className="flex flex-wrap gap-1">
                  {m.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setSelectedMentor(m.name);
                setShowRequestModal(true);
              }}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-violet-950 border border-slate-800 hover:border-violet-500 text-violet-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Request Strategy Scroll</span>
            </button>
          </div>
        ))}
      </div>

      {/* Sessions History / Queue */}
      <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="font-pixel text-sm text-violet-300">SCHEDULED WISDOM SESSIONS</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Active and archived mentorship interactions with recorded feedback scrolls.
          </p>
        </div>

        <div className="space-y-3">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-100">{s.mentorName}</span>
                  <span className="text-slate-400 font-mono">→ {s.menteeName}</span>
                </div>
                <div className="text-slate-300 font-medium">Topic: "{s.topic}"</div>
                {s.feedbackNotes && (
                  <p className="text-[11px] text-emerald-400 font-mono mt-1">
                    Scroll Notes: {s.feedbackNotes}
                  </p>
                )}
                <div className="text-[10px] text-slate-500 font-mono mt-1 flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{s.scheduledTime}</span>
                  <span>•</span>
                  <span className="text-cyan-400">+{s.xpGranted} XP Granted</span>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase font-bold ${
                  s.status === 'completed'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                    : 'bg-violet-950 text-violet-300 border border-violet-600'
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* REQUEST MODAL */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1022] border-2 border-violet-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-violet-950 via-slate-900 to-violet-950 p-5 border-b border-violet-500/40 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-violet-300">Book Mentorship Scroll</h3>
                <div className="text-xs text-slate-400 font-mono">1-on-1 strategy session</div>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookSession} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Mentor</label>
                <input
                  type="text"
                  value={selectedMentor}
                  onChange={(e) => setSelectedMentor(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Strategy Topic</label>
                <input
                  type="text"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Preferred Time Window</label>
                <input
                  type="text"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                ✦ Mentorship interactions reward both mentor and mentee with +350 XP and elevate ecosystem karma.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs shadow-md"
                >
                  Confirm Booking (+350 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
