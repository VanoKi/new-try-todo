import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { todolistsApi } from './Api/todolists.api';
import './App.css';
import { TodolistItem } from './components/Todolist';
import { Input } from './components/Input';

function App() {
  const { getTodolists } = todolistsApi
  const { data: todolists, isLoading, isError } = useQuery({ queryKey: ['todolists'], queryFn: getTodolists })

  const queryClient = useQueryClient()

  const addTodolistMutation = useMutation({
    mutationFn: (title: string) => todolistsApi.addTodolist(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todolists'] })
  })

  if (isLoading) {
    return (
      <section id='center'>
        <h1>Loading...</h1>
      </section>
    )
  }

  if (isError) {
    return (
      <section id='center'>
        <h1>Some error occured!</h1>
      </section>
    )
  }

  return (
    <>
      <section id='center'>
        <Input
          placeholder='add new TodoList'
          addItem={(title) => addTodolistMutation.mutate(title)}
        />
        {todolists?.map(todolist => {
          return (
            <div key={todolist.id}>
              <TodolistItem todolist={todolist}
              />
            </div>
          )
        })}
      </section>
    </>
  );
}

export default App;
