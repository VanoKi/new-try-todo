import { queryKeys } from "@/api/queryKeys";
import type { taskType } from "@/api/tasks.types";
import { todolistApi } from "@/api/todolist.api";
import type { todolistType } from "@/api/todolist.types";
import { useTasks } from "@/hooks/useTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Input } from "../Input/Input";

type TodolistProps = {
  todolist: todolistType;
};
export const Todolist = ({ todolist }: TodolistProps) => {

  const { tasks, addTaskMutation, deleteTaskMutation, updateTaskMutation } = useTasks(todolist.id)
  const queryClient = useQueryClient();
  const deleteTodolistMutation = useMutation({
    mutationFn: (todolistId: string) => todolistApi.deleteTodolist(todolistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todolists });
    },
  });
  const deleteTodolistHandler = (todolistId: string) => {
    deleteTodolistMutation.mutate(todolistId);
  };

  const updateTodolistMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      todolistApi.updateTodolist(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todolists });
    },
  });

  const changeTodolistTitleHandler = ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }) => {
    updateTodolistMutation.mutate({ id, title });
  };

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
    <div key={todolist.id}>
      <h4 className="todolist-title">
        <EditableSpan
          title={todolist.title}
          onChange={(value) =>
            changeTodolistTitleHandler({ id: todolist.id, title: value })
          }
          onDelete={deleteTodolistHandler}
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
