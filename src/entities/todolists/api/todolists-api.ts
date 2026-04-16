import type { TodolistType } from '@/entities/todolists/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';

export type BaseResponse<T = object> = {
  resultCode: number;
  message?: string;
  data: T;
}


export const getTodolists = () => {
  return instance.get<TodolistType[]>('todo-lists');
};

export const createTodolist = (title: string) => {
  return instance.post<BaseResponse<{ item: TodolistType }>>('todo-lists', { title });
};

export const removeTodolistFromServer = (todolistId: string) => {
  return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
};