"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Question, quizQuestions, quizConfig } from "@/data/quizQuestions";

export type QuizStatus = "not_started" | "in_progress" | "completed" | "submitted";

interface UserInfo {
  name: string;
  email: string;
}

interface QuizState {
  status: QuizStatus;
  userInfo: UserInfo | null;
  currentQuestionIndex: number;
  answers: { [questionId: number]: number };
  timeRemaining: number;
  warnings: number;
  score: number;
  startTime: Date | null;
  endTime: Date | null;
}

interface QuizContextType {
  state: QuizState;
  questions: Question[];
  config: typeof quizConfig;
  startQuiz: (userInfo: UserInfo) => void;
  answerQuestion: (questionId: number, answerIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToQuestion: (index: number) => void;
  submitQuiz: () => void;
  addWarning: () => boolean;
  updateTimer: (time: number) => void;
  resetQuiz: () => void;
}

const initialState: QuizState = {
  status: "not_started",
  userInfo: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: quizConfig.duration,
  warnings: 0,
  score: 0,
  startTime: null,
  endTime: null,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>(initialState);

  const startQuiz = useCallback((userInfo: UserInfo) => {
    setState({
      ...initialState,
      status: "in_progress",
      userInfo,
      startTime: new Date(),
      timeRemaining: quizConfig.duration,
    });
  }, []);

  const answerQuestion = useCallback((questionId: number, answerIndex: number) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answerIndex,
      },
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, quizQuestions.length - 1),
    }));
  }, []);

  const prevQuestion = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
    }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      currentQuestionIndex: Math.max(0, Math.min(index, quizQuestions.length - 1)),
    }));
  }, []);

  const calculateScore = useCallback((answers: { [questionId: number]: number }) => {
    let correct = 0;
    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quizQuestions.length) * 100);
  }, []);

  const submitQuiz = useCallback(() => {
    setState((prev) => {
      const score = calculateScore(prev.answers);
      return {
        ...prev,
        status: "submitted",
        score,
        endTime: new Date(),
      };
    });
  }, [calculateScore]);

  const addWarning = useCallback(() => {
    let shouldSubmit = false;
    setState((prev) => {
      const newWarnings = prev.warnings + 1;
      if (newWarnings > quizConfig.maxWarnings) {
        shouldSubmit = true;
      }
      return {
        ...prev,
        warnings: newWarnings,
      };
    });
    return shouldSubmit;
  }, []);

  const updateTimer = useCallback((time: number) => {
    setState((prev) => ({
      ...prev,
      timeRemaining: time,
    }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        questions: quizQuestions,
        config: quizConfig,
        startQuiz,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        goToQuestion,
        submitQuiz,
        addWarning,
        updateTimer,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
