import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';




export default function TodoList({todos,setTodos}) {



  function DeleteHandelChange({id})
  {
    setTodos(todos.filter((todo)=>todo.id!==id));
  }

   function DoneHandelChange(event)
   {
       
      

   }

   
  
  return (

    

    <div>
      { 
      
     todos.map((todo)=>(
    
        <li className='list-item' key={todo.id} >
        <input 
        type="text"
        value={todo.title}
        className='list'
        onChange={(event)=> event.preventDefault()
         
        }
        
        /> 
         <DoneIcon className='done' onClick={()=>DoneHandelChange((todo))} />
         <EditIcon className='edit'  />
         <DeleteIcon className='delete'  onClick={()=>DeleteHandelChange(todo)}/>

         
    
       <div> 
     
             
    </div> 


        </li>
   
       

     ))


      }


    </div>
  )
}

 