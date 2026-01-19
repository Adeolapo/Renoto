import App from "@/App";

import MyContext from "@/context";
import { useContext } from "react";
import Login from "./login/Login";


const Home = () => {  
    const {user} = useContext(MyContext)!;  
    return (
        <>
            {user ? 
            <>
            
            <App />
            
           
            
            </>
            
        
            
            : <Login />}
        </>
    )
}

export default Home;