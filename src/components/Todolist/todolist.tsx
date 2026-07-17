import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "@/api/tasks.api";
import type { taskType } from "@/api/tasks.types";
import type { todolistType } from "@/api/todolist.types";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Input } from "../Input/Input";
import { todolistApi } from "@/api/todolist.api";

type TodolistProps = {
  todolist: todolistType;
};
export const Todolist = ({ todolist }: TodolistProps) => {
  const { data: tasks } = useQuery({
    queryKey: ["tasks", todolist.id],
    queryFn: () => tasksApi.getTasks(todolist.id),
  });
  const queryClient = useQueryClient();
  const deleteTodolistMutation = useMutation({
    mutationFn: (todolistId: string) => todolistApi.deleteTodolist(todolistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
    },
  });
  const deleteTodolistHandler = (todolistId: string) => {
    deleteTodolistMutation.mutate(todolistId);
  };

  const updateTodolistMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      todolistApi.updateTodolist(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todolists"] });
    },
  });

  const addTaskMutation = useMutation({
    mutationFn: ({
      value,
      todolistId,
    }: {
      value: string;
      todolistId: string;
    }) => tasksApi.createTask(todolistId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", todolist.id] });
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

  const addTaskHandler = ({
    value,
    todolistId,
  }: {
    value: string;
    todolistId: string;
  }) => {
    addTaskMutation.mutate({ value, todolistId });
  };

  const deleteTaskMutatioin = useMutation({
    mutationFn: ({
      taskId,
      todolistId,
    }: {
      taskId: string;
      todolistId: string;
    }) => tasksApi.deleteTask(todolistId, taskId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const deleteTaskHandler = ({
    taskId,
    todolistId,
  }: {
    taskId: string;
    todolistId: string;
  }) => {
    deleteTaskMutatioin.mutate({ todolistId, taskId });
  };

  const changeTaskTitleHandler = ({
    taskId,
    body,
    todolistId,
  }: {
    taskId: string;
    body: taskType;
    todolistId: string;
  }) => {
    tasksApi.updateTask(todolistId, taskId, body).then((res) => {
      if (res.resultCode === 0) {
        setTasks((prev) => ({
          ...prev,
          [todolistId]:
            prev[todolistId]?.map((task) =>
              task.id === taskId ? { ...task, ...body } : task,
            ) || [],
        }));
      }
    });
  };
  const changeTaskStatusHandler = ({
    body,
    todolistId,
    taskId,
  }: {
    taskId: string;
    body: taskType;
    todolistId: string;
  }) => {
    tasksApi.updateTask(todolistId, taskId, body).then((res) => {
      if (res.resultCode === 0) {
        setTasks((prev) => ({
          ...prev,
          [todolistId]:
            prev[todolistId]?.map((task) =>
              task.id === taskId ? { ...task, ...body } : task,
            ) || [],
        }));
      }
    });
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
        addItem={(value) => addTaskHandler({ value, todolistId: todolist.id })}
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
              todolistId: todolist.id,
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
                    todolistId: todolist.id,
                  })
                }
                onDelete={(todoListId) =>
                  deleteTaskHandler({ taskId: task.id, todolistId: todoListId })
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
