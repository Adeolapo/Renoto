
import { useContext } from 'react';
import './App.css'
import MyContext from './context';

import Todo from './pages/todo/Todo'
import Login from './pages/login/Login';



function App() {
  const {user} =  useContext(MyContext)!;
 
  return (
    <>
   {user ? <Todo /> : <Login />}
     
    </>
  )
}

export default App
