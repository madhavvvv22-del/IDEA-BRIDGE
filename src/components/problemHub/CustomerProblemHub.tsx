import React, { useState } from 'react';
import { CustomerProblem, SolutionProposal } from '../../types';
import { sound } from '../../services/soundEngine';
import {
  HelpCircle,
  Plus,
  ThumbsUp,
  Sparkles,
  Rocket,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ExternalLink,
  MessageSquare,
  X,
} from 'lucide-react';

interface CustomerProblemHubProps {
  problems: CustomerProblem[];
  onAddProblem: (problem: Partial<CustomerProblem>) => void;
  onVoteProblem: (id: string) => void;
  onSubmitSolution: (problemId: string, solution: Partial<SolutionProposal>) => void;
  onConvertToVenture: (problemId: string) => void;
}

export const CustomerProblemHub: React.FC<CustomerProblemHubProps> = ({
  problems,
  onAddProblem,
  onVoteProblem,
  onSubmitSolution,
  onConvertToVenture,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [activeSolutionModalProblem, setActiveSolutionModalProblem] = useState<CustomerProblem | null>(null);

  // New Problem Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CustomerProblem['category']>('SaaS / B2B');
  const [newContext, setNewContext] = useState('');
  const [newPainPoint, setNewPainPoint] = useState('');
  const [newAudience, setNewAudience] = useState('');
  const [newFailsReason, setNewFailsReason] = useState('');
  const [newIdealSolution, setNewIdealSolution] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newUrgency, setNewUrgency] = useState<CustomerProblem['urgency']>('High');

  // Solution Proposal Form State
  const [solTitle, setSolTitle] = useState('');
  const [solSummary, setSolSummary] = useState('');
  const [solApproach, setSolApproach] = useState('');
  const [solBenefits, setSolBenefits] = useState('');
  const [solPrototypeUrl, setSolPrototypeUrl] = useState('');
  const [solWeeks, setSolWeeks] = useState(3);
  const [solCost, setSolCost] = useState('$2,500');

  const categories = ['All', 'SaaS / B2B', 'Fintech', 'Healthcare', 'Climate & Agri', 'EdTech', 'Consumer Tech'];

  const filteredProblems = problems.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.painPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPainPoint.trim()) return;

    sound.playQuestComplete();
    onAddProblem({
      title: newTitle,
      category: newCategory,
      context: newContext,
      painPoint: newPainPoint,
      targetAudience: newAudience,
      existingSolutionsFailReason: newFailsReason,
      idealSolutionDescription: newIdealSolution,
      budgetExpectation: newBudget,
      urgency: newUrgency,
    });

    setShowPostModal(false);
    // Reset
    setNewTitle('');
    setNewContext('');
    setNewPainPoint('');
    setNewAudience('');
    setNewFailsReason('');
    setNewIdealSolution('');
    setNewBudget('');
  };

  const handleCreateSolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSolutionModalProblem || !solTitle.trim() || !solApproach.trim()) return;

    sound.playPowerUp();
    onSubmitSolution(activeSolutionModalProblem.id, {
      solutionTitle: solTitle,
      summary: solSummary,
      approach: solApproach,
      expectedBenefits: solBenefits,
      prototypeUrl: solPrototypeUrl,
      deliveryWeeks: solWeeks,
      costEstimate: solCost,
    });

    setActiveSolutionModalProblem(null);
    setSolTitle('');
    setSolSummary('');
    setSolApproach('');
    setSolBenefits('');
    setSolPrototypeUrl('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-950/70 via-slate-900 to-indigo-950/70 border-2 border-pink-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-pink-400">Section 14 Specification</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-900/60 text-pink-300 border border-pink-700/50">
                Customer Problem Hub & Solution Marketplace
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE PROBLEM BAZAAR</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Real-world customers share friction points and unmet needs. Entrepreneurs discover verified
              demand, propose working solutions, and convert validated problems into scalable ventures!
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowPostModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs shadow-neon-pink flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Customer Problem (+350 XP)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search friction, pain points, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProblems.map((p) => (
          <div
            key={p.id}
            className="bg-[#0e1022] border-2 border-slate-800 hover:border-pink-500/60 rounded-2xl p-6 transition-all duration-300 shadow-xl space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {p.category}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    p.urgency === 'Critical'
                      ? 'bg-red-950 text-red-300 border border-red-700'
                      : p.urgency === 'High'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {p.urgency} Urgency
                </span>
                <span className="text-xs text-slate-500 font-mono">Posted by {p.customerName}</span>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`text-xs font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
                    p.status === 'promoted_to_venture'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : p.status === 'collaborating'
                      ? 'bg-blue-950 text-blue-300 border border-blue-600'
                      : 'bg-pink-950 text-pink-300 border border-pink-700'
                  }`}
                >
                  {p.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Title & Pain Point */}
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100 mb-1">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.painPoint}</p>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block mb-0.5">
                  Who Experiences This:
                </span>
                <span className="text-slate-200">{p.targetAudience}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block mb-0.5">
                  Why Existing Tools Fail:
                </span>
                <span className="text-slate-200">{p.existingSolutionsFailReason}</span>
              </div>
              <div>
                <span className="text-slate-400 font-mono text-[10px] uppercase block mb-0.5">
                  Customer's Ideal Solution:
                </span>
                <span className="text-cyan-300 font-medium">{p.idealSolutionDescription}</span>
              </div>
            </div>

            {/* AI Cluster Tags (Step 2 in specification) */}
            {p.aiClusters && p.aiClusters.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <span className="text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Opportunity Clusters:
                </span>
                {p.aiClusters.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-purple-950/50 text-purple-300 border border-purple-800/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Existing Proposals Section */}
            {p.proposals && p.proposals.length > 0 && (
              <div className="space-y-2 border-t border-slate-800/80 pt-3">
                <div className="text-xs uppercase font-mono text-slate-400 flex items-center gap-1.5">
                  <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Submitted Solution Proposals ({p.proposals.length})</span>
                </div>

                <div className="space-y-2">
                  {p.proposals.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-200">{prop.solutionTitle}</span>
                          <span className="text-[10px] text-cyan-400 font-mono">by {prop.proposerName}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-amber-300">
                            {prop.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">{prop.summary}</p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                          <span>Est: {prop.deliveryWeeks} weeks</span>
                          <span>Cost: {prop.costEstimate}</span>
                          {prop.prototypeUrl && (
                            <a
                              href={prop.prototypeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline flex items-center gap-0.5"
                            >
                              View Prototype <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs">
                          {prop.votes} Endorsements
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-2">
                {/* Upvote Button */}
                <button
                  onClick={() => {
                    sound.playCoin();
                    onVoteProblem(p.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                    p.hasUserUpvoted
                      ? 'bg-pink-600/30 border-pink-400 text-pink-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{p.upvotes} Upvotes</span>
                </button>

                {p.budgetExpectation && (
                  <span className="text-xs text-amber-400 font-mono">
                    Budget: {p.budgetExpectation}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Propose Solution Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    setActiveSolutionModalProblem(p);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 transition"
                >
                  <Rocket className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Propose Solution (+400 XP)</span>
                </button>

                {/* Level Up to Venture (Step 6 in specification) */}
                {p.status !== 'promoted_to_venture' && (
                  <button
                    onClick={() => {
                      sound.playLevelUp();
                      onConvertToVenture(p.id);
                    }}
                    title="Promote this validated problem into an active venture registered on the Idea Bridge"
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 font-semibold text-xs flex items-center gap-1.5 transition"
                  >
                    <span>🚀</span>
                    <span>Level Up to Venture</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL 1: POST A CUSTOMER PROBLEM */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0e1022] border-2 border-pink-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-pink-950 via-slate-900 to-pink-950 p-5 border-b border-pink-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧩</span>
                <div>
                  <h3 className="font-pixel text-sm text-pink-300">Post Customer Problem</h3>
                  <div className="text-xs text-slate-400 font-mono">
                    Real friction for entrepreneurs and startups to solve
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProblem} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Problem Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solo Founders Getting Ripped Off by Offshore Agencies"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Industry Domain</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CustomerProblem['category'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Urgency</label>
                  <select
                    value={newUrgency}
                    onChange={(e) => setNewUrgency(e.target.value as CustomerProblem['urgency'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  >
                    <option value="Critical">Critical (Immediate pain)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">The Exact Pain Point & Context *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe exactly what happens and why it wastes time or money..."
                  value={newPainPoint}
                  onChange={(e) => setNewPainPoint(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Who Experiences This?</label>
                  <input
                    type="text"
                    placeholder="e.g. Non-technical solo founders"
                    value={newAudience}
                    onChange={(e) => setNewAudience(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Budget / Willingness to Pay</label>
                  <input
                    type="text"
                    placeholder="e.g. $100/mo or $5k milestone"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Why do existing solutions fail?</label>
                <input
                  type="text"
                  placeholder="e.g. Upwork has no code testing escrow; agencies lock source code"
                  value={newFailsReason}
                  onChange={(e) => setNewFailsReason(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Your Ideal Solution</label>
                <textarea
                  rows={2}
                  placeholder="What would your dream product or workflow look like?"
                  value={newIdealSolution}
                  onChange={(e) => setNewIdealSolution(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-md"
                >
                  Publish to Problem Bazaar (+350 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PROPOSE SOLUTION */}
      {activeSolutionModalProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0e1022] border-2 border-indigo-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 p-5 border-b border-indigo-500/40 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-cyan-300">Submit Solution Proposal</h3>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Solving: "{activeSolutionModalProblem.title}"
                </div>
              </div>
              <button
                onClick={() => setActiveSolutionModalProblem(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSolution} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Solution Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated Milestone Code Escrow & Test Verifier"
                  value={solTitle}
                  onChange={(e) => setSolTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Quick Summary</label>
                <input
                  type="text"
                  placeholder="1-2 sentences on what your solution does"
                  value={solSummary}
                  onChange={(e) => setSolSummary(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Technical & Product Approach *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How does your architecture directly solve this friction?"
                  value={solApproach}
                  onChange={(e) => setSolApproach(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Estimated Weeks</label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={solWeeks}
                    onChange={(e) => setSolWeeks(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Estimated Cost / Pricing</label>
                  <input
                    type="text"
                    value={solCost}
                    onChange={(e) => setSolCost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Demo or Prototype URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://github.com/... or Figma prototype link"
                  value={solPrototypeUrl}
                  onChange={(e) => setSolPrototypeUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSolutionModalProblem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Submit Proposal (+400 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
