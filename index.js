const express = require("express");
const {
  getQuestion,
  correctAnswer,
  resetStreak,
} = require("./utils/mathUtilities");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static("public"));

let currentStreak = 0; // cant be const as it needs to change
let currentQuestion;
let latestStreak = 0;
let leaderboards = [];

//Some routes required for full functionality are missing here. Only get routes should be required
app.get("/", (req, res) => {
  res.render("index", { latestStreak });
});

app.get("/quiz", (req, res) => {
  currentQuestion = getQuestion();
  res.render("quiz", { question: currentQuestion });
});

app.get("/quizCompletion", (req, res) => {
  res.render("quizCompletion", { streak: currentStreak });
});

app.get("/leaderboards", (req, res) => {
  const sortedLeaderboards = leaderboards.sort((a, b) => b.streak - a.streak);
  res.render("leaderboards", { leaderboards: sortedLeaderboards });
});

//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;

  const isCorrect = correctAnswer(currentQuestion, Number(answer));

  if (isCorrect) {
    currentStreak++;
    latestStreak = currentStreak;
    res.render("quizCompletion", { streak: currentStreak, isCorrect: true });
  } else {
    resetStreak(); //// check reset
    currentStreak = 0;
    res.render("quizCompletion", { streak: 0, isCorrect: false });
  }
});

app.post("/leaderboards", (req, res) => {
  const { name, streak } = req.body;
  leaderboards.push({ name, streak });
  res.redirect("/leaderboards");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
