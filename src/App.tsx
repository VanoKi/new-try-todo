import { useEffect, useState } from "react";
import { instance } from "./api/api";
import type { todolistType } from "./api/todolist.api";
import "./App.css";
import { Input } from "@/components/Input/Input";
import { EditableSpan } from "@/components/EditableSpan/EditableSpan";

function App() {
  const [state, setState] = useState<todolistType[]>([]);

  useEffect(() => {
    instance.get("todo-lists").then((response) => {
      setState(response.data);
      state.map((tl) => {
        instance.get(`todo-lists/${tl.id}/tasks`).then((response) => {
          console.log(response.data);
        });
      });
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

  const changeTodolistTitleHandler = ({id, title}: {id: string, title: string}) => {
    instance.put(`todo-lists/${id}`, { title }).then(res => {
      if (res.data.resultCode === 0) {
        setState(state.map(tl => tl.id === id ? { ...tl, title } : tl));
      }
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
                <EditableSpan 
                title={todolist.title} 
                onChange={(value) => changeTodolistTitleHandler({id: todolist.id, title: value})} 
                onDelete={deleteTodolistHandler}
                todolistId={todolist.id}
                />
              </h4>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
