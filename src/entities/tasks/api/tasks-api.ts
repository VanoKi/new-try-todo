import type {GetTasksResponse, TaskType} from '@/entities/tasks/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';
import type {BaseResponse} from "@/shared/api/types.ts";
import type {UpdateTaskModel} from "@/entities/todolists/model/types.ts";

export const getTasks = (todolistId: string) => {
  return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`);
};

export const removeTaskFromServer = ({todolistId, taskId}:{todolistId: string, taskId: string}) => {
  return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
}

export const createTask = ({todolistId, title}:{todolistId: string, title: string}) => {
  return instance.post<BaseResponse<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
}

export const changeTaskStatusApi = ({todolistId, taskId, model}:{todolistId:string, taskId:string, model: UpdateTaskModel}) => {
  return instance.put<BaseResponse<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
}

export const changeTaskTitleApi = ({todolistId, taskId, model}:{todolistId:string, taskId:string, model:UpdateTaskModel}) => {
  return instance.put<BaseResponse<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
}