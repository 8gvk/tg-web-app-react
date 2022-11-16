import './App.css';
import {useEffect} from "react";
import Header from "./components/Header/Header";
const tg = window.Telegram.WebApp;

function App() {
    useEffect(()=>{
        tg.ready();

    }, [])



  return (
    <div className="App">
      В разработке
        <Header/>

    </div>
  );
}

export default App;
