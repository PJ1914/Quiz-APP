import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Question from "../components/Question";
import Timer from "../components/Timer";
import QuizContext from "../context/QuizContext";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(QuizContext);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(res.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigate("/results", { state: { score, total: quiz.questions.length } });
    }
  };

  return (
    <div className="quiz-container">
      {quiz && (
        <>
          <h2>{quiz.title}</h2>
          <Timer duration={30} onTimeUp={() => setTimeUp(true)} />
          <Question questionData={quiz.questions[currentQuestion]} onAnswer={handleAnswer} />
        </>
      )}
    </div>
  );
};

export default Quiz;
