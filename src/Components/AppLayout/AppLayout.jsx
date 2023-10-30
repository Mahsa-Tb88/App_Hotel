import React from "react";
import style from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
function AppLayout() {
  return (
    <div className={style.app_layout}>
      <div className={style.sidebar}>
        <Outlet />
      </div>
      <div className={style.map}>map</div>
    </div>
  );
}

export default AppLayout;
