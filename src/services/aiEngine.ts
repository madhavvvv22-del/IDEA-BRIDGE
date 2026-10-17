export interface LeanCanvasResult {
  problem: string[];
  customerSegments: string[];
  uniqueValueProp: string;
  solution: string[];
  channels: string[];
  revenueStreams: string[];
  costStructure: string[];
  keyMetrics: string[];
  unfairAdvantage: string;
}

export interface MVPRoadmapPhase {
  phase: string;
  duration: string;
  deliverables: string[];
  keyAssumptionsToTest: string[];
}

export interface SkillGapAnalysis {
  currentTier: string;
  targetRole: string;
  readinessScore: number; // 0 - 100
  strongSkills: string[];
  missingSkills: string[];
  recommendedQuests: {
    questTitle: string;
    description: string;
    xpReward: number;
    recommendedMentorType: string;
  }[];
}

class AIEngine {
  /**
   * Generates a complete Lean Canvas and MVP plan from a raw founder idea
   */
  public generateLeanCanvas(ideaTitle: string, rawIdea: string, industry: string): LeanCanvasResult {
    return {
      problem: [
        `High workflow friction and fragmented tools in ${industry}`,
        `Manual validation takes weeks, leading to 80% MVP build waste`,
        `Lack of verified real-time feedback loops with actual end users`
      ],
      customerSegments: [
        `Early adopters seeking automated workflows in ${industry}`,
        `Fast-growing startups needing quick iteration loops`,
        `Independent operators and digital-first organizations`
      ],
      uniqueValueProp: `The first intelligent, gamified platform for ${ideaTitle} that turns speculative concepts into verified market outcomes 10x faster.`,
      solution: [
        `Automated assumption stress-testing engine`,
        `Peer collaboration & tokenized bounty system`,
        `Direct customer feedback hub linked to iterative prototypes`
      ],
      channels: [
        `Product Hunt & Hacker News launch campaigns`,
        `Community ambassador quests & referral bounties`,
        `Targeted B2B outreach and industry guild sponsorships`
      ],
      revenueStreams: [
        `Freemium core with Pro Tier ($29/mo) for advanced AI workflows`,
        `3% platform success fee on completed venture funding intros`,
        `Enterprise innovation challenge licenses ($499/mo)`
      ],
      costStructure: [
        `Cloud compute & AI model inference API costs`,
        `Community manager bounties & mentor honorariums`,
        `Compliance, security auditing, and continuous hosting`
      ],
      keyMetrics: [
        `Weekly Active Builders (WAB)`,
        `Idea-to-Prototype Velocity (target: < 14 days)`,
        `Customer Problem Resolution Rate (> 65%)`
      ],
      unfairAdvantage: `Proprietary Growth Loop algorithm that automatically aligns customer demand signals directly with developer talent pools.`
    };
  }

  /**
   * Generates MVP Roadmap
   */
  public generateMVPRoadmap(ideaTitle: string): MVPRoadmapPhase[] {
    return [
      {
        phase: 'Sprint 1: The Smoke Test & Customer Discovery',
        duration: 'Days 1 - 7',
        deliverables: [
          'Interactive landing page with early access waitlist',
          '3 Customer Problem Hub friction interviews conducted',
          'Core value proposition message validation'
        ],
        keyAssumptionsToTest: [
          'Will users register before the full engine is built?',
          'Is the target customer willing to share granular pain points?'
        ]
      },
      {
        phase: 'Sprint 2: The Core Prototype & Alpha Guild',
        duration: 'Days 8 - 21',
        deliverables: [
          'Working prototype covering the primary user journey',
          'Onboard 5 alpha testers from the Idea Bridge community',
          'Implement basic telemetry and feedback capture'
        ],
        keyAssumptionsToTest: [
          'Does the solution actually alleviate the friction stated in Sprint 1?',
          'Will users complete the flow without live hand-holding?'
        ]
      },
      {
        phase: 'Sprint 3: The Public Beta & Growth Loop Ignition',
        duration: 'Days 22 - 35',
        deliverables: [
          'Self-serve onboarding with gamified XP rewards',
          'Launch recruitment bounty for 1 key missing role',
          'Publish venture deck to Fair Investor Discovery Sanctum'
        ],
        keyAssumptionsToTest: [
          'Organic viral coefficient (K-factor > 0.3)',
          'Investor interest score in the rotation feed'
        ]
      }
    ];
  }

  /**
   * Generates Pitch Deck Script
   */
  public generatePitchScript(ventureName: string, industry: string, targetFunding: number): string {
    return `[SLIDE 1 - THE HOOK] "Good afternoon. We are ${ventureName}, and we are revolutionizing ${industry}. Every year, billions of dollars are wasted building products that nobody asked for. We built ${ventureName} to solve this at the root."

[SLIDE 2 - THE PROBLEM] "Customers currently suffer from fragmented solutions, prohibitive manual overhead, and disconnected ecosystems. They are crying out for a unified answer."

[SLIDE 3 - OUR SOLUTION] "${ventureName} closes this gap. By utilizing a continuous Growth Loop and real-time community validation, we transform rough hypotheses into defensible ventures in days, not months."

[SLIDE 4 - TRACTION & THE ASK] "With our initial alpha cohorts showing 78% retention and our community quest engagement doubling weekly, we are opening a $${targetFunding.toLocaleString()} seed round to scale engineering and dominate distribution. Join our quest to build the future of ${industry}!"`;
  }

  /**
   * Analyzes Job Seeker skill gaps against target roles
   */
  public analyzeSkillGaps(userSkills: string[], targetRole: string): SkillGapAnalysis {
    const requiredSkillsMap: Record<string, string[]> = {
      'Senior Fullstack Paladin': ['React 19', 'TypeScript', 'Node.js', 'System Design', 'PostgreSQL', 'GraphQL', 'Docker'],
      'AI / ML Alchemist': ['Python', 'PyTorch', 'RAG Architecture', 'Vector DBs', 'LLM Fine-Tuning', 'FastAPI'],
      'UI/UX Guildmaster': ['Figma Mastery', 'Design Systems', 'Micro-Interactions', 'User Testing', 'Tailwind CSS'],
      'Growth & Venture Hustler': ['B2B Sales', 'Go-To-Market', 'Product Analytics', 'Viral Loops', 'Investor Pitching']
    };

    const targetList = requiredSkillsMap[targetRole] || ['React', 'TypeScript', 'API Integration', 'Testing'];
    const strong = userSkills.filter(s => targetList.some(r => r.toLowerCase().includes(s.toLowerCase())));
    const missing = targetList.filter(r => !userSkills.some(s => s.toLowerCase().includes(r.toLowerCase())));
    
    const readiness = Math.round((strong.length / targetList.length) * 100);

    return {
      currentTier: readiness > 80 ? 'Elite Ready' : readiness > 50 ? 'Adept Challenger' : 'Apprentice Builder',
      targetRole,
      readinessScore: readiness,
      strongSkills: strong.length > 0 ? strong : ['Foundational Problem Solving'],
      missingSkills: missing.length > 0 ? missing : ['Advanced Performance Profiling'],
      recommendedQuests: missing.slice(0, 3).map((skill, i) => ({
        questTitle: `Mastery Bounty: ${skill}`,
        description: `Build and showcase a verified mini-artifact utilizing ${skill} to claim reputation badge.`,
        xpReward: 350 + i * 100,
        recommendedMentorType: `Senior Archmage in ${targetRole}`
      }))
    };
  }

  /**
   * AI Opportunity Matcher
   */
  public calculateMatchExplanation(
    seekerSkills: string[],
    jobSkills: string[],
    rolePreference: string
  ): { matchPercentage: number; reasons: string[] } {
    let hits = 0;
    const reasons: string[] = [];

    jobSkills.forEach(req => {
      if (seekerSkills.some(s => s.toLowerCase() === req.toLowerCase())) {
        hits++;
        reasons.push(`Direct skill synergy: "${req}" matches your verified portfolio tier.`);
      }
    });

    const basePct = Math.min(98, Math.max(45, Math.round((hits / Math.max(1, jobSkills.length)) * 100)));

    if (reasons.length === 0) {
      reasons.push('High foundational capability with opportunity to level up in complementary domain.');
    }
    reasons.push('Venture culture and team tempo closely align with your quest history.');

    return {
      matchPercentage: basePct,
      reasons
    };
  }
}

export const aiEngine = new AIEngine();
