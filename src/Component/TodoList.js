import React, { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { db } from "./Firebase"
import { doc, deleteDoc,updateDoc } from "firebase/firestore";


export default function TodoList({ todos, setTodos, setData }) {



  function DeleteHandelChange({ id }) {


    deleteDoc(doc(db, "notes", id)).then(() => {
      setData();
    });

  }
  function DoneHandelChange(todo) {
 
     
    updateDoc(doc(db, "notes", todo.id),{
 isdone:true

    }).then(() => {
      setData();
    });

  }

  
  




  return (



    <div>
      {

        todos.map((todo, index) => (

          <li className='list-item' key={index} >
            <input
              type="text"
              value={todo.note}
              className={`list ${todo.isdone ? "mark-done" : ""}`}
              onChange={(event) => {
                console.log(event.target.value);

              }

              }

            />
            <DoneIcon className='done' onClick={() => DoneHandelChange((todo))} />
           
            <DeleteIcon className='delete' onClick={() => DeleteHandelChange(todo)} />
          </li>



        ))


      }


    </div>
  )
}

