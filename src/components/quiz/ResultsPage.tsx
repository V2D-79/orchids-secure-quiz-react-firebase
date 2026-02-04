"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizQuestions } from "@/data/quizQuestions";

export default function ResultsPage() {
  const { state, config, resetQuiz } = useQuiz();
  
  const isPassed = state.score >= config.passingScore;
  
  // Calculate detailed results
  const totalQuestions = quizQuestions.length;
  const correctAnswers = quizQuestions.filter(
    (q) => state.answers[q.id] === q.correctAnswer
  ).length;
  const wrongAnswers = Object.keys(state.answers).length - correctAnswers;
  const unanswered = totalQuestions - Object.keys(state.answers).length;

  // Calculate time taken
  const getTimeTaken = () => {
    if (state.startTime && state.endTime) {
      const diff = state.endTime.getTime() - state.startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
    return "N/A";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`px-8 py-10 text-center ${isPassed ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${isPassed ? "bg-white/20" : "bg-white/20"}`}>
              {isPassed ? (
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {isPassed ? "Congratulations!" : "Better Luck Next Time!"}
            </h1>
            <p className="text-white/80">
              {isPassed ? "You have passed the exam" : "You did not pass the exam"}
            </p>
          </div>

          {/* Score Circle */}
          <div className="relative -mt-8 flex justify-center">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center ${isPassed ? "bg-green-100" : "bg-red-100"}`}>
                <span className={`text-4xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                  {state.score}%
                </span>
                <span className="text-gray-500 text-sm">Score</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-8 py-8">
            {/* User Info */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800">{state.userInfo?.name}</h2>
              <p className="text-gray-500">{state.userInfo?.email}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-green-700">Correct</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{wrongAnswers}</div>
                <div className="text-sm text-red-700">Wrong</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-gray-600">{unanswered}</div>
                <div className="text-sm text-gray-700">Skipped</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{getTimeTaken()}</div>
                <div className="text-sm text-blue-700">Time Taken</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Exam Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Exam</span>
                  <span className="font-medium text-gray-800">{config.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-medium text-gray-800">{totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passing Score</span>
                  <span className="font-medium text-gray-800">{config.passingScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Score</span>
                  <span className={`font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {state.score}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Warnings Received</span>
                  <span className={`font-medium ${state.warnings > 0 ? "text-orange-600" : "text-green-600"}`}>
                    {state.warnings}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {isPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={resetQuiz}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Take Another Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Answer Review Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Answer Review</h3>
          <div className="space-y-6">
            {quizQuestions.map((question, index) => {
              const userAnswer = state.answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <div key={question.id} className={`p-4 rounded-lg border-2 ${
                  !wasAnswered 
                    ? "border-gray-200 bg-gray-50" 
                    : isCorrect 
                    ? "border-green-200 bg-green-50" 
                    : "border-red-200 bg-red-50"
                }`}>
                  <div className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      !wasAnswered 
                        ? "bg-gray-300 text-gray-600" 
                        : isCorrect 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">{question.question}</p>
                      <div className="space-y-1 text-sm">
                        {question.options.map((option, optIndex) => {
                          const isUserAnswer = userAnswer === optIndex;
                          const isCorrectAnswer = question.correctAnswer === optIndex;
                          
                          return (
                            <div 
                              key={optIndex}
                              className={`p-2 rounded ${
                                isCorrectAnswer 
                                  ? "bg-green-200 text-green-800 font-medium" 
                                  : isUserAnswer 
                                  ? "bg-red-200 text-red-800" 
                                  : "text-gray-600"
                              }`}
                            >
                              <span className="font-mono">{String.fromCharCode(65 + optIndex)}.</span> {option}
                              {isCorrectAnswer && " ✓"}
                              {isUserAnswer && !isCorrectAnswer && " ✗"}
                            </div>
                          );
                        })}
                      </div>
                      {!wasAnswered && (
                        <p className="mt-2 text-gray-500 text-sm italic">Not answered</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
