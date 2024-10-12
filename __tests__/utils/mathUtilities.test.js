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
  test("Gives back false if they try to divide by zero", () => {
    const question = { num1: 2, num2: 0, operations: "/" };
    const answer = 2;
    expect(correctAnswer(question, answer)).toBe(false);
  });

  test("Gives back true for a correct addition question", () => {
    const question = { num1: 2, num2: 2, operations: "+" };
    const answer = 4;
    expect(correctAnswer(question, answer)).toBe(true);
  });

  test("Gives back false for incorrect subtraction question", () => {
    const question = { num1: 4, num2: 2, operations: "-" };
    const answer = 3;
    expect(correctAnswer(question, answer)).toBe(false);
  });

  test("Gives back true for correct multiplication question", () => {
    const question = { num1: 2, num2: 6, operations: "*" };
    const answer = 12;
    expect(correctAnswer(question, answer)).toBe(true);
  });

  test("Gives back false for incorrect division answer question", () => {
    const question = { num1: 12, num2: 6, operations: "/" };
    const answer = 4;
    expect(correctAnswer(question, answer)).toBe(false);
  });
});

describe("Tests for getQuestion", () => {
  test("Takes only an operation from the list", () => {
    const correctOperations = ["+", "-", "*", "/"];
    const question = getQuestion();
    expect(correctOperations.includes(question.operations)).toBe(true);
  });
});

// failing

describe("Tests for resetStreak", () => {
  test("This will reset the currentStreak back to zero", () => {
    currentStreak = 2;
    resetStreak();
    expect(currentStreak).toBe(0);
  });
});
