import React from "react";
import { Link } from "react-router-dom";
import style from "./Hotels.module.css";
import { useHotels } from "../Context/HotelProvider";

function Hotels() {
  const { isLoading, data } = useHotels();
  //   console.log(data);
  isLoading ? <div>Is Loading Data ... </div> : "";
  return (
    <div>
      <h2 className={style.title}>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link to={`/hotels/${item.id}`} key={item.id}>
            <div className={style.hotel}>
              <img
                src={item.picture_url.url}
                alt={item.name}
                className={style.img}
              />
              <div className={style.desc}>
                <p className={style.location}>{item.smart_location}</p>
                <p className={style.name}>{item.name}</p>
                <p className={style.price}>
                  <span>${item.price}</span>
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
