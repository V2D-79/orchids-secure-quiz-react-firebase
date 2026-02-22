// ================================
// C and C++ Final Programming Quiz
// ================================

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index (0-3)
  category: "C" | "C++";
}

export const quizQuestions: Question[] = [

  // ================= C QUESTIONS =================

  {
    id: 1,
    question: "What happens if a string in C does not contain '\\0' at the end?",
    options: [
      "It will still print correctly",
      "It may cause undefined behavior when used with string functions",
      "It will automatically add '\\0' at runtime",
      "It will be treated as an integer array"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 2,
    question: "Output of: int a=10,b=20; printf(\"%d\", a++ + ++b);",
    options: ["30", "31", "Error", "Undefined"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 3,
    question: "char a[]=\"abc\"; char b[]=\"abc\"; if(a==b) ?",
    options: ["Same", "Different", "Error", "Garbage"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 4,
    question: "Which of the following is NOT a storage class?",
    options: ["auto", "static", "register", "mutable"],
    correctAnswer: 3,
    category: "C"
  },
  {
    id: 5,
    question: "What is the output of sizeof(5.0)?",
    options: ["4", "8", "2", "Compiler dependent"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 6,
    question: "int a=0; if(a=10) printf(\"Yes\"); else printf(\"No\");",
    options: ["Yes", "No", "Error", "Undefined"],
    correctAnswer: 0,
    category: "C"
  },
  {
    id: 7,
    question: "printf(\"%d\", printf(\"Hack\")); Output?",
    options: ["Hack", "Hack4", "4Hack", "Error"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 8,
    question: "What does sizeof() return?",
    options: ["Address", "Value", "Size in bytes", "Size in bits"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 9,
    question: "int *p; printf(\"%d\", *p); What happens?",
    options: ["Prints 0", "Compile-time error", "Garbage value", "Segmentation fault"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 10,
    question: "Which of the following is a logical operator?",
    options: ["&", "|", "&&", "%"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 11,
    question: "int x=10; printf(\"%d\", x>5 && x<20);",
    options: ["True", "False", "1", "0"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 12,
    question: "static variable inside function retains value between calls. Output of calling twice?",
    options: ["6 6", "6 7", "5 6", "7 8"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 13,
    question: "Switch without break (case 5 → case 6 → default). Output?",
    options: ["A", "AB", "ABC", "AC"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 14,
    question: "Which file mode truncates file content?",
    options: ["r", "a", "w", "rb"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 15,
    question: "volatile keyword does what?",
    options: [
      "Makes variable thread-safe",
      "Prevents compiler optimization",
      "Allocates in register",
      "Makes constant"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 16,
    question: "char *str=\"Hello\" means:",
    options: [
      "String can be modified safely",
      "Stored in heap",
      "Points to read-only string literal",
      "Stored in stack"
    ],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 17,
    question: "Why prefer malloc() over large local arrays?",
    options: [
      "malloc uses stack",
      "Large arrays may cause stack overflow",
      "malloc is faster",
      "malloc auto-frees memory"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 18,
    question: "Why arrays are not directly assignable in C?",
    options: [
      "Stored in heap",
      "Not lvalues",
      "Represent fixed memory blocks",
      "Passed by reference"
    ],
    correctAnswer: 2,
    category: "C"
  },

  // ================= C++ QUESTIONS =================

  {
    id: 19,
    question: "Diamond problem occurs due to:",
    options: ["Operator overloading", "Multiple inheritance", "Function overloading", "Templates"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 20,
    question: "mutable keyword allows modification of:",
    options: [
      "Static members only",
      "const object's specific members",
      "Private members only",
      "References"
    ],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 21,
    question: "Base pointer to derived object requires ______ for proper destructor call.",
    options: ["Inline function", "Virtual destructor", "Friend function", "Static function"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 22,
    question: "Object slicing occurs when:",
    options: [
      "Pointer to base stores derived object",
      "Reference binds derived object",
      "Base object initialized with derived object",
      "Virtual function overridden"
    ],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 23,
    question: "Function hiding occurs when:",
    options: [
      "Same name different signature in derived class",
      "Base function virtual",
      "Base inline",
      "Base static"
    ],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 24,
    question: "Recursive sum function fun(4) returns?",
    options: ["10", "24", "16", "8"],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 25,
    question: "*p++ and *++p pointer expression output?",
    options: ["10 20", "10 30", "20 30", "20 40"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 26,
    question: "**q + 5 where q→p→a (a=5) gives?",
    options: ["5", "10", "Garbage", "Error"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 27,
    question: "Function used for dynamic memory allocation in C?",
    options: ["alloc()", "malloc()", "create()", "new()"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 28,
    question: "*(arr+2) from {1,2,3,4} equals?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 29,
    question: "scanf(\"%4s\", str) means:",
    options: [
      "Read exactly 4 chars",
      "Read maximum 4 chars",
      "Read multiples of 4",
      "Nothing"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 30,
    question: "Main difference between overloading and overriding?",
    options: [
      "Same class vs derived behavior",
      "Same meaning",
      "Requires virtual always",
      "No difference"
    ],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 31,
    question: "Which operator usually overloaded globally?",
    options: ["Postfix ++", "Comparison", "Insertion <<", "Prefix ++"],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 32,
    question: "Main benefit of encapsulation?",
    options: ["Faster execution", "Better UI", "Data security & abstraction", "Simplified syntax"],
    correctAnswer: 2,
    category: "C++"
  },
  {
    id: 33,
    question: "Constants in C++ are also known as:",
    options: ["Variables", "Literals", "Identifiers", "Tokens"],
    correctAnswer: 1,
    category: "C++"
  },
  {
    id: 34,
    question: "Function overloading means:",
    options: [
      "Same function name different parameters",
      "Different names same parameters",
      "Same object multiple times",
      "Same variable"
    ],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 35,
    question: "*p=b where p points to a (a=5,b=10). Output?",
    options: ["5 10", "10 10", "5 5", "Garbage"],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 36,
    question: "printf(\"%d %d %d\", i, i++, ++i); behavior?",
    options: ["1 2 3", "1 1 3", "Undefined behavior", "2 3 4"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 37,
    question: "If base destructor is not virtual:",
    options: [
      "Only base destructor called",
      "Both called",
      "Compile error",
      "Always crash"
    ],
    correctAnswer: 0,
    category: "C++"
  },
  {
    id: 38,
    question: "Purpose of const keyword in C?",
    options: [
      "Make global",
      "Prevent modification",
      "Allocate memory",
      "Optimize speed"
    ],
    correctAnswer: 1,
    category: "C"
  },
  {
    id: 39,
    question: "Which memory allocation happens at runtime?",
    options: ["Static", "Stack", "Dynamic", "Compile-time"],
    correctAnswer: 2,
    category: "C"
  },
  {
    id: 40,
    question: "Dangling pointer is:",
    options: [
      "Pointer to NULL",
      "Pointer to freed memory",
      "Uninitialized pointer",
      "Pointer to constant memory"
    ],
    correctAnswer: 1,
    category: "C"
  }
];

// ================= QUIZ CONFIG =================

export const quizConfig = {
  title: "C/C++ Final Programming Quiz",
  duration: 35 * 60, // 35 minutes
  totalQuestions: quizQuestions.length,
  passingScore: 60,
  maxWarnings: 1
};