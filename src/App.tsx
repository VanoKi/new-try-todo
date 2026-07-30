import './App.css';
import { Input } from './components/Input';
import { TodolistItem } from './components/Todolist';
import { useTodolists } from './hooks/useTodolists';

function App() {

  const { todolists,
    isLoading,
    isError,
    addTodolistMutation } = useTodolists()



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
