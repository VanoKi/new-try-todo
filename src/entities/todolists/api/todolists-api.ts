import type { TodolistType } from '@/entities/todolists/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';
import type {BaseResponse} from "@/shared/api/types.ts";

export const getTodolists = () => {
  return instance.get<TodolistType[]>('todo-lists');
};

export const createTodolist = (title: string) => {
  return instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists', { title });
};

export const removeTodolistFromServer = (todolistId: string) => {
  return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
};

export const changeTodolistTitleOnServer = ({todolistId, title}:{todolistId: string, title: string}) => {
  return instance.put<BaseResponse>(`todo-lists/${todolistId}`, {title})
}