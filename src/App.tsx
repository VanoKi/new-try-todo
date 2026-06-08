import { useEffect, useState } from "react";
import { instance } from "./api/api";
import type { todolistType } from "./api/todolist.api";
import "./App.css";
import { Input } from "../components/Input/Input";

function App() {
  const [state, setState] = useState<todolistType[]>([]);

  useEffect(() => {
    instance.get("todo-lists").then((response) => {
      setState(response.data);
    });
  }, []);

  const deleteTodolistHandler = (todolistId: string) => {
    instance.delete(`todo-lists/${todolistId}`).then((res) => {
      if (res.data.resultCode === 0) {
        setState(state.filter((tl) => tl.id !== todolistId));
      }
    });
  };

  const addTodolistHandler = (value: string) => {
    instance.post(`todo-lists`, { title: value }).then( res => {
      if (res.data.resultCode === 0) {
        setState([...state, res.data.data.item]);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <section id="center">
        <Input 
        placeholder="Enter todo list title" 
        addItem={addTodolistHandler}
        />
        {state.map((todolist) => {
          return (
            <div key={todolist.id}>
              <h4 className="todolist-title">
                <span>{todolist.title}</span>
                <button
                  onClick={() => {
                    deleteTodolistHandler(todolist.id);
                  }}
                >
                  <span>X</span>
                </button>
              </h4>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
