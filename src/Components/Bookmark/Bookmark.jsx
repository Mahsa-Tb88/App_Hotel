import React from "react";
import style from "./Bookmark.module.css";
import Map from "../Map/Map";
function Bookmark() {
  return (
    <div className={style.app_layout}>
      <div className={style.sidebar}>{/*   <Outlet /> */}</div>
      <div className={style.map}>
        <Map marketLocations={[]} />
      </div>
    </div>
  );
}

export default Bookmark;
