import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const minutes = Math.floor(time / 60);
  
  
  const seconds = time % 60;

  return (
    <div>
      <h1>ポモドロータイマー</h1>
      <h2>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </h2>
      <button onClick={() => setIsRunning(true)}>スタート</button>
      <button onClick={() => setIsRunning(false)}>ストップ</button>
      <button onClick={() => setTime(25 * 60)}>リセット</button>
    </div>
  );
}

export default App;
