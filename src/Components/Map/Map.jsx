import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import style from "./Map.module.css";
import { useHotels } from "../Context/HotelProvider";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../Hooks/useGeoLocation";
function Map() {
  const [mapCenter, setMapCenter] = useState([48, 2.35]);
  const { isLoading, data } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  console.log(lat ? "yes" : "no");
  console.log(mapCenter, [lat, lng]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  return (
    <div>
      <MapContainer
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
        className={style.MapContainer}
      >
        <button onClick={getPosition} className={style.location}>
          {isLoadingPosition ? "Loading ... " : "Use Your Location"}
        </button>
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
