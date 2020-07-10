import React from "react";
import { quizData } from "./QuizData";
import "./styles.css";

class MainQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      myAnswer: null,
      options: [],
      score: 0,
      disabled: true,
      isEnd: false,
      badge: "",
      color: "blue"
    };
    // console.log(this.props.username);
  }
  loadQuizData = () => {
    // console.log(quizData[0].question)
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
    // console.log(this.props.username);
  }
  nextQuestionHandler = () => {
    // console.log('test')
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }
  //check answer
  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    const { score } = this.state;

    const percent = (score / (quizData.length - 1)) * 100;
    if (percent >= 0 && percent <= 30) {
      this.setState({
        badge: "red",
        color: "red"
      });
    }
    if (percent >= 31 && percent <= 70) {
      this.setState({
        badge: "green",
        color: "green"
      });
    }
    if (percent >= 70 && percent <= 100) {
      this.setState({
        badge: "black",
        color: "black"
      });
    }
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true
      });
    }
  };
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="App">
          <div>
            <h2 style={{ textAlign: "center" }}>Score Board</h2>

            <div class="card">
              <h1> {this.props.username}'s Score is </h1>
              <p class="price">{this.state.score}</p>
              <p>
                Hey {this.props.username} , you earned the following badge for
                your friendship
              </p>
              <p>
                <button style={{ backgroundColor: `${this.state.color}` }}>
                  {this.state.badge}
                </button>
              </p>
            </div>
          </div>
          <p>
            The correct answer's for the questions was
            <ul>
              {quizData.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </p>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h3> Welcome {this.props.username}</h3>
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion}  out of ${quizData.length -
            1} remaining `}</span>
          {options.map(option => (
            <p
              key={option.id}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {currentQuestion === quizData.length - 1 && (
            <button className="ui inverted button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default MainQuiz;
