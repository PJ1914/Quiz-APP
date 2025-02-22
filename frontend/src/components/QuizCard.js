import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      <Link to={`/quiz/${quiz._id}`}>
        <button>Start Quiz</button>
      </Link>
    </div>
  );
};

export default QuizCard;
