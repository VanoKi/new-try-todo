import { instance } from "./api";
import type { taskType } from "./tasks.types";

export const tasksApi = {
  getTasks: async (todolistId: string) => {
    const response = await instance.get(`todo-lists/${todolistId}/tasks`);
    return response.data.items;
  },
  createTask: async (todolistId: string, title: string) => {
    const response = await instance.post(`todo-lists/${todolistId}/tasks`, { title });
    return response.data;
  },
  updateTask: async (todolistId: string, taskId: string, body: taskType)  => {
    const response = await instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,  body);
    return response.data;
  },
  deleteTask: async (todolistId: string, taskId: string) => {
    const response = await instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`);
    return response.data;
  },
};