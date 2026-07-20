import { useQuery } from '@tanstack/react-query';
import { todolistsApi } from './Api/todolists.api';
import './App.css';
import { TodolistItem } from './components/Todolist';

function App() {
  const { getTodolists } = todolistsApi
  const { data: todolists, isLoading, isError } = useQuery({ queryKey: ['todolists'], queryFn: getTodolists })

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
