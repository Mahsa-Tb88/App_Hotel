import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useFetchData from "../../Hooks/useFetchData";
import axios from "axios";
import toast from "react-hot-toast";
const BookmarkContext = createContext();

function BookmarkProvider({ children }) {
  const Base_URL = "http://localhost:5000";
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    async function FetchBookmarkList() {
      setIsLoadingCurrBookmark(true);
      try {
        const { data } = await axios.get(`${Base_URL}/bookmarks/`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoadingCurrBookmark(false);
      }
    }
    FetchBookmarkList();
  }, []);
  async function createBookmark(newBookmark) {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.post(`${Base_URL}/bookmarks/`, newBookmark);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }

  async function deleteBookmark(id) {
    setIsLoadingCurrBookmark(true);
    try {
      await axios.delete(`${Base_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id != id));
    } catch (error) {
      toast.error(error.message);
    } finally {
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
        createBookmark,
        setBookmarks,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export const useBookmark = () => useContext(BookmarkContext);
