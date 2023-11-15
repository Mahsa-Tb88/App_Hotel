import Header from "./Components/Hedaer/Header";
import LocationList from "./Components/LocationList/LocationList";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelProvider from "./Components/Context/HotelProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import BookmarkProvider from "./Components/Context/BookmarkProvider";
import BookmarkLayout from "./Components/BookmarkLayout/BookmarkLayout";
import BookmarkList from "./Components/BookmarkList/BookmarkList";
import SingleBookmark from "./Components/SingleBookmark/SingleBookmark";
import AppNewBookmark from "./Components/AppNewBookmark/AppNewBookmark";

function App() {
  return (
    <BookmarkProvider>
      <HotelProvider>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<LocationList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<SingleHotel />} />
          </Route>
          <Route path="/bookmark" element={<BookmarkLayout />}>
            <Route index element={<BookmarkList />} />
            <Route path=":id" element={<SingleBookmark />} />
            <Route path="add" element={<AppNewBookmark />} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookmarkProvider>
  );
}

export default App;
