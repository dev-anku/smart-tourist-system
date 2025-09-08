import { useState } from "react";
import Header from "../components/header";
import List from "../components/list";
import Map from "../components/map";
import Nav from "../components/nav";
import AddRestrictedArea from "../components/addrestrictedarea";

const Dashboard = () => {
  const [selected, setSelected] = useState<string>("all");
  const [addRestrictedArea, setAddRestrictedArea] = useState<boolean>(false);

  return (
    <>
      <Header />

      <div className="w-screen h-[94vh] relative flex justify-between">
        <Nav setSelected={setSelected} selected={selected} />
        <Map />
        <List />
      </div>

    {selected === "settings" && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 overflow-hidden">
<div className="w-[90vw] max-w-[1000px] h-[80vh] p-6 bg-black border rounded-2xl shadow-lg flex flex-col items-center relative">

      <h2 className="text-xl font-semibold mb-4 text-white/80">Settings</h2>
    
   { !addRestrictedArea &&  <button onClick={()=>setAddRestrictedArea(true)} className="rounded-lg bg-white w-full font-semibold text-sm px-2 py-2 cursor-pointer">Add map</button>}

{addRestrictedArea ? (<><AddRestrictedArea/> <button className="bg-white mt-auto px-4 text-sm py-1 rounded-lg font-semibold cursor-pointer">Add</button></>) : ''}

      <button
        onClick={() => {setSelected("all"); setAddRestrictedArea(false)}}
        className="absolute top-3 right-3 text-sm text-white/80 x-3 py-1 rounded-lg cursor-pointer bg-transparent"
      >
        close
      </button>
    </div>
  </div>
)}

    </>
  );
};

export default Dashboard;
