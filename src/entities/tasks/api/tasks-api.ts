import type {GetTasksResponse, TaskType} from '@/entities/tasks/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';
import type {BaseResponse} from "@/shared/api/types.ts";

export const getTasks = (todolistId: string) => {
  return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
};

export const removeTaskFromServer = ({todolistId, taskId}:{todolistId: string, taskId: string}) => {
  return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
}

export const createTask = ({todolistId, title}:{todolistId: string, title: string}) => {
  return instance.post<BaseResponse<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
}

export const chaneTaskStatusApi = ({todolistId, taskId, status}:{todolistId:string, taskId:string, status:number}) => {
  return instance.put<BaseResponse<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {status})
}