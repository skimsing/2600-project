import "./LoginPage.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { noSpaces, allSpaces } from "../../Helpers/Validators";
import Dialogue from "../Dialogue/Dialogue";

export default function LoginPage({ isLoggedIn, handleLogin, renderDialogue }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
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
  const handleValidLogin = (e) => {
    e.preventDefault();
    if (noSpaces(user.username) && noSpaces(user.password)) {
      handleLogin(user);
    } else {
      setErrorMsg("no spaces allowed, please try again");
      setShow(true);
    }
  };
  return (
    <div className="formCard">
      <h2>Login</h2>
      <form
        className="formCard__loginForm"
        onSubmit={(e) => {
          handleValidLogin(e);
        }}
      >
        <label className="formCard__label" htmlFor="username">
          Username
        </label>
        <input
          className="formCard__username"
          id="username"
          type="text"
          placeholder="enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="formCard__label" htmlFor="password">
          Password
        </label>
        <input
          className="formCard__password"
          id="password"
          type="password"
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
        <button className="exit__btn" onClick={goCreateUser}>
          Create Account
        </button>
        <button className="exit__btn" onClick={goHome}>
          Cancel
        </button>
      </div>
      {show && <Dialogue message={errorMsg} setShow={setShow} />}
    </div>
  );
}
