import type { TodolistType } from '@/entities/todolists/model/types.ts';
import { instance } from '@/shared/api/api-instance.ts';

export const getTodolists = () => {
  return instance.get<TodolistType[]>('todo-lists');
};
