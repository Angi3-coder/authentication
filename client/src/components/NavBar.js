import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function NavBar() {

  // set is logged in 
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const navigate = useNavigate()


  useEffect(()=> {
      fetch('http://127.0.0.1:5000/profile', {
        credentials: 'include'
      })
      .then(res => setisLoggedIn(res.ok))
    
  }, [])

  function handleLogout(){
    fetch('http://127.0.0.1:5000/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(()=> {
      setisLoggedIn(false)
      navigate('/login')
    })
  }

  return (
    <div>
        <div style={{paddingRight: '10px'}}>
          {isLoggedIn ? (
            <>
              <a href='/profile'>Profile</a>
              <button onClick={handleLogout}>Logout</button>
            </>  
          ):(
            <>
              <a href='/signup'>Sign Up</a>
              <a href='/login'>Log in</a>
            </>
            
          )}
          
        </div>
        
    </div>
  )
}

export default NavBar