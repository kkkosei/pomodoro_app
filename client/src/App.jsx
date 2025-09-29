import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import StartButton from "./components/StartButton";
import "./App.css"

function App() {
  // 残り時間（秒）
  const [time, setTime] = useState(1 * 60); // 30分
  // 再生中かどうか
  const [isRunning, setIsRunning] = useState(false);
  // 休憩中かどうか
  const [mode, setMode] = useState("work"); // work, break5, break15
  const [cycleCount, setCycleCount] = useState(1); // 何回目の作業か

  // useEffect で1秒ごとに減らす処理
  useEffect(() => {
    let timer;
    if (isRunning) {//タイマーが作動中かどうか
      timer = setInterval(() => {

        setTime((t) => {

          if (t > 0) {//timerの時間がまだある場合
            return t - 1;
          } else {//timer終了後の動作
            clearInterval(timer);
            if (mode === "work") {//作業中の場合

              if ((cycleCount) % 4 === 0) {
                setMode("break15");
                return 1 * 60;
              } else {
                setMode("break5");
                return 1 * 60;
              }

            } else {//休憩中の場合
              setCycleCount(c => c + 1);
              setMode("work");
              return 1 * 60;
            }
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, mode, cycleCount]);

  // 分:秒に変換
  const minutes = Math.floor(time / 60);
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="App">
      

      <h1> {cycleCount} {mode} </h1>
      <CountdownCircleTimer className="timer-wrapper"
        key={mode}
        isPlaying={isRunning}
        duration={mode === "work" ? 1 * 60 : mode === "break10" ? 1 * 60 : 1 * 60}
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
        onClickStart={() =>  setIsRunning(true)} 
        onClickStop={() => setIsRunning(false)}
      />

    </div>
  );
}
export default App;
