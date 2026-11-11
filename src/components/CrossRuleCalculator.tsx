import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, RefreshCw, Sparkles, BookOpen, AlertTriangle } from 'lucide-react';

interface Preset {
  title: string;
  w1: number;
  w2: number;
  wTarget: number;
  totalGrams: number;
  desc: string;
}

const PRESETS: Preset[] = [
  {
    title: 'Kuchyňský ocet (80% → 8%)',
    w1: 80,
    w2: 0,
    wTarget: 8,
    totalGrams: 500,
    desc: 'Ředění 80% kyseliny octové čistou vodou na 8% stolní ocet na zavařování okurek.',
  },
  {
    title: 'Lékařský líh na dezinfekci (96% → 60%)',
    w1: 96,
    w2: 0,
    wTarget: 60,
    totalGrams: 250,
    desc: '60-70% alkohol je nejúčinnější dezinfekce, protože proniká stěnou bakterií lépe než 96% líh.',
  },
  {
    title: 'Míchání dvou roztoků NaOH (40% + 10% → 25%)',
    w1: 40,
    w2: 10,
    wTarget: 25,
    totalGrams: 600,
    desc: 'Míchání dvou různých zásobních roztoků louhu v chemické laboratoři na přesnou koncentraci.',
  },
  {
    title: 'Fyziologický roztok (10% NaCl + voda → 0,9%)',
    w1: 10,
    w2: 0,
    wTarget: 0.9,
    totalGrams: 1000,
    desc: 'Příprava 1 litru sterilního 0,9% izotonického roztoku z 10% koncentrátu.',
  },
];

export const CrossRuleCalculator: React.FC = () => {
  const [w1, setW1] = useState<number>(60);
  const [w2, setW2] = useState<number>(0);
  const [wTarget, setWTarget] = useState<number>(15);
  const [targetGrams, setTargetGrams] = useState<number>(500);

  // Practice quiz mode
  const [practiceActive, setPracticeActive] = useState(false);
  const [userParts1, setUserParts1] = useState('');
  const [userParts2, setUserParts2] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Calculations
  const isValid = w1 !== w2 && ((wTarget > Math.min(w1, w2) && wTarget < Math.max(w1, w2)));

  // Upper diagonal calculation: |w2 - wTarget|
  const parts1 = Math.abs(w2 - wTarget);
  // Lower diagonal calculation: |w1 - wTarget|
  const parts2 = Math.abs(w1 - wTarget);
  const totalParts = parts1 + parts2;

  const grams1 = totalParts > 0 ? (parts1 / totalParts) * targetGrams : 0;
  const grams2 = totalParts > 0 ? (parts2 / totalParts) * targetGrams : 0;

  const handleApplyPreset = (p: Preset) => {
    setW1(p.w1);
    setW2(p.w2);
    setWTarget(p.wTarget);
    setTargetGrams(p.totalGrams);
    setFeedback('idle');
  };

  const handleCheckPractice = () => {
    const p1 = parseFloat(userParts1.replace(',', '.'));
    const p2 = parseFloat(userParts2.replace(',', '.'));

    if (isNaN(p1) || isNaN(p2)) return;

    // Check ratio equivalence or exact parts
    const ratioExpected = parts1 / parts2;
    const ratioUser = p1 / p2;

    if (Math.abs(ratioExpected - ratioUser) < 0.05) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interaktivní kalkulačka & trenažér</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Křížové pravidlo: Ředění a míchání roztoků lidsky
        </h2>
        <p className="mt-2 text-sky-100 max-w-2xl text-sm sm:text-base leading-relaxed">
          Zadej procenta výchozích roztoků a cílovou koncentraci. Náš interaktivní kříž ti okamžitě ukáže
          diagonální odečty, díly a přesnou navážku v gramech. Žádné složité rovnice o dvou neznámých!
        </p>

        {/* Quick Presets */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-xs font-semibold text-sky-200 self-center">Příklady ze života:</span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="text-xs px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-medium text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              {p.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-black">1</span>
              Vstupní parametry
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Koncentrace roztoku 1 (w₁) [%]
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={w1}
                  onChange={(e) => setW1(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900 bg-slate-50 focus:bg-white"
                />
                <span className="text-slate-500 font-bold">%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">Koncentrovanější roztok nebo čistá látka (100 %).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Koncentrace roztoku 2 (w₂) [%]
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={w2}
                  onChange={(e) => setW2(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900 bg-slate-50 focus:bg-white"
                />
                <span className="text-slate-500 font-bold">%</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">Pokud ředíš vodou, zadej 0 %.</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
                Cílová koncentrace (w_cíl) [%]
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={wTarget}
                  onChange={(e) => setWTarget(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-900 bg-emerald-50 focus:bg-white"
                />
                <span className="text-emerald-700 font-bold">%</span>
              </div>
              {!isValid && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Cílová koncentrace musí ležet mezi {Math.min(w1, w2)} % a {Math.max(w1, w2)} %!</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kolik gramů roztoku chceš vyrobit?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={targetGrams}
                  onChange={(e) => setTargetGrams(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900 bg-slate-50 focus:bg-white"
                />
                <span className="text-slate-500 font-bold">g</span>
              </div>
            </div>
          </div>

          {/* Quick Explanation Card */}
          <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 text-sky-900 text-xs leading-relaxed space-y-2">
            <div className="font-bold text-sky-950 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              Zlaté pravidlo kříže:
            </div>
            <p>
              Odečítá se vždy po úhlopříčce a <strong>větší číslo mínus menší</strong> (v absolutní hodnotě).
              Výsledek vpravo nahoře ti udává, kolik dílů musíš vzít z roztoku 1. Výsledek vpravo dole ti udává díly roztoku 2.
            </p>
          </div>
        </div>

        {/* Visual Cross & Results Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 text-lg flex items-center justify-between mb-6">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-black">2</span>
                Grafický diagram kříže
              </span>
              <span className="text-xs font-medium text-slate-500">diagonální odečet</span>
            </h3>

            {/* Interactive Visual Cross Diagram */}
            <div className="relative p-6 sm:p-8 bg-slate-900 rounded-2xl text-white shadow-inner overflow-hidden">
              {/* Background Cross Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-sky-500/30" strokeWidth="2.5" strokeDasharray="6 6">
                <line x1="22%" y1="28%" x2="78%" y2="72%" />
                <line x1="22%" y1="72%" x2="78%" y2="28%" />
              </svg>

              <div className="relative z-10 grid grid-cols-3 gap-y-12 items-center text-center">
                {/* Top-Left: w1 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-400 flex flex-col items-center justify-center shadow-lg shadow-sky-500/20 backdrop-blur-md">
                    <span className="text-xs text-sky-300 font-medium">Roztok 1</span>
                    <span className="text-xl sm:text-2xl font-black text-sky-100">{w1} %</span>
                  </div>
                </div>

                {/* Center: wTarget */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-500 border-2 border-emerald-300 flex flex-col items-center justify-center shadow-xl shadow-emerald-500/30 scale-105">
                    <span className="text-[11px] uppercase tracking-wider text-emerald-100 font-bold">Cíl</span>
                    <span className="text-2xl sm:text-3xl font-black text-white">{wTarget} %</span>
                  </div>
                </div>

                {/* Top-Right: Parts 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-400 flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20 backdrop-blur-md">
                    <span className="text-xs text-indigo-300 font-medium">Díly roztoku 1</span>
                    <span className="text-xl sm:text-2xl font-black text-indigo-100">
                      {isValid ? parts1.toFixed(1).replace('.0', '') : '–'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">|{w2} - {wTarget}|</span>
                  </div>
                </div>

                {/* Bottom-Left: w2 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-400 flex flex-col items-center justify-center shadow-lg shadow-sky-500/20 backdrop-blur-md">
                    <span className="text-xs text-sky-300 font-medium">Roztok 2</span>
                    <span className="text-xl sm:text-2xl font-black text-sky-100">{w2} %</span>
                  </div>
                </div>

                {/* Center Empty Spacer */}
                <div className="flex items-center justify-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800/80">
                    Křížový poměr
                  </div>
                </div>

                {/* Bottom-Right: Parts 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-400 flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20 backdrop-blur-md">
                    <span className="text-xs text-indigo-300 font-medium">Díly roztoku 2</span>
                    <span className="text-xl sm:text-2xl font-black text-indigo-100">
                      {isValid ? parts2.toFixed(1).replace('.0', '') : '–'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">|{w1} - {wTarget}|</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Calculation Box */}
            {isValid ? (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    Výsledný směšovací poměr:
                  </h4>
                  <p className="text-base font-semibold text-emerald-950">
                    Smícháme <span className="font-extrabold text-emerald-700">{parts1.toFixed(1).replace('.0', '')} dílů</span> {w1}% roztoku
                    a <span className="font-extrabold text-emerald-700">{parts2.toFixed(1).replace('.0', '')} dílů</span> {w2}% roztoku.
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Celkový počet dílů: <strong>{totalParts.toFixed(1).replace('.0', '')} dílů</strong>.
                  </p>
                </div>

                {/* Grams Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 block">Navážka roztoku 1 ({w1} %)</span>
                    <span className="text-2xl font-extrabold text-sky-700 mt-1 block">
                      {grams1.toFixed(1)} g
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block mt-1">
                      ({parts1.toFixed(1)} / {totalParts.toFixed(1)}) × {targetGrams} g
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-500 block">Navážka roztoku 2 ({w2} %)</span>
                    <span className="text-2xl font-extrabold text-indigo-700 mt-1 block">
                      {grams2.toFixed(1)} g
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono block mt-1">
                      ({parts2.toFixed(1)} / {totalParts.toFixed(1)}) × {targetGrams} g
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-100 rounded-xl text-xs text-slate-700 flex items-center justify-between">
                  <span>Kontrola celkové hmotnosti:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {grams1.toFixed(1)} g + {grams2.toFixed(1)} g = {(grams1 + grams2).toFixed(1)} g
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-700 text-sm">
                Uprav zadané hodnoty tak, aby cílová koncentrace ležela mezi oběma výchozími roztoky.
              </div>
            )}
          </div>

          {/* Practice Quiz Accordion */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setPracticeActive(!practiceActive)}>
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Cvičný test křížového pravidla pro tebe
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Vyzkoušej si spočítat díly sám bez nápovědy!</p>
              </div>
              <button className="text-xs px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700">
                {practiceActive ? 'Skrýt test' : 'Otevřít test'}
              </button>
            </div>

            {practiceActive && (
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-4">
                <p className="text-sm text-slate-800">
                  <strong>Úkol:</strong> Máš <strong>50% roztok glukózy</strong> a <strong>čistou vodu (0 %)</strong>.
                  Chceš připravit <strong>10% infuzní roztok</strong>. V jakém poměru dílů je smícháš?
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Díly 50% glukózy:</label>
                    <input
                      type="text"
                      placeholder="např. 10"
                      value={userParts1}
                      onChange={(e) => { setUserParts1(e.target.value); setFeedback('idle'); }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Díly vody (0 %):</label>
                    <input
                      type="text"
                      placeholder="např. 40"
                      value={userParts2}
                      onChange={(e) => { setUserParts2(e.target.value); setFeedback('idle'); }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-sm focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCheckPractice}
                    className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Zkontrolovat výsledek
                  </button>
                  <button
                    onClick={() => { setUserParts1(''); setUserParts2(''); setFeedback('idle'); }}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-colors"
                  >
                    Reset
                  </button>
                </div>

                {feedback === 'correct' && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Výborně! 10 dílů glukózy a 40 dílů vody (poměr 10 : 40 = 1 : 4). Přesně takhle funguje křížové pravidlo!
                  </div>
                )}
                {feedback === 'wrong' && (
                  <div className="p-3 bg-rose-50 text-rose-800 rounded-xl text-xs font-semibold">
                    Zkus to znovu: odečti diagonálně: |0 - 10| = 10 dílů glukózy a |50 - 10| = 40 dílů vody.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
