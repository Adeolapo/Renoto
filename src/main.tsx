import {  useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import MyContext from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Note from "./pages/note/Note";
import Detail from "./pages/note/Detail";
import Nav from "./components/nav/Nav";

import Home from "./pages/Home";

// Main Component
const Main: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [user, setUser] = useState();

  
  
  return (
    
      <MyContext.Provider value={{inputValue, setInputValue,noteTitle,setNoteTitle,setNote,note,notes,setNotes,label,setLabel,user,setUser}as any}>
        <BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/note" element={<Note />} />
          <Route path="/note/:id" element={<Detail />} />
         
        </Routes>

         {user && <Nav />} 
        
        
        </BrowserRouter>
        
      </MyContext.Provider>
    
  );
};

// Render App
const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(<Main />);
