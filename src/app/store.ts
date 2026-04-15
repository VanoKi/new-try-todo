import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {todolistsSlice} from "@/entities/todolists/model/todolists-slice.ts";
import {tasksSlice} from "@/entities/tasks/model/tasks-slice.ts";

export const store = configureStore({
  reducer: {
    todolists: todolistsSlice.reducer,
    tasks: tasksSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector;