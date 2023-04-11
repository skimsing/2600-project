import './Main.scss'
import React, { useState } from "react"
import prompts from '../../assets/writing-prompts.json'
import StoryInput from '../../Components/StoryInput/StoryInput'
export default function Main({isLoggedIn, user, renderDialogue}){
    const [prompt, setPrompt] = useState("");
    const getRandomPrompt = () =>{
        const randomInt = Math.floor(Math.random() * 20 + 1);
        const newPrompt = prompts.find(e => e.id === randomInt)
        return newPrompt.prompt
    }
    //set prompt on load
    useState(()=>{
        setPrompt(getRandomPrompt)
    },[])

    return(
        <div className="prompt">
            <div >
                <div className='prompt__header'>
                <h1>Always wanted to write?</h1>
                <h3>Now's your chance! Use the prompt below to practice writing a short story in under 250 words</h3>
                </div>
                <h2 className="prompt__title">Prompt:</h2>
                <h3 className="prompt__quote">"{prompt}"</h3>
                <a className="prompt__source"
                href="https://fungenerators.com/random/writing-prompt">Prompts Obtained from Fungenerators.Com</a>
                <br/>
                <button className="prompt__btn" 
                type="button"
                onClick={()=>setPrompt(getRandomPrompt)}
                >Get new Prompt</button>
            </div>
            <StoryInput isLoggedIn={isLoggedIn} user={user} renderDialogue={renderDialogue}/>
        </div>
    )
}