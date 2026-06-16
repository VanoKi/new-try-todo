import { instance } from "./api";

export const todolistApi = {
  getTodolists: async () => {
    const response = await instance.get("todo-lists");
    return response.data;
  },
  createTodolist: async (title: string) => {
    const response = await instance.post("todo-lists", { title });
    return response.data;
  },
  updateTodolist: async (id: string, title: string) => {
    const response = await instance.put(`todo-lists/${id}`, { title });
    return response.data;
  },
  deleteTodolist: async (id: string) => {
    const response = await instance.delete(`todo-lists/${id}`);
    return response.data;
  },
};