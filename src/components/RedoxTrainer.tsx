import React, { useState } from 'react';
import { REDOX_EXAMPLES } from '../data/curriculumData';
import { RedoxReactionExample } from '../types/chemistry';
import { Zap, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export const RedoxTrainer: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<RedoxReactionExample>(REDOX_EXAMPLES[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [revealedAll, setRevealedAll] = useState(false);

  const handleSelect = (ex: RedoxReactionExample) => {
    setSelectedExample(ex);
    setCurrentStep(0);
    setRevealedAll(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Interaktivní vyčíslování redoxek</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Vyčíslování redoxních reakcí metodou elektronové bilance
        </h2>
        <p className="mt-2 text-violet-100 max-w-2xl text-sm sm:text-base leading-relaxed">
          Konec hádání koeficientů metodou pokus-omyl. Sleduj přenos elektronů krok za krokem:
          oxidační čísla → poloreakce oxidace a redukce → křížové prohození → dopočet atomů kyslíku.
        </p>

        {/* Reaction Switcher Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {REDOX_EXAMPLES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleSelect(ex)}
              className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedExample.id === ex.id
                  ? 'bg-white text-purple-900 shadow-md font-bold'
                  : 'bg-purple-900/60 text-purple-200 hover:bg-purple-900/90'
              }`}
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Step-by-Step Flow */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Equation Header */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Nevyčíslená reakce:
              </span>
              <div className="p-4 bg-slate-900 rounded-2xl text-white font-mono text-base sm:text-lg overflow-x-auto shadow-inner">
                {selectedExample.unbalanced}
              </div>
            </div>

            {/* Electron Exchange Cards */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Změny oxidačních čísel a výměna elektronů:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedExample.elementsChanged.map((el, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      el.type === 'Oxidace'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-sky-50 border-sky-200 text-sky-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-sm">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                          el.type === 'Oxidace' ? 'bg-amber-200 text-amber-900' : 'bg-sky-200 text-sky-900'
                        }`}>
                          {el.type}
                        </span>
                        <span>Prvek {el.element}</span>
                      </div>
                      <div className="text-xs mt-1 font-mono">
                        z {el.from > 0 ? `+${el.from}` : el.from} na {el.to > 0 ? `+${el.to}` : el.to}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black font-mono">
                        {el.type === 'Oxidace' ? `-${el.electrons} e⁻` : `+${el.electrons} e⁻`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Step Timeline */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Postup krok za krokem: (Krok {currentStep + 1} z {selectedExample.steps.length})
                </span>
                <button
                  onClick={() => setRevealedAll(!revealedAll)}
                  className="text-xs text-purple-700 hover:text-purple-900 font-semibold cursor-pointer"
                >
                  {revealedAll ? 'Krokovat postupně' : 'Zobrazit všechny kroky najednou'}
                </button>
              </div>

              {revealedAll ? (
                <div className="space-y-3">
                  {selectedExample.steps.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 text-sm sm:text-base text-purple-950 font-medium leading-relaxed flex gap-3">
                    <span className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      {currentStep + 1}
                    </span>
                    <p>{selectedExample.steps[currentStep]}</p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      disabled={currentStep === 0}
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> Předchozí krok
                    </button>

                    <button
                      disabled={currentStep === selectedExample.steps.length - 1}
                      onClick={() => setCurrentStep((prev) => Math.min(selectedExample.steps.length - 1, prev + 1))}
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-purple-600/20"
                    >
                      Další krok <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Final Balanced Result */}
              {(revealedAll || currentStep === selectedExample.steps.length - 1) && (
                <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Kompletně vyčíslená rovnice:
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-emerald-950 bg-white p-3 rounded-xl border border-emerald-200 overflow-x-auto">
                    {selectedExample.balanced}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Exam Notes Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 space-y-3">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Tip pro maturanty a mediky
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {selectedExample.note}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">
              Rychlý kontrolní seznam při vyčíslování:
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>Zkontroluj, které přesně prvky se oxidují a redukují.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>Prohoď počty elektronů do kříže jako koeficienty.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>Dorovnej kovy a kationty solí.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">4</span>
                <span>Dorovnej vodíky na molekuly vody H₂O.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">5</span>
                <span><strong>Závěrečná kontrola kyslíků</strong> – pokud sedí kyslíky na obou stranách, rovnice je 100% správně!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
