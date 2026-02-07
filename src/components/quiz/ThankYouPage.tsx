"use client";

import { useQuiz } from "@/context/QuizContext";

export default function ThankYouPage() {
  const { state, resetQuiz } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
             <div className="w-25 h-15 rounded-xl bg-white flex items-center justify-center">
              <img
                src="/img/LogoVector.png"
                alt="Logo"
                className="w-25 h-30 object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gray-800">Online Exam</h1>
              <p className="text-gray-500">Submission Successful</p>
            </div>
          </div>

          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You!
          </h2>

          <p className="text-gray-600 mb-6">
            Your exam has been successfully submitted and saved to our database.
          </p>

          {/* User Info (Optional but clean) */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-800">
                  {state.userInfo?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-800">
                  {state.userInfo?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={resetQuiz}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Return to Home
          </button>

          <p className="text-sm text-gray-500 mt-4">
            Note: You cannot retake the exam with the same email address.
          </p>
        </div>
      </div>
    </div>
  );
}
