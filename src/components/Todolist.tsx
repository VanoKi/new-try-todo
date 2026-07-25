import type { TodolistType } from "@/Api/todolists.type"
import { useTodolists } from "@/hooks/useTodolists"
import { EditableSpan } from "./EditableSpan"

type todolistItemProps = {
    todolist: TodolistType
}

export const TodolistItem = ({ todolist: { title, id } }: todolistItemProps) => {
    const { deleteTodolistMutation, changeTodolistMutation } = useTodolists()



    return (
        <>
            <h4>
                <EditableSpan
                    title={title}
                    onChangeItem={(newTitle) => changeTodolistMutation.mutate({todolistId: id, title: newTitle})}
                />
                <button
                    onClick={() => deleteTodolistMutation.mutate(id)}
                >
                    X
                </button>
            </h4>
        </>
    )
}