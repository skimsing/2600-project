import './Header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header({isLoggedIn, user, setUser, setIsLoggedIn}){
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        nav('/')
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("jwt_token");
      };
    return(
        <div className='headerNav'>
            <nav className='headerNav__nav'>
                <div className="headerNav__logo">
                    Scribble
                </div>
                <ul className='headerNav__listItems'>
                    <li className='headerNav__item'>
                        {isLoggedIn ? <Link className="headerNav__itemLink"
                            to={"/UserHome"}>
                            {loading ? "loading..." : user.name}
                        </Link> :
                        <Link className="headerNav__itemLink"
                            to={"/Login"}>
                            Login
                        </Link>}
                    </li>
                    {isLoggedIn && <li className='headerNav__item'>
                        <a className="headerNav__itemLink"
                            onClick={handleLogout}>
                            Logout
                        </a>
                    </li>}
                    <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={"/Stories"}>
                            Stories
                        </Link>
                    </li>
                   {!isLoggedIn && <li className='headerNav__item'>
                        <Link className='headerNav__itemLink'
                            to={'/CreateUser'}
                        >
                            Create Account
                        </Link>
                    </li>}
                    <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={'/'}>
                            Main
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}