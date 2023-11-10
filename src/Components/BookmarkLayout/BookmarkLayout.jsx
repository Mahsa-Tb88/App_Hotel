import React from "react";
import style from "./BookmarkLayout.module.css";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../Context/BookmarkProvider";
function BookmarkLayout() {
  const { bookmarks} = useBookmark();
  return (
    <div className={style.app_layout}>
      <div className={style.sidebar}>
        <Outlet />
      </div>
      <div className={style.map}>
        <Map marketLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
