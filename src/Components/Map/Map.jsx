import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import style from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../Hooks/useGeoLocation";
import useUrlLocation from "../../Hooks/useUrlLocation";
function Map({ marketLocations }) {
  const [mapCenter, setMapCenter] = useState([48, 2.35]);
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

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
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {marketLocations.map((item) => {
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

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
