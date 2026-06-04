import {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
      }
    }).then(response => {
      setState(response.data)
    })
  }, [])

  return (
    <>
      <section id='center'>
        {state.map(todolist => {
          return (
            <div key={todolist.id}>
              {todolist.title}
            </div>
          )
        })}
      </section>
    </>
  );
}

export default App;
