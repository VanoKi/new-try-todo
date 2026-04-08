import { configureStore } from "@reduxjs/toolkit";
import {todolistsReducer} from "@/features/todolists/model/todolists-reducer.ts";

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

