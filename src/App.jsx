import Header from "./Components/Hedaer/Header";
import LocationList from "./Components/LocationList/LocationList";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";
import Hotels from "./Components/Hotels/Hotels";
import HotelProvider from "./Components/Context/HotelProvider";

function App() {
  return (
    <HotelProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>idd</div>} />
        </Route>
      </Routes>
    </HotelProvider>
  );
}

export default App;
