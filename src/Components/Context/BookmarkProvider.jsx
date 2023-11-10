import React, { Children, createContext, useContext, useState } from "react";
import useFetchData from "../../Hooks/useFetchData";
import axios from "axios";
import toast from "react-hot-toast";
const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const Base_URL = "http://localhost:5000";
  const [currentBookmark, setCurrentBookmark] = useState({});
  const { isLoading, data: bookmarks } = useFetchData(`${Base_URL}/bookmarks`);
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);
  async function getBookmark(id) {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.get(`${Base_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        isLoadingCurrBookmark,
        currentBookmark,
        getBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);
