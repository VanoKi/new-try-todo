import { queryKeys } from "@/api/queryKeys";
import { tasksApi } from "@/api/tasks.api";
import type { taskType } from "@/api/tasks.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTasks = (todolistId: string) => {
    const queryClient = useQueryClient();

    const { data: tasks } = useQuery({
        queryKey: queryKeys.tasks(todolistId),
        queryFn: () => tasksApi.getTasks(todolistId),
    });

    const addTaskMutation = useMutation({
        mutationFn: (
            value: string
        ) => tasksApi.createTask(todolistId, value),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(todolistId) });
    },
    });

const deleteTaskMutation = useMutation({
    mutationFn: (
        taskId: string
    ) => tasksApi.deleteTask(todolistId, taskId),
    onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(todolistId) }),
});

const updateTaskMutation = useMutation({
    mutationFn: ({
        taskId,
        body,
    }: {
        taskId: string;
        body: taskType;
    }) => tasksApi.updateTask(todolistId, taskId, body),
    onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(todolistId) }),
});

return {
    tasks,
    addTaskMutation,
    deleteTaskMutation,
    updateTaskMutation
}
}
