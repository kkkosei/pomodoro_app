import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TimerPage from "./pages/TimerPage";
import LoginPage from "./pages/LoginPage";
import StudyLogPage from "./pages/StudyLogPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Timer</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Sign Up</Link> |{" "}
        <Link to="/log">Study Log</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TimerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/log" element={<StudyLogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
