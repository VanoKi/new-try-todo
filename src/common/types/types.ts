export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type TaskType = {
  id: string;
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type BaseResponse<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};
