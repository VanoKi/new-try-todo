import {useEffect, useState} from "react";
import './App.css';
import type {TodolistType} from "@/entities/todolists/model/types.ts";
import {getTodolists} from "@/entities/todolists/api/todolists-api.ts";

function App() {
  const [todolists, setTodolists] = useState<TodolistType[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getTodolists().then(response => {
      setTodolists(response.data);
    }).catch( e => {
      setError(e.message)
    }).finally(() => {setLoading(false)})
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      {todolists.map(todolist => <div key={todolist.id}>{todolist.title}</div>)}
    </>
  );
}

export default App;
