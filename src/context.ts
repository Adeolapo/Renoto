import React, { createContext } from "react";


type ContextType = {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    noteTitle: string;
    setNoteTitle: React.Dispatch<React.SetStateAction<string>>;
    note: string;
    setNote: React.Dispatch<React.SetStateAction<string>>;
    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;
    label: string;
    setLabel: React.Dispatch<React.SetStateAction<string>>;
  };


const MyContext = createContext<ContextType | undefined>(undefined);

export default MyContext;