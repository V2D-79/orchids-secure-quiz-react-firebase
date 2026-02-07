"use client";

import { useState, useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";

export default function LoginPage() {
  const { startQuiz, checkIfUserExists, state } = useQuiz();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Check if user already exists
  useEffect(() => {
    const checkUser = async () => {
      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await checkIfUserExists(email);
      }
    };

    const timeoutId = setTimeout(checkUser, 500);
    return () => clearTimeout(timeoutId);
  }, [email, checkIfUserExists]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    } else if (state.userExists) {
      newErrors.email = "This email has already taken the exam";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validateForm()) {
      setShowInstructions(true);
    }
  };

  const handleStartQuiz = () => {
    startQuiz({ name, email });
  };

  /* ===================== INSTRUCTIONS PAGE ===================== */
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-20 h-12 sm:w-25 sm:h-15 rounded-xl bg-white flex items-center justify-center">
                <img
                  src="/img/LogoVector.png"
                  alt="Logo"
                  className="w-20 h-12 sm:w-25 sm:h-30 object-contain"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Online Exam
              </h2>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
              Important Instructions
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Please read carefully before starting the exam
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                !
              </span>
              <div>
                <h4 className="font-semibold text-red-800 text-sm sm:text-base">
                  No Tab Switching
                </h4>
                <p className="text-xs sm:text-sm text-red-600">
                  Switching tabs or windows will auto-submit your exam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                i
              </span>
              <div>
                <h4 className="font-semibold text-blue-800 text-sm sm:text-base">
                  Time Limited
                </h4>
                <p className="text-xs sm:text-sm text-blue-600">
                  Complete the exam within the given time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                ✓
              </span>
              <div>
                <h4 className="font-semibold text-green-800 text-sm sm:text-base">
                  One Attempt Only
                </h4>
                <p className="text-xs sm:text-sm text-green-600">
                  You cannot retake the exam with the same email.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t pt-4 sm:pt-6">
            <p className="text-center text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              Welcome, <strong>{name}</strong>! Ready to begin?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setShowInstructions(false)}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>

              <button
                onClick={handleStartQuiz}
                className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-sm sm:text-base hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-colors"
              >
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ===================== LOGIN PAGE ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-20 h-12 sm:w-25 sm:h-15 rounded-xl bg-white flex items-center justify-center">
              <img
                src="/img/LogoVector.png"
                alt="Logo"
                className="w-20 h-12 sm:w-25 sm:h-30 object-contain"
              />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Online Exam
              </h1>
              <p className="text-sm sm:text-base text-gray-500">Test your knowledge</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
            {state.isCheckingUser && (
              <p className="text-xs sm:text-sm text-blue-500 mt-1">
                Checking email...
              </p>
            )}
          </div>

          <button
            onClick={handleProceed}
            disabled={state.isCheckingUser || state.userExists}
            className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-lg disabled:opacity-50 transition-colors"
          >
            {state.isCheckingUser
              ? "Checking..."
              : state.userExists
              ? "Already Taken Exam"
              : "Proceed to Instructions"}
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs sm:text-sm mt-4 sm:mt-6">
          By proceeding, you agree to the exam rules
        </p>
      </div>
    </div>
  );
}