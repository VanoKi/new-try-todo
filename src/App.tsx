import { useEffect } from "react";
import './App.css';
import {instance} from "@/shared/api/api-instance.ts";

function App() {

  useEffect(() => {
    instance.get('todo-lists').then(response => {
      console.log(response.data)
    });
  }, []);

  return (
    <>

    </>
  );
}

export default App;
