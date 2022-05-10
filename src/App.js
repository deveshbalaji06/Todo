import Form from "./Component/Form";
import Header from "./Component/Header";
import './index.css'
import {useState,useEffect} from "react";
import TodoList from "./Component/TodoList";
import {db} from "./Component/Firebase"
import {collection,doc,getDocs} from "firebase/firestore"
import { async } from "@firebase/util";



function App() {

   const [input,setInput]=useState("");
   const [todos,setTodos]=useState([]);
  
   const userCollectionRefs=collection(db,"notes");
   

   function setData(){
    getDocs(userCollectionRefs).then((data)=>{
       
        // const xyz=_doc.data();
        setTodos( data.docs.map((_doc)=>
         

            ({..._doc.data(),id:_doc.id})
        ));
          
       
       

    })
  
   }


   useEffect(()=>{
   
   setData();
   
  
   },[]);
  
  // console.log(todos);

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
     setData={setData}
     
    />
    
   </div> 
   <div>
     <TodoList todos={todos} 
     setTodos={setTodos}
      setData={setData}
      setInput={setInput}
      
     />
   </div>
   </div>
     
    </div>
  );
}

export default App;
