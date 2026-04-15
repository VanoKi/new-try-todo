import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TodolistType } from '@/entities/todolists/model/types.ts';

export const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistType[],
  reducers: {
    setTodolists: (_state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists;
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift(action.payload.todolist);
    },
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id);
      if (index > -1) state.splice(index, 1);
    },
  },
});

export const { setTodolists, addTodolist, removeTodolist } = todolistsSlice.actions;
