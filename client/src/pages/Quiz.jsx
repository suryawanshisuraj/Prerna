import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Check, X, RotateCcw, Award } from 'lucide-react';
import { fetchQuiz, submitQuizScore } from '../services/api';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    fetchQuiz().then(data => setQuestions(data));
  }, []);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#b0004a] font-serif">
        Loading quiz...
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setIsAnswered(false);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        submitQuizScore(finalScore, questions.length);
        setShowResultModal(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setShowResultModal(false);
  };

  return (
    <main className="relative z-10 pt-28 pb-36 px-6 max-w-xl mx-auto flex flex-col items-center">
      {/* Title & Progress */}
      <div className="w-full text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-[#b0004a] font-bold mb-1">
          The Love Quiz
        </h2>
        <p className="font-sans text-sm text-[#5a4044] mb-4">
          How well do we know our own story?
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-[#ffe9e7] rounded-full overflow-hidden mb-2 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#b0004a] to-[#fd6c9c] transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="flex justify-between text-xs font-bold text-[#ab2c5d]">
          <span>Question {currentIdx + 1} of {questions.length}</span>
          <span>Hearts: {score} ❤️</span>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="w-full bg-white p-6 shadow-[0px_10px_30px_rgba(74,14,14,0.08)] rounded-2xl border border-white">
        {/* Question Image */}
        <div className="aspect-[4/3] w-full bg-[#fff0ef] rounded-xl overflow-hidden mb-6 relative">
          <img
            src={currentQ.image}
            alt="Quiz question"
            className="w-full h-full object-cover"
          />

          {isAnswered && (
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center animate-fadeIn">
              {selectedOpt === currentQ.correct ? (
                <div className="bg-[#b0004a] text-white p-4 rounded-full shadow-lg">
                  <Check className="w-10 h-10" />
                </div>
              ) : (
                <div className="bg-[#ba1a1a] text-white p-4 rounded-full shadow-lg">
                  <X className="w-10 h-10" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Question Text */}
        <h3 className="font-serif text-xl md:text-2xl text-[#3d0506] font-bold mb-6 text-center leading-snug">
          {currentQ.q}
        </h3>

        {/* Options */}
        <div className="grid gap-3">
          {currentQ.options.map((opt, idx) => {
            let style = "border-[#e3bdc3] text-[#5a4044] hover:bg-[#ffe9e7] hover:border-[#b0004a]";

            if (isAnswered) {
              if (idx === currentQ.correct) {
                style = "bg-[#d81b60] text-white border-[#b0004a]";
              } else if (idx === selectedOpt) {
                style = "bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full py-3.5 px-5 text-left rounded-xl border-2 font-sans font-semibold transition-all duration-300 flex justify-between items-center ${style}`}
              >
                <span>{opt}</span>
                <Heart className={`w-4 h-4 opacity-50 ${isAnswered && idx === currentQ.correct ? 'fill-current' : ''}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Modal */}
      {showResultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#ffe2df] p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-white">
            <div className="w-20 h-20 bg-[#b0004a] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#b0004a] mb-2">
              Soulmate Found!
            </h3>

            <p className="font-sans text-sm text-[#5a4044] mb-6">
              You scored <span className="font-bold text-[#b0004a]">{score}</span> out of {questions.length}! Your love story is truly magical.
            </p>

            <button
              onClick={restartQuiz}
              className="w-full py-4 bg-gradient-to-r from-[#b0004a] to-[#ab2c5d] text-white rounded-full font-sans font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
