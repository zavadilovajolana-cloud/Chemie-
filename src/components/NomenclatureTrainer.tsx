import React, { useState } from 'react';
import { BookOpen, CheckCircle2, HelpCircle, ArrowRight, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface NomenclatureTask {
  id: string;
  type: 'name-to-formula' | 'formula-to-name';
  prompt: string;
  solution: string;
  explanation: string;
  oxidationStates: string;
  category: 'Oxidy' | 'Kyseliny' | 'Hydroxidy' | 'Soli';
  hint: string;
}

const NOMENCLATURE_TASKS: NomenclatureTask[] = [
  {
    id: 'n-1',
    type: 'name-to-formula',
    prompt: 'oxid hlinitý',
    solution: 'Al2O3',
    explanation: 'Hliník má koncovku -itý (+III) → Al⁺ᴵᴵᴵ. Kyslík v oxidech má -II → O⁻ᴵᴵ. Křížové pravidlo: Al₂O₃.',
    oxidationStates: 'Al(+III), O(-II)',
    category: 'Oxidy',
    hint: 'Koncovka -itý odpovídá oxidačnímu číslu +III. Kyslík má v oxidech vždy -II.',
  },
  {
    id: 'n-2',
    type: 'name-to-formula',
    prompt: 'kyselina dusičná',
    solution: 'HNO3',
    explanation: 'Dusík má koncovku -ičná (+V) → N⁺ⱽ. Vodík H⁺ᴵ, kyslík O⁻ᴵᴵ. Kladné náboje: 1 + 5 = 6. Na dorovnání potřebujeme 6 / 2 = 3 kyslíky → HNO₃.',
    oxidationStates: 'H(+I), N(+V), O(-II)',
    category: 'Kyseliny',
    hint: 'Kostra je H-N-O. Koncovka -ičná je +V. Sečti vodík a dusík (1+5) a vyděl dvěma.',
  },
  {
    id: 'n-3',
    type: 'name-to-formula',
    prompt: 'hydroxid vápenatý',
    solution: 'Ca(OH)2',
    explanation: 'Vápník má koncovku -natý (+II) → Ca⁺ᴵᴵ. Hydroxidová skupina má náboj -I → (OH)⁻ᴵ. Křížovým pravidlem potřebujeme dvě OH skupiny → Ca(OH)₂.',
    oxidationStates: 'Ca(+II), OH(-I)',
    category: 'Hydroxidy',
    hint: 'Skupina (OH) má vždy náboj -I. Koncovka -natý znamená Ca²⁺.',
  },
  {
    id: 'n-4',
    type: 'name-to-formula',
    prompt: 'síran sodný',
    solution: 'Na2SO4',
    explanation: 'Kyselina sírová je H₂SO₄. Odtržením dvou vodíků vzniká síranový anion SO₄²⁻. Sodík má koncovku sodný (+I) → Na⁺ᴵ. Na vyrušení náboje 2- potřebujeme dva sodíky → Na₂SO₄.',
    oxidationStates: 'Na(+I), S(+VI), O(-II)',
    category: 'Soli',
    hint: 'Síran pochází z kyseliny sírové (H₂SO₄). Síranový anion má náboj 2-.',
  },
  {
    id: 'n-5',
    type: 'name-to-formula',
    prompt: 'manganistan draselný',
    solution: 'KMnO4',
    explanation: 'Mangan má koncovku -istý (+VII) → Mn⁺ⱽᴵᴵ. Kyselina manganistá je HMnO₄ (1 + 7 = 8 kladných nábojů, 4 kyslíky po -2). Solí s draslíkem K⁺ᴵ je KMnO₄ (hypermangan).',
    oxidationStates: 'K(+I), Mn(+VII), O(-II)',
    category: 'Soli',
    hint: 'Koncovka -istý znamená +VII. Hypermangan!',
  },
  {
    id: 'n-6',
    type: 'formula-to-name',
    prompt: 'Fe2O3',
    solution: 'oxid železitý',
    explanation: 'Kyslík má -II (3 × -2 = -6). Dva atomy železa musí mít dohromady +6, tedy jeden atom železa má +III. Koncovka pro +III je -itý → oxid železitý.',
    oxidationStates: 'Fe(+III), O(-II)',
    category: 'Oxidy',
    hint: 'Spočítej záporné náboje kyslíků (3 × -2) a poděl dvěma železy.',
  },
  {
    id: 'n-7',
    type: 'formula-to-name',
    prompt: 'H2SO3',
    solution: 'kyselina siřičitá',
    explanation: 'Dva vodíky (2 × +1 = +2), tři kyslíky (3 × -2 = -6). Aby byl součet 0, síra musí mít +IV (+2 + x - 6 = 0 → x = +4). Koncovka pro +IV je -ičitá → kyselina siřičitá.',
    oxidationStates: 'H(+I), S(+IV), O(-II)',
    category: 'Kyseliny',
    hint: 'Vzorec má o jeden kyslík méně než kyselina sírová (H₂SO₄). Síra má +IV.',
  },
  {
    id: 'n-8',
    type: 'formula-to-name',
    prompt: 'CuSO4',
    solution: 'síran měďnatý',
    explanation: 'Síranový anion je SO₄²⁻. Proto měď musí mít náboj +II (Cu²⁺). Koncovka pro +II je -natý → síran měďnatý (modrá skalice).',
    oxidationStates: 'Cu(+II), S(+VI), O(-II)',
    category: 'Soli',
    hint: 'Anion SO₄ má náboj 2-. Měď má oxidační číslo +II.',
  },
];

const OXIDATION_TABLE = [
  { num: '+I', suffix: '-ný', anion: '-nan', example: 'Na₂O, NaClO' },
  { num: '+II', suffix: '-natý', anion: '-natan', example: 'CaO, CaSO₄' },
  { num: '+III', suffix: '-itý', anion: '-itan', example: 'Al₂O₃, FeCl₃' },
  { num: '+IV', suffix: '-ičitý', anion: '-ičitan', example: 'CO₂, SO₂' },
  { num: '+V', suffix: '-ičný / -ečný', anion: '-ičnan / -ečnan', example: 'HNO₃, H₃PO₄' },
  { num: '+VI', suffix: '-ový', anion: '-an', example: 'H₂SO₄, CrO₃' },
  { num: '+VII', suffix: '-istý', anion: '-istan', example: 'KMnO₄, HClO₄' },
  { num: '+VIII', suffix: '-ičelý', anion: '-ičelan', example: 'OsO₄, XeO₄' },
];

export const NomenclatureTrainer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [selectedFilter, setSelectedFilter] = useState<string>('Vše');

  const filteredTasks = selectedFilter === 'Vše'
    ? NOMENCLATURE_TASKS
    : NOMENCLATURE_TASKS.filter(t => t.category === selectedFilter);

  const currentTask = filteredTasks[currentIndex % filteredTasks.length];

  const normalizeAnswer = (str: string) => {
    return str.toLowerCase().replace(/[\s\-_]/g, '').trim();
  };

  const handleCheck = () => {
    if (!userInput.trim()) return;

    const normalizedUser = normalizeAnswer(userInput);
    const normalizedSolution = normalizeAnswer(currentTask.solution);

    if (normalizedUser === normalizedSolution) {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    setUserInput('');
    setStatus('idle');
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % filteredTasks.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interaktivní trenažér českého názvosloví</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Názvosloví krok za krokem: Koncovky bez trápení
        </h2>
        <p className="mt-2 text-emerald-100 max-w-2xl text-sm sm:text-base leading-relaxed">
          České názvosloví je nejdokonalejší na světě. 8 koncovek ti přesně řekne oxidační číslo prvku.
          Procvič si převod z názvu na vzorec i ze vzorce na název s okamžitou kontrolou.
        </p>

        {/* Filter tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['Vše', 'Oxidy', 'Kyseliny', 'Hydroxidy', 'Soli'].map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedFilter(cat); setCurrentIndex(0); setStatus('idle'); setUserInput(''); }}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-white text-emerald-800 shadow-md'
                  : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800/90'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Practice Arena */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Kategorie: {currentTask.category}
              </span>
              <span className="text-xs font-semibold text-slate-600">
                Úloha {(currentIndex % filteredTasks.length) + 1} z {filteredTasks.length}
              </span>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                {currentTask.type === 'name-to-formula' ? 'Zapiš chemický vzorec pro název:' : 'Pojmenuj sloučeninu se vzorcem:'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
                {currentTask.prompt}
              </h3>
            </div>

            {/* Answer Input */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Tvoje odpověď:
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder={currentTask.type === 'name-to-formula' ? 'např. Al2O3 nebo H2SO4' : 'např. síran měďnatý'}
                  value={userInput}
                  onChange={(e) => { setUserInput(e.target.value); if (status !== 'idle') setStatus('idle'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(); }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900 text-lg bg-slate-50 focus:bg-white"
                />
                <button
                  onClick={handleCheck}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Zkontrolovat
                </button>
              </div>
              <p className="text-[11px] text-slate-600">
                Indexy piš normálními čísly bez mezer (např. Al2O3, HNO3).
              </p>
            </div>

            {/* Hint toggler */}
            <div className="pt-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? 'Skrýt nápovědu' : 'Potřebuji malou nápovědu'}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                  {currentTask.hint}
                </div>
              )}
            </div>

            {/* Feedback alert */}
            {status === 'correct' && (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Výborně! Přesně tak!
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                  <strong>Vysvětlení:</strong> {currentTask.explanation}
                </p>
                <div className="text-xs font-mono text-emerald-700">
                  Oxidační čísla: {currentTask.oxidationStates}
                </div>
                <button
                  onClick={handleNext}
                  className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  Další příklad <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {status === 'wrong' && (
              <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  Zatím ne, zkus to ještě jednou nebo zkontroluj nápovědu!
                </div>
                <p className="text-xs text-rose-900">
                  Správné řešení je: <strong className="font-mono text-rose-950 text-sm">{currentTask.solution}</strong>
                </p>
                <p className="text-xs text-rose-950 leading-relaxed">
                  {currentTask.explanation}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Přejít na další úlohu <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference Oxidation Table */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Rychlý tahák 8 oxidačních koncovek
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="pb-2">Číslo</th>
                    <th className="pb-2">Kation</th>
                    <th className="pb-2">Anion soli</th>
                    <th className="pb-2">Příklad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {OXIDATION_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 font-mono font-bold text-emerald-700">{row.num}</td>
                      <td className="py-2 font-semibold text-slate-800">{row.suffix}</td>
                      <td className="py-2 text-slate-600">{row.anion}</td>
                      <td className="py-2 font-mono text-[11px] text-slate-500">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 leading-relaxed border border-slate-200">
              <strong>Zlaté pravidlo nulového součtu:</strong> Součet všech oxidačních čísel v neutrální molekule je VŽDY roven 0. Kyslík v oxidech má -II, vodík v kyselinách +I, skupina OH v hydroxidech má -I.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
