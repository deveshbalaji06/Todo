import Form from "./Component/Form";
import Header from "./Component/Header";
import './index.css'
import { useState } from "react";
import TodoList from "./Component/TodoList";
import { db } from "./Component/Firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

import { getAuth } from 'firebase/auth';


function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLogin, setisLogin] = useState(false);
  const userCollectionRefs = collection(db, "notes");


  function setData() {
    const auth = getAuth();
    const q = query(collection(db, 'notes'), where("email", "==", auth.currentUser.email))
    getDocs(q).then((response) => {
      setTodos(response.docs.map((_doc) =>
        ({ ..._doc.data(), id: _doc.id })
      ));




    })

  }




  // console.log(todos);

  return (
    <>




      <div className="container"  >

        <div className="app-wrapper">
          {

            <Header
              isLogin={isLogin}
              setisLogin={setisLogin}
              setData={setData}
            />
          }
          <div>
            {isLogin && <Form
              input={input}
              setInput={setInput}
              todos={todos}
              setTodos={setTodos}
              setData={setData}

            />
            }
          </div>
          <div>
            {isLogin && <TodoList todos={todos}
              setTodos={setTodos}
              setData={setData}
              setInput={setInput}

            />
            }
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
