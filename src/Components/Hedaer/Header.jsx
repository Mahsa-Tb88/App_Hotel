import React, { useRef, useState } from "react";
import style from "./Header.module.css";
import { HiLocationMarker } from "react-icons/hi";
import { HiTag } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { FcCalendar } from "react-icons/fc";
import { HiMinusSm } from "react-icons/hi";
import { HiPlusSm } from "react-icons/hi";
import useOutSideClicked from "../../Hooks/useOutSideClicked";
// date raneg pk
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { createSearchParams, useNavigate } from "react-router-dom";
// import {
//   createSearchParams,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
function Header() {
  const [showBooking, setShowBooking] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [booking, setBooking] = useState({ Adult: 1, Children: 0, Room: 1 });
  const clickHandler = (action, type) => {
    setBooking((prev) => {
      return {
        ...prev,
        [type]: action == "inc" ? booking[type] + 1 : booking[type] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const searchHandler = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination: "destination",
      booking: JSON.stringify(booking),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className={style.header}>
      <div>
        <HiLocationMarker className={style.location} />
        <input className={style.inputSearch} />
      </div>
      <div className={style.sectionDate}>
        <FcCalendar className={style.calender} />
        <span className={style.date} onClick={() => setShowDate(!showDate)}>
          {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
            date[0].endDate,
            "MM/dd/yyyy"
          )}`}
        </span>
        {showDate && (
          <DateRange
            ranges={date}
            onChange={(item) => setDate([item.selection])}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
            className={style.datecomp}
          />
        )}
      </div>
      <div className={style.reservedRoom}>
        <div className={style.reservedRoomHeader}>
          <HiTag className={style.tagRoom} />
          <span
            className={style.optionDropDown}
            id="optionIdDropDown"
            onClick={() => setShowBooking(!showBooking)}
          >
            {booking["Adult"]} adult- {booking["Children"]} children -{" "}
            {booking["Room"]} room
          </span>
        </div>

        {showBooking && (
          <BookingList
            booking={booking}
            clickHandler={clickHandler}
            setShowBooking={setShowBooking}
            id="optionIdDropDown"
            showBooking={showBooking}
          />
        )}
      </div>
      <div className={style.search} onClick={searchHandler}>
        <HiSearch className={style.searchIcon} />
      </div>
    </div>
  );
}

export default Header;

function BookingList({
  booking,
  clickHandler,
  setShowBooking,
  id,
  showBooking,
}) {
  const optionListRef = useRef();
  useOutSideClicked(optionListRef, setShowBooking, id, showBooking);
  return (
    <div className={style.booking} ref={optionListRef}>
      <OptionItem
        type="Adult"
        limitnum="1"
        booking={booking}
        clickHandler={clickHandler}
      />
      <OptionItem
        type="Children"
        limitnum="0"
        booking={booking}
        clickHandler={clickHandler}
      />
      <OptionItem
        type="Room"
        limitnum="1"
        booking={booking}
        clickHandler={clickHandler}
      />
    </div>
  );
}

function OptionItem({ type, booking, limitnum, clickHandler }) {
  return (
    <div className={style.optionItem}>
      <h2>{type}</h2>
      <div className={style.optionItemDetail}>
        <button
          className={style.minusBtn}
          disabled={limitnum >= booking[type]}
          onClick={() => clickHandler("dec", type)}
        >
          <HiMinusSm />
        </button>
        <span>{booking[type]}</span>
        <button
          className={style.plusBtn}
          onClick={() => clickHandler("inc", type)}
        >
          <HiPlusSm />
        </button>
      </div>
    </div>
  );
}
