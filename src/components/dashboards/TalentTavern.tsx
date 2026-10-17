import React, { useState } from 'react';
import { JobQuest, JobApplication, UserRole } from '../../types';
import { sound } from '../../services/soundEngine';
import { aiEngine } from '../../services/aiEngine';
import {
  Briefcase,
  Plus,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  DollarSign,
  MapPin,
  X,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

interface TalentTavernProps {
  jobs: JobQuest[];
  applications: JobApplication[];
  onPostJob: (jobData: Partial<JobQuest>) => void;
  onApplyJob: (appData: Partial<JobApplication>) => void;
  onUpdateAppStatus: (appId: string, status: JobApplication['status']) => void;
  currentRole: UserRole;
}

export const TalentTavern: React.FC<TalentTavernProps> = ({
  jobs,
  applications,
  onPostJob,
  onApplyJob,
  onUpdateAppStatus,
  currentRole,
}) => {
  const [activeTab, setActiveTab] = useState<'bounties' | 'kanban' | 'growth'>('bounties');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleType, setSelectedRoleType] = useState<string>('All');
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobQuest | null>(null);

  // Post Job form state
  const [jobTitle, setJobTitle] = useState('');
  const [ventureName, setVentureName] = useState('SynapseHealth AI');
  const [roleType, setRoleType] = useState<JobQuest['roleType']>('Engineering');
  const [skillsStr, setSkillsStr] = useState('React, TypeScript, Node.js');
  const [salary, setSalary] = useState('$110,000 - $130,000 + 1.0% Equity');
  const [levelReq, setLevelReq] = useState(6);
  const [description, setDescription] = useState('');

  // Apply form state
  const [coverNote, setCoverNote] = useState('Experienced with fullstack systems. Excited to level up your product!');
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com/alex-founder');

  const roleTypes = ['All', 'Engineering', 'AI / Data', 'Design', 'Product', 'Marketing', 'Operations'];

  const filteredJobs = jobs.filter((j) => {
    const matchesType = selectedRoleType === 'All' || j.roleType === selectedRoleType;
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.ventureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;
    sound.playQuestComplete();

    onPostJob({
      title: jobTitle,
      ventureName,
      roleType,
      requiredSkills: skillsStr.split(',').map((s) => s.trim()),
      salaryOrStipend: salary,
      levelRequired: Number(levelReq),
      description,
    });

    setShowPostJobModal(false);
    setJobTitle('');
    setDescription('');
  };

  const handleSendApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobForApply) return;
    sound.playPowerUp();

    onApplyJob({
      jobId: selectedJobForApply.id,
      jobTitle: selectedJobForApply.title,
      ventureName: selectedJobForApply.ventureName,
      coverNote,
      portfolioUrl,
      skills: ['React', 'TypeScript', 'Node.js', 'System Architecture'],
      matchScore: 94,
    });

    setSelectedJobForApply(null);
  };

  // Personal Growth Planner (Spec Section 6-4)
  const growthAnalysis = aiEngine.analyzeSkillGaps(
    ['React', 'TypeScript', 'Node.js'],
    'Senior Fullstack Paladin'
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-indigo-950/70 border-2 border-emerald-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-emerald-400">Track 2: Employment & Talent</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                Talent Tavern & Recruitment Guild
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE TALENT TAVERN</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Connect high-agency developers, designers, and growth builders with scaling startup guilds.
              Every quest includes verified compensation, equity, and game XP.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setShowPostJobModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-neon-green flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Job Quest (+300 XP)</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('bounties');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
              activeTab === 'bounties'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Job Quests ({jobs.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('kanban');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
              activeTab === 'kanban'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Recruiter Pipeline ({applications.length})</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('growth');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
              activeTab === 'growth'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Growth Planner</span>
          </button>
        </div>

        {activeTab === 'bounties' && (
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill, role, startup..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>
        )}
      </div>

      {/* TAB 1: JOB BOUNTIES */}
      {activeTab === 'bounties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((j) => (
            <div
              key={j.id}
              className="bg-[#0e1022] border-2 border-slate-800 hover:border-emerald-500/60 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {j.roleType}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-bold">
                    Required Lv. {j.levelRequired}+
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-slate-100">{j.title}</h3>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">{j.ventureName}</div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {j.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {j.requiredSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-amber-400 font-bold">{j.salaryOrStipend}</span>
                  <span>+{j.xpReward} XP</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {j.applicantsCount} Candidates In Pipeline
                  </span>

                  <button
                    onClick={() => {
                      sound.playClick();
                      setSelectedJobForApply(j);
                    }}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply to Quest (+250 XP)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: RECRUITER PIPELINE KANBAN */}
      {activeTab === 'kanban' && (
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div>
            <h3 className="font-pixel text-sm text-emerald-300">RECRUITER HIRING PIPELINE</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Kanban candidate management with automated skill-match scoring and offer dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(['pending', 'reviewing', 'interview', 'accepted'] as const).map((stage) => {
              const stageApps = applications.filter((a) => a.status === stage);
              const stageLabels = {
                pending: '1. New Submissions',
                reviewing: '2. Reviewing Portfolio',
                interview: '3. Technical Raid',
                accepted: '4. Offer Accepted 🎉',
              };

              return (
                <div key={stage} className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 border-b border-slate-800 pb-2">
                    <span>{stageLabels[stage]}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-cyan-400 text-[10px]">
                      {stageApps.length}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-slate-100">{app.applicantName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{app.applicantTitle}</div>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">
                            {app.matchScore}%
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 italic">"{app.coverNote}"</p>

                        <div className="flex flex-wrap gap-1">
                          {app.skills.map((s, i) => (
                            <span key={i} className="text-[9px] font-mono px-1 rounded bg-slate-950 text-slate-400">
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Status advancement buttons */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[10px] font-mono">
                          {stage === 'pending' && (
                            <button
                              onClick={() => onUpdateAppStatus(app.id, 'reviewing')}
                              className="px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 hover:bg-blue-800"
                            >
                              Review →
                            </button>
                          )}
                          {stage === 'reviewing' && (
                            <button
                              onClick={() => onUpdateAppStatus(app.id, 'interview')}
                              className="px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 hover:bg-purple-800"
                            >
                              Interview →
                            </button>
                          )}
                          {stage === 'interview' && (
                            <button
                              onClick={() => {
                                sound.playLevelUp();
                                onUpdateAppStatus(app.id, 'accepted');
                              }}
                              className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800 font-bold"
                            >
                              Hire! →
                            </button>
                          )}
                          {stage === 'accepted' && (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Hired
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PERSONAL GROWTH PLANNER */}
      {activeTab === 'growth' && (
        <div className="bg-[#0e1022] border-2 border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-pixel text-sm text-cyan-300">AI PERSONAL GROWTH PLANNER</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Target Role: <strong className="text-white">{growthAnalysis.targetRole}</strong> • Tier:{' '}
                <strong className="text-emerald-400">{growthAnalysis.currentTier}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono">Role Readiness Score:</span>
              <div className="font-pixel text-xl text-cyan-400">{growthAnalysis.readinessScore}%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block uppercase text-[11px]">
                Strong Verified Capabilities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {growthAnalysis.strongSkills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold block uppercase text-[11px]">
                Skill Gaps to Level Up:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {growthAnalysis.missingSkills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    ! {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Quests */}
          <div>
            <div className="text-xs uppercase font-mono text-slate-400 mb-3">
              Recommended Skill-Building Bounties
            </div>
            <div className="space-y-3">
              {growthAnalysis.recommendedQuests.map((q, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h5 className="font-bold text-slate-200">{q.questTitle}</h5>
                    <p className="text-slate-400 text-[11px] mt-0.5">{q.description}</p>
                    <div className="text-[10px] text-purple-400 font-mono mt-1">
                      Mentor Synergy: {q.recommendedMentorType}
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded bg-slate-950 text-cyan-300 font-mono text-xs border border-slate-800">
                    +{q.xpReward} XP Reward
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POST JOB MODAL */}
      {showPostJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1022] border-2 border-emerald-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 border-b border-emerald-500/40 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-emerald-300">Post Job Quest</h3>
                <div className="text-xs text-slate-400 font-mono">Publish open squad opportunity</div>
              </div>
              <button
                onClick={() => setShowPostJobModal(false)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Quest Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lead AI Engineer (PyTorch & RAG)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Role Type</label>
                  <select
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value as JobQuest['roleType'])}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  >
                    {roleTypes.filter((r) => r !== 'All').map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Level Required</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={levelReq}
                    onChange={(e) => setLevelReq(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Compensation & Equity</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Description & Mission</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will this party member accomplish?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPostJobModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs shadow-md"
                >
                  Publish Job Quest (+300 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLY MODAL */}
      {selectedJobForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#0e1022] border-2 border-emerald-500/80 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-5 border-b border-emerald-500/40 flex items-center justify-between">
              <div>
                <h3 className="font-pixel text-sm text-emerald-300">Embark on Quest</h3>
                <div className="text-xs text-slate-400 font-mono">
                  Applying for {selectedJobForApply.title} @ {selectedJobForApply.ventureName}
                </div>
              </div>
              <button
                onClick={() => setSelectedJobForApply(null)}
                className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendApplication} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Portfolio or GitHub URL</label>
                <input
                  type="url"
                  required
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Cover Mission Statement</label>
                <textarea
                  rows={3}
                  required
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300">
                ✦ AI Match Engine calculated 94% synergy between your skill tree and this venture quest.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJobForApply(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs shadow-md"
                >
                  Dispatch Application (+250 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
