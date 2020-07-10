import React from "react";
import "./styles.css";
import QuizMain from "./QuizMain";

class Home extends React.Component {
  state = {
    name: "",
    disabled: true,
    dispaly: false
  };
  handleHomepage = () => {
    // history.push("/QuizMain");
    this.setState({ dispaly: true });
  };
  onChangeHandler = e => {
    this.setState({
      name: e.target.value,
      disabled: false
    });
  };
  render() {
    return (
      <div>
        {" "}
        {!this.state.dispaly && (
          <div style={{ textAlign: "center" }}>
            <div>
              <h2> Let's see how much you know about your Friend</h2>
              <div style={{ margin: "50px auto 10px 80px", width: "151px" }}>
                {" "}
                <h3>Type your name </h3>
              </div>
              <input
                onChange={this.onChangeHandler}
                placeholder=" Enter name"
              />
              <div
                style={{
                  margin: "90px",
                  backgroundColor: "red",
                  width: "151px"
                }}
              >
                {" "}
                <button
                  disabled={this.state.disabled}
                  onClick={this.handleHomepage}
                  name={this.state.name}
                >
                  Click to Start Quiz
                </button>
              </div>
            </div>{" "}
          </div>
        )}
        {this.state.dispaly && <QuizMain username={this.state.name} />}
      </div>
    );
  }
}
export default Home;
