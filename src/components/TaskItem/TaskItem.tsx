import type { taskType } from "@/api/tasks.types"
import { useTasks } from "@/hooks/useTasks"
import { EditableSpan } from "../EditableSpan/EditableSpan"

type TaskItemTypeProps = {
    task: taskType
    todolistId: string
}

export const TaskItem = ({ task, todolistId }: TaskItemTypeProps) => {
    const { deleteTaskMutation, updateTaskMutation } = useTasks(todolistId)

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
        taskId,
        body,
    }: {
        taskId: string;
        body: taskType;
    }) => {
        updateTaskMutation.mutate({ taskId, body });
    };

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
                todolistId={todolistId}
                status={task.status}
                onStatusChange={onStatusChange}
            />
        </li>
    )
}