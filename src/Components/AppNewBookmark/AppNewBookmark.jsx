import React, { useEffect, useState } from "react";
import style from "./AppNewBookmark.module.css";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../Hooks/useUrlLocation";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../Context/BookmarkProvider";
const BASE_GEOLOCATION =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AppNewBookmark() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState(null);
  const [isLoadignGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geoCodingError, setGeoLoadingError] = useState(null);
  const [lat, lng] = useUrlLocation();
  const { createBookmark } = useBookmark();
  useEffect(() => {
    async function fetchGeoURL() {
      setIsLoadingGeoLocation(true);
      setGeoLoadingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOLOCATION}?latitude=${lat}&longitude=${lng}`
        );
        // console.log(data);
        if (!data.countryCode) throw new Error("please click somewhere else");
        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoLoadingError(error.message);
      } finally {
        setIsLoadingGeoLocation(false);
      }
    }
    fetchGeoURL();
  }, [lat, lng]);
  const navigate = useNavigate();
  // console.log(lng, lat);
  const backHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const formHandler = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark/");
  };
  if (isLoadignGeoLocation) return <div>Loading ...</div>;
  if (geoCodingError)
    return <div className={style.error}>{geoCodingError}</div>;
  return (
    <div>
      <h2 className={style.title}> Add New Bookmark</h2>
      <form className={style.form} onSubmit={formHandler}>
        <div className={style.formcontrol}>
          <label htmlFor="cityname">City Name</label>
          <input
            value={cityName}
            onChange={(e) => e.target.value}
            type="text"
            name="cityname"
            id="cityname"
          />
        </div>
        <div className={style.formcontrol}>
          <label htmlFor="country">Country</label>
          <div className={style.country_info}>
            <input
              value={country}
              onChange={(e) => e.target.value}
              type="text"
              name="country"
              id="country"
            />
            <ReactCountryFlag
              svg
              countryCode={countryCode}
              className={style.flag}
            />
          </div>
        </div>
        <div className={style.btns}>
          <button onClick={backHandler} className={style.btn_back}>
            Back
          </button>
          <button className={style.btn_add}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AppNewBookmark;
