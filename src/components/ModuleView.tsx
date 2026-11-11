import React, { useState } from 'react';
import { ModuleId, Topic } from '../types/chemistry';
import { MODULES, TOPICS } from '../data/curriculumData';
import { TopicDetail } from './TopicDetail';
import { BookOpen, Sparkles, ChevronRight, ArrowLeft, Lightbulb, AlertTriangle, Layers } from 'lucide-react';

interface ModuleViewProps {
  moduleId: ModuleId;
  onNavigateToTool?: (toolId: string) => void;
}

export const ModuleView: React.FC<ModuleViewProps> = ({ moduleId, onNavigateToTool }) => {
  const currentModule = MODULES.find((m) => m.id === moduleId) || MODULES[0];
  const moduleTopics = TOPICS.filter((t) => t.moduleId === moduleId);

  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  const activeTopic = moduleTopics.find((t) => t.id === activeTopicId);

  if (activeTopic) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setActiveTopicId(null)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Zpět na přehled modulu {currentModule.title}
        </button>

        <TopicDetail topic={activeTopic} onBack={() => setActiveTopicId(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Module Header Card */}
      <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl ${
        moduleId === 'general-inorganic' ? 'bg-gradient-to-r from-emerald-600 to-teal-700' :
        moduleId === 'calculations-redox' ? 'bg-gradient-to-r from-sky-600 to-indigo-700' :
        moduleId === 'organic' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
        'bg-gradient-to-r from-rose-500 to-purple-600'
      }`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>{currentModule.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {currentModule.title}
        </h1>
        <p className="mt-2 text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed font-medium">
          {currentModule.subtitle} – {currentModule.description}
        </p>

        {/* Quick tool shortcuts for relevant modules */}
        {moduleId === 'calculations-redox' && onNavigateToTool && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToTool('cross-rule')}
              className="px-4 py-2 rounded-xl bg-white text-sky-800 font-bold text-xs shadow-md hover:bg-sky-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              Spustit kalkulačku křížového pravidla
            </button>
            <button
              onClick={() => onNavigateToTool('redox-trainer')}
              className="px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white font-bold text-xs hover:bg-white/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Trenažér vyčíslování redoxek
            </button>
          </div>
        )}

        {moduleId === 'general-inorganic' && onNavigateToTool && (
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToTool('nomenclature')}
              className="px-4 py-2 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-md hover:bg-emerald-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Procvičit české názvosloví krok za krokem
            </button>
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center justify-between">
          <span>Výukové lekce a výpisky k tomuto modulu</span>
          <span className="text-xs font-semibold text-slate-600">
            {moduleTopics.length} zpracovaná témata
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moduleTopics.map((top) => (
            <div
              key={top.id}
              onClick={() => setActiveTopicId(top.id)}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Výpisky & Analogie
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Otevřít lekci <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {top.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {top.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {top.summary}
                </p>
              </div>

              {/* Life Example highlight */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-amber-800">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1 font-medium">
                  <strong>Život:</strong> {top.lifeExample.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
