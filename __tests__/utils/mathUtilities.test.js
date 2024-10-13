// needs to include
// a question needs to be properly generated ( check for all four operations)
// correct and incorrect answer needs to be detected
// Unit test for question generation and answer checking function are written and passing
//  tests cover multiple cases (correct, incorrect and edge cases)

const {
  correctAnswer, //checks off correct and incorrect answers and all operations
  getQuestion,
  resetStreak,
  currentStreak,
} = require("../../utils/mathUtilities");

describe("Tests for correctAnswer", () => {
  test("Gives back false if they try to divide by zero", () => { // Edge Case
    const question = { num1: 2, num2: 0, operations: "/" };
    const answer = 2;
    expect(correctAnswer(question, answer)).toBe(false);
  });

  test("Gives back true for a correct addition question", () => {
    const question = { num1: 2, num2: 2, operations: "+" }; // Addition operation and correct answer
    const answer = 4;
    expect(correctAnswer(question, answer)).toBe(true);
  });

  test("Gives back false for incorrect subtraction question", () => {
    const question = { num1: 4, num2: 2, operations: "-" }; // Subtraction operation and incorrect answer
    const answer = 3;
    expect(correctAnswer(question, answer)).toBe(false);
  });

  test("Gives back true for correct multiplication question", () => {
    const question = { num1: 2, num2: 6, operations: "*" }; // Multiplication operation and correct
    const answer = 12;
    expect(correctAnswer(question, answer)).toBe(true);
  });

  test("Gives back false for incorrect division answer question", () => {
    const question = { num1: 12, num2: 6, operations: "/" }; // Division operation and incorrect answer 
    const answer = 4;
    expect(correctAnswer(question, answer)).toBe(false);
  });
});

describe("Tests for getQuestion", () => {
  test("Takes only an operation from the list", () => {
    const correctOperations = ["+", "-", "*", "/"]; // Ensureing that only operations from the list are used for getQuestion
    const question = getQuestion();
    expect(correctOperations.includes(question.operations)).toBe(true);
  });
});

describe("Tests for resetStreak", () => {
  test("This will reset the currentStreak back to zero", () => {
    currentStreak.value = 2; // Make sure the resetStreak test is working
    resetStreak();
    expect(currentStreak.value).toBe(0);

    currentStreak.value = 20;
    resetStreak();
    expect(currentStreak.value).toBe(0);
  });
});
