import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import style from "./SingleHotel.module.css";
import { useHotels } from "../Context/HotelProvider";

function SingleHotel() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel) {
    return <div>Loading ... </div>;
  }
  return (
    <div className={style.SingleHotel} >
      <h2>{currentHotel.name}</h2>
      <div className={style.review}>
        {currentHotel.number_of_reviews} reviews &bull;{" "}
        {currentHotel.smart_location}
      </div>
      <img
        src={currentHotel.xl_picture_url}
        alt={currentHotel.name}
        className={style.img}
      />
    </div>
  );
}

export default SingleHotel;
