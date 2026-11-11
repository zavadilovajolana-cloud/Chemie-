import React from 'react';
import { ModuleId } from '../types/chemistry';
import { MODULES, TOPICS } from '../data/curriculumData';
import { Sparkles, Calculator, BookOpen, Zap, Award, ArrowRight, Lightbulb, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

interface HomeDashboardProps {
  onNavigate: (view: any) => void;
  onSelectTopic: (topicId: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  onSelectTopic,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-14 shadow-2xl border border-emerald-900/40">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Bezplatný vzdělávací web pro středoškoláky a mediky</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            Chemie se dá vysvětlit <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">normálně a lidsky</span>.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
            Konec nudné akademické hantýrky. Všechna témata od 1. ročníku střední školy až po maturitní zkoušku
            a náročné přijímačky na lékařské fakulty a VŠCHT přehledně, s příklady ze života, kalkulačkami a chytrým lektorem.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('general-inorganic')}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              Začít se učit chemii <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('cross-rule')}
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              Kalkulačka křížového pravidla
            </button>

            <button
              onClick={() => onNavigate('ai-lector')}
              className="px-5 py-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-sm transition-all backdrop-blur-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Lektor & Generátor AI
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Modules Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
              Kurikulum střední školy a gymnázia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 základní moduly výuky
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Rozděleno podle tematických celků RVP gymnázií a požadavků přijímacích zkoušek na LF UK a VŠCHT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES.map((mod) => {
            const count = TOPICS.filter((t) => t.moduleId === mod.id).length;
            return (
              <div
                key={mod.id}
                onClick={() => onNavigate(mod.id)}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${mod.color.light} ${mod.color.text}`}>
                      {mod.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {count} lekcí s výpisky
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {mod.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Prozkoumat modul a výpisky</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Tool Suite Showcase */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Praktické interaktivní pomůcky
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Nástroje, které ti ušetří hodiny trápení
          </h2>
          <p className="text-slate-400 text-sm">
            Vyzkoušej naše vizuální kalkulačky a trenažéry vyvinuté speciálně pro středoškoláky.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('cross-rule')}
            className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white group-hover:text-sky-300 transition-colors">
              Křížové pravidlo
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Vizuální diagram kříže, odečty po úhlopříčce a přesné navážky roztoků v gramech.
            </p>
          </div>

          <div
            onClick={() => onNavigate('nomenclature')}
            className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
              Názvosloví krok za krokem
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              8 koncovek -ný až -ičelý, oxidy, kyseliny, hydroxidy a soli s okamžitou kontrolou.
            </p>
          </div>

          <div
            onClick={() => onNavigate('redox-trainer')}
            className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
              Vyčíslování redoxek
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Metoda oxidačních čísel a bilance elektronů do kříže bez hádání metodou pokus-omyl.
            </p>
          </div>

          <div
            onClick={() => onNavigate('quiz')}
            className="p-5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all cursor-pointer space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white group-hover:text-rose-300 transition-colors">
              Maturita & Medicína
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Testové otázky s detailním lidským vysvětlením každé správné i chybné odpovědi.
            </p>
          </div>
        </div>
      </section>

      {/* Pedagogical Manifesto */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Filozofie projektu „Chemie lidsky“
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            3 základní pravidla, kterých se držíme
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Lidský a povzbudivý tón
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Žádná suchá akademická hantýrka ani povýšenost. Chemie není trest, ale fascinující pohled na to,
              jak funguje svět kolem nás.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Krátké odstavce & tabulky
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Struktura textu šetří tvůj mozek: klíčová slova jsou vždy tučně, data v přehledných tabulkách
              a postupy rozepsané krok za krokem.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              Příklady ze života & chytáky
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proč solíme vodu na těstoviny, jak funguje mýdlo a na co si dát pozor u přijímaček na medicínu
              či u státní maturity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
