import { useEffect } from "react";
import './App.css';
import {instance} from "@/shared/api/api-instance.ts";

function App() {

  useEffect(() => {
    instance.get('todo-list').then(response => {
      console.log(response)
    });
  }, []);

  return (
    <>

    </>
  );
}

export default App;
