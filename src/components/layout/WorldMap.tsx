import React from 'react';
import { sound } from '../../services/soundEngine';
import {
  Compass,
  Sparkles,
  Zap,
  HelpCircle,
  Gem,
  Briefcase,
  GraduationCap,
  Gamepad2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface WorldMapProps {
  onSelectDistrict: (tab: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ onSelectDistrict }) => {
  const districts = [
    {
      id: 'dashboard',
      name: 'The Alchemist Forge',
      subtitle: 'Founder Headquarters & Idea Forge',
      icon: '🧪',
      desc: 'Formulate hypotheses, run AI Lean Canvas, and craft startup ventures from raw sparks.',
      color: 'from-indigo-600 to-purple-600',
      borderColor: 'border-indigo-400',
      badge: 'Core Studio',
    },
    {
      id: 'growthloop',
      name: 'The Citadel of Growth',
      subtitle: 'The 8-Stage Venture Loop',
      icon: '🏰',
      desc: 'Advance through the complete loop: from raw idea validation to hiring, scaling, and institutional funding.',
      color: 'from-cyan-600 to-blue-600',
      borderColor: 'border-cyan-400',
      badge: 'Venture Loop',
    },
    {
      id: 'problems',
      name: 'The Customer Problem Bazaar',
      subtitle: 'Customer Friction Hub (Section 14)',
      icon: '🧩',
      desc: 'Browse verified real-world customer pain points. Propose prototypes, get customer backing, and level up to a registered venture!',
      color: 'from-pink-600 to-rose-600',
      borderColor: 'border-pink-400',
      badge: 'Problem Hub',
    },
    {
      id: 'investors',
      name: "The Dragon's Vault",
      subtitle: 'Fair Investor Discovery Sanctum',
      icon: '💎',
      desc: 'The 70/20/10 engine: 70% Personalized, 20% Rotating Underexposed Gems, 10% Exploration with transparency metrics.',
      color: 'from-amber-600 to-yellow-600',
      borderColor: 'border-amber-400',
      badge: 'Fair Discovery',
    },
    {
      id: 'jobs',
      name: 'The Talent Tavern & Bounty Guild',
      subtitle: 'Jobs, Quests & Career Quests',
      icon: '🍺',
      desc: 'Recruit skilled party members or embark on job quests with transparent compensation and XP rewards.',
      color: 'from-emerald-600 to-teal-600',
      borderColor: 'border-emerald-400',
      badge: 'Hiring & Gigs',
    },
    {
      id: 'mentors',
      name: 'The High Temple of Sages',
      subtitle: 'Archmage Mentorship Sanctuary',
      icon: '📜',
      desc: 'Book 1-on-1 strategy scrolls with veteran operators and get AI feedback on your pitch deck.',
      color: 'from-violet-600 to-purple-800',
      borderColor: 'border-violet-400',
      badge: 'Advisory',
    },
    {
      id: 'minigames',
      name: 'The Arcade Arena',
      subtitle: 'Pitch Arena & Squad Builder Mini-Games',
      icon: '⚔️',
      desc: 'Play the 30-Second Dragon Pitch challenge and assemble your dream Hacker-Hipster-Hustler party!',
      color: 'from-red-600 to-orange-600',
      borderColor: 'border-red-400',
      badge: 'Arcade Mode',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Map Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-pixel text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-cyan-400 animate-spin" /> Ecosystem Map Navigation
            </span>
          </div>
          <h1 className="font-pixel text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-300 leading-tight">
            IDEA BRIDGE: THE VENTURE REALM
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Where talent meets opportunity and ideas become ventures. Step into any district across
            the realm to forge ideas, test customer friction, hire talent, or pitch dragon investors.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Track 2: Entrepreneurship & Employment
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300 flex items-center gap-1">
              <span>🎮</span> 8-Bit Web Audio Engine Active
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-slate-300 flex items-center gap-1">
              <span>⚖️</span> Fair Discovery Engine Online
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Districts Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-pixel text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <span>🗺️</span> Select District to Travel
          </h2>
          <span className="text-xs text-slate-500 font-mono">7 Realm Districts Open</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {districts.map((d) => (
            <div
              key={d.id}
              onClick={() => {
                sound.playPowerUp();
                onSelectDistrict(d.id);
              }}
              className="group relative cursor-pointer bg-slate-900/80 hover:bg-slate-900 border-2 border-slate-800 hover:border-cyan-400 rounded-xl p-5 transition-all duration-300 hover:shadow-neon-cyan hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 group-hover:border-cyan-400 flex items-center justify-center text-2xl shadow-inner transition">
                    {d.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {d.badge}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-100 group-hover:text-cyan-300 transition">
                  {d.name}
                </h3>
                <div className="text-xs font-mono text-indigo-400 mb-2">{d.subtitle}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{d.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-cyan-300 transition">
                <span>Enter District</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
