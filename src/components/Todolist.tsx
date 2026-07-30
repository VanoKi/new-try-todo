import type { TodolistType } from "@/Api/todolists.type";
import { useTodolists } from "@/hooks/useTodolists";
import { EditableSpan } from "./EditableSpan";
import { TaskItem } from "./TaskItem";
import { useGetTasks } from "@/hooks/useGetTasks";
import type { TaskType } from "@/Api/tasks.types";
import { Input } from "./Input";
import { useMutationTask } from "@/hooks/useMutateTasks";

type todolistItemProps = {
  todolist: TodolistType;
};

export const TodolistItem = ({
  todolist: { title, id },
}: todolistItemProps) => {
  const { deleteTodolistMutation, changeTodolistMutation } = useTodolists();
  const {createTaskMutation} = useMutationTask(id)
  const { tasks } = useGetTasks(id);

  return (
    <>
      <h4>
        <EditableSpan
          title={title}
          onChangeItem={(newTitle) =>
            changeTodolistMutation.mutate({ todolistId: id, title: newTitle })
          }
        />
        <button onClick={() => deleteTodolistMutation.mutate(id)}>X</button>
      </h4>
      <Input placeholder={"enter a new task"} addItem={(value) => createTaskMutation.mutate({todolistId: id, title: value})} />
      <ul>
        {tasks?.map((task: TaskType) => (
          <TaskItem taskItem={task} key={task.id} />
        ))}
      </ul>
    </>
  );
};
