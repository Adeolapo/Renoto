import React, { createContext } from "react";

type UserType ={
    name: string;
    email: string | null
    uid: string | null
    photoURL: string | null
  }

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
    user: UserType | null;
    setUser:  React.Dispatch<React.SetStateAction<UserType>>;
  };


const MyContext = createContext<ContextType | undefined>(undefined);

export default MyContext;