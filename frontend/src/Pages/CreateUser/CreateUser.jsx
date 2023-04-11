import "./CreateUser.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { noSpaces, allSpaces, validUsername } from "../../Helpers/Validators";
import Dialogue from "../../Components/Dialogue/Dialogue";
export default function CreateAccount({ renderDialogue }) {
  const navigate = useNavigate();
  //CREATE ACCOUNT VARIABLES
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const createNewUser = {
    name: name,
    username: username,
    password: password,
  };
  const validField = (field) => {
    if (!allSpaces(field) && noSpaces(field)) return true;
    else return false;
  };
  const handleNewAccount = async (data) => {
    try {
      data.preventDefault();
      if (allSpaces(createNewUser.name)) {
        setMsg("name cannot only be a string of spaces");
        setShow(true);
      } else if (!noSpaces(createNewUser.password)) {
        setMsg("password cannot have spaces");
        setShow(true);
      } else if (!validUsername(createNewUser.username)) {
        setMsg("username contains invalid characters or is too short");
        setShow(true);
      } else {
        const res = await axios.post(
          "http://localhost:8080/users/",
          createNewUser
        );
        if (res) {
          setTitle("Created");
          setMsg("new user successfully created, please log in");
          setShow(true);
          navigate("/Login");
        } else {
          setMsg("something went wrong try again later");
          setShow(true);
        }
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setShow(true);
      console.error("failed to create new user", error);
    }
  };

  return (
    <div className="createAccount">
      <h2>Create an Account</h2>
      <div>
        <ul className="createAccount__list">
          <li className="createAccount__li">
            Username should be between 5 - 16 characters with no special
            characters
          </li>
          <li className="createAccount__li">
            Username and Password can't be changed later. Choose carefully!
          </li>
          <li className="createAccount__li">Your name can be changed later</li>
        </ul>
      </div>
      <form className="createAccount__form" onSubmit={handleNewAccount}>
        <label className="createAccount__label" htmlFor="name">
          Name
        </label>
        <input
          className="createAccount__name"
          id="name"
          placeholder="enter your name..."
          type="text"
          minLength="2"
          maxLength="50"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <label className="createAccount__label" htmlFor="username">
          Username
        </label>
        <input
          className="createAccount__username"
          id="username"
          placeholder="enter a username..."
          type="text"
          required
          minLength="6"
          maxLength="30"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <label className="createAccount__label" htmlFor="password">
          Password
        </label>
        <input
          className="createAccount__password"
          id="password"
          placeholder="choose a password..."
          type="password"
          required
          minLength="8"
          maxLength="50"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button className="createAccount__btn" type="submit">
          Create your Account
        </button>
      </form>
      {show && <Dialogue setShow={setShow} message={msg} title={title} />}
    </div>
  );
}
