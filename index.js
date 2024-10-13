// Importing the math functions
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

// Setting up vars to 
let currentStreak = 0; 
let currentQuestion;
let latestStreak = 0;
let leaderboards = [];

// Some routes required for full functionality are missing here. Only get routes should be required
// Get routes
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

// Post routes
//Handles quiz submissions.
app.post("/quiz", (req, res) => {
  const { answer } = req.body;

  // Checking to see if the answer id correct 
  const isCorrect = correctAnswer(currentQuestion, Number(answer));

  if (isCorrect) {
    currentStreak++;
    latestStreak = currentStreak;
    res.render("quizCompletion", { streak: currentStreak, isCorrect: true });
  } else {
    // If the answer is incorrect
    resetStreak(); 
    currentStreak = 0;
    res.render("quizCompletion", { streak: 0, isCorrect: false });
  }
});

app.post("/leaderboards", (req, res) => {
  const { name, streak } = req.body;
  const dateRecorded = new Date().toLocaleDateString(); // Date that the streak was recored 

  // Add the new records to the leaderboard
  leaderboards.push({ name, streak, dateRecorded });
  leaderboards = leaderboards.slice(0, 10); // only want the top ten streaks
  res.redirect("/leaderboards");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
