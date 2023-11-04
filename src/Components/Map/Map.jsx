import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import style from "./Map.module.css";
import { useHotels } from "../Context/HotelProvider";
import { useSearchParams } from "react-router-dom";
function Map() {
  const [mapCenter, setMapCenter] = useState([48, 2.35]);
  const { isLoadign, data } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log(lat ? "yes" : "no");
  console.log(mapCenter, [lat, lng]);
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  return (
    <div>
      <MapContainer
        className={style.map_container}
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {data.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
{
  /*center={lat ? () => setMapCenter([lat, lng]) : mapCenter}*/
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
