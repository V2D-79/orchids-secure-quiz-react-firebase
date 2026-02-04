"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQuiz } from "@/context/QuizContext";

export default function QuizPage() {
  const {
    state,
    questions,
    config,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    addWarning,
    updateTimer,
  } = useQuiz();

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSetupRef = useRef(false);

  const currentQuestion = questions[state.currentQuestionIndex];
  const answeredCount = Object.keys(state.answers).length;

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    if (state.status !== "in_progress") return;

    timerRef.current = setInterval(() => {
      updateTimer(state.timeRemaining - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.status, state.timeRemaining, updateTimer]);

  // Auto submit when time runs out
  useEffect(() => {
    if (state.timeRemaining <= 0 && state.status === "in_progress") {
      submitQuiz();
    }
  }, [state.timeRemaining, state.status, submitQuiz]);

  // Handle visibility change callback
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && state.status === "in_progress") {
      const shouldSubmit = addWarning();
      if (shouldSubmit) {
        submitQuiz();
      } else {
        setShowWarningModal(true);
      }
    }
  }, [state.status, addWarning, submitQuiz]);

  // Handle blur callback
  const handleBlur = useCallback(() => {
    if (state.status === "in_progress") {
      const shouldSubmit = addWarning();
      if (shouldSubmit) {
        submitQuiz();
      } else {
        setShowWarningModal(true);
      }
    }
  }, [state.status, addWarning, submitQuiz]);

  // Anti-cheating measures
  useEffect(() => {
    if (state.status !== "in_progress" || hasSetupRef.current) return;
    hasSetupRef.current = true;

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    // Disable certain keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+C, Ctrl+V, Ctrl+U, F12
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "u")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    // Warn before refresh/close
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Your exam will be submitted if you leave!";
      return e.returnValue;
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Disable text selection via CSS
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      hasSetupRef.current = false;
    };
  }, [state.status, handleVisibilityChange, handleBlur]);

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    submitQuiz();
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (state.timeRemaining <= 60) return "text-red-600 animate-pulse";
    if (state.timeRemaining <= 300) return "text-orange-500";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 select-none">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{config.title}</h1>
            <p className="text-sm text-gray-500">
              {state.userInfo?.name} | Question {state.currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Warnings indicator */}
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Warnings: {state.warnings}/{config.maxWarnings}
              </span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg ${getTimerColor()}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-mono font-bold text-lg">
                {formatTime(state.timeRemaining)}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Question Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Question header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {currentQuestion.category}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Question {state.currentQuestionIndex + 1}</span>
            </div>

            {/* Question text */}
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = state.answers[currentQuestion.id] === index;
                return (
                  <button
                    key={index}
                    onClick={() => answerQuestion(currentQuestion.id, index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-800"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-semibold ${
                      isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-mono">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={prevQuestion}
                disabled={state.currentQuestionIndex === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {state.currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Finish & Submit
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator Sidebar */}
        <div className="w-72">
          <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Question Navigator</h3>
            
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Answered</span>
                <span>{answeredCount}/{questions.length}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question grid */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const isAnswered = state.answers[q.id] !== undefined;
                const isCurrent = index === state.currentQuestionIndex;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                      isCurrent
                        ? "bg-blue-600 text-white ring-2 ring-blue-300"
                        : isAnswered
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 pt-4 border-t space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded bg-green-500" />
                <span className="text-gray-600">Answered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded bg-gray-200" />
                <span className="text-gray-600">Not Answered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="w-4 h-4 rounded bg-blue-600" />
                <span className="text-gray-600">Current</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-bounce">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Warning!</h3>
              <p className="text-gray-600 mb-4">
                You switched tabs or windows! This is your warning {state.warnings} of {config.maxWarnings}.
                <br />
                <strong>Next time, your exam will be auto-submitted!</strong>
              </p>
              <button
                onClick={() => setShowWarningModal(false)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Submit Exam?</h3>
              <p className="text-gray-600 mb-2">
                You have answered <strong>{answeredCount}</strong> out of <strong>{questions.length}</strong> questions.
              </p>
              {answeredCount < questions.length && (
                <p className="text-orange-600 text-sm mb-4">
                  Warning: {questions.length - answeredCount} questions are unanswered!
                </p>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Continue Exam
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Yes, Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
