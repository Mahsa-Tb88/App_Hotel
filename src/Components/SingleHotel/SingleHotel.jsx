import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import style from "./SingleHotel.module.css";

function SingleHotel() {
  const { id } = useParams();
  console.log(id);
  const { isLoading, data } = useFetchData(
    `http://localhost:5000/hotels/${id}`
  );
  if (isLoading) {
    return <div>Loading ... </div>;
  }
  return (
    <div className={style.SingleHotel}>
      <h2>{data.name}</h2>
      <div className={style.review}>
        {data.number_of_reviews} reviews &bull; {data.smart_location}
      </div>
      <img src={data.xl_picture_url} alt={data.name} className={style.img}/>
    </div>
  );
}

export default SingleHotel;
