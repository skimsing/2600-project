import './StoryInput.scss'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function StoryInput({ isLoggedIn, user }) {
  const navigate = useNavigate();
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("other");
  const [posted, setPosted] = useState(false);
  const postStory = (form) => {
    try {
      form.preventDefault();
      const newStory = {
        title: title,
        story: story,
        genre: genre,
      };
      axios
        .post("http://localhost:8080/stories/postStory", newStory, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        })
        .then((response) => {
          console.log(response)
          setPosted(true)
        });
    } catch (error) {
      console.error("story could not post", error);
    }
  };
  const handleSubmit = () => {
    try {
      if (isLoggedIn) {
        postStory();
      } else {
        console.log("sorry, you are not logged in");
      }
    } catch (error) {
      console.error("story could not save", error);
    }
  };
  return (
    <div className="write">
      <h2>Inspired? Scribble Away!</h2>
      <form className="write__form" onSubmit={(e)=>{postStory(e)}}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          className="write__title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title of your story"
          minLength="2"
          maxLength="250"
          required
        ></input>
        <label htmlFor="genre">Genre:</label>
        <select
          className="write__genre"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        >
          {" "}
          <option disabled value="other">
            {" "}
            -- select a genre --
          </option>
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
          <option value="mystery">Mystery</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor='story'>Your Story:</label>
        <textarea
          id='story'
          className="write__input"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          required
          placeholder="write your masterpiece..."
          rows={15}
          minLength="10"
          maxLength="3000"
        ></textarea>
        <button className="write__submit" type="submit">
          Submit
        </button>
      </form>
      {posted && <p>your story has been posted</p>}
    </div>
  );
}
