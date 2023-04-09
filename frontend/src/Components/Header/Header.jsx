import './Header.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Header({isLoggedIn, user}){
    const [name, setName] = useState("")

    useState(()=>{
        if(isLoggedIn){
            setName(user.name)
        }
        else setName("Login")
    },[])
    return(
        <div className='headerNav'>
            <nav className='headerNav__nav'>
                <div className="headerNav__logo">
                    Scribble
                </div>
                <ul className='headerNav__listItems'>
                    <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={"/UserHome"}>
                            {name}
                        </Link>
                    </li>
                    <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={"/Stories"}>
                            Stories
                        </Link>
                    </li>
                    <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={'/'}>
                            Main
                        </Link>
                    </li>
                    <li className='headerNav__item'>
                        <Link className='headerNav__item'
                            to={'/CreateUser'}
                        >
                            Create User
                        </Link>
                    </li>
                    {/* <li className='headerNav__item'>
                        <Link className="headerNav__itemLink"
                            to={'/UserHome'}>
                            {user}
                        </Link>
                    </li>
                    <li className='headerNav__item'>
                        <Link className='headerNav__item'
                            to={'/Login'}
                        >
                            login
                        </Link>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}