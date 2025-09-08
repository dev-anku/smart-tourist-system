import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Smartphone, User } from "lucide-react";


delete (L.Icon.Default.prototype as any)._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const center: LatLngExpression = [26.9124, 75.7873];

const Map = () =>{
    return(
       <div className="w-[68%] h-full">






        <MapContainer
        center={center}
        zoom={12}
        style={{ height: "94vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

  
          <Marker
           
            position={[
              26.9124,
              75.7873,
            ]}
          >
            <Popup>
              <div className="p-3 w-80 flex flex-col rounded-xl bg-white ml-[50%] translate-x-[-50%] gap-2">
                <span className="bg-blue-100 text-blue-800 font-medium text-sm rounded-md flex items-center w-full justify-between px-2 py-1 self-start">
                  "hdfgodfg"
                  <code className="bg-white px-2 rounded-sm text-xs py-.5">
                    #"hi jidf"
                  </code>
                </span>
                <img
                  src="/image.png"
                  className="w-full rounded-lg h-40 border border-gray-500"
                  alt="complaint"
                />
                <div className="flex flex-col text-gray-800">
                  <p className="text-base font-semibold flex items-center gap-1">
                    <User size={"1rem"} /> "sumit"
                  </p>
                  <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <Smartphone size={"1rem"} /> "8209333127"
                  </p>
                  <p className="text-lg">"hi"</p>
                </div>
              </div>
            </Popup>
          </Marker>
      </MapContainer>
       </div>
    )
}

export default Map;


