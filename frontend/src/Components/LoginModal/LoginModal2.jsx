import './LoginModal.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginModal(){
    const navigate = useNavigate();

    const [user, setUser] = useState([])
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwt_token');
        // if JWT token exists try to load the user profile, user object
        if (jwtToken) {
          loadProfile(jwtToken);
        }
      }, []);

      const loadProfile = (jwtToken) => {
        axios
          .get('http://localhost:8080/userid', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((response) => {
            setIsLoggedIn(true);
            setUser(response.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
   const handleLogin = async(details) =>{
        try {
            details.preventDefault();

            const userDetails ={
                username: username,
                password: password,
            }

            const res = await axios.post("http://localhost:8080/login", userDetails)
            if(res.data.token){
                loadProfile(res.data.token); // loadProfile, get user object
                localStorage.setItem('jwt_token', res.data.token);
            }
        } catch (error) {
            console.error("cannot log in", error);
        }
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('jwt_token');
    };

    function goCreateUser(){
        navigate('/CreateUser');
    }

    function goUserHome(){
        navigate('/UserHome');
    }
    
    return(
        <div className='overlay'>
            <div className='formCard'>
                <form className='formCard__loginForm'
                    onSubmit={handleLogin}
                >
                    <input className='formCard__username'
                        type="text" 
                        placeholder='enter username...'
                        value={username}
                        onChange={(e) => e.target.username.value}
                        required
                    />
                    <input className='formCard__password'
                        type="text"
                        placeholder='enter your password'
                        value={password}
                        onChange={(e)=>e.target.password.value}
                        required
                    />
                    <button className='formCard__loginBtn'
                        type='submit'
                    >
                        Log In
                    </button>
                </form>
                <div className='exit'>
                    <button className='exit__linkBtn'
                        onClick={goCreateUser}
                    >
                        Create Account
                    </button>
                    <button className='exit__closeModal'
                      onClick={setShow(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}