import React, { useState } from 'react';
import { QuizQuestion, ModuleId } from '../types/chemistry';
import { TOPICS } from '../data/curriculumData';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, Filter, AlertTriangle } from 'lucide-react';

interface ExamQuestionWithMeta extends QuizQuestion {
  moduleName: string;
}

export const ExamPrepQuiz: React.FC = () => {
  // Extract all questions from the topics
  const allQuestions: ExamQuestionWithMeta[] = TOPICS.flatMap((t) =>
    t.practiceQuestions.map((q) => ({
      ...q,
      moduleName: t.title,
    }))
  );

  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Vše');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const filteredQuestions = selectedDifficulty === 'Vše'
    ? allQuestions
    : allQuestions.filter(q => q.difficulty === selectedDifficulty);

  const currentQ = filteredQuestions[currentIdx % filteredQuestions.length];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    setAnsweredCount(prev => prev + 1);
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 >= filteredQuestions.length) {
      setIsFinished(true);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setAnsweredCount(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-3">
          <Award className="w-3.5 h-3.5 text-yellow-300" />
          <span>Trenažér na Maturitu, Medicínu a VŠCHT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Cvičný testový simulátor s lidským vysvětlením
        </h2>
        <p className="mt-2 text-rose-100 max-w-2xl text-sm sm:text-base leading-relaxed">
          Žádné pouhé „A je správně“. U každé otázky se dozvíš, PROČ je daná volba správná a jaký zákeřný
          chyták v ní zkoušející na lékařských fakultách nebo u maturity ukryl.
        </p>

        {/* Filter buttons */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['Vše', 'SŠ základy', 'Maturita', 'Přijímačky LF/VŠCHT'].map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                handleRestart();
              }}
              className={`text-xs px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-white text-rose-900 shadow-md font-bold'
                  : 'bg-rose-900/60 text-rose-100 hover:bg-rose-900/90'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="max-w-3xl mx-auto">
        {!isFinished && currentQ ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            {/* Question Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Otázka {currentIdx + 1} z {filteredQuestions.length}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                  {currentQ.difficulty}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Téma: {currentQ.moduleName}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const isAnswered = selectedOption !== null;

                let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-500/20';
                  } else {
                    btnStyle = 'border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Pedagogical Explanation */}
            {selectedOption !== null && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className={`p-5 rounded-2xl border ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Skvěle! Tvoje odpověď je správná.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Tohle byla bohužel chybná volba.</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    <strong>Lidské vysvětlení:</strong> {currentQ.explanation}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    {currentIdx + 1 < filteredQuestions.length ? 'Další otázka' : 'Zobrazit celkové výsledky'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Test úspěšně dokončen!
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Získal jsi <strong>{score}</strong> z <strong>{filteredQuestions.length}</strong> správných odpovědí
                ({Math.round((score / filteredQuestions.length) * 100)} %).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
              {score / filteredQuestions.length >= 0.8 ? (
                <span className="text-emerald-700 font-bold">
                  🎉 Úžasný výsledek! Máš skvělý základ pro maturitu i náročné testy na medicínu a VŠCHT.
                </span>
              ) : score / filteredQuestions.length >= 0.5 ? (
                <span className="text-amber-700 font-bold">
                  👍 Dobrá práce! Projdi si výpisky a tabulky u témat, kde jsi zaváhal, a zkus test znovu.
                </span>
              ) : (
                <span className="text-rose-700 font-bold">
                  💪 Nevadí, chemie chce čas a logiku. Pročti si modul „Obecná chemie“ a křížové pravidlo a hned to půjde lépe!
                </span>
              )}
            </div>

            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-lg shadow-rose-600/20"
            >
              <RotateCcw className="w-4 h-4" /> Spustit test znovu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
