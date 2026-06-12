import { useEffect, useState } from "react";
import { instance } from "./api/api";
import type { todolistType } from "./api/todolist.types";
import "./App.css";
import { Input } from "@/components/Input/Input";
import { EditableSpan } from "@/components/EditableSpan/EditableSpan";
import type { taskType, taskTypeState } from "./api/tasks.types";

function App() {
  const [todolists, setTodolists] = useState<todolistType[]>([]);
  const [tasks, setTasks] = useState<taskTypeState>({});

  useEffect(() => {
    instance.get("todo-lists").then((response) => {
      const todolists = response.data;
      setTodolists(todolists);
      todolists.forEach((tl: todolistType) => {
        instance.get(`todo-lists/${tl.id}/tasks`).then((response) => {
          setTasks(prev => ({...prev, [tl.id]: response.data.items}));
        });
      });
    });
  }, []);

  const deleteTodolistHandler = (todolistId: string) => {
    instance.delete(`todo-lists/${todolistId}`).then((res) => {
      if (res.data.resultCode === 0) {
        setTodolists(todolists.filter((tl) => tl.id !== todolistId));
      }
    });
  };

  const addTodolistHandler = (value: string) => {
    instance.post(`todo-lists`, { title: value }).then(res => {
      if (res.data.resultCode === 0) {
        setTodolists([...todolists, res.data.data.item]);
      }
    }).catch(err => {
      console.log(err);
    });
  };

  const changeTodolistTitleHandler = ({ id, title }: { id: string, title: string }) => {
    instance.put(`todo-lists/${id}`, { title }).then(res => {
      if (res.data.resultCode === 0) {
        setTodolists(todolists.map(tl => tl.id === id ? { ...tl, title } : tl));
      }
    });
  };

  const addTaskHandler = ({ value, todolistId }: { value: string, todolistId: string }) => {
    instance.post(`todo-lists/${todolistId}/tasks`, { title: value }).then(res => {
      if (res.data.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: [...prev[todolistId], res.data.data.item]}));
      }
    });
  };

  const deleteTaskHandler = ({taskId, todolistId}: {taskId: string, todolistId: string}) => {
    instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`).then(res => {
      if (res.data.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: prev[todolistId]?.filter(task => task.id !== taskId) || []}));
      }
    });
  }

  const changeTaskTitleHandler = ({ taskId, title, todolistId }: { taskId: string, title: string, todolistId: string }) => {
    instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, { title }).then(res => {
      if (res.data.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: prev[todolistId]?.map(task => task.id === taskId ? { ...task, title } : task) || []}));
      }
    });
  }
  const changeTaskStatusHandler = ({body, todolistId, taskId }: { taskId: string, body: taskType, todolistId: string }) => {
    instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, body ).then(res => {
      if (res.data.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: prev[todolistId]?.map(task => task.id === taskId ? { ...task, ...body } : task) || []}));
      }
    });
  }

  return (
    <>
      <section id="center">
        <Input
          placeholder="Enter todo list title"
          addItem={addTodolistHandler}
        />
        {todolists.map((todolist) => {
          return (
            <div key={todolist.id}>
              <h4 className="todolist-title">
                <EditableSpan
                  title={todolist.title}
                  onChange={(value) => changeTodolistTitleHandler({ id: todolist.id, title: value })}
                  onDelete={deleteTodolistHandler}
                  todolistId={todolist.id}
                />
              </h4>
              <Input
                placeholder="Enter task title"
                addItem={(value) => addTaskHandler({ value, todolistId: todolist.id })}
              />
              <ul>
              {tasks[todolist.id]?.map((task: taskType) => {

                const onStatusChange = (newStatus: number) => {
                  const body = {
                    ...task, status: newStatus
                  }
                  changeTaskStatusHandler({body, todolistId: todolist.id, taskId: task.id});
                }
                return (
                  <li key={task.id}>
                    <EditableSpan
                      title={task.title}
                      onChange={(value) => changeTaskTitleHandler({ taskId: task.id, title: value, todolistId: todolist.id })}
                      onDelete={(todoListId) => deleteTaskHandler({taskId: task.id, todolistId: todoListId})}
                      todolistId={todolist.id}
                      status={task.status}
                      onStatusChange={onStatusChange}
                    />
                  </li>
                );
              })}
              </ul>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
