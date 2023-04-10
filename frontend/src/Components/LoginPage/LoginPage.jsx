import "./LoginPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage({setIsLoggedIn, isLoggedIn, getUser, handleLogin }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const user = {
    username: username,
    password: password,
  };
  const goCreateUser = () => {
    navigate("/CreateUser");
  };
  const goHome = () =>{
    navigate("/")
  }
//   const goUserHome = async(e) => {
//     const check = await handleLogin(e,user)
//     console.log("check", isLoggedIn)
//     if (isLoggedIn) navigate("/");
    
//   };
  return (
    <div className="formCard">
      <h2>Login</h2>
      <form
        className="formCard__loginForm"
        onSubmit={(e) => {
          handleLogin(e, user)
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
        <button className="formCard__loginBtn" type="submit">
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
