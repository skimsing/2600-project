import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Edit({setUser}) {
    const nav = useNavigate();
  const [editName, setEditName] = useState("");
  const editObj = {
    name: editName
  };
  const handleEditUser = async (editObj) => {
    try {
      const response = await axios.put("http://localhost:8080/users", editObj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });
      if (response) {
        console.log(response)
        setUser(response.data);
      }
    } catch (error) {
      console.error("cannot edit user", error);
    }
  };
  const submitHandler = (e) =>{
    e.preventDefault()
    handleEditUser(editObj)
    // alert("Your name has been updated")   
    nav('/UserHome')
  }
  return (
    <div className="EditUser">
      <div className="user__editDetails">
        <a className="user__editPrompt">
          Edit Your Name?
        </a>
          <form
            onSubmit={(e) => {
              submitHandler(e);
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
      </div>
    </div>
  );
}
