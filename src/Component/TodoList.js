import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {db} from "./Firebase"
import { doc, deleteDoc } from "firebase/firestore";


export default function TodoList({ todos, setTodos,setData }) {



  function DeleteHandelChange({ id }) {
   
   console.log(id);
deleteDoc(doc(db,"notes",id)).then(()=>{
   setData();
});
    
  }

  function DoneHandelChange(event) {



  }



  return (



    <div>
      {

        todos.map((todo, index) => (
         
          <li className='list-item' key={index} >
            <input
              type="text"
              value={todo.note}
              className='list'
              onChange={(event) => event.preventDefault()

              }

            />
            <DoneIcon className='done' onClick={() => DoneHandelChange((todo))} />
            <EditIcon className='edit' />
            <DeleteIcon className='delete' onClick={() => DeleteHandelChange(todo)} />
          </li>



        ))


      }


    </div>
  )
}

