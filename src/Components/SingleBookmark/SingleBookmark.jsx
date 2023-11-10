import React, { useEffect } from "react";
import { useBookmark } from "../Context/BookmarkProvider";
import { useNavigate, useParams } from "react-router-dom";
import style from "./SingleBookmark.module.css";
function SingleBookmark() {
  const { getBookmark, isLoadingCurrBookmark, currentBookmark } = useBookmark();
  const { id } = useParams();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  //   console.log(currentBookmark);
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className={style.singleBookmark}>
      <button onClick={backHandler}>Back</button>
      <h2 className={style.country}>{currentBookmark.country}</h2>

      <div className={style.info}>
        <h2>{currentBookmark.cityName}</h2>
        <h3>({currentBookmark.countryCode})</h3>
      </div>
    </div>
  );
}

export default SingleBookmark;
