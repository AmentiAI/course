'use client';

import { useState } from 'react';
import { Award, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface LessonQuizProps {
  lessonId: string;
  questions: QuizQuestion[];
  lessonTitle: string;
}

export default function LessonQuiz({ lessonId, questions }: LessonQuizProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null),
  );
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    if (submitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setShowResults(true);

    const score = selectedAnswers.reduce((acc: number, answer, idx) => {
      return answer !== null && answer === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonId,
          answers: selectedAnswers,
          score: Math.round((score / questions.length) * 100),
        }),
      });
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setSubmitted(false);
    setStarted(true);
  };

  const calculateScore = () =>
    selectedAnswers.reduce((acc: number, answer, idx) => {
      return answer !== null && answer === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

  const scorePercentage = Math.round((calculateScore() / questions.length) * 100);

  if (!started) {
    return (
      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-7">
        <div className="flex items-start gap-5">
          <div className="shrink-0 w-12 h-12 rounded-md bg-[#f5ecd7] border border-[#e7d7b0] flex items-center justify-center">
            <Award className="h-6 w-6 text-[#98753f]" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <p className="academic-label mb-2">Assessment</p>
            <h3 className="font-serif text-2xl font-bold text-[#0a2540] mb-2 tracking-tight">
              Lesson Knowledge Check.
            </h3>
            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              {questions.length} questions &middot; approximately{' '}
              {Math.ceil(questions.length * 0.5)} minutes &middot; instant feedback
            </p>
            <button
              onClick={() => setStarted(true)}
              className="rounded-md bg-[#0a2540] hover:bg-[#123258] px-5 py-2.5 text-sm font-semibold tracking-wide text-white transition-colors inline-flex items-center gap-2"
            >
              Begin Assessment
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = scorePercentage >= 80;
    const partial = scorePercentage >= 60;
    return (
      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-7">
        <div className="text-center mb-8">
          <p className="academic-label mb-3">Assessment Result</p>
          <div
            className={`w-20 h-20 mx-auto rounded-md border flex items-center justify-center mb-4 ${
              passed
                ? 'bg-[#14532d] border-[#14532d]'
                : partial
                ? 'bg-[#98753f] border-[#98753f]'
                : 'bg-[#9f1239] border-[#9f1239]'
            }`}
          >
            <span className="font-serif text-2xl font-bold text-white tracking-tight">
              {scorePercentage}%
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#0a2540] mb-1 tracking-tight">
            {passed ? 'Outstanding work.' : partial ? 'Good effort.' : 'Keep practicing.'}
          </h3>
          <p className="text-sm text-slate-600">
            You answered {calculateScore()} of {questions.length} questions correctly.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = selectedAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`rounded-md border p-5 ${
                  isCorrect
                    ? 'border-[#bbf7d0] bg-[#dcfce7]/40'
                    : 'border-rose-200 bg-rose-50/50'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-[#14532d] shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0a2540] mb-2">
                      Question {idx + 1}: {q.question}
                    </p>
                    <p className="text-xs text-slate-600 mb-1.5">
                      Your answer:{' '}
                      <span
                        className={
                          isCorrect
                            ? 'text-[#14532d] font-semibold'
                            : 'text-rose-700 font-semibold'
                        }
                      >
                        {q.options[userAnswer as number]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-[#14532d] font-semibold mb-1.5">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 italic leading-relaxed mt-2 pt-2 border-t border-slate-200/70">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleRetake}
            className="flex-1 rounded-md border border-[#b08d57] bg-white hover:bg-[#f5ecd7] px-4 py-3 text-sm font-semibold tracking-wide text-[#0a2540] transition-colors inline-flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="mt-10 rounded-lg border border-slate-200 bg-white p-7">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-medium mb-2">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#98753f]">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0a2540] transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-serif text-xl font-bold text-[#0a2540] mb-5 leading-snug tracking-tight">
          {question.question}
        </h4>

        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-md border transition-colors ${
                  isSelected
                    ? 'border-[#b08d57] bg-[#f5ecd7]'
                    : 'border-slate-200 hover:border-[#b08d57] bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#0a2540] bg-[#0a2540]' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm text-[#0a2540] font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-[#0a2540] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1.5">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                selectedAnswers[idx] !== null
                  ? 'bg-[#0a2540]'
                  : idx === currentQuestion
                  ? 'bg-[#b08d57]'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-5 py-2.5 bg-[#0a2540] hover:bg-[#123258] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide rounded-md transition-colors inline-flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? 'Submit Assessment' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
