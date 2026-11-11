import React, { useState } from 'react';
import { Atom, Info, Sparkles } from 'lucide-react';

interface ElementCard {
  symbol: string;
  name: string;
  z: number;
  weight: number;
  en: number; // Electronegativity
  oxStates: string;
  block: 's' | 'p' | 'd';
  group: string;
}

const COMMON_ELEMENTS: ElementCard[] = [
  { symbol: 'H', name: 'Vodík', z: 1, weight: 1.008, en: 2.2, oxStates: '+I, -I', block: 's', group: '1. skupina' },
  { symbol: 'He', name: 'Helium', z: 2, weight: 4.003, en: 0, oxStates: '0', block: 's', group: '18. skupina' },
  { symbol: 'Li', name: 'Lithium', z: 3, weight: 6.94, en: 0.98, oxStates: '+I', block: 's', group: 'Alkalické kovy' },
  { symbol: 'C', name: 'Uhlík', z: 6, weight: 12.011, en: 2.55, oxStates: '-IV až +IV', block: 'p', group: '14. skupina' },
  { symbol: 'N', name: 'Dusík', z: 7, weight: 14.007, en: 3.04, oxStates: '-III až +V', block: 'p', group: 'Pniktogeny' },
  { symbol: 'O', name: 'Kyslík', z: 8, weight: 15.999, en: 3.44, oxStates: '-II, -I', block: 'p', group: 'Chalkogeny' },
  { symbol: 'F', name: 'Fluor', z: 9, weight: 18.998, en: 3.98, oxStates: '-I', block: 'p', group: 'Halogeny (nejvíce EN)' },
  { symbol: 'Na', name: 'Sodík', z: 11, weight: 22.990, en: 0.93, oxStates: '+I', block: 's', group: 'Alkalické kovy' },
  { symbol: 'Mg', name: 'Hořčík', z: 12, weight: 24.305, en: 1.31, oxStates: '+II', block: 's', group: 'Kovy alk. zemin' },
  { symbol: 'Al', name: 'Hliník', z: 13, weight: 26.982, en: 1.61, oxStates: '+III', block: 'p', group: '13. skupina' },
  { symbol: 'Si', name: 'Křemík', z: 14, weight: 28.085, en: 1.90, oxStates: '+IV', block: 'p', group: '14. skupina' },
  { symbol: 'P', name: 'Fosfor', z: 15, weight: 30.974, en: 2.19, oxStates: '-III, +III, +V', block: 'p', group: 'Pniktogeny' },
  { symbol: 'S', name: 'Síra', z: 16, weight: 32.06, en: 2.58, oxStates: '-II, +IV, +VI', block: 'p', group: 'Chalkogeny' },
  { symbol: 'Cl', name: 'Chlor', z: 17, weight: 35.45, en: 3.16, oxStates: '-I, +I, +III, +V, +VII', block: 'p', group: 'Halogeny' },
  { symbol: 'K', name: 'Draslík', z: 19, weight: 39.098, en: 0.82, oxStates: '+I', block: 's', group: 'Alkalické kovy' },
  { symbol: 'Ca', name: 'Vápník', z: 20, weight: 40.078, en: 1.00, oxStates: '+II', block: 's', group: 'Kovy alk. zemin' },
  { symbol: 'Fe', name: 'Železo', z: 26, weight: 55.845, en: 1.83, oxStates: '+II, +III', block: 'd', group: 'Přechodné kovy' },
  { symbol: 'Cu', name: 'Měď', z: 29, weight: 63.546, en: 1.90, oxStates: '+I, +II', block: 'd', group: 'Mincovní kovy' },
  { symbol: 'Zn', name: 'Zinek', z: 30, weight: 65.38, en: 1.65, oxStates: '+II', block: 'd', group: '12. skupina' },
  { symbol: 'Br', name: 'Brom', z: 35, weight: 79.904, en: 2.96, oxStates: '-I, +I, +V', block: 'p', group: 'Halogeny' },
  { symbol: 'I', name: 'Jod', z: 53, weight: 126.90, en: 2.66, oxStates: '-I, +V, +VII', block: 'p', group: 'Halogeny' },
];

export const PeriodicTableQuick: React.FC = () => {
  const [selectedEl, setSelectedEl] = useState<ElementCard>(COMMON_ELEMENTS[3]); // Uhlík

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Atom className="w-3.5 h-3.5" />
          <span>Rychlý přehled pro výpočty a vazby</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Periodická tabulka: Elektronegativity a molární hmotnosti
        </h2>
        <p className="mt-2 text-teal-100 max-w-2xl text-sm leading-relaxed">
          Klíčové prvky pro středoškolskou chemii a výpočty. Klikni na libovolný prvek pro zobrazení
          jeho elektronegativity (X), molární hmotnosti (M) a typických oxidačních čísel.
        </p>

        {/* Electronegativity Trend Highlight */}
        <div className="mt-5 p-3.5 bg-white/10 rounded-2xl border border-white/20 text-xs leading-relaxed max-w-xl">
          <strong>Elektronegativita lidsky:</strong> Schopnost atomu přitahovat k sobě vazebné elektrony.
          V tabulce roste <strong>zleva doprava</strong> a <strong>zdola nahoru</strong>. Králem nenasytnosti je <strong>Fluor (X = 3,98)</strong>, následovaný kyslíkem (X = 3,44) a dusíkem (X = 3,04).
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Elements Grid */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Vyber prvek (barevně podle bloku):</span>
            <div className="flex gap-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-sky-200 border border-sky-400" /> s-blok</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-200 border border-emerald-400" /> p-blok</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-200 border border-amber-400" /> d-blok</span>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {COMMON_ELEMENTS.map((el) => {
              const isSelected = selectedEl.symbol === el.symbol;
              const blockColor =
                el.block === 's' ? 'bg-sky-50 border-sky-300 text-sky-900 hover:bg-sky-100' :
                el.block === 'p' ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100' :
                'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100';

              return (
                <button
                  key={el.symbol}
                  onClick={() => setSelectedEl(el)}
                  className={`p-2.5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer ${blockColor} ${
                    isSelected ? 'ring-2 ring-slate-900 scale-105 shadow-md' : 'shadow-xs'
                  }`}
                >
                  <span className="text-[10px] text-slate-400 font-mono self-start">{el.z}</span>
                  <span className="text-xl font-black font-mono tracking-tight">{el.symbol}</span>
                  <span className="text-[10px] font-semibold truncate w-full">{el.name}</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-0.5">{el.weight.toFixed(1)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Element Detail Inspector */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-mono shadow-md">
              <span className="text-xs text-slate-400">Z = {selectedEl.z}</span>
              <span className="text-2xl font-black">{selectedEl.symbol}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedEl.name}</h3>
              <span className="text-xs text-slate-500">{selectedEl.group}</span>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Molární hmotnost M:</span>
              <span className="font-mono font-bold text-slate-900">{selectedEl.weight} g/mol</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Elektronegativita (Pauling):</span>
              <span className="font-mono font-bold text-emerald-700">{selectedEl.en > 0 ? selectedEl.en : '–'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Běžná oxidační čísla:</span>
              <span className="font-mono font-bold text-indigo-700">{selectedEl.oxStates}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Elektronový blok:</span>
              <span className="font-bold uppercase text-slate-800">{selectedEl.block}-blok</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 leading-relaxed border border-slate-200">
            💡 <strong>Rychlý výpočet vazby:</strong> Pokud {selectedEl.name} váže jiný prvek, odečti jejich elektronegativity:
            pokud je rozdíl &gt; 1,7, vznikne iontová vazba; pokud 0,4–1,7, polární kovalentní; pod 0,4 nepolární.
          </div>
        </div>
      </div>
    </div>
  );
};
