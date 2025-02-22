import { Link } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../context/QuizContext";

const Navbar = () => {
  const quizContext = useContext(QuizContext);

  if (!quizContext) {
    return <nav className="navbar">Loading...</nav>; // Prevent errors if context is undefined
  }

  const { user, logout } = quizContext;

  return (
    <nav className="navbar">
      <h2>Quiz App</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
