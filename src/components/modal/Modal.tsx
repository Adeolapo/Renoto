import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MyContext from "@/context"
import React, { useContext } from "react"
import { addDoc, collection} from "firebase/firestore"; 
import { db } from "@/firebase"


// Add a new document in collection "cities"



export const Modal = () =>  { 
    const colors = ["#C7D3C6", "#8ECAE6", "#F2D8D5", "#F4D35E", "#FFC9B9", "#E0BBE4"];

    const [open, setOpen] = React.useState<boolean>(false);  

    const {noteTitle, setNoteTitle, note, setNote,label,setLabel} = useContext(MyContext)!;  
    
    function handleNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setNote(e.target.value);
    }
    function handleNoteTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setNoteTitle(e.target.value);
    }
    
    function handleLabel(e: React.ChangeEvent<HTMLInputElement>) {
        setLabel(e.target.value);
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        if(!noteTitle || !note)
            return;

        try {
           const docRef = await addDoc(collection(db, "notes"), {
                name: noteTitle,
                note: note,
                label: label,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
            console.log("Document written with ID: ", docRef.id);
            
        } catch (error) {
            console.error("Error adding document: ", error);
        }
        

        setNoteTitle("");
        setNote("");

        setOpen(false);
        

        
    }


    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="fixed bottom-[100px] right-[32px] md:right-[80px] w-[60px] h-[60px] bg-primaryy rounded-full flex justify-center z-50 items-center text-blackk text-[24px] font-bold" variant="outline">
            <i className="fa-solid fa-plus text-blackk text-[24px]"></i>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" required onChange={handleNoteTitle} value={noteTitle} placeholder="Title of note" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Label</Label>
              <Input id="name-1" name="name" required onChange={handleLabel} value={label} placeholder="Label of note" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Note</Label>
              <Textarea className="min-h-[200px] " required id="username-1" name="note" onChange={handleNote} value={note} placeholder="Type your note here." />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
             <DialogClose asChild><Button type="submit" onClick={handleSubmit}>Save changes</Button></DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}