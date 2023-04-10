import './CreateUser.scss';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';

export default function CreateAccount(){
    const navigate = useNavigate();
    //CREATE ACCOUNT VARIABLES
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleNewAccount = async(data) => {
        try {
          data.preventDefault();
        //   if(!name || !password || !username ) ({message: "these fields cannot be blank"})
        //   else{
              const createNewUser = {
                name: name,
                username: username,
                password: password
              }
                const res = await axios.post('http://localhost:8080/users/',createNewUser);
                console.log(createNewUser)
                navigate('/Login');
        //   }
  
        } catch (error) {
          console.error("failed to create new user", error)
        }
      }; 
    
    return(
        <div className='createAccount'>
            <h2>Create an Account</h2>
            <form className='createAccount__form'
                onSubmit={handleNewAccount}
            >
                <label htmlFor='name'>Name</label>
                <input className='createAccount__name'
                id='name'
                    placeholder='enter your name...'
                    minLength="2"
                    maxLength="50"
                    required
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                ></input>
                <label htmlFor='username'>Username</label>
                <input className='createAccount__username'
                id='username'
                    placeholder='enter a username...'
                    required
                    minLength="6"
                    maxLength="30"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                ></input>
                <label htmlFor='password'>Password</label>
                <input className='createAccount__password'
                    id='password'
                    placeholder='choose a password...'
                    required
                    minLength="8"
                    maxLength="50"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                ></input>
                <button className='createAccount__submitBtn'
                    type='submit'
                >Create your Account</button>
            </form>
        </div>
    )
}