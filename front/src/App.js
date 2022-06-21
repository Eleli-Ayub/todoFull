import './App.scss';
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import TimePicker from 'react-time-picker';


function App() {
  
  const [todos, setTodos] = useState([])
  const [time, setTime] = useState('00:00');
  const [todo, setTodo] = useState('')

  const deleteTodo = (e)=>{
    e.preventDefault()
    alert("Itemm added \n" + todo)
    Axios.post("http://localhost:5000/add-todo", {'title': todo, 'time': time}).catch((error) => {console.log(error)})
  }


  const addTodo = (e)=>{
    e.preventDefault()
    alert("Itemm added \n" + todo)
    Axios.post("http://localhost:5000/add-todo", {'title': todo, 'time': time}).catch((error) => {console.log(error)})
  }

  useEffect(()=>{
    Axios.get("http://localhost:5000/view-todo").then((response)=>{
        setTodos(response.data)
    })
},[])


  return (
    <div className="App">
      <h1>My todo app</h1>


      <div className="addTodo">
        <TimePicker onChange={setTime} value={time} />
          <input 
            onChange={(e)=>{
              setTodo(e.target.value)
            }}
            type="text" 
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
      <table>
        <th>Title</th>
        <th>Time</th>
        {todos.map((val)=>{
          return(
            <tr>
              <td>{val.title}</td>
              <td>{val.time}</td>
              <td><button onClick={deleteTodo}>delete</button></td>
            </tr>
          )
        })}
        </table>
    </div>
  );
}

export default App;
