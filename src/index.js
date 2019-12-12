import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

class DrumPad extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  removeTransition = e => {
    const { div } = this;
    if (e.propertyName !== "transform") return;
    div.classList.remove("playing");
  };

  handleKeyDown = e => {
    const {
      div,
      audio,
      props: { keyCode, name, handleDisplay }
    } = this;

    if (e.keyCode === keyCode) {
      audio.play();
      audio.currentTime = 0;
      handleDisplay(name);
      div.classList.add("playing");
      div.addEventListener("transitionend", this.removeTransition);
    }
  };

  handleClick = () => {
    const {
      div,
      audio,
      props: { name, handleDisplay }
    } = this;
    audio.play();
    audio.currentTime = 0;
    handleDisplay(name);
    div.classList.add("playing");
    div.addEventListener("transitionend", this.removeTransition);
  };

  render() {
    const { name, src } = this.props;
    return (
      <div
        id={name}
        className="pad"
        onClick={this.handleClick}
        ref={ref => (this.div = ref)}
      >
        <span>{name}</span>
        <audio src={src} id={name} ref={ref => (this.audio = ref)} />
      </div>
    );
  }
}
class DrumMaschine extends React.Component {
  state = {
    db: [
      { id: 1, name: "A", keyCode: 65, url: "kick1.wav" },
      { id: 2, name: "S", keyCode: 83, url: "kick2.wav" },
      { id: 3, name: "D", keyCode: 68, url: "kick3.wav" },
      { id: 4, name: "F", keyCode: 70, url: "kick4.wav" },
      { id: 5, name: "G", keyCode: 71, url: "kick5.wav" },
      { id: 6, name: "H", keyCode: 72, url: "kick6.wav" },
      { id: 7, name: "J", keyCode: 74, url: "kick7.wav" },
      { id: 8, name: "K", keyCode: 75, url: "kick8.wav" },
      { id: 9, name: "L", keyCode: 76, url: "kick1.wav" },
      { id: 10, name: "Z", keyCode: 90, url: "kick2.wav" },
      { id: 11, name: "X", keyCode: 88, url: "kick3.wav" },
      { id: 12, name: "C", keyCode: 67, url: "kick4.wav" },
      { id: 13, name: "V", keyCode: 86, url: "kick5.wav" },
      { id: 14, name: "B", keyCode: 66, url: "kick6.wav" },
      { id: 15, name: "N", keyCode: 78, url: "kick7.wav" },
      { id: 16, name: "M", keyCode: 77, url: "kick8.wav" }
    ],
    display: "key"
  };

  handleDisplay = display => {
    this.setState({
      display
    });
  };

  render() {
    const { db, display } = this.state;
    return (
      <>
        <div className="display">{display}</div>
        <div className="wrapper">
          {db.map(item => {
            const { id, url, name, keyCode } = item,
              path = `sounds/${url}`;
            return (
              <DrumPad
                key={id}
                src={path}
                name={name}
                keyCode={keyCode}
                handleDisplay={this.handleDisplay}
              />
            );
          })}
        </div>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <DrumMaschine />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// https://www.kozco.com/tech/soundtests.html

// https://www.kozco.com/tech/piano2.wav
