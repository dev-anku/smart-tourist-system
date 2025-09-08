import { useEffect, useState } from "react";
import Header from "../components/header";

const Home = () => {

  const latitude,setLAT

    const getLocation = () =>{
        navigator.geolocation.watchPosition((pos)=>{
            console.log(pos.coords);
        },
    (err)=>{
        console.log(err);
    })
    }
    useEffect(()=>{
        getLocation();
    }, [])

  return (
    <div className="w-screen min-h-screen">
      <Header />

      <div className="w-[95%] bg-[#121212] p-3 rounded-md ml-[50%] translate-x-[-50%] mt-5 flex items-center justify-between">
        <h2 className="text-lg text-white/80 font-semibold">
          Start a new Trip
        </h2>

        <button className="bg-green-900/70 text-green-500 font-semibold px-2 py-1 rounded-md cursor-pointer">
          Start
        </button>
      </div>


    </div>
  );
};

export default Home;
