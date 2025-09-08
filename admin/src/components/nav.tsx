import {
  LayoutDashboard,
  Siren,
  TriangleAlert,
  OctagonMinus,
  Settings
} from "lucide-react";

type NavProp = {
  setSelected: (value: string) => void;
  selected: string;
};

const Nav = ({ setSelected, selected }: NavProp) => {
  return (
    <div className="w-[12%] h-full z-1 bg-black shadow-sm">
      <ul className="list-none flex flex-col gap-3 w-full p-2">
        <li onClick={()=>setSelected("all")} className={`hover:bg-[#121212] rounded-md text-white/50 hover:text-white/80 p-3 text-sm flex items-center gap-1 cursor-pointer hover:shadow-sm ${selected === "all" && 'bg-[#121212] text-white/80'}`}>
          <LayoutDashboard size={"1rem"} /> All
        </li>
        <li onClick={()=>setSelected("emergency")} className={`hover:bg-[#121212] rounded-md text-white/50
         hover:text-white/80 p-3 text-sm flex items-center gap-1 cursor-pointer hover:shadow-sm ${selected === "emergency" && 'bg-[#121212] text-white/80'}`}>
          <Siren size={"1rem"} />
          Emergency
        </li>
        <li onClick={()=>setSelected("restricted")} className={`hover:bg-[#121212] rounded-md text-white/50 hover:text-white/80 p-3 
        text-sm flex items-center gap-1 cursor-pointer hover:shadow-sm ${selected === "restricted" && 'bg-[#121212] text-white/80'}`}>
          <OctagonMinus size={"1rem"} />
          Restricted
        </li>
        <li onClick={()=>setSelected("complaints")} className={`hover:bg-[#121212] rounded-md text-white/50 hover:text-white/80 p-3 text-sm flex items-center gap-1
         cursor-pointer hover:shadow-sm ${selected === "complaints" && 'bg-[#121212] text-white/80'}`}>
          <TriangleAlert size={"1rem"} /> Complaints
        </li>
        <li onClick={()=>setSelected("settings")} className={`hover:bg-[#121212] rounded-md text-white/50 hover:text-white/80 p-3 text-sm flex
         items-center gap-1 cursor-pointer hover:shadow-sm ${selected === "settings" && 'bg-[#121212] text-white/80'}`}>
          <Settings size={"1rem"} /> Settings

          
        </li>
      </ul>
    </div>
  );
};

export default Nav;
