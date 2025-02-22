const Question = ({ questionData, onAnswer }) => {
    return (
      <div className="question-container">
        <h3>{questionData.question}</h3>
        {questionData.options.map((option, index) => (
          <button key={index} onClick={() => onAnswer(option === questionData.answer)}>
            {option}
          </button>
        ))}
      </div>
    );
  };
  
  export default Question;
  