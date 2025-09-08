import { LogOut } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full h-[6vh] flex items-center px-4 z-50 bg-black shadow-sm justify-between">
      <h2 className="text-white/80 text-xl font-semibold cursor-pointer">
        Travy
      </h2>

      <button className="px-2 py-1 rounded-md bg-red-900/30  text-red-500/80 hover:bg-red-900/70 hover:text-red-200 duration-150 cursor-pointer flex items-center gap-1 text-sm">
        Log Out <LogOut size={"1rem"} />
      </button>
    </div>
  );
};

export default Header;
