

import { Link } from "react-router";

const Nav = () => {
    return (
        <div className=' rounded-full bg-primaryy flex items-center justify-between  fixed bottom-4 m-auto left-0 right-0 w-fit z-50 '>  
           <div
            className="hover:scale-x-105 transition-all duration-300 *:transition-all *:duration-300 flex justify-start text-2xl items-center shadow-xl z-10 bg-primaryy dark:bg-primaryy gap-4 p-2 rounded-full"
            >
            <Link to="/" className="hover:scale-x-105 transition-all duration-300 *:transition-all *:duration-300">
            <button
                className="before:hidden hover:before:flex before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:content-['Todo'] before:bg-blackk dark:before:bg-secondaryy dark:before:text-blackk before:text-secondaryy before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 bg-secondaryy dark:bg-secondaryy rounded-full p-2 px-3"
            >
                📝
            </button>
            </Link>

            <Link to="/note" className="hover:scale-x-105 transition-all duration-300 *:transition-all *:duration-300">
            <button
                className="before:hidden hover:before:flex before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:content-['Note'] before:bg-blackk dark:before:bg-secondaryy dark:before:text-blackk before:text-secondaryy before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 bg-secondaryy dark:bg-secondaryy rounded-full p-2 px-3"
            >
                📒
            </button>
            </Link>
            <button
                className="before:hidden hover:before:flex before:justify-center before:items-center before:h-4 before:text-[.6rem] before:px-1 before:content-['Reminder'] before:bg-blackk dark:before:bg-secondaryy dark:before:text-blackk before:text-secondaryy before:bg-opacity-50 before:absolute before:-top-7 before:rounded-lg hover:-translate-y-5 cursor-pointer hover:scale-125 bg-secondaryy dark:bg-secondaryy rounded-full p-2 px-3"
            >
                ⏰
            </button>
        </div>

        </div>
    )
}   

export default Nav;