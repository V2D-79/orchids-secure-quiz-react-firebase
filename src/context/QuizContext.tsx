"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { Question, quizQuestions, quizConfig } from "@/data/quizQuestions";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://qjjemklbiiwzxszulszp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqamVta2xiaWl3enhzenVsc3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MjY1NDQsImV4cCI6MjA4NjAwMjU0NH0.zukrf3Bi5pNbP2HnFdUdXIHGGEcKuHAYE1lZXcTeR48';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export type QuizStatus = "not_started" | "in_progress" | "submitted";

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
  marks: number;
  totalMarks: number;
  percentage: number;
  startTime: Date | null;
  endTime: Date | null;
  hasSubmitted: boolean;
  isCheckingUser: boolean;
  userExists: boolean;
  dbError: string | null;
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
  submitQuiz: () => Promise<void>;
  addWarning: () => boolean;
  updateTimer: (time: number) => void;
  resetQuiz: () => void;
  checkIfUserExists: (email: string) => Promise<boolean>;
  saveResultToDatabase: (userInfo: UserInfo, marks: number, totalMarks: number) => Promise<void>;
}

const initialState: QuizState = {
  status: "not_started",
  userInfo: null,
  currentQuestionIndex: 0,
  answers: {},
  timeRemaining: quizConfig.duration,
  warnings: 0,
  marks: 0,
  totalMarks: quizQuestions.length,
  percentage: 0,
  startTime: null,
  endTime: null,
  hasSubmitted: false,
  isCheckingUser: false,
  userExists: false,
  dbError: null,
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuizState>(initialState);
  const [takenEmails, setTakenEmails] = useState<string[]>([]);

  // Load taken emails from localStorage on mount
  useEffect(() => {
    const storedEmails = localStorage.getItem('takenEmails');
    if (storedEmails) {
      setTakenEmails(JSON.parse(storedEmails));
    }
  }, []);

  // Check if user already exists in database
  const checkIfUserExists = useCallback(async (email: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isCheckingUser: true, dbError: null }));
      
      console.log('Checking user existence for email:', email);

      // Check in localStorage first (for immediate feedback)
      const storedEmails = JSON.parse(localStorage.getItem('takenEmails') || '[]');
      const localExists = storedEmails.includes(email);
      
      if (localExists) {
        setState(prev => ({ 
          ...prev, 
          isCheckingUser: false,
          userExists: true,
          dbError: null
        }));
        return true;
      }

      // Also check in Supabase database
      try {
        const { data, error } = await supabase
          .from('exam_results')
          .select('email')
          .eq('email', email)
          .limit(1);

        if (error) {
          console.log('Supabase error (non-critical):', error.message);
          // Don't block user if database check fails
          setState(prev => ({ 
            ...prev, 
            isCheckingUser: false,
            userExists: false,
            dbError: null
          }));
          return false;
        }

        const dbExists = data && data.length > 0;
        setState(prev => ({ 
          ...prev, 
          isCheckingUser: false,
          userExists: dbExists,
          dbError: null
        }));

        return dbExists;
      } catch (dbError) {
        console.log('Database check failed, using localStorage only');
        setState(prev => ({ 
          ...prev, 
          isCheckingUser: false,
          userExists: false,
          dbError: null
        }));
        return false;
      }
    } catch (error: any) {
      console.error('Error checking user existence:', error);
      setState(prev => ({ 
        ...prev, 
        isCheckingUser: false,
        dbError: 'Unable to verify user. Please try again.'
      }));
      return false;
    }
  }, []);

  // Calculate marks (1 mark per correct answer)
  const calculateMarks = useCallback((answers: { [questionId: number]: number }) => {
    let marks = 0;
    quizQuestions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        marks += 1;
      }
    });
    return marks;
  }, []);

  // Save result to Supabase database - COMPLETE FUNCTION
  const saveResultToDatabase = useCallback(async (userInfo: UserInfo, marks: number, totalMarks: number) => {
    try {
      const percentage = Math.round((marks / totalMarks) * 100);
      const result = percentage >= quizConfig.passingScore ? "PASS" : "FAIL";
      const resultText = `${result} (${marks}/${totalMarks})`;

      console.log('Attempting to save to Supabase:', { 
        userInfo, 
        marks, 
        totalMarks, 
        percentage,
        resultText 
      });

      // First, check if table exists by trying to insert
      const { data, error } = await supabase
        .from('exam_results')
        .insert([
          {
            user_name: userInfo.name,
            email: userInfo.email,
            marks: marks,
            total_marks: totalMarks,
            percentage: percentage,
            result: resultText,
          },
        ])
        .select();

      if (error) {
        console.error('Supabase insert error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        // If table doesn't exist, create it first
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          console.log('Table does not exist, attempting to create...');
          
          // We can't create table from frontend, so we'll save to localStorage
          console.log('Saving to localStorage instead');
          const existingResults = JSON.parse(localStorage.getItem('exam_results') || '[]');
          existingResults.push({
            user_name: userInfo.name,
            email: userInfo.email,
            marks: marks,
            total_marks: totalMarks,
            percentage: percentage,
            result: resultText,
            created_at: new Date().toISOString()
          });
          localStorage.setItem('exam_results', JSON.stringify(existingResults));
          
          throw new Error('Database table not configured. Results saved locally.');
        }
        
        throw error;
      }

      console.log('Successfully saved to Supabase:', data);
      return data;
    } catch (error: any) {
      console.error('Failed to save to database:', error);
      
      // Fallback to localStorage
      try {
        const existingResults = JSON.parse(localStorage.getItem('exam_results') || '[]');
        const percentage = Math.round((marks / totalMarks) * 100);
        const result = percentage >= quizConfig.passingScore ? "PASS" : "FAIL";
        const resultText = `${result} (${marks}/${totalMarks})`;
        
        existingResults.push({
          user_name: userInfo.name,
          email: userInfo.email,
          marks: marks,
          total_marks: totalMarks,
          percentage: percentage,
          result: resultText,
          created_at: new Date().toISOString()
        });
        localStorage.setItem('exam_results', JSON.stringify(existingResults));
        console.log('Saved to localStorage as fallback');
        
        throw new Error('Results saved locally due to database error.');
      } catch (localError) {
        throw new Error('Failed to save results both to database and locally.');
      }
    }
  }, []);

  const startQuiz = useCallback(async (userInfo: UserInfo) => {
    try {
      // Check if user exists
      const exists = await checkIfUserExists(userInfo.email);
      
      if (exists) {
        alert("You have already taken this exam. You cannot retake it.");
        return;
      }

      setState({
        ...initialState,
        status: "in_progress",
        userInfo,
        startTime: new Date(),
        timeRemaining: quizConfig.duration,
        totalMarks: quizQuestions.length,
      });
    } catch (error) {
      console.error('Error in startQuiz:', error);
      // Start quiz anyway
      setState({
        ...initialState,
        status: "in_progress",
        userInfo,
        startTime: new Date(),
        timeRemaining: quizConfig.duration,
        totalMarks: quizQuestions.length,
      });
    }
  }, [checkIfUserExists]);

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

  const submitQuiz = useCallback(async () => {
    if (state.userInfo) {
      const marks = calculateMarks(state.answers);
      const totalMarks = quizQuestions.length;
      const percentage = Math.round((marks / totalMarks) * 100);
      
      console.log('Submitting quiz with marks:', marks, '/', totalMarks, '(', percentage, '%)');
      
      // Update state immediately with marks
      setState((prev) => ({
        ...prev,
        marks: marks,
        totalMarks: totalMarks,
        percentage: percentage,
        endTime: new Date(),
        hasSubmitted: true,
      }));
      
      // Try to save to database in background
      try {
        await saveResultToDatabase(state.userInfo, marks, totalMarks);
        console.log('Result saved to database successfully');
        
        // Save email to localStorage to prevent retakes
        const storedEmails = JSON.parse(localStorage.getItem('takenEmails') || '[]');
        if (!storedEmails.includes(state.userInfo.email)) {
          storedEmails.push(state.userInfo.email);
          localStorage.setItem('takenEmails', JSON.stringify(storedEmails));
          setTakenEmails(storedEmails);
        }
        
        // Update state to show success
        setState((prev) => ({
          ...prev,
          status: "submitted",
          dbError: null,
        }));
      } catch (error: any) {
        console.error('Failed to save to database:', error);
        // Still show submitted but with error
        setState((prev) => ({
          ...prev,
          status: "submitted",
          dbError: error.message || 'Results may not be saved permanently.',
        }));
      }
    }
  }, [state.userInfo, state.answers, calculateMarks, saveResultToDatabase]);

  const addWarning = useCallback(() => {
    let shouldSubmit = false;
    setState((prev) => {
      const newWarnings = prev.warnings + 1;
      if (newWarnings >= quizConfig.maxWarnings) {
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
        checkIfUserExists,
        saveResultToDatabase,
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