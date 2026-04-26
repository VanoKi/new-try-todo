export type TodolistType = {
  id: string;
  title: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

