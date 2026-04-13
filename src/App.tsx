import { useEffect } from "react";
import './App.css';

function App() {

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <>

    </>
  );
}

export default App;
