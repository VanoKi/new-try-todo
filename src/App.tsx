import {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from '@/app/store.ts';
import {getTasks} from '@/entities/tasks/api/tasks-api.ts';
import {setTasks} from '@/entities/tasks/model/tasks-slice.ts';
import {
  createTodolist,
  getTodolists,
  removeTodolistFromServer
} from '@/entities/todolists/api/todolists-api.ts';
import {addTodolist, removeTodolist, setTodolists} from '@/entities/todolists/model/todolists-slice.ts';
import {TodolistItem} from "@/entities/todolists/ui/TodolistItem.tsx";
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "@/shared/ui/AddItemForm.tsx";
import { Box } from "@mui/material";

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

  const addTodolistHandler = (title: string) => {
    createTodolist(title)
      .then((response) => {
        const todolist = response.data.data.item;
        dispatch(addTodolist({todolist}));
      });
  };
  const removeTodolistHandler = (todolistId: string) => {
    removeTodolistFromServer(todolistId).then(() => {
      dispatch(removeTodolist({id: todolistId}))
    })
  }

  return (
    <Container sx={{py: '40px'}} maxWidth={'lg'}>
      <Box>
        <AddItemForm addItem={addTodolistHandler}/>
      </Box>
      <Grid container={true} spacing={4}>
        {todolists.map((todolist) => (
          <Grid key={todolist.id}>
            <TodolistItem todolist={todolist} tasks={tasks[todolist.id] || []} removeTodolist={removeTodolistHandler}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
