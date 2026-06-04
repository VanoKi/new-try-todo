import { useEffect, useState } from "react";
import { instance } from "./api/api";
import type { todolistType } from "./api/todolist.api";
import "./App.css";

function App() {
  const [state, setState] = useState<todolistType[]>([]);

  useEffect(() => {
    instance.get("todo-lists").then((response) => {
      setState(response.data);
    });
  }, []);

  const deleteTodolistHandler = (todolistId: string) => {
    instance
      .delete(`todo-lists/${todolistId}`)
      .then((res) => setState(res.data));
  };

  return (
    <>
      <section id="center">
        {state.map((todolist) => {
          return (
            <div key={todolist.id}>
              <h4>
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
