import type { taskType } from "@/api/tasks.types";
import type { todolistType } from "@/api/todolist.types";
import { useTasks } from "@/hooks/useTasks";
import { useTodolists } from "@/hooks/useTodolists";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Input } from "../Input/Input";
import { TaskItem } from "../TaskItem/TaskItem";

type TodolistProps = {
  todolist: todolistType;
};
export const Todolist = ({ todolist }: TodolistProps) => {
  const { deleteTodolistMutation, updateTodolistMutation } = useTodolists()
  const { tasks, addTaskMutation } = useTasks(todolist.id)

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

          return (
            <TaskItem
              key={task.id}
              task={task}
              todolistId={todolist.id}
            />

          );
        })}
      </ul>
    </div>
  );
};
