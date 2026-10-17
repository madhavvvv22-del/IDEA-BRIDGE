import React from 'react';
import {
  GameCharacter,
  UserRole,
  Venture,
  JobQuest,
  JobApplication,
  CustomerProblem,
  MentorshipSession,
  InvestorIntroRequest,
} from '../../types';
import { sound } from '../../services/soundEngine';
import {
  Sparkles,
  Rocket,
  Briefcase,
  Users,
  Compass,
  CheckCircle2,
  TrendingUp,
  Award,
  Gem,
  GraduationCap,
  Building,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface RoleSanctuaryProps {
  character: GameCharacter;
  ventures: Venture[];
  jobs: JobQuest[];
  applications: JobApplication[];
  problems: CustomerProblem[];
  mentorships: MentorshipSession[];
  intros: InvestorIntroRequest[];
  onNavigateTab: (tab: string) => void;
  onOpenAIStudio: () => void;
}

export const RoleSanctuary: React.FC<RoleSanctuaryProps> = ({
  character,
  ventures,
  jobs,
  applications,
  problems,
  mentorships,
  intros,
  onNavigateTab,
  onOpenAIStudio,
}) => {
  const role = character.role;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-cyan-400">Section 7 Specification</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-cyan-300 border border-indigo-700/50">
                Custom Role Sanctuary Dashboard
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">
              {character.name.toUpperCase()}'S SANCTUARY
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Playing as <strong className="text-cyan-300">{character.activeClassTitle}</strong> ({character.role}).
              Your custom cockpit is loaded with role-specific tools, pipelines, and growth actions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playPowerUp();
                onOpenAIStudio();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Venture Assistant</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {role === 'entrepreneur' && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">{ventures.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Active Ventures</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">Stage {ventures[0]?.growthStage || 1}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Growth Loop Stage</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">{intros.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Investor Inquiries</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-purple-400">{mentorships.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Sage Sessions</div>
            </div>
          </>
        )}

        {role === 'jobseeker' && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">{jobs.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Matching Quests</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">{applications.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Active Applications</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">94%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Avg Synergy Match</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-purple-400">Lv. {character.level}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Talent Tier</div>
            </div>
          </>
        )}

        {role === 'investor' && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">{ventures.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Deals in Sanctum</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">20%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Rotation Spotlight</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">{intros.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Intro Pipelines</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-purple-400">92%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Equity Index</div>
            </div>
          </>
        )}

        {role === 'customer' && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-pink-400">{problems.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Problems Posted</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">
                {problems.reduce((acc, p) => acc + (p.proposals?.length || 0), 0)}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">Solutions Received</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">
                {problems.reduce((acc, p) => acc + (p.upvotes || 0), 0)}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">Community Upvotes</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">1</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Leveled to Venture</div>
            </div>
          </>
        )}

        {['startup', 'recruiter', 'mentor', 'company'].includes(role) && (
          <>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">{ventures.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Ecosystem Ventures</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">{jobs.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Active Quests</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">{applications.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Talent Pipeline</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-purple-400">{mentorships.length}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Sage Reviews</div>
            </div>
          </>
        )}
      </div>

      {/* Primary Actions & Role Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Venture & Growth Status */}
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-pixel text-xs text-cyan-300">CORE VENTURE PIPELINE</h3>
            <button
              onClick={() => onNavigateTab('growthloop')}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono transition"
            >
              <span>View Loop</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {ventures.slice(0, 2).map((v) => (
              <div key={v.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-slate-100">{v.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{v.tagline}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-cyan-300 border border-indigo-800">
                    Stage {v.growthStage}/8
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>Valuation: ${(v.valuation / 1000000).toFixed(1)}M</span>
                  <span className="text-emerald-400">{v.openRolesCount} Open Roles</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Active Opportunities & Action Board */}
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-pixel text-xs text-pink-300">RECENT ECOSYSTEM FRICTION (SEC 14)</h3>
            <button
              onClick={() => onNavigateTab('problems')}
              className="text-xs text-slate-400 hover:text-pink-400 flex items-center gap-1 font-mono transition"
            >
              <span>Problem Bazaar</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {problems.slice(0, 2).map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{p.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{p.painPoint}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">
                    {p.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span>{p.upvotes} Upvotes</span>
                  <span className="text-cyan-400">{p.proposalsCount} Solutions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
