import {IconButton, List, Paper, Typography} from "@mui/material";
import type {TodolistType} from "@/entities/todolists/model/types.ts";
import type {TaskType} from "@/entities/tasks/model/types.ts";
import {TaskItem} from "@/entities/tasks/ui/TaskItem.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "@/app/store.ts";
import {changeTodolistTitle, removeTodolist} from "@/entities/todolists/model/todolists-slice.ts";
import {changeTodolistTitleOnServer, removeTodolistFromServer} from "@/entities/todolists/api/todolists-api.ts";
import {AddItemForm} from "@/shared/ui/AddItemForm.tsx";
import {createTask} from "@/entities/tasks/api/tasks-api.ts";
import {addTask} from "@/entities/tasks/model/tasks-slice.ts";
import {EditableSpan} from "@/shared/ui/EditableSpan.tsx";

type Props = {
  todolist: TodolistType
  tasks: TaskType[]
};

export const TodolistItem = ({todolist,  tasks}: Props) => {
  const dispatch = useAppDispatch();
  const removeTodolistHandler = () => {
    removeTodolistFromServer(todolist.id).then(() => {
      dispatch(removeTodolist({todolistId: todolist.id}))
    })
  }
  const addTaskHandler = (title: string) => {
    createTask({todolistId: todolist.id, title }).then((response) => {
      dispatch(addTask(response.data.data.item))
    })
  }

  const changeTodolistTitleHandler = (newTitle:string) => {
    dispatch(changeTodolistTitle({todolistId: todolist.id, title: newTitle}))
    changeTodolistTitleOnServer({todolistId: todolist.id, title: newTitle})
  }

  return (
    <Paper elevation={3}
           sx={{p: "20px", width: '300px', minHeight: "100px", position: 'relative'}}>
      <IconButton
        onClick={removeTodolistHandler}
        sx={{position: 'absolute', right: '5px', top: '5px'}}>
        <DeleteIcon fontSize={'medium'}/>
      </IconButton>
      <Typography variant={"h5"} align={'center'} gutterBottom={true}>
        <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
      </Typography>
      <AddItemForm addItem={addTaskHandler}/>
      <List>
        {tasks.map(task => {
          return <TaskItem key={task.id} task={task}/>
        })}
      </List>
    </Paper>
  );
};