// Test still needs to be ran to see if errors occurs.

/**
 * Gets a random math question
 *
 * @returns {} The random math question
 */
function getQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ["*", "+", "/", "-"][Math.floor(Math.random() * 4)]; // decides on what option will be in the questions

  return { num1, num2, operations };
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 *
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */

function correctAnswer(question, answer) {
  const { num1, num2, operations } = question;
  let correctAnswer;

  if (operations === "+") {
    correctAnswer = num1 + num2;
  } else if (operations === "-") {
    correctAnswer = num1 - num2;
  } else if (operations === "*") {
    correctAnswer = num1 * num2;
  } else if (operations === "/") {
    // ensure we can't divide by zero
    if (num2 === 0) {
      // num 2 is the what will be divided by
      return false;
    }
    correctAnswer = num1 / num2;
  }
  return answer === correctAnswer; // return answer
}

let currentStreak = {value: 0 };
function resetStreak() {
  currentStreak.value = 0;
}
module.exports = {
  getQuestion,
  correctAnswer,
  resetStreak,
  currentStreak,
};
