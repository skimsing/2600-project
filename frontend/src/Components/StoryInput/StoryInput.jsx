import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import SaveModal from "../SaveModal/SaveModal";

export default function StoryInput({ isLoggedIn }) {
  const navigate = useNavigate();
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("other");
  const postStory = (form) => {
    try {
      form.preventDefault();
      const newStory = {
        title: title,
        story: story,
      };
      axios.post("").then();
    } catch (error) {
      console.error("story could not post", error);
    }
  };
  const handleSubmit = () => {
    try {
      if (isLoggedIn) {
        postStory();
      } else {
        <SaveModal />;
      }
    } catch (error) {
      console.error("story could not save", error);
    }
  };
  return (
    <div className="write">
        <h3>Inspired? Write your Own!</h3>
      <form className="write__form" onSubmit={handleSubmit}>
        <label HTMLfor="title">Title</label>
        <text
          className="write__title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></text>
        <label HTMLfor="genre">Genre</label>
        <select
          className="write__genre"
          id="genre"
          value={genre}
          onChange={(e) => setTitle(e.target.value)}
        >
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
          <option value="mystery">Mystery</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="romance">Romance</option>
        </select>
        <textarea
          className="story_input"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
