import Header from "./Components/Hedaer/Header";
import LocationList from "./Components/LocationList/LocationList";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelProvider from "./Components/Context/HotelProvider";
import SingleHotel from "./Components/SingleHotel/SingleHotel";
import Bookmark from "./Components/Bookmark/Bookmark";

function App() {
  return (
    <HotelProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </HotelProvider>
  );
}

export default App;
