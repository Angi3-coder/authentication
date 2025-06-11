import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Profile() {

    //set variable to hold the user
    const [user, setUser] = useState('')
    const navigate = useNavigate()


    useEffect(()=>{
        fetch('http://127.0.0.1:5000/profile', {
            credentials: 'include'
        })
        .then (res => {
            if (!res.ok) {
                navigate('/login') // Not logged in
            }
            return res.json();
        })
        .then(data => setUser(data));
    }, [navigate])

  return (
    <div>
        <h2>Hi, {user.username}</h2>
        <p>Welcome to you profile</p>
    </div>
  )
}

export default Profile