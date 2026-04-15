import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {TaskType} from "@/entities/tasks/model/types.ts";

export type TasksStateType = {
  [key: string]: TaskType[]
}

const initialState: TasksStateType = {};

export const tasksSlice  = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[], todoListId: string }>) => {
      state[action.payload.todoListId] = action.payload.tasks;
    },
    addTask: (state, action: PayloadAction<TaskType>) => {
      if (!state[action.payload.todoListId]) {
        state[action.payload.todoListId] = [];
      }
      state[action.payload.todoListId].unshift(action.payload);
    },
    removeTask: (state, action: PayloadAction<{ taskId: string, todoListId: string }>) => {
      const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId);
      if (index > -1) state[action.payload.todoListId].splice(index, 1);
    }
  }
  })

export const {addTask, removeTask, setTasks} = tasksSlice.actions;