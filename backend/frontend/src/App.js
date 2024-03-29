// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

//components
import Header from "./Components/Header/Header";
import LoginPage from "./Components/LoginPage/LoginPage";
import RenderStory from "./Components/RenderStory/RenderStory";

//pages
import Main from "./Pages/Main/Main";
import UserHome from "./Pages/UserHome/UserHome";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Stories from "./Pages/Stories/Stories";
import { useState, useEffect } from "react";
import Dialogue from "./Components/Dialogue/Dialogue";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("")
  const renderStory = (story) => <RenderStory story={story} />;
  const renderDialogue = (messageObj) => (
    <Dialogue message={messageObj} show={show} setShow={setShow} />
  );
  //check for jwt token on mount
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      getUser(jwtToken);
    }
  }, []);

  //if user already logged in, get info
  const getUser = async (jwtToken) => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response) {
        setUser(response.data);
        setIsLoggedIn(true);
      } else {
        console.log("no such user found");
        setUser({
          name: "not found",
          username: "not found",
        });
      }
    } catch (error) {
      console.error("cannot get user", error);
    }
  };
  //password and token authentication handled by server
  const handleLogin = async (userObj) => {
    try {
      const response = await axios.post(
        `/users/login`,
        userObj
      );
      if (response.data.token) {
        getUser(response.data.token);
        localStorage.setItem("jwt_token", response.data.token);
        setTitle("Success!")
        setMsg("logged in successfully")
        setShow(true)
      } else {
        console.log("couldn't find user");
      }
    } catch (error) {
      console.error("cannot log in", error);
      setMsg(error.response.data.message)
      setShow(true)
    }
  };
  const handleEditUser = async (editObj) => {
    try {
      const response = await axios.put("/users", editObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      if (response) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("cannot edit user", error);
    }
  };
  const getStoriesByGenre = async (genre) => {
    try {
      const response = await axios.get(
        `/stories/${genre}`
      );
      if (!response) return null;
      else return response.data;
    } catch (error) {
      console.error("cannot get stories", error);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                user={user}
                renderDialogue={renderDialogue}
              />
            }
          />
          <Route
            path="/UserHome"
            element={
              <UserHome
                user={user}
                isLoggedIn={isLoggedIn}
                renderStory={renderStory}
                handleEditUser={handleEditUser}
                setUser={setUser}
                renderDialogue={renderDialogue}
              />
            }
          />
          <Route
            path="/CreateUser"
            element={
              <CreateUser
                isLoggedIn={isLoggedIn}
                renderDialogue={renderDialogue}
              />
            }
          />
          <Route
            path="/Login"
            element={
              <LoginPage
                getUser={getUser}
                handleLogin={handleLogin}
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                renderDialogue={renderDialogue}
                msg={msg}
                show={show}
              />
            }
          />
          <Route
            path="/ReadStories"
            element={
              <Stories
                renderStory={renderStory}
                getStoriesByGenre={getStoriesByGenre}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {show && <Dialogue setShow={setShow} message={msg} title={title}/>}
    </div>
  );
}

export default App;
