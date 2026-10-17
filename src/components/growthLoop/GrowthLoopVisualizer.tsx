import React, { useState } from 'react';
import { Venture } from '../../types';
import { sound } from '../../services/soundEngine';
import {
  Lightbulb,
  Sparkles,
  Share2,
  Users,
  Hammer,
  Briefcase,
  TrendingUp,
  Award,
  ChevronRight,
  CheckCircle2,
  Play,
  RotateCw,
} from 'lucide-react';

interface GrowthLoopVisualizerProps {
  ventures: Venture[];
  onAdvanceStage: (ventureId: string, currentStage: number) => void;
  onOpenAIStudio: () => void;
}

export const GrowthLoopVisualizer: React.FC<GrowthLoopVisualizerProps> = ({
  ventures,
  onAdvanceStage,
  onOpenAIStudio,
}) => {
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const activeVenture = ventures[0] || null;

  const stages = [
    {
      number: 1,
      title: 'Idea Spark',
      subtitle: 'Raw Concept Entry',
      icon: Lightbulb,
      description: 'An entrepreneur enters a raw business idea or observes a market problem.',
      actions: 'Input idea into the AI Venture Studio.',
      rewards: '+200 XP • 15 MP',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      number: 2,
      title: 'AI Refinement',
      subtitle: 'Stress Test & Lean Canvas',
      icon: Sparkles,
      description: 'AI assistant refines the idea, stress-tests assumptions, sizes TAM/SAM, and plans the MVP roadmap.',
      actions: 'Generate 9-box Lean Canvas and 35-day MVP sprint plan.',
      rewards: '+350 XP • 25 MP',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      number: 3,
      title: 'Venture Profile',
      subtitle: 'Ecosystem Publishing',
      icon: Share2,
      description: 'The venture profile is published with milestones, target funding, and squad needs.',
      actions: 'Publish to public registry and Fair Discovery feed.',
      rewards: '+400 XP • $150 IB',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      number: 4,
      title: 'AI Matching',
      subtitle: 'Multi-Role Synergy',
      icon: Users,
      description: 'The matching engine recommends complementary co-founders, mentors, investors, and company partners.',
      actions: 'Inspect "Why You Matched" explanations.',
      rewards: '+300 XP • 20 MP',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      number: 5,
      title: 'Team & MVP Build',
      subtitle: 'Squad Execution',
      icon: Hammer,
      description: 'The entrepreneur recruits core talent, builds the product prototype, and hits technical milestones.',
      actions: 'Complete prototype verification with early users.',
      rewards: '+600 XP • $300 IB',
      color: 'from-orange-500 to-red-500',
    },
    {
      number: 6,
      title: 'Jobs & Investment',
      subtitle: 'Scaling Openings',
      icon: Briefcase,
      description: 'Startup publishes paid job quests, attracts adventurers, and opens seed financing rounds.',
      actions: 'Publish job openings and pitch dragon investors.',
      rewards: '+800 XP • $500 IB',
      color: 'from-pink-500 to-rose-500',
    },
    {
      number: 7,
      title: 'Talent Growth',
      subtitle: 'Skill Tree Leveling',
      icon: TrendingUp,
      description: 'Squad members develop practical skills, gain portfolio evidence, and level up their talent tier.',
      actions: 'Verify git artifacts and unlock talent badges.',
      rewards: '+500 XP to All Members',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 8,
      title: 'Ecosystem Scaling',
      subtitle: 'The Infinite Loop',
      icon: RotateCw,
      description: 'Mentors guide further expansion, corporate titans adopt pilots, and successful outcomes fund new sparks.',
      actions: 'Achieve sustainable market fit & pay it forward.',
      rewards: 'Mythic Decacorn Trophy • Infinite Loop',
      color: 'from-yellow-400 to-amber-600',
    },
  ];

  const currentStageInfo = stages.find((s) => s.number === selectedStage) || stages[0];
  const venturesAtSelectedStage = ventures.filter((v) => v.growthStage === selectedStage);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900 border-2 border-indigo-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-cyan-400">Section 4 Specification</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                Interactive Growth Pipeline
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE 8-STAGE GROWTH LOOP</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Unlike static job boards, Idea Bridge guides builders from raw idea through AI refinement,
              team assembly, MVP creation, hiring, and institutional scaling.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playPowerUp();
              onOpenAIStudio();
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs shadow-neon-cyan flex items-center gap-2 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Venture Studio</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Interactive Stepper */}
      <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="text-xs uppercase font-mono text-slate-400 mb-4 flex items-center justify-between">
          <span>Click a stage to inspect ecosystem actions</span>
          <span className="text-cyan-400 font-bold">Stage {selectedStage} of 8</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = selectedStage === stage.number;
            const hasVenture = ventures.some((v) => v.growthStage === stage.number);

            return (
              <button
                key={stage.number}
                onClick={() => {
                  sound.playClick();
                  setSelectedStage(stage.number);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-gradient-to-b from-indigo-900/70 to-slate-900 border-cyan-400 shadow-neon-cyan scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[10px] text-cyan-400">0{stage.number}</span>
                  {hasVenture && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Active Venture in Stage" />
                  )}
                </div>

                <div>
                  <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                  <div className="font-bold text-xs text-slate-200 line-clamp-1">{stage.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono line-clamp-1">{stage.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Card */}
      <div className="bg-slate-900/90 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 p-0.5 flex items-center justify-center text-white shadow-md">
                <currentStageInfo.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-pixel text-xs text-cyan-400">Stage {currentStageInfo.number}</span>
                <h3 className="font-pixel text-base sm:text-lg text-white">{currentStageInfo.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {currentStageInfo.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Required Action</span>
                <span className="text-slate-200 font-semibold">{currentStageInfo.actions}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Stage Milestone Rewards</span>
                <span className="text-amber-400 font-bold">{currentStageInfo.rewards}</span>
              </div>
            </div>
          </div>

          {/* Active Ventures at this stage */}
          <div className="w-full lg:w-80 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs uppercase font-mono text-slate-400 flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Ventures In Stage</span>
              <span className="text-cyan-400 font-bold">{venturesAtSelectedStage.length} Active</span>
            </div>

            {venturesAtSelectedStage.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6 font-mono">
                No ventures currently at this stage. Advance one from a previous stage!
              </div>
            ) : (
              venturesAtSelectedStage.map((v) => (
                <div key={v.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-xs text-slate-200">{v.name}</h5>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-950 text-cyan-300 border border-indigo-800">
                      {v.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{v.tagline}</p>

                  {v.growthStage < 8 && (
                    <button
                      onClick={() => {
                        sound.playLevelUp();
                        onAdvanceStage(v.id, v.growthStage);
                      }}
                      className="w-full py-1.5 px-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <span>Advance to Stage {v.growthStage + 1}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
