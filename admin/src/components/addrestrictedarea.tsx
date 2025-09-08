import { MapContainer, TileLayer, Marker, Popup, Polygon, useMapEvents } from "react-leaflet";
import type { LatLngExpression, LatLngLiteral } from "leaflet";
import L from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const center: LatLngExpression = [26.9124, 75.7873];

const ClickHandler = ({ setPoints }: { setPoints: React.Dispatch<React.SetStateAction<LatLngLiteral[]>> }) => {
  useMapEvents({
    click(e) {
      setPoints((prev) => {
        if (prev.length < 20) {
          return [...prev, e.latlng]; 
        }
        return prev;
      });
    },
  });
  return null;
};

const AddRestrictedArea = () => {
  const [points, setPoints] = useState<LatLngLiteral[]>([]);





    console.log(points);

  return (
    <div className="w-200 h-100">
     <MapContainer
  center={center}
  zoom={12}
  style={{ height: "60vh", width: "80vw", maxHeight: "500px", maxWidth: "800px" }}
>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler setPoints={setPoints} />

        {points.map((pos, i) => (
          <Marker key={i} position={pos}>
            <Popup>
              Point {i + 1}: {pos.lat.toFixed(4)}, {pos.lng.toFixed(4)}
            </Popup>
          </Marker>
        ))}

        {points.length >= 3 && (
          <Polygon
            positions={points}
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.4 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default AddRestrictedArea;
