import { Modal } from "@/components/modal/Modal";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router";


const Note = () => {
    const [notes, setNotes] = useState<Array<{id: string; name: string; note: string; color: string, label: string}>>([]);
    const [height, setHeight] = useState<number[]>([]);
    const [filterState, setFilterState] = useState<Array<{id: string; name: string; note: string; color: string, label: string}>>([]);
    const [inputValue, setInputValue] = useState<string>("");

   

    useEffect(()=>{
        function handleResize() {
            const unsub = onSnapshot(collection(db, "notes"), (doc) => {
               const docs = doc.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                });

                setNotes(docs as Array<{id: string; name: string; note: string; color: string, label: string}>);
            });

            /*function handleFilter(label: string) {
                
            

                if(label === ""){
                    setFilterState(notes);
                }
                if(label !== ""){
                    setFilterState(notes.filter(note => note.label.toLowerCase() === label.toLowerCase()));
                }

            }*/

            setFilterState(notes);


           




             return () => unsub();
             
        }

        generateHeight();

        handleResize();
    },[notes.length]);


     const heights: number[] = [];

    const generateHeight = () => {
        for (let i = 0; i < notes.length; i++) {
            const randomHeight = Math.floor(Math.random() * 200) + 200; // between 150px and 300px
           heights.push(randomHeight);

           setHeight(heights);
            
        }
    }
    const breakpoints = {
    default: 4,
    1024: 3,
    768: 2,
    480: 2,
  };

  
   async function deleteTodo(id: string): Promise<void> {
               
        await deleteDoc(doc(db, "notes", id));
        
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);

        if (value === "" || value === null) {
            setFilterState(notes);
            
        }

        setFilterState(notes.filter(note => note.label.toLowerCase().includes(value.toLowerCase())));
    }

    //<button value={inputValue} className="h-full w-[30%] md:w-[10%] bg-primaryy text-blackk border-[8px] border-secondaryy rounded-[40px]" type="submit">Add</button>
    
      


  return (
  
    <div>
         <div className=" w-[100vw] h-[100vh] relative ">
                <div>
                    <div className="w-full h-[25vh] md:px-[80px] px-[32px] bg-primaryy rounded-b-[40px] p-4 flex flex-col justify-center  ">
                        <form action="" >
                            <div className="h-[58px] rounded-[40px] bg-secondaryy w-full flex items-center ">
                                <input onChange={handleInput} type="text" value={inputValue} placeholder="Search for notes" className="h-full w-[70%] md:w-[90%] bg-secondaryy rounded-[40px] px-4  appearance-none outline-none focus:outline-none focus:ring-0 border-none  " />
                                
                            </div>
        
                        </form>
        
                        
        
                    </div>
                   
                    <div className="w-full h-[75vh] bg-secondaryy  md:px-[80px] px-[32px] p-4 overflow-y-auto pt-8 relative">

                      <Modal /> 
                      
                      <Masonry
                      breakpointCols={breakpoints}
                      className="flex gap-4"
                      columnClassName="flex flex-col gap-4"
                      >

                        {filterState.map((noteItem, index) => (
                            
                            <div key={noteItem.id} className={` relative md:w-[300px] w-[130px] p-4 rounded-xl `} style={{ backgroundColor: `${noteItem.color}`, height: `${height[index]}px` }}>
                                <Link to={`/note/${noteItem.id}`} key={noteItem.id}>
                                    <div className="w-full h-[80%] ">
                                        <h1 className="text-[16px] md:text-[24px] mb-2 font-bold line-clamp-1 text-blackk ">{noteItem.name}</h1>
                                        <p className="text-[12px] md:text-[16px] line-clamp-5 md:line-clamp-3 text-blackk ">{noteItem.note}</p>

                                    </div>
                                </Link>
                                
                                <div  onClick={() => deleteTodo(noteItem.id)} className="absolute z-10 flex gap-2 bottom-4 right-4 ">
                                    <i onClick={() => deleteTodo(noteItem.id)} className="fa-regular fa-trash-can cursor-pointer text-24px md:text-32px text-blackk hover:text-primaryy "></i>
                                    
                                </div>
                                <div className="absolute z-50 flex gap-2 bottom-4 left-4 px-2 py-2 bg-[#00000080] rounded-full max-w-[40%] line-clamp-1 ">
                                    <p className="text-[10px] md:text-[10px] text-[#f3f3f3] line-clamp-1 ">{noteItem.label}</p>
                                    
                                </div>
                            </div>
                            
                        ))}

                       

                      </Masonry>
                        

                            
                           
        
                           
                    </div>
                </div>
            </div>
    </div>

  );
}   

export default Note;