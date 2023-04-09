import './UserHome.scss';
import axios from 'axios';
import { useState, useEffect} from 'react';


export default function UserHome({isLoggedIn, user}){

    return(
        <div>
            <div className='user-welcome'>
                <h1>Welcome {user.name}</h1>
            </div>
            <div className='user__profile'>
                <h2>Your Profile</h2>
                <div className='user__details'>
                    <h3>username: {user.username}</h3>
                </div>
                <div className='user__editDetails'>
                    <h3>Edit Details?</h3>

                </div>
            </div>
            <div className='user_stories'>
                <h2>Your Stories:</h2>
                {user.stories ? "yay":"You haven't published anything yet :("}
            </div>
        </div>
    )
}