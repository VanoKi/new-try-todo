import { EditableSpan } from "@/components/EditableSpan/EditableSpan";
import { Input } from "@/components/Input/Input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tasksApi } from "./api/tasks.api";
import type { taskType, taskTypeState } from "./api/tasks.types";
import { todolistApi } from "./api/todolist.api";
import type { todolistType } from "./api/todolist.types";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<taskTypeState>({});

  // useEffect(() => {
  //   todolistApi.getTodolists().then((todolists) => {
  //     setTodolists(todolists);
  //     todolists.forEach((tl: todolistType) => {
  //       tasksApi.getTasks(tl.id).then((tasks) => {
  //         setTasks(prev => ({...prev, [tl.id]: tasks}));
  //       });
  //     });
  //   });
  // }, []);

  const { data: todolists } = useQuery({
    queryKey: ['todolists'],
    queryFn: () => todolistApi.getTodolists(),
  });

  const deleteTodolistHandler = (todolistId: string) => {
    todolistApi.deleteTodolist(todolistId).then((res) => {
      if (res.resultCode === 0) {
        setTodolists(todolists.filter((tl) => tl.id !== todolistId));
      }
    });
  };

  const addTodolistHandler = (value: string) => {
    todolistApi.createTodolist(value).then((res) => {
      if (res.resultCode === 0) {
        setTodolists([...todolists, res.data.item]);
      }
    });
  };

  const changeTodolistTitleHandler = ({ id, title }: { id: string, title: string }) => {
    todolistApi.updateTodolist(id, title).then((res) => {
      if (res.resultCode === 0) {
        setTodolists(todolists.map(tl => tl.id === id ? { ...tl, title } : tl));
      }
    });
  };

  const addTaskHandler = ({ value, todolistId }: { value: string, todolistId: string }) => {
    tasksApi.createTask(todolistId, value).then((res) => {
      if (res.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: [...prev[todolistId], res.data.item]}));
      }
    });
  };

  const deleteTaskHandler = ({taskId, todolistId}: {taskId: string, todolistId: string}) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
      if (res.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: prev[todolistId]?.filter(task => task.id !== taskId) || []}));
      }
    });
  }

  const changeTaskTitleHandler = ({ taskId, body, todolistId }: { taskId: string, body: taskType, todolistId: string }) => {
    tasksApi.updateTask(todolistId, taskId, body).then((res) => {
      if (res.resultCode === 0) {
        setTasks(prev => ({...prev, [todolistId]: prev[todolistId]?.map(task => task.id === taskId ? { ...task, ...body } : task) || []}));
      }
    });
  }
  const changeTaskStatusHandler = ({body, todolistId, taskId }: { taskId: string, body: taskType, todolistId: string }) => {
    tasksApi.updateTask(todolistId, taskId, body).then((res) => {
      if (res.resultCode === 0) {
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
        {todolists?.map((todolist: todolistType) => {
          return (
            // <div key={todolist.id}>
            //   <h4 className="todolist-title">
            //     <EditableSpan
            //       title={todolist.title}
            //       onChange={(value) => changeTodolistTitleHandler({ id: todolist.id, title: value })}
            //       onDelete={deleteTodolistHandler}
            //       todolistId={todolist.id}
            //     />
            //   </h4>
            //   <Input
            //     placeholder="Enter task title"
            //     addItem={(value) => addTaskHandler({ value, todolistId: todolist.id })}
            //   />
            //   <ul>
            //   {tasks[todolist.id]?.map((task: taskType) => {

            //     const onStatusChange = (newStatus: number) => {
            //       const body = {
            //         ...task, status: newStatus
            //       }
            //       changeTaskStatusHandler({body, todolistId: todolist.id, taskId: task.id});
            //     }
            //     return (
            //       <li key={task.id}>
            //         <EditableSpan
            //           title={task.title}
            //           onChange={(value) => changeTaskTitleHandler({ taskId: task.id, body: { ...task, title: value }, todolistId: todolist.id })}
            //           onDelete={(todoListId) => deleteTaskHandler({taskId: task.id, todolistId: todoListId})}
            //           todolistId={todolist.id}
            //           status={task.status}
            //           onStatusChange={onStatusChange}
            //         />
            //       </li>
            //     );
            //   })}
            //   </ul>
            // </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
