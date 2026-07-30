import { taskApi } from "@/Api/tasks.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useMutationTask = (todolistId:string) => {

    const queryClient = useQueryClient()
    const deleteTaskMutation = useMutation({
        mutationFn: ({ todolistId, taskId }: { todolistId: string, taskId: string }) => taskApi.deleteTask({ todolistId, taskId }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["tasks", todolistId] }) }
    })

    const createTaskMutation = useMutation({
        mutationFn: ({todolistId, title}:{todolistId:string, title: string}) => 
            taskApi.createTask({todolistId, title}),
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ['tasks', todolistId]})}
    })

    return {
        deleteTaskMutation,
        createTaskMutation
    }
}