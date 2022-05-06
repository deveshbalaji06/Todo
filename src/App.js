import Form from "./Component/Form";
import Header from "./Component/Header";
import './index.css'
import {useState} from "react";
import TodoList from "./Component/TodoList";



function App() {

   const [input,setInput]=useState("");
   const [todos,setTodos]=useState([]);

  return (
    <div className="container">
    <div className="app-wrapper">
   <Header/>  
   <div>
    <Form
     input={input}
     setInput={setInput}
     todos={todos}
     setTodos={setTodos}
    />
    
   </div> 
   <div>
     <TodoList todos={todos} setTodos={setTodos}/>
   </div>
   </div>
     
    </div>
  );
}

export default App;
