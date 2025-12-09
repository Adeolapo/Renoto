import {  useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
 import {updateDoc } from "firebase/firestore";


const Detail = () => {

    const {id} = useParams();

    const [edit, _setEdit] = useState<boolean>(true);
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteContent, setNoteContent] = useState<string>("");
    const [newNoteTitle, setNewNoteTitle] = useState<string>("");
    const [newNoteContent, setNewNoteContent] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    useEffect(() => {

        const docRef = doc(db, "notes", id!);
        if (!id) return;

        const unsub = onSnapshot(docRef, (doc) => {
            console.log("Current data: ", doc.data());
            const data = doc.data();
            if (!data) return;
            setNoteTitle(prev => prev || data.name);
            setNoteContent(prev => prev || data.note);
        });
        return () => unsub();
    }, []);

    function handleInputH(e: React.FormEvent<HTMLDivElement>) {
        setNewNoteTitle(e.currentTarget.textContent || "");
        //console.log(newNoteTitle);
    }
    function handleInputC(e: React.FormEvent<HTMLDivElement>) {
        setNewNoteContent(e.currentTarget.textContent || "");
        //console.log(newNoteContent);
    }

    async function handleEdit() {
       

        const docRef = doc(db, "notes", id!);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            name: newNoteTitle ? newNoteTitle : noteTitle,
            note: newNoteContent ? newNoteContent : noteContent,
        });

        
        navigate(-1);
     
    }
    return (
        <div className="md:px-[80px] px-[32px] bg-secondaryy py-5 w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden ">
            <div  ref={ref}
            contentEditable={edit}
            suppressContentEditableWarning 
            onInput={handleInputH}
            className="min-h-[10%] w-[100%] focus:outline-none focus:ring-0 flex-wrap border-b-rounded  border-b-[2px] border-b-primaryy px-4 mb-5 break-words whitespace-pre-wrap py-4 text-blackk md:text-4xl text-2xl font-semibold ">
                {noteTitle}
            </div>
            
            
            <div
            contentEditable={edit}
            suppressContentEditableWarning 
            onInput={handleInputC}
             className="min-h-[90%]  w-full pt-4 break-words whitespace-pre-wrap  focus:outline-none focus:ring-0 flex-wrap text-blackk md:text-lg text-md ">
                {noteContent}
                
            </div>
            <button onClick={handleEdit} className="md:px-[32px] md:py-[16px] px-[24px] py-[12px] bg-primaryy rounded-full fixed bottom-5 right-8 "><p className="text-blackk text-[14px] font-semibold ">Save changes</p></button>
        </div>
    )
}

export default Detail;