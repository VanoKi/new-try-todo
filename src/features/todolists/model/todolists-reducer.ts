import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TodolistType} from "@/common/types/types.ts";

const initialState: TodolistType[] = [
  { id: '1', title: 'Songs to listen', addedDate: '', order: 0 },
  { id: '2', title: 'Tech to learn', addedDate: '', order: 0 }
];

const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    setTodolists: (_state, action: PayloadAction<{ todolists: TodolistType[]}>)=> {
      return action.payload.todolists;
    },
    addTodolist: (state, action: PayloadAction<{todolist: TodolistType}>) => {
      state.unshift(action.payload.todolist)
    },
    removeTodolist: (state, action: PayloadAction<{id: string}>) => {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  }
})

export const todolistsReducer = slice.reducer;
export const { setTodolists, removeTodolist, addTodolist } = slice.actions