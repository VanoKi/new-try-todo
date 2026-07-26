import { instance } from "./instance";

export const taskApi = {
  getTasks: async (todolistId: string) => {
    const response = await instance.get(`todo-lists/${todolistId}/tasks`);
    return response.data.items;
  },
};
