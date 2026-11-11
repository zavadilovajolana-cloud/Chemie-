import React, { useState, useMemo } from 'react';
import { ModuleId, Topic } from './types/chemistry';
import { MODULES, TOPICS } from './data/curriculumData';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { ModuleView } from './components/ModuleView';
import { TopicDetail } from './components/TopicDetail';
import { CrossRuleCalculator } from './components/CrossRuleCalculator';
import { NomenclatureTrainer } from './components/NomenclatureTrainer';
import { RedoxTrainer } from './components/RedoxTrainer';
import { ExamPrepQuiz } from './components/ExamPrepQuiz';
import { AILectorGenerator } from './components/AILectorGenerator';
import { PeriodicTableQuick } from './components/PeriodicTableQuick';
import { Search, Sparkles, BookOpen, Calculator, Award, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'home' | ModuleId | 'cross-rule' | 'nomenclature' | 'redox-trainer' | 'ai-lector' | 'quiz' | 'periodic-table'
  >('home');

  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected topic object if active
  const activeTopic = useMemo(() => {
    if (!selectedTopicId) return null;
    return TOPICS.find((t) => t.id === selectedTopicId) || null;
  }, [selectedTopicId]);

  // Global search filtering across all topics
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return TOPICS.filter((t) =>
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.humanExplanation.toLowerCase().includes(q) ||
      t.lifeExample.title.toLowerCase().includes(q) ||
      t.keyPoints.some((kp) => kp.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleNavigate = (view: any) => {
    setSelectedTopicId(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Overlay when typing */}
        {searchQuery.trim().length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-600" />
                Výsledky vyhledávání pro „{searchQuery}“
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                {searchResults.length} nalezených lekcí
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => handleSelectTopic(t.id)}
                    className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-emerald-700 font-bold">
                      <span>{MODULES.find(m => m.id === t.moduleId)?.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{t.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{t.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <p className="text-slate-600 font-medium">
                  Žádná lekce přímo neodpovídá zadanému výrazu.
                </p>
                <button
                  onClick={() => {
                    handleNavigate('ai-lector');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Nechat lektora AI toto téma srozumitelně sepsat
                </button>
              </div>
            )}
          </div>
        ) : activeTopic ? (
          /* Direct Topic View */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedTopicId(null)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
            >
              ← Zpět na předchozí přehled
            </button>
            <TopicDetail topic={activeTopic} />
          </div>
        ) : (
          /* Main Router Views */
          <>
            {currentView === 'home' && (
              <HomeDashboard
                onNavigate={handleNavigate}
                onSelectTopic={handleSelectTopic}
              />
            )}

            {(currentView === 'general-inorganic' ||
              currentView === 'calculations-redox' ||
              currentView === 'organic' ||
              currentView === 'biochemistry') && (
              <ModuleView
                moduleId={currentView}
                onNavigateToTool={handleNavigate}
              />
            )}

            {currentView === 'cross-rule' && <CrossRuleCalculator />}
            {currentView === 'nomenclature' && <NomenclatureTrainer />}
            {currentView === 'redox-trainer' && <RedoxTrainer />}
            {currentView === 'periodic-table' && <PeriodicTableQuick />}
            {currentView === 'quiz' && <ExamPrepQuiz />}
            {currentView === 'ai-lector' && <AILectorGenerator />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚗️</span>
                <span className="text-lg font-black text-white">Chemie lidsky</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bezplatný vzdělávací portál pro studenty středních škol a gymnázií, maturanty a uchazeče o medicínu a VŠCHT.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Moduly kurzu</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li><button onClick={() => handleNavigate('general-inorganic')} className="hover:text-white cursor-pointer">1. Obecná & Anorganika</button></li>
                <li><button onClick={() => handleNavigate('calculations-redox')} className="hover:text-white cursor-pointer">2. Výpočty & Redox</button></li>
                <li><button onClick={() => handleNavigate('organic')} className="hover:text-white cursor-pointer">3. Organická chemie</button></li>
                <li><button onClick={() => handleNavigate('biochemistry')} className="hover:text-white cursor-pointer">4. Biochemie</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Praktické nástroje</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li><button onClick={() => handleNavigate('cross-rule')} className="hover:text-white cursor-pointer">Křížové pravidlo (kalkulačka)</button></li>
                <li><button onClick={() => handleNavigate('nomenclature')} className="hover:text-white cursor-pointer">Trenažér českého názvosloví</button></li>
                <li><button onClick={() => handleNavigate('redox-trainer')} className="hover:text-white cursor-pointer">Vyčíslování redoxních reakcí</button></li>
                <li><button onClick={() => handleNavigate('periodic-table')} className="hover:text-white cursor-pointer">Periodická tabulka & EN</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Příprava & Lektor</span>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li><button onClick={() => handleNavigate('quiz')} className="hover:text-white cursor-pointer">Testový simulátor (Maturita/LF)</button></li>
                <li><button onClick={() => handleNavigate('ai-lector')} className="hover:text-white cursor-pointer">Lektor & Generátor obsahu</button></li>
              </ul>
              <div className="pt-2 text-[11px] text-slate-500">
                Chemie se dá vysvětlit normálně.
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 Chemie lidsky. Vzdělávací projekt pro středoškoláky.</span>
            <span>Vytvořeno s důrazem na srozumitelnost, lidský tón a nulovou nudu.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
