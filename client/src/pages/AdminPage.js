import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {

    // 
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/admin/dashboard', {
            credentials: 'include'
        })
        .then (res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/login')
            }
            return res.json()
        })
        .then (data => {setMessage(data.Message || data.error
        )})
    }, [])

  return (
    <div>{message}</div>
  )
}

export default AdminPage