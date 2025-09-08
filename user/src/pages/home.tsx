import { useEffect, useState } from "react";
import Header from "../components/header";
import api from "../api/axios.js";

const Home = () => {

  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  const getLocation = () => {
    navigator.geolocation.watchPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    },
      (err) => {
        console.log(err);
      })
  }
  useEffect(() => {
    getLocation();
  }, [])

  const updateLocation = async (longitude: number, latitude: number) => {
    try {
      // Send POST request to /location/update
      const res = await api.post("/location", {
        longitude,
        latitude,
      });

      if (res.data.breached) {
        console.log("Geofence breached:", res.data.geofence);
        // Optional: trigger alert or notification here
      } else {
        console.log("Location updated, no breach");
      }
    } catch (err: any) {
      console.error("Error updating location:", err.response?.data || err.message);
    }
  };

  const endLocation = async (longitude: number, latitude: number) => {
    try {
      // Send POST request to /location/update
      const res = await api.post("/location", {
        longitude,
        latitude,
        endTrip: true,
      });

      if (res.data.success) {
        console.log("Ended Trip");
      }

    } catch (err: any) {
      console.error("Error ending location:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <Header />

      <div className="w-[95%] bg-[#121212] p-3 rounded-md ml-[50%] translate-x-[-50%] mt-5 flex items-center justify-between">
        <h2 className="text-lg text-white/80 font-semibold">
          Start a new Trip
        </h2>

        <button onClick={() => updateLocation(longitude, latitude)} className="bg-green-900/70 text-green-500 font-semibold px-2 py-1 rounded-md cursor-pointer">
          Start
        </button>
        <button onClick={() => endLocation(longitude, latitude)} className="bg-red-900/70 text-red-500 font-semibold px-2 py-1 rounded-md cursor-pointer">
          End
        </button>
      </div>


    </div>
  );
};

export default Home;
