import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import StartButton from "../components/StartButton";
import "./TimerPage.css";

function TimerPage() {
  // 残り時間（秒）
  const [time, setTime] = useState(25 * 60);
  // 再生中かどうか
  const [isRunning, setIsRunning] = useState(false);
  // モード
  const [mode, setMode] = useState("work"); // work, break5, break15
  const [cycleCount, setCycleCount] = useState(1);

  // Todo
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // タイマー
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((t) => {
          if (t > 0) {
            return t - 1;
          } else {
            clearInterval(timer);
            if (mode === "work") {
              if (cycleCount % 4 === 0) {
                setMode("break15");
                return 15 * 60;
              } else {
                setMode("break5");
                return 5 * 60;
              }
            } else {
              setCycleCount((c) => c + 1);
              setMode("work");
              return 25 * 60;
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
    <div className="timer-todo-container">
      {/*ポモドロータイマー*/}
      <div className="timer-section">
        <h1>
          {cycleCount} {mode}
        </h1>

        <CountdownCircleTimer
          className="timer-wrapper"
          key={mode}
          isPlaying={isRunning}
          duration={
            mode === "work"
              ? 25 * 60
              : mode === "break5"
              ? 5 * 60
              : 15 * 60
          }
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

      {/* todoリスト */}
      <div className="todo-section">
        <h2>📝 Todoリスト</h2>
        <div className="input-area">
          <input
            type="text"
            placeholder="タスクを入力..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>追加</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span>{todo.text}</span>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TimerPage;
