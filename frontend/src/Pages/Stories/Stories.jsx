import "./Stories.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
export default function Stories({ renderStory, getStoriesByGenre }) {
  const [storiesArray, setStoriesArray] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  //on mount get all stories
  useEffect(() => {
    axios.get("http://localhost:8080/stories").then((response) => {
      setStoriesArray(response.data);
    });
  }, []);
// get new stories on selection
  useEffect(()=>{
    if(selectedGenre){
        const getStories = async() =>{
            const newStories = await getStoriesByGenre(selectedGenre)
            if(!newStories) {
                setSelectedGenre(null)
            }
            else {
                setStoriesArray(newStories)
            }
        }
        getStories()
    }
  }, [selectedGenre])
  return (
    <div className="stories">
      <h1 className="stories__title">Stumped? Try Reading Some Stories!</h1>
      <form className="genreForm">
        <label className="genreForm__label" htmlFor="genres">
          Select Genre
        </label>
        <select
          className="genreForm__select"
          id="genres"
          defaultValue="default"
          onChange={(e) => {setSelectedGenre(e.target.value)}}
        >
          {" "}
          <option disabled value="default">
            {" "}
            -- filter by genre --
          </option>
          <option value={"mystery"}>Mystery</option>
          <option value={"romance"}>Romance</option>
          <option value={"sci-fi"}>Sci-Fi</option>
          <option value={"fantasy"}>Fantasy</option>
          <option value={"horror"}>Horror</option>
          <option value={"other"}>Other</option>
        </select>
      </form>
      <div className="stories__container">
        {storiesArray.map((story) => renderStory(story))}
      </div>
    </div>
  );
}
