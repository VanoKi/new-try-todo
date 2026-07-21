import type { TodolistType } from "@/Api/todolists.type"
import { useTodolists } from "@/hooks/useTodolists"

type todolistItemProps = {
    todolist: TodolistType
}

export const TodolistItem = ({ todolist: { title, id } }: todolistItemProps) => {
    const {deleteTodolistMutation}  =useTodolists()    
    
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