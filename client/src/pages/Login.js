import React, {useState}from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    

    const user = { username, password }


    function handleSubmit(e){
        e.preventDefault();

        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{

            if (data.message === 'Logged in successfully') {
                navigate ('/profile')
            } else {
                alert ('Login Failed!')
            }
            
            setPassword('')
            setUsername('')
            //after a succesful log init should redirect us to the persons profile
        })
    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Username' value = {username} onChange={(e)=>setUsername(e.target.value)} required />
            <input type= 'password' placeholder='password'value= {password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login