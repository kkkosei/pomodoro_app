import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./App.css"

function App() {
  // 残り時間（秒）
  const [time, setTime] = useState(25 * 60); // 25分
  // 再生中かどうか
  const [isRunning, setIsRunning] = useState(false);
  // リセット用のキー
  const [key, setKey] = useState(0);

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

  // リセット処理
  const resetTimer = () => {
    setTime(25 * 60);
    setKey((prev) => prev + 1); // CountdownCircleTimerを再描画
    setIsRunning(false);
  };

  return (
    <div className="App">

      <CountdownCircleTimer className="timer-wrapper"
        key={key}
        isPlaying={isRunning}
        duration={25 * 60}
        initialRemainingTime={time}
        colors={["#004777", "#F7B801", "#A30000"]}
        colorsTime={[7, 5, 2]}
        strokeWidth={20}
        size={240}
      >
        {() => (
          <div style={{ fontSize: "32px" }}>
            {minutes}:{seconds}
          </div>
        )}
      </CountdownCircleTimer>

      <div className="buttons">
        <button className="button" onClick={() => setIsRunning(true)}>スタート</button>
        <button className="button" onClick={() => setIsRunning(false)}>ストップ</button>
        <button className="button" onClick={resetTimer}>リセット</button>
      </div>
    </div>
  );
}
export default App;
