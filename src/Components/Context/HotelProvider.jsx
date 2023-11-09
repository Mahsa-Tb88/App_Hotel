import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../../Hooks/useFetchData";
import axios from "axios";
import toast from "react-hot-toast";
const HotelContext = createContext();
function HotelProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState({});
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const Base_URL = "http://localhost:5000/hotels";
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("booking"))?.Room;
  const { isLoading, data } = useFetchData(
    Base_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${Base_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }
  return (
    <HotelContext.Provider
      value={{ isLoading, data, getHotel, isLoadingCurrentHotel, currentHotel }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;

export const useHotels = () => useContext(HotelContext);
