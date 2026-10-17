import React, { useState } from 'react';
import { aiEngine, LeanCanvasResult, MVPRoadmapPhase } from '../../services/aiEngine';
import { sound } from '../../services/soundEngine';
import {
  Sparkles,
  Zap,
  Layers,
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Copy,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface AIVentureAssistantProps {
  onAddVentureFromAI: (ventureData: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
    problemStatement: string;
    targetMarket: string;
    unfairAdvantage: string;
    revenueModel: string;
  }) => void;
  mana: number;
}

export const AIVentureAssistant: React.FC<AIVentureAssistantProps> = ({
  onAddVentureFromAI,
  mana,
}) => {
  const [ideaTitle, setIdeaTitle] = useState('PulseGrid AI');
  const [rawIdea, setRawIdea] = useState(
    'Decentralized micro-battery virtual power plant for neighborhood EV chargers'
  );
  const [industry, setIndustry] = useState('Climate & Agri');
  const [activeTab, setActiveTab] = useState<'canvas' | 'mvp' | 'pitch' | 'risks'>('canvas');

  const [canvasResult, setCanvasResult] = useState<LeanCanvasResult | null>(null);
  const [mvpPlan, setMvpPlan] = useState<MVPRoadmapPhase[] | null>(null);
  const [pitchScript, setPitchScript] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!ideaTitle.trim() || !rawIdea.trim()) return;
    setIsGenerating(true);
    sound.playPowerUp();

    setTimeout(() => {
      const canvas = aiEngine.generateLeanCanvas(ideaTitle, rawIdea, industry);
      const mvp = aiEngine.generateMVPRoadmap(ideaTitle);
      const pitch = aiEngine.generatePitchScript(ideaTitle, industry, 500000);

      setCanvasResult(canvas);
      setMvpPlan(mvp);
      setPitchScript(pitch);
      setIsGenerating(false);
      sound.playLevelUp();
    }, 700);
  };

  const handlePublishVenture = () => {
    if (!canvasResult) return;
    sound.playQuestComplete();
    onAddVentureFromAI({
      name: ideaTitle,
      tagline: canvasResult.uniqueValueProp,
      description: rawIdea,
      industry,
      problemStatement: canvasResult.problem.join('; '),
      targetMarket: canvasResult.customerSegments.join(', '),
      unfairAdvantage: canvasResult.unfairAdvantage,
      revenueModel: canvasResult.revenueStreams[0] || 'SaaS subscription',
    });
  };

  const handleCopyPitch = () => {
    if (!pitchScript) return;
    navigator.clipboard.writeText(pitchScript);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-purple-400">Section 6 AI Specification</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-700/50">
                Venture Intelligence Engine
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">AI VENTURE STUDIO</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Transform rough hypotheses into defensible business models, 9-box Lean Canvases, 35-day MVP
              sprint roadmaps, and pitch scripts in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-950/80 px-3 py-2 rounded-xl border border-purple-500/40">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-slate-300">Idea Mana: <strong className="text-cyan-400">{mana} MP</strong></span>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="text-xs uppercase font-mono text-slate-400">Step 1: Input Raw Concept & Spark</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Venture Codename</label>
            <input
              type="text"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-300 mb-1">Industry Domain</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
            >
              <option value="Healthcare">Healthcare & Biotech</option>
              <option value="Climate & Agri">Climate & AgriTech</option>
              <option value="Fintech">Fintech & Payments</option>
              <option value="EdTech">EdTech & Skill Trees</option>
              <option value="SaaS / B2B">SaaS / Enterprise B2B</option>
              <option value="Consumer Tech">Consumer Tech</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1">The Core Idea & Observation</label>
          <textarea
            rows={2}
            value={rawIdea}
            onChange={(e) => setRawIdea(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-neon-pink flex items-center gap-2 transition disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{isGenerating ? 'Synthesizing Lean Canvas...' : 'Ignite AI Studio (-15 MP)'}</span>
          </button>
        </div>
      </div>

      {/* Generated Results Workspace */}
      {canvasResult && (
        <div className="space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('canvas');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'canvas' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>9-Box Lean Canvas</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('mvp');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'mvp' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>35-Day MVP Sprint Plan</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('pitch');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'pitch' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Investor Pitch Script</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('risks');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'risks' ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Assumption Stress-Test</span>
            </button>
          </div>

          {/* TAB 1: 9-BOX LEAN CANVAS */}
          {activeTab === 'canvas' && (
            <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-pixel text-sm text-purple-300">9-BOX LEAN CANVAS: {ideaTitle}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Unique Value Proposition: {canvasResult.uniqueValueProp}
                  </p>
                </div>

                <button
                  onClick={handlePublishVenture}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-2 transition"
                >
                  <span>Publish to Venture Registry (+400 XP)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 9 Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Problem */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-pink-400 uppercase font-bold">1. Problem</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.problem.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                {/* 2. Customer Segments */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-cyan-400 uppercase font-bold">2. Customer Segments</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.customerSegments.map((cs, i) => (
                      <li key={i}>{cs}</li>
                    ))}
                  </ul>
                </div>

                {/* 3. Unique Value Proposition */}
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/50 space-y-2">
                  <div className="font-mono text-[11px] text-amber-300 uppercase font-bold">3. Unique Value Prop</div>
                  <p className="text-slate-200 font-medium leading-relaxed">{canvasResult.uniqueValueProp}</p>
                </div>

                {/* 4. Solution */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-emerald-400 uppercase font-bold">4. Solution</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.solution.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* 5. Channels */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-purple-400 uppercase font-bold">5. Channels</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.channels.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* 6. Unfair Advantage */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-yellow-400 uppercase font-bold">6. Unfair Advantage</div>
                  <p className="text-slate-300">{canvasResult.unfairAdvantage}</p>
                </div>

                {/* 7. Revenue Streams */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-emerald-300 uppercase font-bold">7. Revenue Streams</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.revenueStreams.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                {/* 8. Cost Structure */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-red-400 uppercase font-bold">8. Cost Structure</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.costStructure.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* 9. Key Metrics */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                  <div className="font-mono text-[11px] text-blue-400 uppercase font-bold">9. Key Metrics</div>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {canvasResult.keyMetrics.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MVP SPRINT ROADMAP */}
          {activeTab === 'mvp' && mvpPlan && (
            <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div>
                <h3 className="font-pixel text-sm text-cyan-300">35-DAY MVP SPRINT ROADMAP</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Step-by-step technical validation checkpoints designed to conserve founder capital.
                </p>
              </div>

              <div className="space-y-4">
                {mvpPlan.map((phase, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-100 flex items-center gap-2">
                        <span className="font-pixel text-xs text-cyan-400">0{idx + 1}</span>
                        <span>{phase.phase}</span>
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {phase.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          {phase.deliverables.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-amber-400 block mb-1">
                          Hypotheses to Validate:
                        </span>
                        <ul className="space-y-1 text-slate-300 list-disc list-inside">
                          {phase.keyAssumptionsToTest.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PITCH SCRIPT */}
          {activeTab === 'pitch' && pitchScript && (
            <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-pixel text-sm text-amber-300">DRAGON PITCH DECK SCRIPT</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Optimized 60-second verbal script for seed investors and demo day stages.
                  </p>
                </div>

                <button
                  onClick={handleCopyPitch}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Script'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {pitchScript}
              </div>
            </div>
          )}

          {/* TAB 4: RISKS */}
          {activeTab === 'risks' && (
            <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div>
                <h3 className="font-pixel text-sm text-red-400">ASSUMPTION STRESS-TEST</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Pre-mortem analysis highlighting critical failure risks before writing code.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-red-900/50 space-y-2">
                  <div className="font-bold text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risk 1: Distribution Friction
                  </div>
                  <p className="text-slate-300">
                    High Customer Acquisition Cost (CAC) if relying on cold outbound in {industry}.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Remedy: Launch partner bounties on Customer Problem Hub.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/50 space-y-2">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risk 2: Latency & Unit Cost
                  </div>
                  <p className="text-slate-300">
                    High GPU / inference token burn eating into gross margin early on.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Remedy: Quantize to local models and cache frequent vectors.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-blue-900/50 space-y-2">
                  <div className="font-bold text-blue-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Risk 3: Co-Founder Churn
                  </div>
                  <p className="text-slate-300">
                    Solo builder bottleneck without complementary sales hustler or technical paladin.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-400">
                    Remedy: Post quest in Talent Tavern with 2% milestone equity.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
