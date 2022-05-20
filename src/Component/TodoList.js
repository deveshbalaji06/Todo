import React, { useState,useRef, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from "./Firebase"
import { doc, deleteDoc,updateDoc } from "firebase/firestore";
import debounce from 'devstorm/debounce'

export default function TodoList({ todos, setTodos, setData }) {




  function DeleteHandelChange({ id }) {

     console.log(id);
    deleteDoc(doc(db, "notes", id)).then(() => {
      setData();
    });

  }
  function DoneHandelChange(todo) {
 
     
    updateDoc(doc(db, "notes", todo.id),{
 isdone:!todo.isdone

    }).then(() => {
      setData();
    });

  }
  const [editNote,setEditNote]=useState({
    id:"",
    note:""
 
 
  });
  
  function updateDatabase(todo,event)
  {
    debounce(()=>{
      updateDoc(doc(db, "notes", todo.id),{
        note:event.target.value
       
           }).then(() => {
            
           }).catch(()=>{

              
           });
    },2000)
      

  }
  

  function edithandelChange(event,index)
  {
  
   todos.map((todo) => {
    
       if(todo.id===index)
       {
         setEditNote({
          id:todo.id,
          note:event.target.value

         })
        updateDatabase(todo,event)
        
       }  
 
   })
  }
  const inputRef = useRef([]); 
  const [refState,setrefState]=useState(-1);
  
  
  function focusElement(index)
  {
   
     setrefState(index);
      

  }
  useEffect(()=>{
    
    if(refState>=0){
    inputRef.current[refState].focus();
    setData();
    }
  },[refState])

  return (



    <div>
      {

        todos.map((todo, index) => (

          <li className='list-item' key={index} >
            <input
              type="text"
              ref={ele=>inputRef.current[index]=ele}
              value={editNote.id === "" && editNote.note === "" ? todo.note : editNote.id  === todo.id ? editNote.note : todo.note}
              className={`list ${todo.isdone ? "mark-done" : ""}`}
              onChange={(event) => {
             
                 edithandelChange(event,todo.id);
              }

              }

            />
            <DoneIcon className='done' onClick={() => DoneHandelChange(todo)} />
            <EditIcon className='edit' onClick={()=>focusElement(index)} />
            <DeleteIcon className='delete' onClick={() => DeleteHandelChange(todo)} />
          </li>



        ))


      }


    </div>
  )
}

