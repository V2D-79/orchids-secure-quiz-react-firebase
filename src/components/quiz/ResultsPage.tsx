"use client";

import { useQuiz } from "@/context/QuizContext";
import { quizQuestions } from "@/data/quizQuestions";

export default function ResultsPage() {
  const { state, config, resetQuiz } = useQuiz();
  
  const isPassed = state.percentage >= config.passingScore;
  
  const totalQuestions = quizQuestions.length;
  const correctAnswers = state.marks;
  const wrongAnswers = Object.keys(state.answers).length - correctAnswers;
  const unanswered = totalQuestions - Object.keys(state.answers).length;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-3 sm:px-4">
      <div className="max-w-3xl mx-auto">
        {/* Result Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`px-4 sm:px-8 py-6 sm:py-10 text-center ${isPassed ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-red-500 to-rose-600"}`}>
            <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">Online Exam Results</h2>
            
            <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 ${isPassed ? "bg-white/20" : "bg-white/20"}`}>
              {isPassed ? (
                <svg className="w-8 h-8 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
              {isPassed ? "Congratulations!" : "Better Luck Next Time!"}
            </h1>
            <p className="text-sm sm:text-base text-white/80">
              {isPassed ? "You have passed the exam" : "You did not pass the exam"}
            </p>
          </div>

          {/* Marks Circle */}
          <div className="relative -mt-6 sm:-mt-8 flex justify-center">
            <div className="bg-white rounded-full p-1.5 sm:p-2 shadow-lg">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center ${isPassed ? "bg-green-100" : "bg-red-100"}`}>
                <span className={`text-2xl sm:text-4xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
                  {state.marks}/{state.totalMarks}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">Marks</span>
                <span className={`text-xs sm:text-sm font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                  ({state.percentage}%)
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 sm:px-8 py-6 sm:py-8">
            {/* User Info */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 break-words">{state.userInfo?.name}</h2>
              <p className="text-sm sm:text-base text-gray-500 break-all">{state.userInfo?.email}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-green-50 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-xs sm:text-sm text-green-700">Correct</div>
                <div className="text-xs text-green-600">(+1 mark each)</div>
              </div>
              <div className="bg-red-50 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-red-600">{wrongAnswers}</div>
                <div className="text-xs sm:text-sm text-red-700">Wrong</div>
                <div className="text-xs text-red-600">(0 marks)</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-600">{unanswered}</div>
                <div className="text-xs sm:text-sm text-gray-700">Skipped</div>
                <div className="text-xs text-gray-600">(0 marks)</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{getTimeTaken()}</div>
                <div className="text-xs sm:text-sm text-blue-700">Time Taken</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-3 sm:mb-4">Exam Details</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Exam</span>
                  <span className="font-medium text-gray-800 text-right">{config.title}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-medium text-gray-800">{totalQuestions}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Total Marks</span>
                  <span className="font-medium text-gray-800">{state.totalMarks}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Your Marks</span>
                  <span className={`font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {state.marks}/{state.totalMarks}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Percentage</span>
                  <span className={`font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {state.percentage}%
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Passing Percentage</span>
                  <span className="font-medium text-gray-800">{config.passingScore}%</span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Warnings Received</span>
                  <span className={`font-medium ${state.warnings > 0 ? "text-orange-600" : "text-green-600"}`}>
                    {state.warnings}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-base">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${isPassed ? "text-green-600" : "text-red-600"}`}>
                    {isPassed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <p className="text-gray-500 mb-3 sm:mb-4 text-xs sm:text-sm">
                {state.dbError ? state.dbError : 'Your results have been saved to the database.'}
              </p>
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Answer Review Section */}
        <div className="mt-6 sm:mt-8 bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Answer Review (1 Mark per Question)</h3>
          <div className="space-y-4 sm:space-y-6">
            {quizQuestions.map((question, index) => {
              const userAnswer = state.answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <div key={question.id} className={`p-3 sm:p-4 rounded-lg border-2 ${
                  !wasAnswered 
                    ? "border-gray-200 bg-gray-50" 
                    : isCorrect 
                    ? "border-green-200 bg-green-50" 
                    : "border-red-200 bg-red-50"
                }`}>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold ${
                      !wasAnswered 
                        ? "bg-gray-300 text-gray-600" 
                        : isCorrect 
                        ? "bg-green-500 text-white" 
                        : "bg-red-500 text-white"
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <p className="font-medium text-sm sm:text-base text-gray-800 break-words">{question.question}</p>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {isCorrect ? "✓ 1/1 Mark" : "✗ 0/1 Mark"}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs sm:text-sm">
                        {question.options.map((option, optIndex) => {
                          const isUserAnswer = userAnswer === optIndex;
                          const isCorrectAnswer = question.correctAnswer === optIndex;
                          
                          return (
                            <div 
                              key={optIndex}
                              className={`p-2 rounded break-words ${
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
                        <p className="mt-2 text-gray-500 text-xs sm:text-sm italic">Not answered (0 marks)</p>
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