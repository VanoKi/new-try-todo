import { instance } from "./instance";

export const taskApi = {
  getTasks: async (todolistId: string) => {
    const response = await instance.get(`todo-lists/${todolistId}/tasks`);
    return response.data.items;
  },

  deleteTask: async ({
    todolistId,
    taskId,
  }: {
    todolistId: string;
    taskId: string;
  }) => {
    const response = await instance.delete(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
    return response.data;
  },

  createTask: async ({todolistId, title}:{todolistId:string, title: string}) => {
    const response = await instance.post(`todo-lists/${todolistId}/tasks`, {title})
    return response.data.item
  },

};
