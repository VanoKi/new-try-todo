import {useEffect, useState} from "react";
import './App.css';
import {instance} from "@/shared/api/api-instance.ts";
import type {Todolist} from "@/entities/todolists/model/types.ts";

function App() {
  const [todolists, setTodolists] = useState<Todolist[]>([]);

  useEffect(() => {
    instance.get('todo-lists').then(response => {
      setTodolists(response.data);
    });
  }, []);

  return (
    <>
      {todolists.map(todolist => <div key={todolist.id}>{todolist.title}</div>)}
    </>
  );
}

export default App;
