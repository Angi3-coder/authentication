import React, { useState} from 'react'



function SignUp() {

    //variables 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const newUser = { username, password }

    function handleSubmit(e){
        e.preventDefault()
        fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then (res=>res.json())
        .then (data => {
            console.log(data)
            setUsername('')
            setPassword('')
        })
        .catch (err =>console.error(err))
    }




  return (

    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Username' value = {username} onChange={(e)=>setUsername(e.target.value)} required />
            <input placeholder='password'value= {password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type='submit'>SignUp</button>
        </form>
    </div>
  )
}

export default SignUp