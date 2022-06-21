import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function Todos() {
    const [todos, setTodos] = useState([])

    useEffect(()=>{
        Axios.get("http://localhost:4000/view-todos").then((response)=>{
            setTodos(response.data)
        })
    },[])
  return (
    <div className='todos'>

    </div>
  )
}

export default Todos