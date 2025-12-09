import React, { useEffect } from "react";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore"; 
import {db} from "../../firebase"
import MyContext from "../../context";


const Todo: React.FC = () => {

    const {inputValue, setInputValue} = React.useContext(MyContext)!;
    const [todos, setTodos] = React.useState<Array<{id: string; text: string; isCompleted: boolean}>>([]);
    const [filterState, setFilterState] = React.useState<string>("All");

    useEffect(() => {   

        if (filterState === "Completed"){
            const q = query(collection(db, "todos"), where("isCompleted", "==", true));
            const unsub = onSnapshot( q, (snapshot) => {
                const todos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodos(todos as Array<{id: string; text: string; isCompleted: boolean}>);
            });
            return () => unsub();
        } else if (filterState === "Uncompleted"){
            const q = query(collection(db, "todos"), where("isCompleted", "==", false));
            const unsub = onSnapshot( q, (snapshot) => {
                //console.log(snapshot)
                const todos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodos(todos as Array<{id: string; text: string; isCompleted: boolean}>);
            });
            return () => unsub();
        } else {
            const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
                const todos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodos(todos as Array<{id: string; text: string; isCompleted: boolean}>);
            });
            return () => unsub();
        }
        
    }, [filterState]);
        
 
        async function addTodo (e: React.FormEvent<HTMLFormElement>): Promise<void> {
            // Logic to add todo item
        
            e.preventDefault();

            
            if(!inputValue)
                return
            else{
                try {
                const docRef = await addDoc(collection(db, "todos"), {
                    isCompleted: false,
                    text: inputValue,
                });
                console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                console.error("Error adding document: ", e);
                }

                setInputValue("");
            }
        }

        async function deleteTodo(id: string): Promise<void> {
             //let docRef = doc(db, "todos", id);
                /*await updateDoc(docRef, {
                        isCompleted: deleteField(),
                        text: deleteField(),
                        id: deleteField(),   
                });*/

                  await deleteDoc(doc(db, "todos", id));
        }


        //console.log(todos);
  return (
    <div className=" w-[100vw] h-[100vh] relative ">
        <div>
            <div className="w-full h-[25vh] md:px-[80px] px-[32px] bg-primaryy rounded-b-[40px] p-4 flex flex-col justify-center  ">
                <form action="" onSubmit={addTodo}>
                    <div className="h-[58px] rounded-[40px] bg-secondaryy w-full flex items-center ">
                        <input onChange={(e) => setInputValue(e.target.value)} value={inputValue} type="text" placeholder="Enter todo item" className="h-full w-[70%] md:w-[90%] bg-secondaryy rounded-[40px] px-4  appearance-none outline-none focus:outline-none focus:ring-0 border-none  " />
                        <button className="h-full w-[30%] md:w-[10%] bg-primaryy text-blackk border-[8px] border-secondaryy rounded-[40px]" type="submit">Add</button>
                    </div>

                </form>

                

            </div>
           
            <div className="w-full h-[75vh] bg-secondaryy  md:px-[80px] px-[32px] p-4 overflow-y-auto pt-8">
                <select onChange={(e) => setFilterState(e.target.value)} name="" id="" className="mt-4 md:w-[150px] w-[120px] h-[40px] rounded-[20px] px-4 bg-blackk text-secondaryy outline-none focus:outline-none focus:ring-0 border-none flex justify-end items-center text-secondaryy mb-8 sticky top-0  ">
                    <option  value="All">All</option>
                    <option  value="Completed">Completed</option>
                    <option  value="Uncompleted">Uncompleted</option>
                </select>
                <ul className="lis-disc -5 marker:text-blackk ">
                    {todos.map((todo) => (
                       
                    <li key={todo.id} className="list-disc ml-5  ">
                        <div className="bg-primaryy p-4 rounded-[8px] mb-4 flex justify-between">
                            <span className={`${todo.isCompleted ? "line-through" : ""} text-blackk`}>{todo.text}</span>
                            <div className="flex gap-4">
                                <i onClick={async()=>{
                                    await deleteTodo(todo.id);
                                }} className="fa-solid fa-xmark text-[20px] text-[#EF4444] cursor-pointer "></i>
                                <i onClick={async()=>{
                                    let docRef = doc(db, "todos", todo.id);
                                    await updateDoc(docRef, {
                                            isCompleted: !todo.isCompleted
                                    });


                                }} className="fa-solid fa-check text-[20px] text-[#22C55E] cursor-pointer "></i>
                            </div>
                        </div>
                    </li>))}
                    
                   

                   
                </ul> 
            </div>
        </div>
    </div>
  );
};

export default Todo;

// <li className="bg-[#F7CAC9] p-4 rounded-[8px] mb-4 flex justify-between list-disc list-inside marker:text-[#FF0066] ">Sample Todo Item 1 <div><i className="fa-regular fa-pen-to-square  text-[24px]"></i><i className="fa-solid fa-check-double   text-[24px]"></i></div></li>