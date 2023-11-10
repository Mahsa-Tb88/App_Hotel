import React from "react";
import { useBookmark } from "../Context/BookmarkProvider";
import ReactCountryFlag from "react-country-flag";
import style from "./BookmarkList.module.css";
import { Link } from "react-router-dom";
function BookmarkList() {
  const { isLoading, bookmarks, currentBookmark } = useBookmark();
  if (isLoading) return <div>is Loading </div>;
  return (
    <div>
      <h2 className={style.header}>Bookmark List</h2>
      <div>
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`${style.section} ${
                  item.id == currentBookmark.id ? style.current_bookmark : ""
                }`}
              >
                <span className={style.flag}>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                </span>
                <span className={style.city}>{item.cityName}</span>
                <span className={style.country}>{item.country}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarkList;
