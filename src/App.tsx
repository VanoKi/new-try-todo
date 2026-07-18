import { Input } from '@/components/Input/Input';
import type { todolistType } from './api/todolist.types';
import './App.css';
import { Todolist } from './components/Todolist/todolist';
import { useTodolists } from './hooks/useTodolists';

function App() {
  const { todolists, addTodolistMutation } = useTodolists()

  return (
    <>
      <section id='center'>
        <Input placeholder='Enter todo list title' addItem={(value) => addTodolistMutation.mutate(value)} />
        {todolists?.map((todolist: todolistType) => {
          return <Todolist key={todolist.id} todolist={todolist} />;
        })}
      </section>
    </>
  );
}

export default App;
