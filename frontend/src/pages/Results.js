import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../context/QuizContext";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitScore } = useContext(QuizContext);
  const { score, total } = location.state || { score: 0, total: 0 };

  const handleSaveScore = () => {
    submitScore(score);
    navigate("/leaderboard");
  };

  return (
    <div className="results-container">
      <h1>Quiz Completed!</h1>
      <p>Your Score: {score} / {total}</p>
      <button onClick={handleSaveScore}>Save Score</button>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default Results;
