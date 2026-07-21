import { todolistsApi } from "@/Api/todolists.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTodolists = () => {
    const { getTodolists } = todolistsApi
    const { data: todolists, isLoading, isError } = useQuery({ queryKey: ['todolists'], queryFn: getTodolists })

    const queryClient = useQueryClient()

    const addTodolistMutation = useMutation({
      mutationFn: (title: string) => todolistsApi.addTodolist(title),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todolists'] })
    })

    const deleteTodolistMutation = useMutation({
        mutationFn: (todolistId:string) => todolistsApi.deleteTodolist(todolistId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todolists']})
        }
    })

    return {
        todolists,
        isError,
        isLoading,
        addTodolistMutation,
        deleteTodolistMutation
    }
}