import React, { useState } from 'react';
import { GameCharacter, UserRole } from '../../types';
import { sound } from '../../services/soundEngine';
import {
  Sparkles,
  Coins,
  Zap,
  Volume2,
  VolumeX,
  Tv,
  Users,
  Compass,
  Trophy,
  Briefcase,
  HelpCircle,
  Gem,
  GraduationCap,
  Gamepad2,
  ChevronDown,
} from 'lucide-react';

interface GameNavbarProps {
  character: GameCharacter;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRoleChange: (role: UserRole) => void;
  crtEnabled: boolean;
  toggleCrt: () => void;
  onOpenCharacterSheet: () => void;
  onOpenQuests: () => void;
}

export const GameNavbar: React.FC<GameNavbarProps> = ({
  character,
  activeTab,
  setActiveTab,
  onRoleChange,
  crtEnabled,
  toggleCrt,
  onOpenCharacterSheet,
  onOpenQuests,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const handleSoundToggle = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const roles: { id: UserRole; label: string; icon: string; desc: string }[] = [
    { id: 'entrepreneur', label: 'Entrepreneur', icon: '🧙‍♂️', desc: 'AI Idea Studio, MVP Roadmap, Co-founder Hunt' },
    { id: 'startup', label: 'Startup Founder', icon: '🚀', desc: 'Guild Hiring, Investor Deck, Growth Loop' },
    { id: 'jobseeker', label: 'Job Seeker', icon: '⚔️', desc: 'Skill Tree, Portfolio Quests, Job Hunting' },
    { id: 'recruiter', label: 'Recruiter', icon: '🎯', desc: 'Post Job Quests, Talent Radar, Kanban Pipeline' },
    { id: 'mentor', label: 'Mentor Archmage', icon: '📜', desc: 'Wisdom Office Hours, Pitch Reviews, XP Grants' },
    { id: 'investor', label: 'Dragon Investor', icon: '💎', desc: '70/20/10 Fair Discovery, Dealflow, Intros' },
    { id: 'company', label: 'Corporate Empire', icon: '🏛️', desc: 'Innovation Bounties, Tech Scouting' },
    { id: 'customer', label: 'Citizen Customer', icon: '🧩', desc: 'Post Real Friction, Vote Solutions, Earn Bounty' },
  ];

  const currentRoleObj = roles.find((r) => r.id === character.role) || roles[0];
  const xpPercent = Math.min(100, Math.round((character.xp / character.nextLevelXp) * 100));

  const navItems = [
    { id: 'worldmap', label: 'World Map', icon: Compass },
    { id: 'dashboard', label: 'My Sanctuary', icon: Sparkles },
    { id: 'growthloop', label: 'Growth Loop', icon: Zap },
    { id: 'problems', label: 'Problem Hub', icon: HelpCircle, badge: 'Sec 14' },
    { id: 'investors', label: 'Fair Discovery', icon: Gem, badge: '70/20/10' },
    { id: 'jobs', label: 'Quest & Jobs', icon: Briefcase },
    { id: 'mentors', label: 'Sages Haven', icon: GraduationCap },
    { id: 'minigames', label: 'Arcade Arena', icon: Gamepad2, badge: 'Play' },
    { id: 'leaderboard', label: 'Hall of Fame', icon: Trophy },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f1f]/95 backdrop-blur-md border-b-2 border-game-border shadow-2xl">
      {/* Top Game HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-pixel text-sm text-white shadow-neon-pink">
            IB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-pink-400 tracking-wider">
                IDEA BRIDGE
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-950/80 text-cyan-300 border border-cyan-800/60">
                Track 2
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Where Talent Meets Opportunity // Venture Realm
            </div>
          </div>
        </div>

        {/* Player Stats HUD */}
        <div className="flex items-center gap-3 sm:gap-4 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700/60">
          {/* Avatar & Character sheet button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenCharacterSheet();
            }}
            className="flex items-center gap-2 text-left group hover:opacity-90 transition"
            title="Open Character Sheet"
          >
            <div className="w-7 h-7 rounded bg-indigo-900/80 border border-indigo-400/50 flex items-center justify-center text-sm shadow-sm group-hover:border-cyan-400">
              {currentRoleObj.icon}
            </div>
            <div>
              <div className="font-bold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1">
                <span>{character.name}</span>
                <span className="text-[10px] text-amber-400 font-mono">Lv.{character.level}</span>
              </div>
              <div className="text-[10px] text-indigo-300 font-mono">{character.title}</div>
            </div>
          </button>

          {/* XP Bar */}
          <div className="hidden md:flex flex-col w-28 gap-0.5">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span className="text-cyan-400">XP</span>
              <span>{character.xp}/{character.nextLevelXp}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Gold / $IB */}
          <div className="flex items-center gap-1 text-amber-400 font-mono font-bold" title="Venture Gold ($IB)">
            <Coins className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{character.gold.toLocaleString()} <span className="text-[9px] text-amber-500/80">$IB</span></span>
          </div>

          {/* Mana / Energy */}
          <div className="flex items-center gap-1 text-blue-400 font-mono font-bold" title="Founder Mana (AI Energy)">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>{character.mana}/{character.maxMana} <span className="text-[9px] text-blue-500/80">MP</span></span>
          </div>

          {/* Quests Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenQuests();
            }}
            className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[11px] font-mono flex items-center gap-1 transition"
          >
            <span>📜</span>
            <span className="hidden sm:inline">Quests</span>
          </button>
        </div>

        {/* Persona Role Switcher & Audio/CRT controls */}
        <div className="flex items-center gap-2">
          {/* Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                sound.playClick();
                setRoleMenuOpen(!roleMenuOpen);
              }}
              className="px-2.5 py-1.5 rounded bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-200 flex items-center gap-1.5 text-xs font-semibold shadow-sm transition"
            >
              <span>{currentRoleObj.icon}</span>
              <span className="hidden lg:inline">{currentRoleObj.label}</span>
              <ChevronDown className="w-3 h-3 text-indigo-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border-2 border-indigo-500/70 rounded-lg shadow-2xl p-2 z-50 space-y-1 backdrop-blur-xl">
                <div className="px-2 py-1 text-[11px] font-mono text-cyan-300 uppercase tracking-wider border-b border-slate-800">
                  Select Role Persona
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      sound.playPowerUp();
                      onRoleChange(r.id);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded flex items-start gap-2.5 transition text-xs ${
                      character.role === r.id
                        ? 'bg-indigo-600/30 border border-indigo-400 text-white'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <span className="text-lg">{r.icon}</span>
                    <div>
                      <div className="font-bold flex items-center gap-1">
                        {r.label}
                        {character.role === r.id && (
                          <span className="text-[10px] text-cyan-400 font-mono">[ACTIVE]</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CRT Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              toggleCrt();
            }}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-1.5 rounded border text-xs transition ${
              crtEnabled
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-neon-cyan'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? 'Unmute 8-bit Audio' : 'Mute Audio'}
            className={`p-1.5 rounded border text-xs transition ${
              !isMuted
                ? 'bg-amber-950 border-amber-400 text-amber-300 shadow-neon-gold'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Menu Bar */}
      <nav className="bg-[#0b0d1a] border-t border-slate-800 px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm border border-indigo-400/50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                      item.badge === 'Sec 14'
                        ? 'bg-pink-900/70 text-pink-300 border border-pink-700/50'
                        : item.badge === '70/20/10'
                        ? 'bg-amber-900/70 text-amber-300 border border-amber-700/50'
                        : 'bg-emerald-900/70 text-emerald-300 border border-emerald-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
