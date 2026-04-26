import DeleteIcon from '@mui/icons-material/Delete';
import {Checkbox, IconButton, ListItem, Typography} from '@mui/material';
import type {TaskType} from '@/entities/tasks/model/types.ts';
import {useAppDispatch} from "@/app/store.ts";
import {changeTaskStatus, removeTask} from "@/entities/tasks/model/tasks-slice.ts";
import {changeTaskStatusApi, removeTaskFromServer} from "@/entities/tasks/api/tasks-api.ts";

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
    const updatedTask = {...task, status: task.status === 2 ? 0 : 2}
    dispatch(changeTaskStatus(updatedTask))
    changeTaskStatusApi({taskId: task.id, model: updatedTask, todolistId: task.todoListId}).catch(e => {
      console.log(e)
      dispatch(changeTaskStatus(task))
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
