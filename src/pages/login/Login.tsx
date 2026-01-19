import avantl from "@/assets/AvantL.png"
import "./login.css"
import { signInWithPopup } from "firebase/auth"
import { auth, db, provider } from "@/firebase"
import { useContext } from "react"
import MyContext from "@/context"
import { doc, setDoc } from "firebase/firestore"

const Login = () => {
    const {user,setUser} = useContext(MyContext)!
    const signIn = async () =>{

        try {
          const res = await signInWithPopup(auth, provider)
            // The user is now signed in.
            const firebaseUser = await res.user;
            console.log("Signed in user:", firebaseUser?.displayName);
            
        
            console.log("auth.currentUser after sign-in:", auth.currentUser)

        // map Firebase User to our UserType before setting context
        if (!firebaseUser) throw new Error("No user returned from Firebase authentication");
        setUser({
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? null,
          uid: firebaseUser.uid ?? null,
          photoURL: firebaseUser.photoURL ?? null
        });

        // create/update user document using the Firebase user ID
        const docRef = doc(db, "users", firebaseUser.uid);

        await setDoc(docRef, {
          name: firebaseUser.displayName ?? "",
          email: firebaseUser.email ?? null,
          uid: firebaseUser.uid ?? null,
          photoURL: firebaseUser.photoURL ?? null
        }, { merge: true });

        console.log(res.user)
        } catch (error) {
            console.error(error)
        }

        console.log(user);
       

    }
    return(
        <div className=" w-[100vw] h-[100vh] ">
            <div className="text-center pt-[240px] md:px-[80px] px-[16px] mb-[32px]  ">
                <div className="flex gap-2 justify-center mb-[16px]  ">
                    <div className="md:w-[24px] md:h-[24px] w-[24px] h-[24px]  bg-primaryy flex items-center justify-center rounded-full">
                        <img src={avantl} alt="" className="h-[24px] w-full " />
                    </div>
                    <h1 className=" text-[16px] font-medium ">Renoto</h1>
                </div>
                <h1 className="font-bold text-[32px] md:text-[40px] mb-[8px] ">Get Started with Us</h1>
                <p className="opacity-50 text-[16px] mb-[32px] ">let us be Productive</p>
            </div>
            <button onClick={signIn} className="button m-auto">
            Sign in with Google
            <span className="google-icon">
                <svg viewBox="0 0 48 48">
                <title>Google Logo</title>
                <clipPath id="g">
                    <path
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    ></path>
                </clipPath>
                <g clip-path="url(#g)" className="colors">
                    <path d="M0 37V11l17 13z" fill="#FBBC05"></path>
                    <path d="M0 11l17 13 7-6.1L48 14V0H0z" fill="#EA4335"></path>
                    <path d="M0 37l30-23 7.9 1L48 0v48H0z" fill="#34A853"></path>
                    <path d="M48 48L17 24l-4-3 35-10z" fill="#4285F4"></path>
                </g>
                </svg>
            </span>
            </button>


        </div>
    )
}

export default Login