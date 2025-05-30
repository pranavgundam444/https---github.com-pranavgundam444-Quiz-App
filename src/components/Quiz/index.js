import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Quiz extends Component {

  state = {
    data: [],
    currentQuestionIndex: 0,
    selectedAnswer: '',
    isAnswerCorrect: null,
    showFeedback: false,
    score: 0,
  };

  async componentDidMount() {
    await this.getData();
  }

  getData = async () => {
    try {
      const response = await fetch("https://68394c8c6561b8d882afbe1c.mockapi.io/api/questions");
      const result = await response.json();

      if (response.ok) {
        this.setState({ data: result });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  handleOptionClick = (option) => {
    const { data, currentQuestionIndex } = this.state;
    const currentQuestion = data[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correctAnswer;

    this.setState({
      selectedAnswer: option,
      isAnswerCorrect: isCorrect,
      showFeedback: true,
    });
    if (isCorrect) {
        this.setState(prevState => ({score: prevState.score + 1}))
    }
  };

  handleNext = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      selectedAnswer: '',
      isAnswerCorrect: null,
      showFeedback: false
    }));
  };

  startAgain = () => {
    
  }

  render() {
    const {
      data,
      currentQuestionIndex,
      selectedAnswer,
      isAnswerCorrect,
      showFeedback,
      score,
    } = this.state;

    if (data.length === 0) {
      return <p>Loading questions...</p>;
    }

    const currentQuestion = data[currentQuestionIndex];

    if (!currentQuestion) {
      return <h2>Quiz Completed!</h2>;
    }

    return (

      <div style={{ padding: "20px" }}>
        <h2>Question {currentQuestionIndex + 1}:</h2>
        <p>{currentQuestion.questionText}</p>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              onClick={() => this.handleOptionClick(option)}
              style={{
                margin: "10px 0",
                padding: "10px",
                backgroundColor:
                  showFeedback && option === selectedAnswer
                    ? isAnswerCorrect
                      ? "#d4edda"
                      : "#f8d7da"
                    : "#f1f1f1",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              {option}
            </li>
          ))}
        </ul>

        {showFeedback && (
          <p style={{ fontWeight: "bold" }}>
            {isAnswerCorrect ? "✅ Correct!" : "❌ Incorrect. Try the next one."}
          </p>
        )}

        {showFeedback && currentQuestionIndex < data.length - 1 && (
          <button onClick={this.handleNext} style={{ marginTop: "15px" }}>
            Next
          </button>
        )}

        {showFeedback && currentQuestionIndex === data.length - 1 && (
            <div>
                <h3>🎉 You've reached the end of the quiz!</h3>
                <Link to='/'>
                    <button>Start Again</button>
                </Link>
          </div>
        )}

        <p>Your score is {score}</p>

      </div>
    );
  }
}

export default Quiz
