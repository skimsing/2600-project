import "./LoginPage.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  isLoggedIn,
  handleLogin,
}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username: username,
    password: password,
  };
  const goCreateUser = () => {
    navigate("/CreateUser");
  };
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="formCard">
      <h2>Login</h2>
      <form
        className="formCard__loginForm"
        onSubmit={(e) => {
          handleLogin(e, user);
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          className="formCard__username"
          id="username"
          type="text"
          placeholder="enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="formCard__password"
          id="password"
          type="text"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="formCard__loginBtn"
          type="submit"
          onClick={() => {
            if (isLoggedIn) {
              navigate("/UserHome");
            }
          }}
        >
          Log In
        </button>
      </form>
      <div className="exit">
        <button className="exit__linkBtn" onClick={goCreateUser}>
          Create Account
        </button>
        <button className="exit__closeModal" onClick={goHome}>
          Cancel
        </button>
      </div>
    </div>
  );
}
