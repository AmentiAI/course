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

export default function LessonQuiz({ lessonId, questions, lessonTitle }: LessonQuizProps) {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
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
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    setShowResults(true);

    // Calculate score
    const score = selectedAnswers.reduce((acc, answer, idx) => {
      return answer !== null && answer === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);

    // Submit to backend
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

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, idx) => {
      return answer !== null && answer === questions[idx].correctAnswer ? acc + 1 : acc;
    }, 0);
  };

  const scorePercentage = Math.round((calculateScore() / questions.length) * 100);
  const allAnswered = selectedAnswers.every(answer => answer !== null);

  if (!started) {
    return (
      <div className="mt-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg mb-2">
              Test Your Knowledge
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              {questions.length} questions • ~{Math.ceil(questions.length * 0.5)} minutes
            </p>
            <p className="text-sm text-zinc-300 mb-6">
              Reinforce what you just learned by completing this quick quiz. You'll get instant feedback on each question.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="rounded-lg bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors flex items-center gap-2"
            >
              Start Quiz
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="mt-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            scorePercentage >= 80 ? 'bg-green-600' : scorePercentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
          }`}>
            <span className="text-2xl font-bold text-white">{scorePercentage}%</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {scorePercentage >= 80 ? '🎉 Great Job!' : scorePercentage >= 60 ? '👍 Good Effort!' : '📚 Keep Learning!'}
          </h3>
          <p className="text-zinc-400">
            You got {calculateScore()} out of {questions.length} questions correct
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userAnswer = selectedAnswers[idx];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`rounded-lg border p-4 ${
                  isCorrect ? 'border-green-600/50 bg-green-900/10' : 'border-red-600/50 bg-red-900/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white mb-2">
                      Question {idx + 1}: {q.question}
                    </p>
                    <p className="text-xs text-zinc-400 mb-2">
                      Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {q.options[userAnswer as number]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-green-400 mb-2">
                        Correct answer: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-xs text-zinc-500 italic">
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
            className="flex-1 rounded-lg border border-purple-600 hover:bg-purple-600/10 px-4 py-3 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <div className="mt-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-zinc-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-zinc-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          {question.question}
        </h4>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectAnswer(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === idx
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-zinc-700 hover:border-zinc-600 bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    selectedAnswer === idx
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-zinc-600'
                  }`}
                >
                  {selectedAnswer === idx && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm text-zinc-200">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                selectedAnswers[idx] !== null
                  ? 'bg-purple-500'
                  : idx === currentQuestion
                  ? 'bg-zinc-500'
                  : 'bg-zinc-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
