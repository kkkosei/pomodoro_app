import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import StartButton from "./components/StartButton";
import "./App.css"

function App() {
  // 残り時間（秒）
  const [time, setTime] = useState(25 * 60); // 25分
  // 再生中かどうか
  const [isRunning, setIsRunning] = useState(false);

  // useEffect で1秒ごとに減らす処理
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  // 分:秒に変換
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");


  return (
    <div className="App">

      <CountdownCircleTimer className="timer-wrapper"
        isPlaying={isRunning}
        duration={time}
        colors={["#004777", "#F7B801", "#A30000"]}
        colorsTime={[1500, 600, 300]}
        strokeWidth={20}
        size={240}
      >
        {() => (
          <div style={{ fontSize: "32px" }}>
            {minutes}:{seconds}
          </div>
        )}
      </CountdownCircleTimer>

      <StartButton 
        isRunning={isRunning} 
        css={"button"} 
        onClickStart={() => setIsRunning(true)} 
        onClickStop={() => setIsRunning(false)}
      />

    </div>
  );
}
export default App;
