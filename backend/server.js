require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // ✅ Make sure this is imported
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes"); // ✅ Import the quiz routes
const Quiz = require("./models/quiz"); // ✅ Import the Quiz model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected to Quiz-App");
    insertDummyData(); // ✅ Insert dummy data only after connection
  })
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Function to insert dummy data
const insertDummyData = async () => {
  const existingQuizzes = await Quiz.find();
  if (existingQuizzes.length === 0) {
    console.log("🌟 Inserting dummy quiz data...");
    await Quiz.insertMany([
      {
        title: "General Knowledge Quiz",
        questions: [
          { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
          { question: "What is the capital of France?", options: ["Paris", "London", "Berlin"], answer: "Paris" },
          { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus"], answer: "Mars" },
        ],
      },
    ]);
    console.log("✅ Dummy data inserted!");
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes); // ✅ Make sure this is included

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
