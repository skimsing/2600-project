import './CreateUser.scss';
import { useState } from 'react';
import axios from 'axios';


export default function CreateAccount(){
    //CREATE ACCOUNT VARIABLES
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleNewAccount = async(data) => {
        try {
          data.preventDefault();
          const createNewUser = {
            name: name,
            username: username,
            password: password
          }
            const res = await axios.post('http://localhost:8080/user/',createNewUser);
            console.log(res);
  
        } catch (error) {
          console.error("failed to create new user", error)
        }
      }; 
    
    return(
        <div>
            <form className='createAccount'
                onSubmit={handleNewAccount}
            >
                <label htmlFor='name'>Name</label>
                <input className='createAccount__name'
                id='name'
                    placeholder='enter your name...'
                    required
                ></input>
                <label htmlFor='username'>Username</label>
                <input className='createAccount__username'
                id='username'
                    placeholder='enter a username...'
                    required
                ></input>
                <label htmlFor='password'>Password</label>
                <input className='createAccount__password'
                    id='password'
                    placeholder='enter your password...'
                    required
                ></input>
                <button className='createAccount__submitBtn'
                    type='submit'
                >Create your Account</button>
            </form>
        </div>
    )
}