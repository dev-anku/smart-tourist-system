import { LogOut } from "lucide-react";

const Header = () =>{
    return(


        <div className="w-full h-[6vh] px-4 flex items-center justify-between border-b border-white/20 shadow-sm">


 <h2 className="text-white/80 text-xl font-semibold cursor-pointer">
        Travy
      </h2>

      <button className="px-2 py-1 rounded-md bg-red-900/30  text-red-500/80 hover:bg-red-900/70 hover:text-red-200 duration-150 cursor-pointer flex items-center gap-1 text-sm">
        Log Out <LogOut size={"1rem"} />
      </button>
        </div>
    )
}

export default Header;