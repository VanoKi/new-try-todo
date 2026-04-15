import type { GetTasksResponse } from '@/entities/tasks/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';

export const getTasks = (todolistId: string) => {
  return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
};
