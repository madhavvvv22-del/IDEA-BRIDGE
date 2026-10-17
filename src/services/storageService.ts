import {
  GameCharacter,
  AchievementBadge,
  Quest,
  Venture,
  JobQuest,
  JobApplication,
  CustomerProblem,
  SolutionProposal,
  MentorshipSession,
  InvestorIntroRequest,
  LeaderboardEntry,
  UserRole
} from '../types';

import {
  initialCharacter,
  initialBadges,
  initialQuests,
  initialVentures,
  initialJobs,
  initialApplications,
  initialCustomerProblems,
  initialMentorships,
  initialIntroRequests,
  initialLeaderboard
} from '../data/initialData';

const API_BASE = '/api';

class StorageService {
  private character: GameCharacter;
  private badges: AchievementBadge[];
  private quests: Quest[];
  private ventures: Venture[];
  private jobs: JobQuest[];
  private applications: JobApplication[];
  private problems: CustomerProblem[];
  private mentorships: MentorshipSession[];
  private intros: InvestorIntroRequest[];
  private leaderboard: LeaderboardEntry[];

  constructor() {
    this.character = this.loadLocal('ib_character', initialCharacter);
    this.badges = this.loadLocal('ib_badges', initialBadges);
    this.quests = this.loadLocal('ib_quests', initialQuests);
    this.ventures = this.loadLocal('ib_ventures', initialVentures);
    this.jobs = this.loadLocal('ib_jobs', initialJobs);
    this.applications = this.loadLocal('ib_apps', initialApplications);
    this.problems = this.loadLocal('ib_problems', initialCustomerProblems);
    this.mentorships = this.loadLocal('ib_mentors', initialMentorships);
    this.intros = this.loadLocal('ib_intros', initialIntroRequests);
    this.leaderboard = this.loadLocal('ib_leaderboard', initialLeaderboard);
  }

  private loadLocal<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private saveLocal(key: string, val: unknown) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch {
        // quota safe
      }
    }
  }

  // Award rewards & level up
  public awardRewards(xpGain = 0, goldGain = 0, manaGain = 0): { character: GameCharacter; leveledUp: boolean } {
    this.character.xp += xpGain;
    this.character.gold += goldGain;
    this.character.mana = Math.min(this.character.maxMana, this.character.mana + manaGain);

    let leveledUp = false;
    while (this.character.xp >= this.character.nextLevelXp) {
      this.character.level += 1;
      this.character.nextLevelXp = Math.round(this.character.nextLevelXp * 1.35);
      this.character.maxMana += 10;
      this.character.mana = this.character.maxMana;
      this.character.reputation += 2;
      leveledUp = true;
    }

    const idx = this.leaderboard.findIndex(l => l.id === this.character.id);
    if (idx !== -1) {
      this.leaderboard[idx].level = this.character.level;
      this.leaderboard[idx].xp = this.character.xp;
      this.leaderboard[idx].gold = this.character.gold;
      this.leaderboard[idx].reputation = this.character.reputation;
      this.saveLocal('ib_leaderboard', this.leaderboard);
    }

    this.saveLocal('ib_character', this.character);
    return { character: { ...this.character }, leveledUp };
  }

  public getCharacter(): GameCharacter {
    return { ...this.character };
  }

  public setRole(role: UserRole): GameCharacter {
    this.character.role = role;
    const roleTitles: Record<UserRole, string> = {
      entrepreneur: 'Idea Alchemist',
      startup: 'Guildmaster Founder',
      jobseeker: 'Adventurer Paladin',
      recruiter: 'Headhunter Scout',
      mentor: 'High Archmage',
      investor: 'Dragon Backer',
      company: 'Corporate Titan',
      customer: 'Citizen Problem Solver',
    };
    this.character.activeClassTitle = roleTitles[role] || 'Adventurer';
    this.saveLocal('ib_character', this.character);
    return { ...this.character };
  }

  public getVentures(): Venture[] {
    return [...this.ventures];
  }

  public addVenture(ventureData: Partial<Venture>): Venture {
    const newV: Venture = {
      id: `v-${Date.now()}`,
      name: ventureData.name || 'New Venture',
      tagline: ventureData.tagline || 'Pioneering innovation on the Idea Bridge',
      description: ventureData.description || '',
      founderId: this.character.id,
      founderName: this.character.name,
      founderRole: this.character.activeClassTitle,
      industry: ventureData.industry || 'Technology',
      stage: ventureData.stage || 'Idea',
      fundingTarget: Number(ventureData.fundingTarget) || 250000,
      raisedAmount: 0,
      valuation: 1500000,
      teamSize: 1,
      openRolesCount: 1,
      exposureCategory: 'underexposed_rotation',
      exposureMetrics: {
        impressions: 1,
        profileViews: 1,
        saves: 0,
        introRequests: 0,
        lastExposureBoost: new Date().toISOString(),
      },
      isUnderexposed: true,
      growthStage: 2,
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Formulate Lean Canvas & Hypotheses', completed: true, xpReward: 250, dueDate: '2026-10-30' },
        { id: `m-${Date.now()}-2`, title: 'Deploy MVP interactive clickable prototype', completed: false, xpReward: 500, dueDate: '2026-11-20' },
      ],
      ...ventureData,
    };
    this.ventures.unshift(newV);
    this.saveLocal('ib_ventures', this.ventures);
    this.awardRewards(400, 200, 25);
    return newV;
  }

  public updateGrowthStage(ventureId: string, stage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8): Venture | null {
    const v = this.ventures.find(item => item.id === ventureId);
    if (!v) return null;
    v.growthStage = stage;
    this.saveLocal('ib_ventures', this.ventures);
    this.awardRewards(150, 75, 10);
    return { ...v };
  }

  public getJobs(): JobQuest[] {
    return [...this.jobs];
  }

  public addJob(jobData: Partial<JobQuest>): JobQuest {
    const newJob: JobQuest = {
      id: `j-${Date.now()}`,
      ventureId: jobData.ventureId || 'v-101',
      ventureName: jobData.ventureName || 'SynapseHealth AI',
      title: jobData.title || 'Tech Paladin',
      roleType: jobData.roleType || 'Engineering',
      levelRequired: Number(jobData.levelRequired) || 5,
      requiredSkills: jobData.requiredSkills || ['React', 'TypeScript'],
      salaryOrStipend: jobData.salaryOrStipend || '$90,000 - $120,000 + Equity',
      equity: jobData.equity || '1.0%',
      xpReward: 500,
      goldReward: 300,
      description: jobData.description || 'Embark on our mission-critical squad.',
      applicantsCount: 0,
      location: jobData.location || 'Remote',
      status: 'active',
      postedAt: new Date().toISOString().split('T')[0],
      ...jobData,
    };
    this.jobs.unshift(newJob);
    this.saveLocal('ib_jobs', this.jobs);
    this.awardRewards(300, 150, 10);
    return newJob;
  }

  public getApplications(): JobApplication[] {
    return [...this.applications];
  }

  public addApplication(appData: Partial<JobApplication>): JobApplication {
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId || 'j-201',
      jobTitle: appData.jobTitle || 'Senior Fullstack Paladin',
      ventureName: appData.ventureName || 'SynapseHealth AI',
      applicantId: this.character.id,
      applicantName: this.character.name,
      applicantTitle: this.character.title,
      applicantLevel: this.character.level,
      skills: appData.skills || ['React', 'TypeScript', 'Node.js'],
      portfolioUrl: appData.portfolioUrl || 'https://github.com/alex-founder',
      coverNote: appData.coverNote || 'Ready to join this startup quest!',
      matchScore: appData.matchScore || 94,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0],
      ...appData,
    };
    this.applications.unshift(newApp);
    this.saveLocal('ib_apps', this.applications);

    const j = this.jobs.find(job => job.id === appData.jobId);
    if (j) {
      j.applicantsCount += 1;
      this.saveLocal('ib_jobs', this.jobs);
    }
    this.awardRewards(250, 100, 5);
    return newApp;
  }

  public updateApplicationStatus(appId: string, status: JobApplication['status']) {
    const a = this.applications.find(item => item.id === appId);
    if (a) {
      a.status = status;
      this.saveLocal('ib_apps', this.applications);
    }
  }

  // Customer Problems & Solutions (Section 14)
  public getProblems(): CustomerProblem[] {
    return [...this.problems];
  }

  public addProblem(data: Partial<CustomerProblem>): CustomerProblem {
    const newProb: CustomerProblem = {
      id: `prob-${Date.now()}`,
      title: data.title || 'Friction Point',
      category: data.category || 'SaaS / B2B',
      context: data.context || '',
      painPoint: data.painPoint || '',
      targetAudience: data.targetAudience || 'Customers',
      existingSolutionsFailReason: data.existingSolutionsFailReason || '',
      idealSolutionDescription: data.idealSolutionDescription || '',
      budgetExpectation: data.budgetExpectation || 'Flexible',
      urgency: data.urgency || 'High',
      customerName: this.character.name,
      customerId: this.character.id,
      upvotes: 1,
      hasUserUpvoted: true,
      proposalsCount: 0,
      status: 'open_for_solutions',
      aiClusters: [data.category || 'General', 'Customer Voice', 'High Impact'],
      createdAt: new Date().toISOString().split('T')[0],
      proposals: [],
      ...data,
    };
    this.problems.unshift(newProb);
    this.saveLocal('ib_problems', this.problems);
    this.awardRewards(350, 200, 20);
    return newProb;
  }

  public toggleProblemVote(id: string): CustomerProblem | null {
    const p = this.problems.find(prob => prob.id === id);
    if (!p) return null;
    if (p.hasUserUpvoted) {
      p.upvotes -= 1;
      p.hasUserUpvoted = false;
    } else {
      p.upvotes += 1;
      p.hasUserUpvoted = true;
      this.awardRewards(50, 25, 5);
    }
    this.saveLocal('ib_problems', this.problems);
    return { ...p };
  }

  public addSolutionProposal(problemId: string, data: Partial<SolutionProposal>): SolutionProposal | null {
    const p = this.problems.find(prob => prob.id === problemId);
    if (!p) return null;

    const prop: SolutionProposal = {
      id: `prop-${Date.now()}`,
      problemId,
      proposerId: this.character.id,
      proposerName: this.character.name,
      proposerRole: this.character.activeClassTitle,
      ventureName: data.ventureName || 'Proposed Venture',
      solutionTitle: data.solutionTitle || 'Proposed Solution',
      summary: data.summary || '',
      approach: data.approach || '',
      expectedBenefits: data.expectedBenefits || '',
      prototypeUrl: data.prototypeUrl || '',
      deliveryWeeks: Number(data.deliveryWeeks) || 3,
      costEstimate: data.costEstimate || '$2,500',
      votes: 1,
      status: 'proposed',
      submittedAt: new Date().toISOString().split('T')[0],
      ...data,
    };

    p.proposals.push(prop);
    p.proposalsCount = p.proposals.length;
    this.saveLocal('ib_problems', this.problems);
    this.awardRewards(400, 250, 20);
    return prop;
  }

  public convertProblemToVenture(problemId: string, proposalId?: string): Venture | null {
    const p = this.problems.find(prob => prob.id === problemId);
    if (!p) return null;
    p.status = 'promoted_to_venture';
    this.saveLocal('ib_problems', this.problems);

    const newV = this.addVenture({
      name: `${p.title.slice(0, 30)} (Solved)`,
      tagline: p.idealSolutionDescription.slice(0, 80),
      description: `Born directly from customer problem #${p.id}: "${p.painPoint}"`,
      industry: p.category,
      stage: 'Prototype / MVP',
      fundingTarget: 250000,
    });
    return newV;
  }

  public getQuests(): Quest[] {
    return [...this.quests];
  }

  public claimQuest(id: string): { quest: Quest; rewards: { xp: number; gold: number; mana: number } } | null {
    const q = this.quests.find(item => item.id === id);
    if (!q || q.completed) return null;
    q.completed = true;
    q.progress = q.maxProgress;
    this.saveLocal('ib_quests', this.quests);
    this.awardRewards(q.xpReward, q.goldReward, q.manaReward);
    return {
      quest: { ...q },
      rewards: { xp: q.xpReward, gold: q.goldReward, mana: q.manaReward },
    };
  }

  public getBadges(): AchievementBadge[] {
    return [...this.badges];
  }

  public getMentorships(): MentorshipSession[] {
    return [...this.mentorships];
  }

  public requestMentorship(data: Partial<MentorshipSession>): MentorshipSession {
    const ms: MentorshipSession = {
      id: `ms-${Date.now()}`,
      mentorId: data.mentorId || 'm-001',
      mentorName: data.mentorName || 'Sarah Lin, General Partner @ Horizon Seed',
      menteeId: this.character.id,
      menteeName: this.character.name,
      ventureName: data.ventureName || 'SynapseHealth AI',
      topic: data.topic || 'Strategy & Funding Advisory',
      status: 'requested',
      scheduledTime: data.scheduledTime || 'Next Thursday at 2:00 PM EST',
      xpGranted: 350,
      ...data,
    };
    this.mentorships.unshift(ms);
    this.saveLocal('ib_mentors', this.mentorships);
    this.awardRewards(200, 100, 15);
    return ms;
  }

  public getIntroRequests(): InvestorIntroRequest[] {
    return [...this.intros];
  }

  public requestInvestorIntro(ventureId: string, investorName: string, introMessage: string): InvestorIntroRequest {
    const v = this.ventures.find(item => item.id === ventureId);
    const newIr: InvestorIntroRequest = {
      id: `ir-${Date.now()}`,
      investorId: `inv-${Date.now()}`,
      investorName: investorName || 'Apex Syndicate Partners',
      ventureId,
      ventureName: v?.name || 'Venture',
      founderName: this.character.name,
      status: 'pending',
      requestedAt: new Date().toISOString().split('T')[0],
      introMessage: introMessage || 'Pitch intro requested from Fair Discovery Sanctum.',
      matchScore: v?.matchScore || 92,
    };
    this.intros.unshift(newIr);
    this.saveLocal('ib_intros', this.intros);

    if (v) {
      v.exposureMetrics.introRequests += 1;
      v.exposureMetrics.saves += 1;
      this.saveLocal('ib_ventures', this.ventures);
    }

    this.awardRewards(300, 150, 15);
    return newIr;
  }

  public getLeaderboard(): LeaderboardEntry[] {
    return [...this.leaderboard].sort((a, b) => b.xp - a.xp);
  }
}

export const storageService = new StorageService();
