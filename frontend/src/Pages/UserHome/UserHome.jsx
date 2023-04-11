import "./UserHome.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {noSpaces, allSpaces} from '../../Helpers/Validators'
import Dialogue from "../../Components/Dialogue/Dialogue";
export default function UserHome({
  user,
  renderStory,
  handleEditUser,
  isLoggedIn,
  renderDialogue
}) {
  const nav = useNavigate();
  const { username, name} = user;
  const [userStories, setUserStories] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  //objects
  const editObj = {
    name: editName
  };
  const getUserData = async () => {
    try {
      setLoading(true);
      if(user){
      const getStories = await axios.get(
        `http://localhost:8080/stories/userStories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
      if (getStories) setUserStories(getStories.data);
    }
    setLoading(false);
    } catch (error) {
      console.error("couldn't load stories", error)
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleValidEdit = (e) =>{
    e.preventDefault();
    if(noSpaces(editName)){
      handleEditUser(editObj)
    }
    else{
      setErrorMsg("sorry name cannot contain spaces")
      setShow(true)
    }
  }
  return (
    <div className="user">
      {isLoggedIn ? (
        <div>
          {loading ? (
            <div>
              <h2>Loading...</h2>
            </div>
          ) : (
            <div>
              <div className="user__welcome">
                <h1>Welcome Back!</h1>
              </div>
              <div className="user__profile">
                <h2>Your Profile</h2>
                <div className="user__details">
                  <h3>name: {loading ? "loading" : name}</h3>
                  <h3>username: {loading ? "loading" : username}</h3>
                </div>
                <div className="user__editDetails">
                  <a
                    className="user__editPrompt"
                    onClick={() => setEditing(!editing)}
                  >
                    Edit Your Name?
                  </a>
                  {editing && (
                    <form
                      onSubmit={(e) => {
                        handleValidEdit(e);
                      }}
                    >
                      <input
                        type="text"
                        placeholder="enter your name"
                        minLength="2"
                        maxLength="50"
                        value={editName}
                        required
                        onChange={(e) => setEditName(e.target.value)}
                      ></input>
                      <button type="submit">submit</button>
                    </form>
                  )}
                </div>
                {/* <div className="user__editDetails">
                  <button
                    className="user__editPrompt"
                    type="button"
                    onClick={() => nav("/EditUser")}
                  >
                    Edit Your Name?
                  </button>
                </div> */}
              </div>
              <div className="user__stories">
                <h2>Your Stories:</h2>
                {!loading && (
                  <div>{userStories.map((story) => renderStory(story))}</div>
                )}
              </div>
            </div>
          )}
          {show && <Dialogue setShow={setShow} message={errorMsg}/>}
        </div>
      ) : (
        <div>
          <h2>Oops, you are not logged in</h2>
        </div>
      )}
    </div>
  );
}
