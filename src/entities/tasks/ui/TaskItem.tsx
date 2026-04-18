import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton, ListItem, Typography} from '@mui/material';
import type {TaskType} from '@/entities/tasks/model/types.ts';
import {useAppDispatch} from "@/app/store.ts";
import {changeTaskStatus, removeTask} from "@/entities/tasks/model/tasks-slice.ts";
import {chaneTaskStatusApi, removeTaskFromServer} from "@/entities/tasks/api/tasks-api.ts";

type Props = {
  task: TaskType;
};

export const TaskItem = ({task}: Props) => {

  const dispatch = useAppDispatch();

  const deleteTaskHandler = () => {
    dispatch(removeTask({taskId: task.id, todoListId: task.todoListId}))
    removeTaskFromServer({taskId: task.id, todolistId: task.todoListId}).catch(e => {
      console.error(e)
    })
  }
  const changeTaskStatusHandler = () => {
    console.log(task.status)
    const updatedTask = {...task, status: task.status === 2 ? 0 : 2}
    dispatch(changeTaskStatus(updatedTask))
    chaneTaskStatusApi({taskId: task.id, status: updatedTask.status, todolistId: task.todoListId}).catch(e => {
      console.error(e)
    })
  }


  return (
    <ListItem
      secondaryAction={
        <IconButton edge='end' aria-label='delete' onClick={deleteTaskHandler} size={'small'}>
          <DeleteIcon/>
        </IconButton>
      }
      disablePadding
    >
      <Checkbox
        checked={task.status === 2}
        disableRipple={true}
        onChange={changeTaskStatusHandler}/>
      <Typography
        style={{
          textDecoration: task.status === 2 ? 'line-through' : '',
          opacity: task.status === 2 ? 0.5 : 1,
        }}
      >
        {task.title}
      </Typography>
    </ListItem>
  );
};
