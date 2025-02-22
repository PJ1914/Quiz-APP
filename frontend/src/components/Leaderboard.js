const Leaderboard = ({ leaderboard }) => {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index}>
              {entry.username} - {entry.score}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Leaderboard;
  