import { QuizProvider } from "@/context/QuizContext";
import QuizApp from "@/components/quiz/QuizApp";

export default function Home() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}
