import type { TaskType } from "@/Api/tasks.types";
import { EditableSpan } from "@/components/EditableSpan.tsx";

type taskItemProps = {
  taskItem: TaskType;
  onChange: () => void;
};
export const TaskItem = (props: taskItemProps) => {
  const { title, status, todolistId } = props.taskItem;
  return (
    <div>
      <input type="checkbox" />
      <EditableSpan
        title={title}
        onChangeItem={(title) => console.log(title)}
      />
    </div>
  );
};
