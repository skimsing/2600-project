// import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
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
import EditUser from "./Components/Edit/Edit";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const renderStory = (story) => <RenderStory story={story} />;
  const tempDetails = {
    name: "loading...",
    username: "loading...",
  };
  //check for jwt token on mount
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      getUser(jwtToken);
    }
  }, []);
  // useEffect(()=>{
  //   const jwtToken = localStorage.getItem("jwt_token");
  //   // if(user == undefined) setUser(tempDetails)
  //   const updateUser = async () =>{
  //     try {
  //       const res = await axios.get("http://localhost:8080/users", {
  //         headers: {
  //           Authorization: `Bearer ${jwtToken}`,
  //         },
  //       });
  //       setUser(res.data)
  //     } catch (error) {
  //       setUser(tempDetails)
  //     }
  //   }
  //   updateUser(user)
  // },[user])
  //if user already logged in, get info
  const getUser = async (jwtToken) => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
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
  const handleLogin = async (event, userObj) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/users/login`,
        userObj
      );
      if (response.data.token) {
        getUser(response.data.token);
        localStorage.setItem("jwt_token", response.data.token);
        alert("login success!")
      } else {
        console.log("couldn't find user");
      }
    } catch (error) {
      console.error("cannot log in", error);
    }
  };
  const handleEditUser = async (e, editObj) => {
    try {
      e.preventDefault();
      // setLoading(true)
      // while(loading){
      //   setUser(tempDetails)
      // }
      const response = await axios.put("http://localhost:8080/users", editObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      if (response) {
        setUser(response.data);
        // setLoading(false)
      }
    } catch (error) {
      console.error("cannot edit user", error);
    }
  };
  const getStoriesByGenre = async (genre) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/stories/${genre}`
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
            element={<Main isLoggedIn={isLoggedIn} user={user} />}
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
              />
            }
          />
          <Route
            path="/CreateUser"
            element={<CreateUser isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/Login"
            element={
              <LoginPage getUser={getUser} handleLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/Stories"
            element={
              <Stories
                renderStory={renderStory}
                getStoriesByGenre={getStoriesByGenre}
              />
            }
          />
          <Route
            path="/EditUser"
            element={
              <EditUser
                // handleEditUser={handleEditUser}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
