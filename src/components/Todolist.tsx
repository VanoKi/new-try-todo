import { todolistsApi } from "@/Api/todolists.api"
import type { TodolistType } from "@/Api/todolists.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type todolistItemProps = {
    todolist: TodolistType
}

export const TodolistItem = ({ todolist: { title, id } }: todolistItemProps) => {
    const queryClient = useQueryClient()
    const deleteTodolistMutation = useMutation({
        mutationFn: (todolistId:string) => todolistsApi.deleteTodolist(todolistId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todolists']})
        }
    })
    
    return (
        <>
            <h4>
                <span>{title}</span>
                <button
                onClick={() => deleteTodolistMutation.mutate(id)}
                >
                    X
                </button>
            </h4>
        </>
    )
}