export type UserRole = 
  | 'entrepreneur' 
  | 'startup' 
  | 'jobseeker' 
  | 'recruiter' 
  | 'mentor' 
  | 'investor' 
  | 'company' 
  | 'customer';

export interface GameCharacter {
  id: string;
  name: string;
  handle: string;
  title: string; // e.g. "Lvl 14 Byte Alchemist"
  role: UserRole;
  level: number;
  xp: number;
  nextLevelXp: number;
  gold: number; // $IB credits
  mana: number; // Idea energy (0-100)
  maxMana: number;
  reputation: number; // Karma rating
  avatarSeed: string;
  stats: {
    innovation: number;
    execution: number;
    charisma: number;
    technical: number;
    strategy: number;
  };
  unlockedBadges: string[];
  activeClassTitle: string;
  passiveAbility: string;
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'mythic';
  unlocked: boolean;
  unlockedAt?: string;
  category: 'founder' | 'talent' | 'investor' | 'solver' | 'social';
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'epic' | 'growth_loop';
  targetRole: UserRole | 'all';
  xpReward: number;
  goldReward: number;
  manaReward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  actionKey: string;
}

export interface VentureMilestone {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
  dueDate: string;
}

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  description: string;
  founderId: string;
  founderName: string;
  founderRole: string;
  industry: string;
  stage: 'Idea' | 'Prototype / MVP' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Growth';
  fundingTarget: number;
  raisedAmount: number;
  valuation: number;
  teamSize: number;
  openRolesCount: number;
  pitchDeckUrl?: string;
  demoUrl?: string;
  matchScore?: number;
  matchReason?: string;
  
  // Fair Discovery & Visibility Tracking
  exposureCategory: 'personalized' | 'underexposed_rotation' | 'exploration_wildcard';
  exposureMetrics: {
    impressions: number;
    profileViews: number;
    saves: number;
    introRequests: number;
    lastExposureBoost: string;
  };
  isUnderexposed: boolean;
  
  // Growth Loop State
  growthStage: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  milestones: VentureMilestone[];
  
  // Lean canvas data
  problemStatement?: string;
  targetMarket?: string;
  unfairAdvantage?: string;
  revenueModel?: string;
}

export interface JobQuest {
  id: string;
  ventureId: string;
  ventureName: string;
  title: string;
  roleType: 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'AI / Data' | 'Operations';
  levelRequired: number;
  requiredSkills: string[];
  salaryOrStipend: string;
  equity?: string;
  xpReward: number;
  goldReward: number;
  description: string;
  applicantsCount: number;
  location: string;
  status: 'active' | 'filled' | 'closed';
  postedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  ventureName: string;
  applicantId: string;
  applicantName: string;
  applicantTitle: string;
  applicantLevel: number;
  skills: string[];
  portfolioUrl?: string;
  coverNote: string;
  matchScore: number;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface CustomerProblem {
  id: string;
  title: string;
  category: 'SaaS / B2B' | 'Fintech' | 'Healthcare' | 'Climate & Agri' | 'EdTech' | 'Consumer Tech';
  context: string;
  painPoint: string;
  targetAudience: string;
  existingSolutionsFailReason: string;
  idealSolutionDescription: string;
  budgetExpectation?: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  customerName: string;
  customerId: string;
  upvotes: number;
  hasUserUpvoted?: boolean;
  proposalsCount: number;
  status: 'open_for_solutions' | 'collaborating' | 'promoted_to_venture' | 'solved';
  proposals: SolutionProposal[];
  aiClusters?: string[];
  createdAt: string;
}

export interface SolutionProposal {
  id: string;
  problemId: string;
  proposerId: string;
  proposerName: string;
  proposerRole: string;
  ventureName?: string;
  solutionTitle: string;
  summary: string;
  approach: string;
  expectedBenefits: string;
  prototypeUrl?: string;
  deliveryWeeks: number;
  costEstimate: string;
  votes: number;
  status: 'proposed' | 'shortlisted' | 'testing' | 'adopted';
  submittedAt: string;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  menteeId: string;
  menteeName: string;
  ventureName: string;
  topic: string;
  status: 'requested' | 'scheduled' | 'completed' | 'cancelled';
  scheduledTime: string;
  feedbackNotes?: string;
  xpGranted: number;
}

export interface InvestorIntroRequest {
  id: string;
  investorId: string;
  investorName: string;
  ventureId: string;
  ventureName: string;
  founderName: string;
  status: 'pending' | 'accepted' | 'deck_reviewed' | 'call_scheduled' | 'passed';
  requestedAt: string;
  introMessage: string;
  matchScore: number;
}

export interface InnovationChallenge {
  id: string;
  companyName: string;
  title: string;
  domain: string;
  bountyReward: string;
  description: string;
  partnerPerks: string[];
  deadline: string;
  proposalsReceived: number;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  role: UserRole;
  title: string;
  level: number;
  xp: number;
  gold: number;
  reputation: number;
  badgeCount: number;
  ventureName?: string;
}
