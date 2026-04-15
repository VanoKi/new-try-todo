import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, ListItem, Typography } from '@mui/material';
import type { TaskType } from '@/entities/tasks/model/types.ts';

type Props = {
  task: TaskType;
};

export const TaskItem = ({ task }: Props) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge='end' aria-label='delete'>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <Checkbox checked={task.status === 2} disableRipple={true} />
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
