import React, { useState } from 'react';
import { Topic, QuizQuestion } from '../types/chemistry';
import { Sparkles, CheckCircle2, XCircle, AlertTriangle, Lightbulb, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';

interface TopicDetailProps {
  topic: Topic;
  onBack?: () => void;
  onSelectTopic?: (topicId: string) => void;
}

export const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (selectedAnswers[qId] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Tagline Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Výukový modul Chemie lidsky</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {topic.title}
        </h1>
        <p className="text-slate-600 font-medium text-base sm:text-lg">
          {topic.tagline}
        </p>

        {/* Short Summary */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-700 leading-relaxed font-normal">
          {topic.summary}
        </div>
      </div>

      {/* Human Explanation Section */}
      <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base sm:text-lg">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h2>Lidské vysvětlení selským rozumem</h2>
        </div>
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-3 font-normal whitespace-pre-line">
          {topic.humanExplanation}
        </div>
      </div>

      {/* Life Example & Analogy */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-700 font-bold text-base sm:text-lg">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h2>Příklad ze života a praxe: {topic.lifeExample.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              💡 Analogie pro snadné zapamatování
            </span>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              {topic.lifeExample.analogy}
            </p>
          </div>

          <div className="p-5 bg-sky-50/60 rounded-2xl border border-sky-200/80 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900 block">
              🔬 Kde to potkáš v reálném světě
            </span>
            <p className="text-xs sm:text-sm text-sky-950 leading-relaxed">
              {topic.lifeExample.inPractice}
            </p>
          </div>
        </div>
      </div>

      {/* Key Points (Bullets with bold keywords) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Klíčové zákonitosti, které musíš znát
        </h2>
        <ul className="space-y-3">
          {topic.keyPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: point
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-bold">$1</strong>')
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Formatted Markdown Table */}
      {topic.tableData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            {topic.tableData.caption || 'Přehledná tabulka a srovnání'}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  {topic.tableData.headers.map((h, idx) => (
                    <th key={idx} className="p-3.5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topic.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3.5 text-slate-700">
                        {cIdx === 0 ? <strong className="text-slate-900">{cell}</strong> : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Step by step procedure (if present) */}
      {topic.stepByStep && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-slate-900">
            {topic.stepByStep.title}
          </h2>
          <div className="space-y-4">
            {topic.stepByStep.steps.map((st) => (
              <div key={st.number} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                    {st.number}
                  </span>
                  <span>{st.label}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 pl-8 leading-relaxed">
                  {st.detail}
                </p>
                {st.tip && (
                  <div className="ml-8 p-2.5 bg-emerald-100/60 rounded-xl text-xs text-emerald-900 font-semibold">
                    💡 {st.tip}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Trap Card */}
      <div className="bg-rose-50/80 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-rose-900 font-extrabold text-base sm:text-lg">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <h2>{topic.examTrap.heading}</h2>
        </div>
        <p className="text-xs sm:text-sm text-rose-950 leading-relaxed font-medium">
          {topic.examTrap.warning}
        </p>
        <div className="p-3.5 bg-white rounded-xl border border-rose-200 text-xs text-rose-900 font-semibold">
          🧠 <strong>Jak si to navždy zapamatovat:</strong> {topic.examTrap.howToRemember}
        </div>
      </div>

      {/* Practice Mini-Quiz for this topic */}
      {topic.practiceQuestions.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Rychlý kontrolní minitest k tématu
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {topic.practiceQuestions.length} {topic.practiceQuestions.length === 1 ? 'otázka' : 'otázky'}
            </span>
          </div>

          <div className="space-y-6">
            {topic.practiceQuestions.map((q) => {
              const userAnswer = selectedAnswers[q.id];
              const isAnswered = userAnswer !== undefined;

              return (
                <div key={q.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Úroveň: {q.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {q.question}
                  </h3>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = optIdx === q.correctIndex;

                      let btnClass = 'border-slate-200 hover:bg-white text-slate-700';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSelected) {
                          btnClass = 'border-rose-400 bg-rose-50 text-rose-950';
                        } else {
                          btnClass = 'border-slate-100 text-slate-400 opacity-50';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500" />}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                      userAnswer === q.correctIndex ? 'bg-emerald-100 text-emerald-950 font-medium' : 'bg-rose-100 text-rose-950'
                    }`}>
                      <strong>Vysvětlení:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
