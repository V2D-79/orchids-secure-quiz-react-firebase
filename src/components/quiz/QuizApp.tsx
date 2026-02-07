"use client";

import { useEffect, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import LoginPage from "./LoginPage";
import QuizPage from "./QuizPage";
import ThankYouPage from "./ThankYouPage";

export default function QuizApp() {
  const [mounted, setMounted] = useState(false);
  const { state } = useQuiz();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 text-sm sm:text-base">Loading...</div>
      </div>
    );
  }

  switch (state.status) {
    case "not_started":
      return <LoginPage />;
    case "in_progress":
      return <QuizPage />;
    case "submitted":
      return <ThankYouPage />;
    default:
      return <LoginPage />;
  }
}