import { instance } from "./instance";
import type { TodolistType } from "./todolists.type";

export const todolistsApi = {
    getTodolists: async () => {
        const response = await instance.get<TodolistType[]>(`todo-lists`)
        return response.data
    },

    deleteTodolist: async (todolistId:string) => {
        const response = await instance.delete(`todo-lists/${todolistId}`)
        return response.data
    },

    addTodolist: async (title:string) => {
        const response = await instance.post(`todo-lists`, {
            title
        })
        return response.data
    }

    // changeTodolistTitle: async () => {
    //     const response = await instance.put()
    // }
}