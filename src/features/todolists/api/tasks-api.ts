import { instance} from "@/common/api/instance.ts";
import type {BaseResponse, TaskType} from "@/common/types/types.ts";

type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`);
  }
}