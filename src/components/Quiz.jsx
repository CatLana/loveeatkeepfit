/**
 * Quiz Component
 * Slider-style 3-question knowledge check. Front-end only — no DB save.
 *
 * Props:
 *   questions: Array<{ question: string, options: string[], correct: number }>
 *   onComplete?: (score: number, total: number) => void
 */

import { useState } from 'react';

export default function Quiz({ questions = [], onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);  // index of chosen option
  const [answers, setAnswers] = useState([]);       // array of booleans
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const total = questions.length;

  const handleSelect = (optionIndex) => {
    if (selected !== null) return; // already answered
    setSelected(optionIndex);

    const isCorrect = optionIndex === q.correct;
    const newAnswers = [...answers, isCorrect];

    if (isCorrect) {
      // Correct: auto-advance after a short pause
      setTimeout(() => {
        if (current + 1 < total) {
          setAnswers(newAnswers);
          setCurrent(current + 1);
          setSelected(null);
        } else {
          setAnswers(newAnswers);
          setFinished(true);
          const score = newAnswers.filter(Boolean).length;
          onComplete?.(score, total);
        }
      }, 900);
    } else {
      // Incorrect: record answer but wait for user to press Next
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
      const score = answers.filter(Boolean).length;
      onComplete?.(score, total);
    }
  };

  const handleRetake = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
  };

  const score = answers.filter(Boolean).length;
  const pct = Math.round((score / total) * 100);

  if (finished) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="mb-4">
          {pct === 100 ? (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-2">
              <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {score} out of {total} correct: {pct}%
        </h3>

        {pct === 100 ? (
          <p className="text-green-700 font-medium mt-2">
            Perfect score! You've got this. Move on to the next section.
          </p>
        ) : (
          <>
            <p className="text-gray-600 mt-2 mb-6">
              Good effort! It might be worth re-reading the section above to strengthen your understanding.
            </p>
            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake the quiz
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      {/* Progress indicators */}
      <div className="flex items-center gap-2 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < current
                ? answers[i]
                  ? 'bg-green-400'
                  : 'bg-red-400'
                : i === current
                ? 'bg-indigo-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-3">
        Question {current + 1} of {total}
      </p>

      <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{q.question}</h3>

      <ul className="space-y-3">
        {q.options.map((opt, i) => {
          let style = 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer';
          if (selected !== null) {
            if (i === q.correct) style = 'border-green-500 bg-green-50 text-green-900';
            else if (i === selected && i !== q.correct) style = 'border-red-400 bg-red-50 text-red-800';
            else style = 'border-gray-200 bg-gray-50 text-gray-400';
          }

          return (
            <li
              key={i}
              onClick={() => handleSelect(i)}
              className={`flex items-start gap-3 border-2 rounded-xl p-4 transition-all duration-200 ${style}`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-base leading-snug font-medium">{opt}</span>
              {selected !== null && i === q.correct && (
                <svg className="ml-auto w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>

      {/* Show Next arrow only when user answered incorrectly */}
      {selected !== null && selected !== q.correct && (
        <div className="mt-6 flex flex-col items-start gap-2">
          <p className="text-sm text-red-600 font-medium">
            The correct answer is highlighted above. Take a moment to read it before continuing.
          </p>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
          >
            {current + 1 < total ? 'Next question' : 'See results'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
