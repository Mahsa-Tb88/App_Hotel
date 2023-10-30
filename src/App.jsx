import Header from "./Components/Hedaer/Header";
import LocationList from "./Components/LocationList/LocationList";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./Components/AppLayout/AppLayout";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>hotelsss</div>} />
          <Route path=":id" element={<div>idd</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
