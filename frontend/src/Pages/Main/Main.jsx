import React, { useState } from "react"
import prompts from '../../assets/writing-prompts.json'
import StoryInput from '../../Components/StoryInput/StoryInput'
export default function Main({isLoggedIn}){
    const [prompt, setPrompt] = useState("");
    const getRandomPrompt = () =>{
        const randomInt = Math.floor(Math.random() * 20 + 1);
        const newPrompt = prompts.find(e => e.id === randomInt)
        return newPrompt.prompt
    }
    useState(()=>{
        //set prompt on load
        setPrompt(getRandomPrompt)
    },[])
    return(
        <div>
            <div className="prompt">
                <h1 className="prompt__title">Prompt:</h1>
                <h2 className="prompt__quote">"{prompt}"</h2>
                <a className="prompt__source"
                href="https://fungenerators.com/random/writing-prompt">Prompts Obtained from Fungenerators.Com</a>
                <br/>
                <button className="prompt__btn" 
                onClick={()=>setPrompt(getRandomPrompt)}
                >Get new Prompt</button>
            </div>
            <StoryInput isLoggedIn={isLoggedIn}/>
        </div>
    )
}