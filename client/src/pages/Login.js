import React, {useState}from 'react'
import { Navigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

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
            console.log(data)
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