import Form from "./Component/Form";
import Header from "./Component/Header";
import './index.css'
import { useState } from "react";
import TodoList from "./Component/TodoList";
import { db } from "./Component/Firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

import { getAuth } from 'firebase/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/material";
import { FirebaseError } from "firebase/app";


function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLogin, setisLogin] = useState(false);
  const userCollectionRefs = collection(db, "notes");
  const [userdetail,setUserDetail]=useState(false);
  const [userPhoto,setUserPhoto]=useState(false);
  const [userEmail,setUserEmail]=useState(false);
  const[userName,setUserName]=useState(false);

  function setData() {
    
    const auth = getAuth();
    const q = query(collection(db, 'notes'), where("email", "==", auth.currentUser.email))
    getDocs(q).then((response) => {
      setTodos(response.docs.map((_doc) =>
        ({ ..._doc.data(), id: _doc.id })
      ));




    })

  }
  function signout()
  {
    setisLogin(false);

  }




  

  return (
    <>


     
    <Box sx={{ flexGrow: 1 }}>
     
      <AppBar position="static">
        <Toolbar className="navbar">
          
           
          
          {!isLogin &&
          <Typography  variant="h5" component="div" marginLeft={5} sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
}
          {isLogin && (
            <div>
              
              
            
              
              <IconButton  sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={userPhoto} />
              </IconButton>
              <IconButton  sx={{ m: 1 }} >
                <p className="username">
                  {userName}
                </p>
              </IconButton>
            
              
                <Button variant="contained" onClick={signout} className="signOut">
                  Sign Out
                </Button>
              
             
            
            </div>
          )}
        </Toolbar>
      </AppBar>
      </Box>

      <div className="container"  >
     
        <div className={`${isLogin ? "app-wrapper1":"app-wrapper2"}`}>
          {
            <Header
              isLogin={isLogin}
              setisLogin={setisLogin}
              setData={setData}
              setUserPhoto={setUserPhoto}
              setUserDetail={setUserDetail}
              setUserEmail={setUserEmail}
              setUserName={setUserName}
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
