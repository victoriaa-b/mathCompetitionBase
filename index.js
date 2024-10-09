const express = require("express");
const { getQuestion, correctAnswer } = require("./utils/mathUtilities");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public"));

let currentStreak = 0; // cant be const as it needs to change
let currentQuestion;

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/quiz", (req, res) => {
  currentQuestion = getQuestion();
  res.render("quiz", { question: currentQuestion });
});

app.get("/quizCompletion", (req, res) => {
  res.render("quizCompletion"); // check
});

app.get("/leaderboards", (req, res) => {
  res.render("leaderboards"); // check
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;
  console.log(`Answer: ${answer}`);
  const isCorrect = correctAnswer(currentQuestion, Number(answer));

  if (isCorrect) {
    currentStreak++;
  } else {
    currentStreak = 0;
  }
  res.render("quizCompletion", { streak: currentStreak, isCorrect }); // need isCorrect or it wont check
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
