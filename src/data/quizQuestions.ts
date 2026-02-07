// C and C++ Programming Quiz Questions
// You can replace this with data from a JSON file or Firebase

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
  category: "C" | "C++";
}

export const quizQuestions: Question[] = [
  // C Programming Questions
  {
    id: 1,
    question: "Which of the following is the correct syntax for declaring a pointer in C?",
    options: ["int *ptr;", "int ptr*;", "ptr int*;", "*int ptr;"],
    correctAnswer: 0,
    category: "C"
  },
  {
    id: 2,
    question: "What is the output of printf(\"%d\", sizeof(int)) on a 32-bit system?",
    options: ["2", "4", "8", "Depends on compiler"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 3,
    question: "Which header file is required for using malloc() in C?",
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 4,
    question: "What is the output of: int a = 5; printf(\"%d\", a++);",
    options: ["4", "5", "6", "Error"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 5,
    question: "Which of the following is NOT a valid storage class in C?",
    options: ["auto", "register", "static", "dynamic"],
    correctAnswer: 3,
    category: "C"
  },
  {
    id: 6,
    question: "What does the 'static' keyword do to a local variable in C?",
    options: [
      "Makes it global",
      "Preserves its value between function calls",
      "Makes it constant",
      "Allocates it on heap"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 7,
    question: "Which operator is used to access structure members through a pointer?",
    options: [".", "->", "*", "&"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 8,
    question: "What is the correct way to declare an array of 10 integers in C?",
    options: ["int arr(10);", "int arr[10];", "array int arr[10];", "int[10] arr;"],
    correctAnswer: 1,
    category: "C"
  },
  // C++ Programming Questions
  {
    id: 9,
    question: "Which of the following is the correct way to create an object in C++?",
    options: ["className obj();", "className obj;", "obj className;", "new className obj;"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 10,
    question: "What is the purpose of the 'virtual' keyword in C++?",
    options: [
      "To create a constant function",
      "To enable runtime polymorphism",
      "To make a function static",
      "To declare a friend function"
    ],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 11,
    question: "Which access specifier makes class members accessible only within the class?",
    options: ["public", "private", "protected", "friend"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 12,
    question: "What is the output of: cout << (5 > 3 ? 10 : 20);",
    options: ["5", "3", "10", "20"],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 13,
    question: "Which operator is used for dynamic memory allocation in C++?",
    options: ["malloc", "alloc", "new", "create"],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 14,
    question: "What is a constructor in C++?",
    options: [
      "A function that destroys objects",
      "A special function that initializes objects",
      "A function that copies objects",
      "A static member function"
    ],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 15,
    question: "Which of the following is NOT a feature of C++?",
    options: ["Encapsulation", "Inheritance", "Garbage Collection", "Polymorphism"],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 16,
    question: "What is the correct syntax for a single-line comment in C++?",
    options: ["/* comment */", "// comment", "# comment", "-- comment"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 17,
    question: "What does 'cin' stand for in C++?",
    options: ["Console input", "Character input", "Common input", "C input"],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 18,
    question: "Which keyword is used to define a constant in C++?",
    options: ["constant", "const", "final", "static"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 19,
    question: "What is function overloading in C++?",
    options: [
      "Functions with same name but different return types",
      "Functions with same name but different parameters",
      "Functions that override parent class functions",
      "Functions that are called recursively"
    ],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 20,
    question: "Which header file is required for using 'cout' in C++?",
    options: ["<stdio.h>", "<iostream>", "<conio.h>", "<string.h>"],
    correctAnswer: 1,
    category: "C++"
  }
];

export const quizConfig = {
  title: "Programming Quiz",
  duration: 35* 60, // 35 minutes in seconds
  totalQuestions: quizQuestions.length,
  passingScore: 60, // percentage
  maxWarnings: 1 // number of tab switches allowed before auto-submit
};
