import React from "react";
import useFetchData from "../../Hooks/useFetchData";
import style from "./LocationList.module.css";
function LocationList() {
  const { isLoading, data } = useFetchData("http://localhost:5000/hotels");
  // isLoading ? <div>data is loading</div> : "";
  // console.log(data);
  return (
    <div className={style.location_list_container}>
      <h2> Nearby Location</h2>
      <div className={style.location_list}>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.picture_url.url} className={style.img} />
              <div>
                <h4 className={style.location}>{item.smart_location}</h4>
                <p className={style.location_name}>{item.name}</p>
                <p>
                  <span className={style.euro}>€</span>
                  <span className={style.price}>{item.price}</span>
                  <span className={style.night}>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
