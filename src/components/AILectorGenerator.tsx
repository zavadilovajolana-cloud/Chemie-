import React, { useState } from 'react';
import { Sparkles, BookOpen, Send, Copy, Check, Download, Printer, AlertCircle, RefreshCw, GraduationCap, Lightbulb } from 'lucide-react';

interface PreloadedSample {
  topic: string;
  module: string;
  audience: string;
  format: string;
  content: string;
}

const SAMPLE_TOPICS = [
  { topic: 'Hydrolýza solí a proč některé soli mění pH', module: 'Obecná a anorganická chemie', audience: 'Maturita' },
  { topic: 'Pufry a jak krev udržuje stálé pH 7,4', module: 'Obecná a anorganická chemie', audience: 'Přijímačky LF/VŠCHT' },
  { topic: 'Elektrofilní adice na alkadieny (1,2- vs 1,4-adice)', module: 'Organická chemie', audience: 'Přijímačky LF/VŠCHT' },
  { topic: 'Fehlingovo a Tollensovo činidlo lidsky', module: 'Biochemie', audience: 'Maturita' },
  { topic: 'Výpočet pH slabé kyseliny a disociační konstanta', module: 'Chemické výpočty a redoxní reakce', audience: 'Maturita' },
  { topic: 'Saponifikace (zmýdelnění) tuků krok za krokem', module: 'Organická chemie', audience: '1.–2. ročník SŠ' },
];

export const AILectorGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'ask'>('generator');

  // Generator inputs
  const [topic, setTopic] = useState('Hydrolýza solí a proč některé soli mění pH');
  const [module, setModule] = useState('Obecná a anorganická chemie');
  const [targetAudience, setTargetAudience] = useState('Maturita (3.–4. ročník)');
  const [format, setFormat] = useState('Kompletní výukový materiál s tabulkou, příkladem a testem');
  const [specificQuestion, setSpecificQuestion] = useState('');

  // Ask Tutor inputs
  const [tutorQuestion, setTutorQuestion] = useState('');
  const [tutorContext, setTutorContext] = useState('Organická chemie');

  // State
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setCopied(false);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          module,
          targetAudience,
          format,
          specificQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generování obsahu se nezdařilo.');
      }

      setGeneratedOutput(data.content);
    } catch (err: any) {
      console.warn('API error, falling back or notifying:', err);
      setErrorMsg(err.message || 'Nepodařilo se spojit se serverem.');
      // If error (e.g. no api key set in secrets), display an instructive friendly sample so the educator can still see the exact output style!
      setGeneratedOutput(`### 🧪 ${topic} (Ukázkový pedagogický výstup „Chemie lidsky“)

Ahoj! Dneska se podíváme na **${topic}**, což je téma, které spoustu studentů zbytečně děsí, ale když ho vezmeš selským rozumem, dává perfektní smysl.

#### 1. Co to vlastně je a jak to funguje lidsky?
Možná tě učili, že když smícháš kyselinu a zásadu, vznikne neutrální sůl a voda. **Pozor – to platí jen pro silnou kyselinu a silnou zásadu** (jako HCl + NaOH → NaCl, neutrální pH = 7)!

Jakmile je jeden z partnerů slabší, dochází k **hydrolýze**: ionty soli reagují s molekulami vody a začnou si od ní půjčovat vodíkové kationty $H^+$ nebo hydroxylové anionty $OH^-$. Tím se rovnováha vody vychýlí a roztok začne být buď mírně kyselý, nebo zásaditý.

#### 2. Kde to potkáš v praxi a v životě?
* **Prášek do pečiva a jedlá soda (NaHCO₃)**: Soda je sůl silné zásady (NaOH) a slabé kyseliny (H₂CO₃). Ve vodě hydrolyzuje **zásaditě** (pH cca 8,5). Proto se pije při pálení žáhy – neutralizuje přebytečnou kyselinu v žaludku!
* **Amonná hnojiva na zahradě (NH₄NO₃)**: Sůl slabé zásady (amoniaku) a silné kyseliny (HNO₃). Ve vlhké půdě hydrolyzuje **kysele** a mírně okyseluje zeminu.

#### 3. Přehledná tabulka pro 100% orientaci
| Původ soli | Příklad sloučeniny | Kdo hydrolyzuje? | Výsledné pH roztoku |
| :--- | :--- | :--- | :--- |
| **Silná kyselina + Silná zásada** | NaCl, KNO₃, Na₂SO₄ | Nikdo (ionty vodu neovlivní) | **Neutrální (pH = 7)** |
| **Slabá kyselina + Silná zásada** | CH₃COONa, NaHCO₃, KCN | Anion slabé kyseliny bere H⁺ z vody | **Zásadité (pH > 7)** |
| **Silná kyselina + Slabá zásada** | NH₄Cl, FeCl₃, AlCl₃ | Kation slabé zásady uvolňuje H⁺ | **Kyselé (pH < 7)** |
| **Slabá kyselina + Slabá zásada** | CH₃COONH₄ | Obě složky | Podle toho, čí $K_a$ nebo $K_b$ je větší |

#### 4. Chyták u maturity a přijímaček na LF / VŠCHT
Častá testová otázka: *„Jaké pH má vodný roztok chloridu železitého FeCl₃?“*
Většina lidí řekne „neutrální, protože je to sůl“. **Chyba!** Železitý kation $Fe^{3+}$ silně polarizuje vodu a uvolňuje protony do roztoku ($Fe(OH)_3$ je slabá zásada, zatímco HCl je silná kyselina). Roztok FeCl₃ je proto **výrazně kyselý (pH kolem 2–3)** a žlutohnědě zabarvený!

#### 5. Rychlý minitest na závěr
1. **Otázka:** Bude mít roztok octanu sodného (CH₃COONa) pH menší než 7, rovno 7, nebo větší než 7?
   * *Odpověď:* Větší než 7 (zásadité), protože kyselina octová je slabá a hydroxid sodný silný.
2. **Otázka:** Proč se při solení polévky kuchyňskou solí NaCl její pH nezmění?
   * *Odpověď:* Protože Na⁺ i Cl⁻ pocházejí ze silné zásady a silné kyseliny a s vodou nereagují (nepodléhají hydrolýze).`);
    } finally {
      setLoading(false);
    }
  };

  const handleAskTutor = async () => {
    if (!tutorQuestion.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setCopied(false);

    try {
      const response = await fetch('/api/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: tutorQuestion,
          context: tutorContext,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Dotaz se nepodařilo zodpovědět.');
      }
      setGeneratedOutput(data.answer);
    } catch (err: any) {
      setErrorMsg(err.message || 'Nepodařilo se spojit s lektorem.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedOutput) return;
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadMarkdown = () => {
    if (!generatedOutput) return;
    const blob = new Blob([generatedOutput], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${topic.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
          <span>Pedagogický asistent & Generátor obsahu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Lektor a tvůrce obsahu „Chemie lidsky“
        </h2>
        <p className="mt-2 text-amber-100 max-w-2xl text-sm sm:text-base leading-relaxed">
          Zadej jakékoliv chemické téma, otázku ze zkoušky nebo konkrétní látku. Lektor ti připraví
          srozumitelný text přesně podle pedagogických pravidel projektu: bez akademické hantýrky,
          s analogiemi ze života, přehlednou tabulkou, chytákem u přijímaček a cvičnými otázkami.
        </p>

        {/* Tab switch */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'generator'
                ? 'bg-white text-orange-900 shadow-md'
                : 'bg-orange-800/60 text-orange-100 hover:bg-orange-800/90'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Generátor výukových materiálů
          </button>
          <button
            onClick={() => setActiveTab('ask')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ask'
                ? 'bg-white text-orange-900 shadow-md'
                : 'bg-orange-800/60 text-orange-100 hover:bg-orange-800/90'
            }`}
          >
            <Lightbulb className="w-4 h-4" /> Zeptej se lektora na konkrétní dotaz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            {activeTab === 'generator' ? (
              <>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black">1</span>
                  Zadání výukového tématu
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Téma / Kapitola:
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="např. Hydrolýza solí nebo Křížové pravidlo"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900 text-sm bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Modul:
                    </label>
                    <select
                      value={module}
                      onChange={(e) => setModule(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800 text-xs bg-slate-50 focus:bg-white"
                    >
                      <option>Obecná a anorganická chemie</option>
                      <option>Chemické výpočty a redoxní reakce</option>
                      <option>Organická chemie</option>
                      <option>Biochemie a metabolismus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Cílová úroveň:
                    </label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800 text-xs bg-slate-50 focus:bg-white"
                    >
                      <option>1.–2. ročník SŠ (Základní srozumitelnost)</option>
                      <option>Maturita (3.–4. ročník)</option>
                      <option>Přijímačky LF UK / LF MU & VŠCHT</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Požadovaný formát výstupu:
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800 text-xs bg-slate-50 focus:bg-white"
                  >
                    <option>Kompletní výukový materiál s tabulkou, příkladem a testem</option>
                    <option>Krok za krokem návod na výpočet či reakci</option>
                    <option>Příklad ze života a analogie k výkladu do hodiny</option>
                    <option>Sada 3 maturitních testových otázek s podrobným vysvětlením</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Doplňující specifikace (volitelně):
                  </label>
                  <textarea
                    rows={2}
                    value={specificQuestion}
                    onChange={(e) => setSpecificQuestion(e.target.value)}
                    placeholder="např. Zaměř se na rozdíl mezi kationtovou a aniontovou hydrolýzou..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-slate-800 bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Lektor připravuje lidský výklad...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Vygenerovat výukový materiál
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-black">?</span>
                  Přímý dotaz lektorovi
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Vyber modul:
                  </label>
                  <select
                    value={tutorContext}
                    onChange={(e) => setTutorContext(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-slate-800 text-xs bg-slate-50 focus:bg-white"
                  >
                    <option>Obecná a anorganická chemie</option>
                    <option>Chemické výpočty a redoxní reakce</option>
                    <option>Organická chemie</option>
                    <option>Biochemie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Znění tvého dotazu nebo zadání příkladu:
                  </label>
                  <textarea
                    rows={4}
                    value={tutorQuestion}
                    onChange={(e) => setTutorQuestion(e.target.value)}
                    placeholder="např. Proč se při adici HBr na propen tvoří 2-brompropan a ne 1-brompropan? Vysvětli mi to prosím jako člověku."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm text-slate-900 bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <button
                  onClick={handleAskTutor}
                  disabled={loading || !tutorQuestion.trim()}
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Lektor analyzuje dotaz...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Odeslat dotaz lektorovi
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Quick Inspirations */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Populární témata na 1 klik:
            </span>
            <div className="flex flex-col gap-2">
              {SAMPLE_TOPICS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(s.topic);
                    setModule(s.module);
                    setTargetAudience(s.audience);
                    setActiveTab('generator');
                  }}
                  className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all text-xs font-medium text-slate-700 flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{s.topic}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 shrink-0 ml-2 font-semibold">
                    {s.audience}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm min-h-[500px] flex flex-col justify-between">
            <div>
              {/* Output Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800 text-sm">
                    Výukový výstup „Chemie lidsky“
                  </span>
                </div>

                {generatedOutput && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Kopírovat do schránky"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Zkopírováno' : 'Kopírovat'}
                    </button>
                    <button
                      onClick={downloadMarkdown}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Stáhnout Markdown soubor"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Stáhnout .md
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Vytisknout výpisky"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Tisk
                    </button>
                  </div>
                )}
              </div>

              {/* Error Notice */}
              {errorMsg && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold mb-0.5">Upozornění ke spojení s AI:</div>
                    <div>{errorMsg}</div>
                    <div className="mt-1 text-[11px] text-amber-800">
                      Níže je zobrazen připravený modelový pedagogický výstup podle zadaných pravidel „Chemie lidsky“.
                    </div>
                  </div>
                </div>
              )}

              {/* Generated Content Body */}
              {generatedOutput ? (
                <div className="mt-6 prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
                  {/* Clean Markdown rendering */}
                  {generatedOutput.split('\n\n').map((block, idx) => {
                    if (block.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-extrabold text-slate-900 pt-3 border-b border-slate-100 pb-2">
                          {block.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (block.startsWith('#### ')) {
                      return (
                        <h4 key={idx} className="text-base font-bold text-amber-800 pt-2 flex items-center gap-2">
                          {block.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (block.startsWith('|')) {
                      // Render as formatted table
                      const rows = block.trim().split('\n').filter(r => !r.includes('---'));
                      const headers = rows[0]?.split('|').map(c => c.trim()).filter(Boolean) || [];
                      const bodyRows = rows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));

                      return (
                        <div key={idx} className="overflow-x-auto my-4 rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 border-b border-slate-200 text-slate-700">
                              <tr>
                                {headers.map((h, i) => (
                                  <th key={i} className="p-3 font-bold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                              {bodyRows.map((row, rI) => (
                                <tr key={rI} className="hover:bg-slate-50">
                                  {row.map((cell, cI) => (
                                    <td key={cI} className="p-3 text-slate-700">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                    if (block.startsWith('* ') || block.startsWith('- ')) {
                      const items = block.split('\n').map(l => l.replace(/^[*|-]\s+/, ''));
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
                          {items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{
                              __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
                            }} />
                          ))}
                        </ul>
                      );
                    }

                    // Standard paragraph
                    return (
                      <p
                        key={idx}
                        className="text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: block
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em class="text-slate-800">$1</em>')
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    Zadej téma a klikni na „Vygenerovat výukový materiál“
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Během chvilky obdržíš text přizpůsobený středoškolákům srozumitelným, povzbudivým stylem
                    bez nudné akademické hantýrky.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Rules Reminder */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
              <span>Standard „Chemie lidsky“: 1. Lidský tón • 2. Krátké odstavce & tabulky • 3. Příklady ze života • 4. Chytáky na LF/VŠCHT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
