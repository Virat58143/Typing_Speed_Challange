import { useEffect, useState } from "react";
import { getText } from "./data";
import "./App.css";

// voice messages
const wrongVoice = new SpeechSynthesisUtterance("You typed wrong");
const completeVoice = new SpeechSynthesisUtterance("You completed the test");

export default function App() {

  // states
  const [text, setText] = useState(getText());
  const [input, setInput] = useState("");

  const [timeLimit, setTimeLimit] = useState(60); // selected time
  const [time, setTime] = useState(60);

  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  //  timer logic
  useEffect(() => {
    if (!started || time === 0 || done) return;

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [started, time, done]);

  //  typing handler
  const handleChange = (e) => {
    const value = e.target.value;

    if (!started) setStarted(true);

    const index = value.length - 1;

    // wrong character
    if (text[index] !== value[index]) {
      speechSynthesis.cancel();
      speechSynthesis.speak(wrongVoice);
    }

    setInput(value);

    // completed
    if (value === text) {
      speechSynthesis.cancel();
      speechSynthesis.speak(completeVoice);
      setDone(true);
    }
  };

  //  calculations
  const correct = input
    .split("")
    .filter((c, i) => c === text[i]).length;

  const accuracy = input.length
    ? Math.round((correct / input.length) * 100)
    : 100;

  const wpm =
    time < timeLimit
      ? Math.round((input.split(" ").length * 60) / (timeLimit - time))
      : 0;

  const pass = accuracy >= 80 && wpm >= 25;

  //  restart game
  const restart = () => {
    setText(getText());
    setInput("");
    setTime(timeLimit);
    setStarted(false);
    setDone(false);
  };

  //  change time
  const changeTime = (e) => {
    const value = Number(e.target.value);
    setTimeLimit(value);
    setTime(value);
    restart();
  };

  return (
    <div className="app">
      <h1>⚡ Typing Speed Challenge</h1>

      {/* Time Selector */}
      <div className="time-select">
        <label>⏱ Select Time: </label>
        <select onChange={changeTime} value={timeLimit}>
          <option value="30">30 sec</option>
          <option value="60">60 sec</option>
          <option value="120">120 sec</option>
        </select>
      </div>

      <div className="panel">
        <div className="box">
          <p className="paragraph">
            {text.split("").map((ch, i) => {
              let cls = "";
              if (i < input.length) {
                cls = input[i] === ch ? "correct" : "wrong";
              }
              return (
                <span key={i} className={cls}>
                  {ch}
                </span>
              );
            })}
          </p>

          <input
            value={input}
            onChange={handleChange}
            disabled={time === 0 || done}
            placeholder="Start typing here..."
          />
        </div>

        <div className="stats">
          <p>⏱ Time Left: {time}s</p>
          <p>⚡ WPM: {wpm}</p>
          <p>🎯 Accuracy: {accuracy}%</p>

          {(time === 0 || done) && (
            <p className={pass ? "pass" : "fail"}>
              {pass ? "✅ PASS" : "❌ FAIL"}
            </p>
          )}

          <button onClick={restart}>Restart</button>
        </div>
      </div>
    </div>
  );
}
