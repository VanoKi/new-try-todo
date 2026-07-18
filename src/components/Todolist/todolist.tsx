import type { taskType } from "@/api/tasks.types";
import type { todolistType } from "@/api/todolist.types";
import { useTasks } from "@/hooks/useTasks";
import { useTodolists } from "@/hooks/useTodolists";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Input } from "../Input/Input";

type TodolistProps = {
  todolist: todolistType;
};
export const Todolist = ({ todolist }: TodolistProps) => {
  const { deleteTodolistMutation, updateTodolistMutation } = useTodolists()
  const { tasks, addTaskMutation, deleteTaskMutation, updateTaskMutation } = useTasks(todolist.id)

  const changeTaskTitleHandler = ({
    taskId,
    body,
  }: {
    taskId: string;
    body: taskType;
  }) => {
    updateTaskMutation.mutate({ taskId, body });
  };
  const changeTaskStatusHandler = ({
    body,
    taskId,
  }: {
    taskId: string;
    body: taskType;
  }) => {
    updateTaskMutation.mutate({ taskId, body });
  };

  return (
    <div>
      <h4 className="todolist-title">
        <EditableSpan
          title={todolist.title}
          onChange={(value) =>
            updateTodolistMutation.mutate({ id: todolist.id, title: value })
          }
          onDelete={() => deleteTodolistMutation.mutate(todolist.id)}
          todolistId={todolist.id}
        />
      </h4>
      <Input
        placeholder="Enter task title"
        addItem={(value) => addTaskMutation.mutate(value)}
      />
      <ul>
        {(tasks ?? []).map((task: taskType) => {
          const onStatusChange = (newStatus: number) => {
            const body = {
              ...task,
              status: newStatus,
            };
            changeTaskStatusHandler({
              body,
              taskId: task.id,
            });
          };
          return (
            <li key={task.id}>
              <EditableSpan
                title={task.title}
                onChange={(value) =>
                  changeTaskTitleHandler({
                    taskId: task.id,
                    body: { ...task, title: value },
                  })
                }
                onDelete={() =>
                  deleteTaskMutation.mutate(task.id)
                }
                todolistId={todolist.id}
                status={task.status}
                onStatusChange={onStatusChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
