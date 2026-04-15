import {List, Paper, Typography} from "@mui/material";
import type {TodolistType} from "@/entities/todolists/model/types.ts";
import type {TaskType} from "@/entities/tasks/model/types.ts";
import {TaskItem} from "@/entities/tasks/ui/TaskItem.tsx";

type Props = {
  todolist: TodolistType
  tasks: TaskType[]
};
export const TodolistItem = ({todolist,  tasks}: Props) => {
  return (
    <Paper elevation={3} sx={{p: "20px", width: '300px', minHeight: "100px"}}>
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