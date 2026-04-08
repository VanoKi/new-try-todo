import './App.css';
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {addTodolist} from "@/features/todolists/model/todolists-reducer.ts";
import {Container, Grid} from "@mui/material";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {Todolist} from "@/features/todolists/ui/Todolist.tsx";

function App() {
  const todolists = useAppSelector(state => state.todolists);
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    const newTodolist = {id: nanoid(), title, addedDate: '', order: 0}
    dispatch(addTodolist({todolist: newTodolist}))
  };
  return (
    <Container fixed>
      <Grid container style={{padding: '20px 0'}}>
        <AddItemForm onAddItem={createTodolist}/>
      </Grid>
      <Grid container spacing={4}>
        {todolists.map(tl => {
          return (
            <Grid  key={tl.id}>
              <Todolist todolist={tl}/>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
}

export default App;
