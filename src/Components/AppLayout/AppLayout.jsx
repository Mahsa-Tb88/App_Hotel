import React from "react";
import style from "./AppLayout.module.css";
import Map from "../Map/Map";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div className={style.app_layout}>
      <div className={style.sidebar}>
        <Outlet />
      </div>
      <div className={style.map}><Map/></div>
    </div>
  );
}

export default AppLayout;
