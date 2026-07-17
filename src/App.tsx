import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/Input/Input';
import { todolistApi } from './api/todolist.api';
import type { todolistType } from './api/todolist.types';
import './App.css';
import { Todolist } from './components/Todolist/todolist';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from './api/queryKeys';

function App() {
  const queryClient = useQueryClient();
  const { data: todolists } = useQuery({
    queryKey: queryKeys.todolists,
    queryFn: () => todolistApi.getTodolists(),
  });

  const addTodolistMutation = useMutation({
    mutationFn: (value: string) => todolistApi.createTodolist(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todolists});
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const addTodolistHandler = (value: string) => {
    addTodolistMutation.mutate(value);
  };

  return (
    <>
      <section id='center'>
        <Input placeholder='Enter todo list title' addItem={addTodolistHandler} />
        {todolists?.map((todolist: todolistType) => {
          return <Todolist key={todolist.id} todolist={todolist} />;
        })}
      </section>
    </>
  );
}

export default App;
