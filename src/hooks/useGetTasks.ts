import { taskApi } from "@/Api/tasks.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (todolistId: string) => {
  const { data: tasks } = useQuery({
    queryKey: ["tasks", todolistId],
    queryFn: () => taskApi.getTasks(todolistId),
  });

  return {
    tasks,
  };
};
