import React, { useState } from 'react';
import { ModuleId } from '../types/chemistry';
import { Sparkles, Calculator, BookOpen, Search, Menu, X, Award, Zap, Atom } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | ModuleId | 'cross-rule' | 'nomenclature' | 'redox-trainer' | 'ai-lector' | 'quiz' | 'periodic-table';
  onNavigate: (view: any) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Přehled', icon: null },
    { id: 'general-inorganic', label: '1. Obecná & Anorganika', icon: '⚛️' },
    { id: 'calculations-redox', label: '2. Výpočty & Redox', icon: '🧮' },
    { id: 'organic', label: '3. Organika', icon: '🧪' },
    { id: 'biochemistry', label: '4. Biochemie', icon: '🧬' },
  ];

  const tools = [
    { id: 'cross-rule', label: 'Křížové pravidlo', icon: Calculator },
    { id: 'nomenclature', label: 'Názvosloví', icon: BookOpen },
    { id: 'redox-trainer', label: 'Vyčíslování', icon: Zap },
    { id: 'periodic-table', label: 'Tabulka', icon: Atom },
    { id: 'quiz', label: 'Maturitní testy', icon: Award },
    { id: 'ai-lector', label: 'Lektor AI', icon: Sparkles, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-emerald-500/20">
              ⚗️
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 block leading-tight">
                Chemie lidsky
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">
                Pro středoškoláky a mediky
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Hledat téma, pojem, chyták..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition-all text-slate-800"
            />
          </div>

          {/* Desktop Primary Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentView === item.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Tools & AI Generator */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('cross-rule')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'cross-rule'
                  ? 'bg-sky-100 text-sky-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Křížové pravidlo"
            >
              <Calculator className="w-4 h-4 text-sky-600" />
              <span className="hidden xl:inline">Křížové pravidlo</span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'quiz'
                  ? 'bg-rose-100 text-rose-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Maturitní trenažér"
            >
              <Award className="w-4 h-4 text-rose-600" />
              <span className="hidden xl:inline">Testy</span>
            </button>

            <button
              onClick={() => onNavigate('ai-lector')}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Lektor AI</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Hledat téma, pojem, chyták..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-100 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-400 px-2">Moduly výuky:</div>
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentView === item.id ? 'bg-emerald-100 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
              ))}
            </div>

            <div className="font-bold text-xs uppercase tracking-wider text-slate-400 px-2 pt-2">Nástroje & Trénink:</div>
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { onNavigate(tool.id); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center gap-2 ${
                    tool.highlight
                      ? 'bg-orange-500 text-white'
                      : currentView === tool.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <tool.icon className="w-4 h-4" />
                  <span>{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
