import type { GetTasksResponse } from '@/entities/tasks/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';

export const getTasks = (todolistId: string) => {
  return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
};

export const removeTaskFromServer = ({todolistId, taskId}:{todolistId: string, taskId: string}) => {
  return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
}