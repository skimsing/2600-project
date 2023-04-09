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
    return(
        <div>

        </div>
    )
}