import type {TodolistType} from "@/common/types/types.ts";
import {useAppDispatch} from "@/app/hooks.ts";
import {removeTodolist} from "@/features/todolists/model/todolists-reducer.ts";
import {IconButton, Paper, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";

type Props = {
  todolist: TodolistType
};
export const Todolist = ({todolist}: Props) => {
  const dispatch = useAppDispatch()
  const removeTodolistHandler = () => {
    dispatch(removeTodolist({todolistId: todolist.id}))
  }

  return (
    <Paper elevation={3} style={{padding: "20px"}}>
      <Typography  variant="h6" align={'center'} style={{marginBottom: "10px", fontWeight: "bold"}}>
        {todolist.title}
        <IconButton onClick={removeTodolistHandler}>
          <Delete/>
        </IconButton>
      </Typography>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <span> tasks will be here </span>
      </div>
    </Paper>
  );
};