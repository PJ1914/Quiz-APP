const express = require("express");
const Quiz = require("../models/quiz");

const router = express.Router();

// ✅ Route to GET all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quizzes" });
  }
});

// ✅ Route to POST a new quiz (dummy data insertion)
router.post("/", async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding quiz" });
  }
});

module.exports = router;
