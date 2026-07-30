import type { TaskType } from "@/Api/tasks.types";
import { EditableSpan } from "@/components/EditableSpan.tsx";
import { useMutationTask } from "@/hooks/useMutateTasks";

type taskItemProps = {
  taskItem: TaskType;
};
export const TaskItem = (props: taskItemProps) => {
  const { title, status, todoListId, id } = props.taskItem;
  const { deleteTaskMutation } = useMutationTask(todoListId)
  return (
    <div>
      <input type="checkbox" checked={status == 2} />
      <EditableSpan
        title={title}
        onChangeItem={(title) => console.log(title)}
      />
      <button
        onClick={() => deleteTaskMutation.mutate({ todolistId: todoListId, taskId: id })}
      >
        X
      </button>
    </div>
  );
};
