import React, { useState, useEffect } from 'react';
import { sound } from '../../services/soundEngine';
import {
  Gamepad2,
  Flame,
  Shield,
  Zap,
  Sword,
  Trophy,
  Coins,
  Sparkles,
  RotateCcw,
  Play,
  CheckCircle2,
} from 'lucide-react';

interface MiniGamesArenaProps {
  onRewardWon: (xp: number, gold: number, mana: number) => void;
}

export const MiniGamesArena: React.FC<MiniGamesArenaProps> = ({ onRewardWon }) => {
  const [selectedGame, setSelectedGame] = useState<'pitch' | 'squad'>('pitch');

  // Mini-Game 1: Dragon Pitch Simulator State
  const [pitchState, setPitchState] = useState<'ready' | 'playing' | 'won' | 'lost'>('ready');
  const [pitchStep, setPitchStep] = useState<number>(0);
  const [dragonScore, setDragonScore] = useState<number>(50);
  const [dragonFeedback, setDragonFeedback] = useState<string>('');

  const pitchQuestions = [
    {
      investor: 'Lady Vespera (The Traction Hawk)',
      avatar: '🦅',
      dialogue: 'Every founder claims to be an AI revolution. What is your verified organic retention after 30 days?',
      choices: [
        {
          text: 'Cite 78% Day-30 retention from our 15 pilot clinical customers.',
          effect: +25,
          feedback: 'Impressive. Real pilot usage speaks louder than buzzwords.',
        },
        {
          text: 'We are focusing on growth right now, retention will come later.',
          effect: -30,
          feedback: 'Leaky bucket. I will not fund a sieve.',
        },
        {
          text: 'Our AI model has 98% accuracy benchmarked on GitHub.',
          effect: +5,
          feedback: 'Good tech, but customers pay for outcomes, not benchmarks.',
        },
      ],
    },
    {
      investor: 'Lord Balor (The Valuation Dragon)',
      avatar: '🐉',
      dialogue: 'You are asking for a $5M valuation on $25k MRR. How do you justify this multiple?',
      choices: [
        {
          text: 'We operate in an $18B TAM with 82% gross margins and zero churn.',
          effect: +25,
          feedback: 'A fair point. High gross margins earn rich multiples.',
        },
        {
          text: 'Other startups in YC are getting $10M valuations with no revenue!',
          effect: -25,
          feedback: 'I invest in businesses, not Silicon Valley FOMO.',
        },
        {
          text: 'Our Fair Discovery Growth Loop lowers CAC by 65%.',
          effect: +20,
          feedback: 'Smart distribution moat. That will preserve our capital.',
        },
      ],
    },
    {
      investor: 'Archon Kenneth (The Tech Cynic)',
      avatar: '🛡️',
      dialogue: 'What stops Google or Microsoft from shipping this as a minor feature next month?',
      choices: [
        {
          text: 'Our proprietary fine-tuned clinical acoustic dataset cannot be scraped.',
          effect: +30,
          feedback: 'A defensible data moat. Exactly what I wanted to hear.',
        },
        {
          text: 'We can move faster than big tech companies.',
          effect: -10,
          feedback: 'Naivety. Big tech moves fast when a billion dollars is on the table.',
        },
        {
          text: 'Our workflow is deeply embedded into regional clinic EHR schemas.',
          effect: +20,
          feedback: 'High switching costs create enterprise stickiness.',
        },
      ],
    },
  ];

  const handleStartPitch = () => {
    sound.playPowerUp();
    setPitchState('playing');
    setPitchStep(0);
    setDragonScore(50);
    setDragonFeedback('');
  };

  const handlePitchChoice = (choiceIndex: number) => {
    const q = pitchQuestions[pitchStep];
    const choice = q.choices[choiceIndex];
    const newScore = Math.min(100, Math.max(0, dragonScore + choice.effect));
    setDragonScore(newScore);
    setDragonFeedback(choice.feedback);

    if (choice.effect > 0) {
      sound.playCoin();
    } else {
      sound.playClick();
    }

    if (pitchStep + 1 < pitchQuestions.length) {
      setPitchStep(pitchStep + 1);
    } else {
      if (newScore >= 70) {
        setPitchState('won');
        sound.playLevelUp();
        onRewardWon(800, 500, 40);
      } else {
        setPitchState('lost');
        sound.playClick();
      }
    }
  };

  // Mini-Game 2: Startup Squad Builder State
  const [squadHacker, setSquadHacker] = useState<string>('Fullstack Paladin');
  const [squadHipster, setSquadHipster] = useState<string>('UI/UX Alchemist');
  const [squadHustler, setSquadHustler] = useState<string>('Viral Growth Ranger');
  const [simOutcome, setSimOutcome] = useState<string | null>(null);

  const handleSimulateSquadRaid = () => {
    sound.playPowerUp();
    const synergy = 92;
    setTimeout(() => {
      sound.playLevelUp();
      setSimOutcome(
        `🏆 RAID VICTORY! Your party defeated the "Market Churn Boss" with 92% squad synergy! You unlocked product-market fit in record time.`
      );
      onRewardWon(500, 300, 20);
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950/70 via-slate-900 to-indigo-950/70 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-pixel text-xs text-red-400">Interactive Simulation</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-900/60 text-red-300 border border-red-700/50">
                Arcade Arena
              </span>
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white">THE ARCADE ARENA</h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Sharpen your tactical startup instincts through rapid-fire interactive mini-games.
              Face the Dragon Investors or build the ultimate Hacker-Hipster-Hustler party!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedGame('pitch');
              }}
              className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition ${
                selectedGame === 'pitch'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              🐉 Dragon Pitch
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedGame('squad');
              }}
              className={`px-3 py-2 rounded-xl font-mono text-xs font-bold transition ${
                selectedGame === 'squad'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ⚔️ Squad Draft
            </button>
          </div>
        </div>
      </div>

      {/* GAME 1: DRAGON PITCH ARENA */}
      {selectedGame === 'pitch' && (
        <div className="bg-[#0e1022] border-2 border-red-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-pixel text-sm text-red-300">30-SECOND DRAGON PITCH</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Survive 3 tough partner questions to secure a $500k term sheet!
              </p>
            </div>

            {pitchState === 'playing' && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Investor Sentiment:</span>
                <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className={`h-full transition-all duration-300 ${
                      dragonScore >= 70
                        ? 'bg-emerald-400'
                        : dragonScore >= 45
                        ? 'bg-amber-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${dragonScore}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-bold text-white">{dragonScore}%</span>
              </div>
            )}
          </div>

          {pitchState === 'ready' && (
            <div className="text-center py-10 space-y-4">
              <div className="text-5xl animate-bounce">🐉</div>
              <h4 className="font-pixel text-base text-slate-100">Step Into the Dragon's Sanctum</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Three veteran venture partners are listening to your seed pitch. Choose your responses
                carefully to prove your defensibility and claim the term sheet.
              </p>
              <button
                onClick={handleStartPitch}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-pixel text-xs shadow-lg shadow-red-600/30 transition transform hover:scale-105"
              >
                START DRAGON PITCH
              </button>
            </div>
          )}

          {pitchState === 'playing' && (
            <div className="space-y-6">
              {/* Dragon Dialogue Box */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex items-start gap-4">
                <div className="text-3xl p-2 rounded-lg bg-slate-900 border border-slate-700">
                  {pitchQuestions[pitchStep].avatar}
                </div>
                <div>
                  <div className="font-mono text-xs text-red-400 uppercase font-bold">
                    Question {pitchStep + 1} of 3 • {pitchQuestions[pitchStep].investor}
                  </div>
                  <div className="text-sm text-slate-100 font-medium mt-1 leading-relaxed">
                    "{pitchQuestions[pitchStep].dialogue}"
                  </div>
                  {dragonFeedback && (
                    <div className="text-xs text-amber-300 font-mono mt-2 italic bg-slate-900/60 p-2 rounded border border-slate-800">
                      Partner Reaction: "{dragonFeedback}"
                    </div>
                  )}
                </div>
              </div>

              {/* Choices */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-slate-400">Select Your Pitch Response:</div>
                {pitchQuestions[pitchStep].choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePitchChoice(idx)}
                    className="w-full text-left p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-red-400 text-xs text-slate-200 hover:text-white transition shadow-sm flex items-center justify-between group"
                  >
                    <span>{choice.text}</span>
                    <Sword className="w-4 h-4 text-slate-600 group-hover:text-red-400 transform group-hover:translate-x-1 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {pitchState === 'won' && (
            <div className="text-center py-8 space-y-4 bg-emerald-950/20 border border-emerald-500/40 rounded-xl p-6">
              <div className="text-5xl">🏆</div>
              <h4 className="font-pixel text-base text-emerald-400">TERM SHEET SECURED!</h4>
              <p className="text-xs text-slate-200 max-w-md mx-auto leading-relaxed">
                The Dragons agreed to invest $500,000 at a $5.5M post-money valuation!
              </p>
              <div className="flex justify-center items-center gap-4 text-xs font-mono py-2">
                <span className="text-cyan-300">+800 XP Awarded</span>
                <span className="text-amber-400">+$500 IB Gold</span>
                <span className="text-blue-400">+40 Idea Mana</span>
              </div>
              <button
                onClick={handleStartPitch}
                className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-mono text-xs font-bold shadow-md"
              >
                Pitch Again
              </button>
            </div>
          )}

          {pitchState === 'lost' && (
            <div className="text-center py-8 space-y-4 bg-red-950/20 border border-red-500/40 rounded-xl p-6">
              <div className="text-5xl">💀</div>
              <h4 className="font-pixel text-base text-red-400">PITCH PASSED BY DRAGONS</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Sentiment fell below 70%. Consult the Sages Haven to polish your assumptions and try again!
              </p>
              <button
                onClick={handleStartPitch}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold"
              >
                Retry Pitch Challenge
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: STARTUP SQUAD DRAFT */}
      {selectedGame === 'squad' && (
        <div className="bg-[#0e1022] border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-pixel text-sm text-cyan-300">STARTUP SQUAD DRAFT (PARTY BUILDER)</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Assemble the holy trinity of startup roles: The Hacker, The Hipster, and The Hustler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hacker */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💻</span>
                <div>
                  <div className="font-bold text-xs text-slate-200">The Hacker (Tech)</div>
                  <div className="text-[10px] text-cyan-400 font-mono">Engine & Code Base</div>
                </div>
              </div>
              <select
                value={squadHacker}
                onChange={(e) => setSquadHacker(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
              >
                <option value="Fullstack Paladin">Fullstack Paladin (React/Node)</option>
                <option value="AI Neural Alchemist">AI Neural Alchemist (PyTorch/LLM)</option>
                <option value="DevOps Sentinel">DevOps Sentinel (Kubernetes/Cloud)</option>
              </select>
            </div>

            {/* Hipster */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎨</span>
                <div>
                  <div className="font-bold text-xs text-slate-200">The Hipster (Design)</div>
                  <div className="text-[10px] text-pink-400 font-mono">UI/UX & Brand Aura</div>
                </div>
              </div>
              <select
                value={squadHipster}
                onChange={(e) => setSquadHipster(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
              >
                <option value="UI/UX Alchemist">UI/UX Alchemist (Figma/Design Systems)</option>
                <option value="Product Visionary">Product Visionary (Wireframes/Roadmap)</option>
                <option value="Micro-Interaction Wizard">Micro-Interaction Wizard (Animations)</option>
              </select>
            </div>

            {/* Hustler */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <div className="font-bold text-xs text-slate-200">The Hustler (Growth)</div>
                  <div className="text-[10px] text-amber-400 font-mono">Distribution & Capital</div>
                </div>
              </div>
              <select
                value={squadHustler}
                onChange={(e) => setSquadHustler(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-100"
              >
                <option value="Viral Growth Ranger">Viral Growth Ranger (Social Loops)</option>
                <option value="B2B Sales Knight">B2B Sales Knight (Enterprise Outbound)</option>
                <option value="Dragon Whisperer">Dragon Whisperer (Pitching & Funding)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase font-mono text-cyan-300">Party Synergy Multipliers:</div>
              <div className="text-xs text-slate-300 mt-1">
                +35% Sprint Velocity • +25% Investor Conversion • 0.8x Burn Rate
              </div>
            </div>

            <button
              onClick={handleSimulateSquadRaid}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition"
            >
              Simulate Market Launch Raid
            </button>
          </div>

          {simOutcome && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-xs font-mono text-emerald-300 leading-relaxed">
              {simOutcome}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
