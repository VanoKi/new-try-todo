import { queryKeys } from "@/api/queryKeys";
import { todolistApi } from "@/api/todolist.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTodolists = () => {
    const queryClient = useQueryClient();

    const { data: todolists } = useQuery({
        queryKey: queryKeys.todolists,
        queryFn: () => todolistApi.getTodolists(),
    });

    const addTodolistMutation = useMutation({
        mutationFn: (value: string) => todolistApi.createTodolist(value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.todolists });
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const deleteTodolistMutation = useMutation({
        mutationFn: (todolistId: string) => todolistApi.deleteTodolist(todolistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.todolists });
        },
    });

    const updateTodolistMutation = useMutation({
        mutationFn: ({ id, title }: { id: string; title: string }) =>
          todolistApi.updateTodolist(id, title),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.todolists });
        },
      });

    return {
        todolists,
        addTodolistMutation,
        deleteTodolistMutation,
        updateTodolistMutation
    }
}