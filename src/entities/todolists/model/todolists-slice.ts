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
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index > -1) state.splice(index, 1);
    },
    changeTodolistTitle: (state, action: PayloadAction<{todolistId: string, title: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId)
      if (index > -1) {
        state[index].title = action.payload.title
      }
    }
  },
});

export const { setTodolists, addTodolist, removeTodolist } = todolistsSlice.actions;
