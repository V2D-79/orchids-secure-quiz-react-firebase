"use client";

import { useQuiz } from "@/context/QuizContext";

export default function ThankYouPage() {
  const { state, resetQuiz } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 max-w-md w-full">
        <div className="text-center">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-20 h-12 sm:w-25 sm:h-15 rounded-xl bg-white flex items-center justify-center">
              <img
                src="/img/LogoVector.png"
                alt="Logo"
                className="w-20 h-12 sm:w-25 sm:h-30 object-contain"
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Online Exam</h1>
              <p className="text-sm sm:text-base text-gray-500">Submission Successful</p>
            </div>
          </div>

          {/* Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Message */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
            Thank You!
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Your exam has been successfully submitted and saved to our database.
          </p>

          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-sm sm:text-base text-gray-600">Name:</span>
                <span className="font-medium text-sm sm:text-base text-gray-800 break-words">
                  {state.userInfo?.name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                <span className="text-sm sm:text-base text-gray-600">Email:</span>
                <span className="font-medium text-sm sm:text-base text-gray-800 break-all">
                  {state.userInfo?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={resetQuiz}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Return to Home
          </button>

          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
            Note: You cannot retake the exam with the same email address.
          </p>
        </div>
      </div>
    </div>
  );
}