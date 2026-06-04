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

  return (
    <>
      <section id="center">
        {state.map((todolist) => {
          return (
            <div key={todolist.id}>
              <h4>
                <span>{todolist.title}</span>
                <span>X</span>
              </h4>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
