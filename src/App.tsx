import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from '@/app/store.ts';
import { getTasks } from '@/entities/tasks/api/tasks-api.ts';
import { setTasks } from '@/entities/tasks/model/tasks-slice.ts';
import { TaskItem } from '@/entities/tasks/ui/TaskItem.tsx';
import { getTodolists } from '@/entities/todolists/api/todolists-api.ts';
import { setTodolists } from '@/entities/todolists/model/todolists-slice.ts';

function App() {
  const todolists = useAppSelector((state) => state.todolists);
  const tasks = useAppSelector((state) => state.tasks);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTodolists()
      .then((response) => {
        const todolists = response.data;
        dispatch(setTodolists({ todolists }));

        todolists.forEach((todolist) => {
          getTasks(todolist.id).then((response) => {
            dispatch(setTasks({ todoListId: todolist.id, tasks: response.data.items }));
          });
        });
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {todolists.map((todolist) => (
        <div key={todolist.id}>
          <h3>{todolist.title}</h3>
          <ul>
            {tasks[todolist.id]?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default App;
