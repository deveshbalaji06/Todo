
import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { db } from "./Firebase.js"
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
export default function Form({ input, setInput, todos, setTodos, setData }) {
 
   const auth = getAuth();
   // console.log(auth);

   const onInputChange = (event) => {

      setInput(event.target.value);

   }
   const onFormSubmit = (event) => {

      event.preventDefault();
      const info = event.target.text;

      setDoc(doc(db, "notes", uuidv4()), {
         email: auth.currentUser.email,
         note: info.value
      });


      setData();
      setInput("");
   };

   return (
      <div>
         <form onSubmit={onFormSubmit}>
            <input type='text'
               placeholder='Enter the todo'
               className='task-input'
               name='text'
               value={input}
               required
               onChange={onInputChange}

            />
            <button className='button-add' type='submit'>ADD</button>
         </form>

      </div>
   )
}
