import {IconButton, List, Paper, Typography} from "@mui/material";
import type {TodolistType} from "@/entities/todolists/model/types.ts";
import type {TaskType} from "@/entities/tasks/model/types.ts";
import {TaskItem} from "@/entities/tasks/ui/TaskItem.tsx";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  todolist: TodolistType
  tasks: TaskType[]
  removeTodolist: (todolistId: string) => void
};
export const TodolistItem = ({todolist,  tasks, removeTodolist}: Props) => {
  return (
    <Paper elevation={3}
           sx={{p: "20px", width: '300px', minHeight: "100px", position: 'relative'}}>
      <IconButton
        onClick={() => removeTodolist(todolist.id)}
        sx={{position: 'absolute', right: '5px', top: '5px'}}>
        <DeleteIcon fontSize={'small'}/>
      </IconButton>
      <Typography variant={"h5"} align={'center'} gutterBottom={true}>
        {todolist.title}
      </Typography>
      <List>
        {tasks.map(task => {
          return <TaskItem key={task.id} task={task}/>
        })}
      </List>
    </Paper>
  );
};