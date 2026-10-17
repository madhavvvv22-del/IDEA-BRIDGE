import React, { useState } from 'react';
import { Venture, InvestorIntroRequest } from '../../types';
import { sound } from '../../services/soundEngine';
import {
  generateFairDiscoveryFeed,
  InvestorFilterPreferences,
} from '../../services/fairDiscoveryEngine';
import {
  Gem,
  Sparkles,
  RotateCcw,
  Compass,
  Eye,
  Bookmark,
  Send,
  TrendingUp,
  BarChart3,
  SlidersHorizontal,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';

interface FairDiscoverySanctumProps {
  ventures: Venture[];
  onRequestIntro: (ventureId: string, investorName: string, introMessage: string) => void;
  intros: InvestorIntroRequest[];
}

export const FairDiscoverySanctum: React.FC<FairDiscoverySanctumProps> = ({
  ventures,
  onRequestIntro,
  intros,
}) => {
  const [preferences, setPreferences] = useState<InvestorFilterPreferences>({
    industries: [],
    stages: [],
    minFunding: 100000,
    maxFunding: 2000000,
  });

  const [activeTab, setActiveTab] = useState<'balanced' | 'underexposed' | 'analytics' | 'intros'>('balanced');
  const [selectedVentureForIntro, setSelectedVentureForIntro] = useState<Venture | null>(null);
  const [introMsg, setIntroMsg] = useState('We reviewed your traction and would love to schedule a 20-min intro call.');
  const [savedVentures, setSavedVentures] = useState<string[]>(['v-101']);

  const industries = ['Healthcare', 'Climate & Agri', 'Fintech', 'EdTech', 'SaaS / B2B'];
  const stages = ['Idea', 'Prototype / MVP', 'Pre-Seed', 'Seed'];

  // Run the 70/20/10 Fair Discovery Engine
  const feedResult = generateFairDiscoveryFeed(ventures, preferences);

  const toggleIndustry = (ind: string) => {
    sound.playClick();
    setPreferences((prev) => ({
      ...prev,
      industries: prev.industries.includes(ind)
        ? prev.industries.filter((i) => i !== ind)
        : [...prev.industries, ind],
    }));
  };

  const toggleStage = (st: string) => {
    sound.playClick();
    setPreferences((prev) => ({
      ...prev,
      stages: prev.stages.includes(st)
        ? prev.stages.filter((s) => s !== st)
        : [...prev.stages, st],
    }));
  };

  const handleToggleSave = (vId: string) => {
    sound.playCoin();
    setSavedVentures((prev) =>
      prev.includes(vId) ? prev.filter((id) => id !== vId) : [...prev, vId]
    );
  };

  const handleSendIntro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVentureForIntro) return;
    sound.playQuestComplete();
    onRequestIntro(selectedVentureForIntro.id, 'Apex Syndicate Dragon Partners', introMsg);
    setSelectedVentureForIntro(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/70 via-slate-900 to-indigo-950/70 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-amber-400">Section 5 Specification</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/50">
                Hybrid 70/20/10 Fair Investor Discovery Engine
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE DRAGON'S VAULT</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Eliminating the monopoly of viral hype. Our algorithmic rotation reserves 20% of investor
              visibility for newly founded and underexposed ventures, tracking impressions for total transparency.
            </p>
          </div>

          {/* Allocation Gauge */}
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-xl p-3 text-xs font-mono space-y-1.5 shadow-md min-w-[220px]">
            <div className="text-[10px] uppercase text-slate-400 tracking-wider">Quota Allocation</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-cyan-300 font-bold">70% Personalized Match</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-amber-300 font-bold">20% Rotating Underexposed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span className="text-purple-300 font-bold">10% Exploration / Wildcard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('balanced');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'balanced'
                  ? 'bg-amber-500 text-slate-950 shadow-neon-gold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Balanced 70/20/10 Feed</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('underexposed');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'underexposed'
                  ? 'bg-amber-500 text-slate-950 shadow-neon-gold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Rotation Spotlight ({feedResult.underexposed.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('analytics');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-slate-950 shadow-neon-gold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Exposure Transparency Matrix</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('intros');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                activeTab === 'intros'
                  ? 'bg-amber-500 text-slate-950 shadow-neon-gold'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Intro Pipeline ({intros.length})</span>
            </button>
          </div>

          {/* Equity Badge */}
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/50">
            <span>Exposure Equity Index:</span>
            <strong className="text-emerald-300 font-bold">{feedResult.exposureStats.exposureEquityScore}%</strong>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-mono text-[11px]">Sectors:</span>
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => toggleIndustry(ind)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                  preferences.industries.includes(ind)
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-mono text-[11px]">Rounds:</span>
            {stages.map((st) => (
              <button
                key={st}
                onClick={() => toggleStage(st)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                  preferences.stages.includes(st)
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1 & 2: VENTURE CARDS FEED */}
      {(activeTab === 'balanced' || activeTab === 'underexposed') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(activeTab === 'balanced' ? feedResult.allBalanced : feedResult.underexposed).map((v) => {
            const isSaved = savedVentures.includes(v.id);
            const isUnderexposedCategory = v.exposureCategory === 'underexposed_rotation';
            const isWildcardCategory = v.exposureCategory === 'exploration_wildcard';

            return (
              <div
                key={v.id}
                className={`bg-[#0e1022] border-2 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isUnderexposedCategory
                    ? 'border-amber-500/80 hover:border-amber-400 shadow-neon-gold/20'
                    : isWildcardCategory
                    ? 'border-purple-500/70 hover:border-purple-400'
                    : 'border-slate-800 hover:border-cyan-500/60'
                }`}
              >
                <div className="space-y-4">
                  {/* Category Pill & Match Score */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        isUnderexposedCategory
                          ? 'bg-amber-950 text-amber-300 border border-amber-600 flex items-center gap-1'
                          : isWildcardCategory
                          ? 'bg-purple-950 text-purple-300 border border-purple-600 flex items-center gap-1'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-700 flex items-center gap-1'
                      }`}
                    >
                      {isUnderexposedCategory && <RotateCcw className="w-3 h-3" />}
                      {isWildcardCategory && <Compass className="w-3 h-3" />}
                      {v.exposureCategory.replace('_', ' ')}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="text-slate-400">Match Score:</span>
                      <span className="font-bold text-cyan-400">{v.matchScore}%</span>
                    </div>
                  </div>

                  {/* Name & Tagline */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-100">{v.name}</h3>
                      <button
                        onClick={() => handleToggleSave(v.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          isSaved
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title="Save to Deal Pipeline"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{v.tagline}</p>
                  </div>

                  {/* Why You Matched (Spec Section 6) */}
                  <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 leading-snug">
                    <strong className="text-cyan-400 font-mono">Why Matched: </strong>
                    {v.matchReason}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-center font-mono text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Stage</div>
                      <div className="text-slate-200 font-bold">{v.stage}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Target</div>
                      <div className="text-amber-400 font-bold">${(v.fundingTarget / 1000).toFixed(0)}k</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Valuation</div>
                      <div className="text-emerald-400 font-bold">${(v.valuation / 1000000).toFixed(1)}M</div>
                    </div>
                  </div>

                  {/* Real Exposure Tracking Data (Spec Section 5-C) */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-500" />
                      {v.exposureMetrics?.impressions || 1} Impressions
                    </span>
                    <span>{v.exposureMetrics?.saves || 0} Saves</span>
                    <span>{v.exposureMetrics?.introRequests || 0} Intros</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  {v.pitchDeckUrl ? (
                    <a
                      href={v.pitchDeckUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono transition"
                    >
                      <span>Deck</span> <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Pre-Seed Memo</span>
                  )}

                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedVentureForIntro(v);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                  >
                    <Send className="w-3 h-3" />
                    <span>Request Intro (+300 XP)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: TRANSPARENCY MATRIX */}
      {activeTab === 'analytics' && (
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="font-pixel text-sm text-amber-300">EXPOSURE TRANSPARENCY MATRIX</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Live audit of visibility distribution preventing monopolies and tracking rotation health.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-cyan-400">{feedResult.exposureStats.totalStartups}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Total Startups In Realm</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-amber-400">{feedResult.exposureStats.underexposedCount}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Underexposed in Rotation</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-purple-400">{feedResult.exposureStats.averageImpressions}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Average Impressions / Venture</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-2xl font-pixel text-emerald-400">{feedResult.exposureStats.exposureEquityScore}%</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Gini Equity Balance</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Startup</th>
                  <th className="p-3">Industry</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Impressions</th>
                  <th className="p-3">Saves</th>
                  <th className="p-3">Intro Requests</th>
                  <th className="p-3">Rotation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ventures.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-900/60">
                    <td className="p-3 font-bold text-slate-200">{v.name}</td>
                    <td className="p-3 text-slate-300">{v.industry}</td>
                    <td className="p-3 text-cyan-400">{v.stage}</td>
                    <td className="p-3 text-slate-300">{v.exposureMetrics?.impressions || 1}</td>
                    <td className="p-3 text-amber-400">{v.exposureMetrics?.saves || 0}</td>
                    <td className="p-3 text-emerald-400">{v.exposureMetrics?.introRequests || 0}</td>
                    <td className="p-3">
                      {v.isUnderexposed ? (
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                          Rotating Spotlight
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                          Organic Feed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: INTRO REQUESTS PIPELINE */}
      {activeTab === 'intros' && (
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div>
            <h3 className="font-pixel text-sm text-cyan-300">INVESTOR INTRO PIPELINE</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Track bilateral introduction requests between dragon investors and founders.
            </p>
          </div>

          <div className="space-y-3">
            {intros.map((ir) => (
              <div
                key={ir.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-100">{ir.ventureName}</span>
                    <span className="text-slate-400 font-mono">↔ {ir.investorName}</span>
                  </div>
                  <p className="text-slate-300 text-xs italic">"{ir.introMessage}"</p>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    Requested on {ir.requestedAt} • Synergy Score: {ir.matchScore}%
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase font-bold ${
                    ir.status === 'accepted'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : 'bg-amber-950 text-amber-300 border border-amber-600'
                  }`}
                >
                  {ir.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INTRO REQUEST MODAL */}
      {selectedVentureForIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1022] border-2 border-amber-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 p-5 border-b border-amber-500/40 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-amber-300">Request Dragon Intro</h3>
                <div className="text-xs text-slate-400 font-mono">
                  Pitching {selectedVentureForIntro.name}
                </div>
              </div>
              <button
                onClick={() => setSelectedVentureForIntro(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendIntro} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Introduction Pitch Note
                </label>
                <textarea
                  rows={4}
                  required
                  value={introMsg}
                  onChange={(e) => setIntroMsg(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Fair Play Notice: </span>
                This request increments {selectedVentureForIntro.name}'s exposure index and registers a mutual consent handshake.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedVentureForIntro(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Dispatch Introduction (+300 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
