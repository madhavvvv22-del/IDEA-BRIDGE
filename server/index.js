import express from 'express';
import cors from 'cors';
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
  initialLeaderboard,
} from './seedData.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// In-Memory Database
let character = { ...initialCharacter };
let badges = [...initialBadges];
let quests = [...initialQuests];
let ventures = [...initialVentures];
let jobs = [...initialJobs];
let applications = [...initialApplications];
let problems = [...initialCustomerProblems];
let mentorships = [...initialMentorships];
let introRequests = [...initialIntroRequests];
let leaderboard = [...initialLeaderboard];

// Helper: Award XP, Gold, Mana and Check Level Up
function awardRewards(xpGain = 0, goldGain = 0, manaGain = 0) {
  character.xp += xpGain;
  character.gold += goldGain;
  character.mana = Math.min(character.maxMana, character.mana + manaGain);

  let leveledUp = false;
  while (character.xp >= character.nextLevelXp) {
    character.level += 1;
    character.nextLevelXp = Math.round(character.nextLevelXp * 1.35);
    character.maxMana += 10;
    character.mana = character.maxMana;
    character.reputation += 2;
    leveledUp = true;
  }

  // Update in leaderboard
  const lbIndex = leaderboard.findIndex((l) => l.id === character.id);
  if (lbIndex !== -1) {
    leaderboard[lbIndex].level = character.level;
    leaderboard[lbIndex].xp = character.xp;
    leaderboard[lbIndex].gold = character.gold;
    leaderboard[lbIndex].reputation = character.reputation;
  }

  return { character, leveledUp };
}

// 1. CHARACTER & HUD ROUTES
app.get('/api/character', (req, res) => {
  res.json({ character, badges, quests });
});

app.post('/api/character/role', (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ error: 'Role required' });
  character.role = role;
  
  const roleTitles = {
    entrepreneur: 'Idea Alchemist',
    startup: 'Guildmaster Founder',
    jobseeker: 'Adventurer Paladin',
    recruiter: 'Headhunter Scout',
    mentor: 'High Archmage',
    investor: 'Dragon Backer',
    company: 'Corporate Titan',
    customer: 'Citizen Problem Solver',
  };
  character.activeClassTitle = roleTitles[role] || 'Adventurer';
  res.json({ character });
});

app.post('/api/character/reward', (req, res) => {
  const { xp = 0, gold = 0, mana = 0 } = req.body;
  const result = awardRewards(xp, gold, mana);
  res.json(result);
});

// 2. VENTURES & GROWTH LOOP
app.get('/api/ventures', (req, res) => {
  res.json(ventures);
});

app.post('/api/ventures', (req, res) => {
  const newVenture = {
    id: `v-${Date.now()}`,
    name: req.body.name,
    tagline: req.body.tagline || 'New innovation created in the Idea Forge',
    description: req.body.description || '',
    founderId: character.id,
    founderName: character.name,
    founderRole: character.activeClassTitle,
    industry: req.body.industry || 'Technology',
    stage: req.body.stage || 'Idea',
    fundingTarget: Number(req.body.fundingTarget) || 250000,
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
    ...req.body,
  };
  ventures.unshift(newVenture);
  awardRewards(400, 200, 25);
  res.status(201).json(newVenture);
});

app.patch('/api/ventures/:id/growth', (req, res) => {
  const { id } = req.params;
  const { growthStage } = req.body;
  const venture = ventures.find((v) => v.id === id);
  if (!venture) return res.status(404).json({ error: 'Venture not found' });

  venture.growthStage = growthStage;
  awardRewards(150, 75, 10);
  res.json(venture);
});

app.post('/api/ventures/:id/view', (req, res) => {
  const { id } = req.params;
  const venture = ventures.find((v) => v.id === id);
  if (venture) {
    venture.exposureMetrics.profileViews += 1;
    venture.exposureMetrics.impressions += 1;
  }
  res.json({ success: true, venture });
});

// 3. JOB QUESTS & APPLICATIONS
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: `j-${Date.now()}`,
    ventureId: req.body.ventureId || 'v-101',
    ventureName: req.body.ventureName || 'SynapseHealth AI',
    title: req.body.title,
    roleType: req.body.roleType || 'Engineering',
    levelRequired: Number(req.body.levelRequired) || 5,
    requiredSkills: req.body.requiredSkills || ['React', 'TypeScript'],
    salaryOrStipend: req.body.salaryOrStipend || '$80,000 - $110,000 + Equity',
    equity: req.body.equity || '1.0%',
    xpReward: 500,
    goldReward: 300,
    description: req.body.description || 'Join our squad to conquer uncharted technical frontiers.',
    applicantsCount: 0,
    location: req.body.location || 'Remote',
    status: 'active',
    postedAt: new Date().toISOString().split('T')[0],
  };
  jobs.unshift(newJob);
  awardRewards(300, 150, 10);
  res.status(201).json(newJob);
});

app.get('/api/applications', (req, res) => {
  res.json(applications);
});

app.post('/api/applications', (req, res) => {
  const newApp = {
    id: `app-${Date.now()}`,
    jobId: req.body.jobId,
    jobTitle: req.body.jobTitle,
    ventureName: req.body.ventureName,
    applicantId: character.id,
    applicantName: character.name,
    applicantTitle: character.title,
    applicantLevel: character.level,
    skills: req.body.skills || ['React', 'TypeScript', 'Node.js'],
    portfolioUrl: req.body.portfolioUrl || 'https://github.com/alex-founder',
    coverNote: req.body.coverNote || 'Ready to embark on this venture raid!',
    matchScore: req.body.matchScore || 92,
    status: 'pending',
    appliedAt: new Date().toISOString().split('T')[0],
  };
  applications.unshift(newApp);

  const targetJob = jobs.find((j) => j.id === req.body.jobId);
  if (targetJob) targetJob.applicantsCount += 1;

  awardRewards(250, 100, 5);
  res.status(201).json(newApp);
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const appItem = applications.find((a) => a.id === id);
  if (!appItem) return res.status(404).json({ error: 'Application not found' });
  appItem.status = status;
  res.json(appItem);
});

// 4. CUSTOMER PROBLEM HUB & SOLUTIONS (Section 14)
app.get('/api/problems', (req, res) => {
  res.json(problems);
});

app.post('/api/problems', (req, res) => {
  const newProblem = {
    id: `prob-${Date.now()}`,
    title: req.body.title,
    category: req.body.category || 'SaaS / B2B',
    context: req.body.context || '',
    painPoint: req.body.painPoint,
    targetAudience: req.body.targetAudience,
    existingSolutionsFailReason: req.body.existingSolutionsFailReason,
    idealSolutionDescription: req.body.idealSolutionDescription,
    budgetExpectation: req.body.budgetExpectation || 'Flexible',
    urgency: req.body.urgency || 'High',
    customerName: character.name,
    customerId: character.id,
    upvotes: 1,
    hasUserUpvoted: true,
    proposalsCount: 0,
    status: 'open_for_solutions',
    aiClusters: [req.body.category || 'Tech', 'Customer Need', 'Validated Problem'],
    createdAt: new Date().toISOString().split('T')[0],
    proposals: [],
  };
  problems.unshift(newProblem);
  awardRewards(350, 200, 20);
  res.status(201).json(newProblem);
});

app.post('/api/problems/:id/vote', (req, res) => {
  const { id } = req.params;
  const prob = problems.find((p) => p.id === id);
  if (!prob) return res.status(404).json({ error: 'Problem not found' });
  
  if (prob.hasUserUpvoted) {
    prob.upvotes -= 1;
    prob.hasUserUpvoted = false;
  } else {
    prob.upvotes += 1;
    prob.hasUserUpvoted = true;
    awardRewards(50, 25, 5);
  }
  res.json(prob);
});

app.post('/api/problems/:id/proposals', (req, res) => {
  const { id } = req.params;
  const prob = problems.find((p) => p.id === id);
  if (!prob) return res.status(404).json({ error: 'Problem not found' });

  const newProposal = {
    id: `prop-${Date.now()}`,
    problemId: id,
    proposerId: character.id,
    proposerName: character.name,
    proposerRole: character.activeClassTitle,
    ventureName: req.body.ventureName || 'Independent Solution',
    solutionTitle: req.body.solutionTitle,
    summary: req.body.summary,
    approach: req.body.approach,
    expectedBenefits: req.body.expectedBenefits,
    prototypeUrl: req.body.prototypeUrl || '',
    deliveryWeeks: Number(req.body.deliveryWeeks) || 3,
    costEstimate: req.body.costEstimate || '$2,500',
    votes: 1,
    status: 'proposed',
    submittedAt: new Date().toISOString().split('T')[0],
  };

  prob.proposals.push(newProposal);
  prob.proposalsCount = prob.proposals.length;
  awardRewards(400, 250, 20);
  res.status(201).json({ problem: prob, proposal: newProposal });
});

// 5. QUESTS & BOUNTIES
app.get('/api/quests', (req, res) => {
  res.json(quests);
});

app.post('/api/quests/:id/claim', (req, res) => {
  const { id } = req.params;
  const quest = quests.find((q) => q.id === id);
  if (!quest) return res.status(404).json({ error: 'Quest not found' });
  if (quest.completed) {
    return res.status(400).json({ error: 'Quest already claimed' });
  }

  quest.completed = true;
  quest.progress = quest.maxProgress;
  const result = awardRewards(quest.xpReward, quest.goldReward, quest.manaReward);
  res.json({ quest, ...result });
});

// 6. MENTORSHIP & INVESTOR INTROS
app.get('/api/mentorships', (req, res) => {
  res.json(mentorships);
});

app.post('/api/mentorships', (req, res) => {
  const session = {
    id: `ms-${Date.now()}`,
    mentorId: req.body.mentorId || 'm-001',
    mentorName: req.body.mentorName || 'Sarah Lin, General Partner @ Horizon Seed',
    menteeId: character.id,
    menteeName: character.name,
    ventureName: req.body.ventureName || 'SynapseHealth AI',
    topic: req.body.topic || 'Strategy Review',
    status: 'requested',
    scheduledTime: req.body.scheduledTime || 'Next Monday at 4:00 PM EST',
    xpGranted: 350,
  };
  mentorships.unshift(session);
  awardRewards(200, 100, 15);
  res.status(201).json(session);
});

app.get('/api/intros', (req, res) => {
  res.json(introRequests);
});

app.post('/api/intros', (req, res) => {
  const newIntro = {
    id: `ir-${Date.now()}`,
    investorId: req.body.investorId || 'inv-001',
    investorName: req.body.investorName || 'Atlas Alpha Ventures',
    ventureId: req.body.ventureId,
    ventureName: req.body.ventureName,
    founderName: character.name,
    status: 'pending',
    requestedAt: new Date().toISOString().split('T')[0],
    introMessage: req.body.introMessage || 'Pitch request submitted via Fair Discovery Sanctum.',
    matchScore: req.body.matchScore || 90,
  };
  introRequests.unshift(newIntro);

  // Increment exposure saves/requests
  const venture = ventures.find((v) => v.id === req.body.ventureId);
  if (venture) {
    venture.exposureMetrics.introRequests += 1;
    venture.exposureMetrics.saves += 1;
  }

  awardRewards(300, 150, 15);
  res.status(201).json(newIntro);
});

// 7. LEADERBOARD & BADGES
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.sort((a, b) => b.xp - a.xp));
});

app.get('/api/badges', (req, res) => {
  res.json(badges);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Idea Bridge Game Engine API', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`🎮 Idea Bridge Venture Realm API running on http://localhost:${PORT}`);
});
