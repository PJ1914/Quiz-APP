import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [quizzes, setQuizzes] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => logout());
    }
  }, [token]);

  const register = async (userData) => {
    const res = await axios.post("http://localhost:5000/api/auth/register", userData);
    return res.data;
  };

  const login = async (userData) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", userData);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const fetchQuizzes = async () => {
    const res = await axios.get("http://localhost:5000/api/quiz");
    setQuizzes(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get("http://localhost:5000/api/leaderboard");
    setLeaderboard(res.data);
  };

  return (
    <QuizContext.Provider value={{ user, token, quizzes, leaderboard, register, login, logout, fetchQuizzes, fetchLeaderboard }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
