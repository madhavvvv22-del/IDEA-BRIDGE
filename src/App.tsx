import React, { useState, useEffect } from 'react';
import { storageService } from './services/storageService';
import { sound } from './services/soundEngine';
import {
  GameCharacter,
  UserRole,
  Venture,
  JobQuest,
  JobApplication,
  CustomerProblem,
  SolutionProposal,
  MentorshipSession,
  InvestorIntroRequest,
  LeaderboardEntry,
  AchievementBadge,
  Quest,
} from './types';

// Layout Components
import { GameNavbar } from './components/layout/GameNavbar';
import { WorldMap } from './components/layout/WorldMap';

// Gamification Components
import { HeroCharacterCard } from './components/gamification/HeroCharacterCard';
import { QuestBoard } from './components/gamification/QuestBoard';
import { MiniGamesArena } from './components/gamification/MiniGamesArena';
import { LeaderboardView } from './components/gamification/LeaderboardView';

// Core Flow Components
import { GrowthLoopVisualizer } from './components/growthLoop/GrowthLoopVisualizer';
import { CustomerProblemHub } from './components/problemHub/CustomerProblemHub';
import { FairDiscoverySanctum } from './components/fairDiscovery/FairDiscoverySanctum';
import { TalentTavern } from './components/dashboards/TalentTavern';
import { MentorshipHaven } from './components/dashboards/MentorshipHaven';
import { RoleSanctuary } from './components/dashboards/RoleSanctuary';
import { AIVentureAssistant } from './components/ai/AIVentureAssistant';

export function App() {
  // Global State
  const [character, setCharacter] = useState<GameCharacter>(storageService.getCharacter());
  const [badges, setBadges] = useState<AchievementBadge[]>(storageService.getBadges());
  const [quests, setQuests] = useState<Quest[]>(storageService.getQuests());
  const [ventures, setVentures] = useState<Venture[]>(storageService.getVentures());
  const [jobs, setJobs] = useState<JobQuest[]>(storageService.getJobs());
  const [applications, setApplications] = useState<JobApplication[]>(storageService.getApplications());
  const [problems, setProblems] = useState<CustomerProblem[]>(storageService.getProblems());
  const [mentorships, setMentorships] = useState<MentorshipSession[]>(storageService.getMentorships());
  const [intros, setIntros] = useState<InvestorIntroRequest[]>(storageService.getIntroRequests());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(storageService.getLeaderboard());

  // UI State
  const [activeTab, setActiveTab] = useState<string>('worldmap');
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [showCharacterSheet, setShowCharacterSheet] = useState<boolean>(false);
  const [showQuests, setShowQuests] = useState<boolean>(false);
  const [showAIStudioModal, setShowAIStudioModal] = useState<boolean>(false);

  // Sync state helper
  const syncAll = () => {
    setCharacter(storageService.getCharacter());
    setBadges(storageService.getBadges());
    setQuests(storageService.getQuests());
    setVentures(storageService.getVentures());
    setJobs(storageService.getJobs());
    setApplications(storageService.getApplications());
    setProblems(storageService.getProblems());
    setMentorships(storageService.getMentorships());
    setIntros(storageService.getIntroRequests());
    setLeaderboard(storageService.getLeaderboard());
  };

  // Role switching
  const handleRoleChange = (role: UserRole) => {
    const updated = storageService.setRole(role);
    setCharacter(updated);
  };

  // Rewards handler
  const handleRewardWon = (xp: number, gold: number, mana: number) => {
    const { character: updated, leveledUp } = storageService.awardRewards(xp, gold, mana);
    setCharacter(updated);
    setLeaderboard(storageService.getLeaderboard());
    if (leveledUp) {
      sound.playLevelUp();
    }
  };

  // Growth Loop Advance
  const handleAdvanceGrowthStage = (ventureId: string, currentStage: number) => {
    if (currentStage >= 8) return;
    const nextStage = (currentStage + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    storageService.updateGrowthStage(ventureId, nextStage);
    syncAll();
  };

  // Claim Quest
  const handleClaimQuest = (questId: string) => {
    storageService.claimQuest(questId);
    syncAll();
  };

  // Problem Hub Handlers (Section 14)
  const handleAddProblem = (problemData: Partial<CustomerProblem>) => {
    storageService.addProblem(problemData);
    syncAll();
  };

  const handleVoteProblem = (problemId: string) => {
    storageService.toggleProblemVote(problemId);
    syncAll();
  };

  const handleSubmitSolution = (problemId: string, solutionData: Partial<SolutionProposal>) => {
    storageService.addSolutionProposal(problemId, solutionData);
    syncAll();
  };

  const handleConvertToVenture = (problemId: string) => {
    storageService.convertProblemToVenture(problemId);
    syncAll();
    setActiveTab('growthloop');
  };

  // Fair Discovery Handlers (Section 5)
  const handleRequestIntro = (ventureId: string, investorName: string, introMessage: string) => {
    storageService.requestInvestorIntro(ventureId, investorName, introMessage);
    syncAll();
  };

  // Jobs & Quests Handlers
  const handlePostJob = (jobData: Partial<JobQuest>) => {
    storageService.addJob(jobData);
    syncAll();
  };

  const handleApplyJob = (appData: Partial<JobApplication>) => {
    storageService.addApplication(appData);
    syncAll();
  };

  const handleUpdateAppStatus = (appId: string, status: JobApplication['status']) => {
    storageService.updateApplicationStatus(appId, status);
    syncAll();
  };

  // Mentorship Handlers
  const handleRequestMentorship = (sessionData: Partial<MentorshipSession>) => {
    storageService.requestMentorship(sessionData);
    syncAll();
  };

  // AI Studio Publish
  const handleAddVentureFromAI = (data: {
    name: string;
    tagline: string;
    description: string;
    industry: string;
    problemStatement: string;
    targetMarket: string;
    unfairAdvantage: string;
    revenueModel: string;
  }) => {
    storageService.addVenture(data);
    syncAll();
    setShowAIStudioModal(false);
    setActiveTab('growthloop');
  };

  return (
    <div className={`min-h-screen bg-[#080914] text-slate-100 flex flex-col font-sans relative ${crtEnabled ? 'crt-overlay' : ''}`}>
      {/* Top Game HUD & Navigation */}
      <GameNavbar
        character={character}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRoleChange={handleRoleChange}
        crtEnabled={crtEnabled}
        toggleCrt={() => setCrtEnabled(!crtEnabled)}
        onOpenCharacterSheet={() => setShowCharacterSheet(true)}
        onOpenQuests={() => setShowQuests(true)}
      />

      {/* Main View Port */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {activeTab === 'worldmap' && (
          <WorldMap onSelectDistrict={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'dashboard' && (
          <RoleSanctuary
            character={character}
            ventures={ventures}
            jobs={jobs}
            applications={applications}
            problems={problems}
            mentorships={mentorships}
            intros={intros}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenAIStudio={() => setShowAIStudioModal(true)}
          />
        )}

        {activeTab === 'growthloop' && (
          <GrowthLoopVisualizer
            ventures={ventures}
            onAdvanceStage={handleAdvanceGrowthStage}
            onOpenAIStudio={() => setShowAIStudioModal(true)}
          />
        )}

        {activeTab === 'problems' && (
          <CustomerProblemHub
            problems={problems}
            onAddProblem={handleAddProblem}
            onVoteProblem={handleVoteProblem}
            onSubmitSolution={handleSubmitSolution}
            onConvertToVenture={handleConvertToVenture}
          />
        )}

        {activeTab === 'investors' && (
          <FairDiscoverySanctum
            ventures={ventures}
            onRequestIntro={handleRequestIntro}
            intros={intros}
          />
        )}

        {activeTab === 'jobs' && (
          <TalentTavern
            jobs={jobs}
            applications={applications}
            onPostJob={handlePostJob}
            onApplyJob={handleApplyJob}
            onUpdateAppStatus={handleUpdateAppStatus}
            currentRole={character.role}
          />
        )}

        {activeTab === 'mentors' && (
          <MentorshipHaven
            sessions={mentorships}
            ventures={ventures}
            onRequestSession={handleRequestMentorship}
          />
        )}

        {activeTab === 'minigames' && (
          <MiniGamesArena onRewardWon={handleRewardWon} />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView entries={leaderboard} currentUserId={character.id} />
        )}
      </main>

      {/* Global Modals */}
      {showCharacterSheet && (
        <HeroCharacterCard
          character={character}
          badges={badges}
          onClose={() => setShowCharacterSheet(false)}
        />
      )}

      {showQuests && (
        <QuestBoard
          quests={quests}
          onClaimQuest={handleClaimQuest}
          onClose={() => setShowQuests(false)}
        />
      )}

      {showAIStudioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#0e1022] border-2 border-purple-500 rounded-2xl shadow-2xl p-6 relative my-8">
            <button
              onClick={() => setShowAIStudioModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
            >
              ✕
            </button>
            <AIVentureAssistant
              mana={character.mana}
              onAddVentureFromAI={handleAddVentureFromAI}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#06070d] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            IDEA BRIDGE // Hackathon Track 2: Entrepreneurship & Employment
          </div>
          <div className="flex items-center gap-3">
            <span>Retro-Arcade Engine</span>
            <span>•</span>
            <span>Web Audio 8-Bit Synth</span>
            <span>•</span>
            <span>Fair Discovery 70/20/10</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
