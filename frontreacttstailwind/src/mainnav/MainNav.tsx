
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./component/NavBar";
import MenuMainY from "./component/MenuMainY";
import MenuUser from "./component/MenuUser";
import { constMainNavControlDict, ContextMainNavControl, useScreenSize, type tyContextMainNavControlValue, type tyMainNavControlDict, type tyScreenSize } from "./component/declare";
import { widthLayoutChange } from "@/common/declare";
import image from "@/assets/earthfromspace2.jpg";
import { constAuthProcDataDict, ContextAuthProcData, type tyAuthProcDataDict, type tyContextAuthProcDataValue } from "@/auth/component/declare";
import AuthProc from "@/auth/AuthProc";


export default function MainNav() {

  const screenSize: tyScreenSize = useScreenSize();
  const [stMainNavControl, setStMainNavControl] = useState<tyMainNavControlDict>(constMainNavControlDict);
  const contextMainNavControlValue: tyContextMainNavControlValue = {stMainNavControl, setStMainNavControl};
  const [stAuthProcData, setStAuthProcData] = useState<tyAuthProcDataDict>(constAuthProcDataDict);
  const contextAuthProcDataValue: tyContextAuthProcDataValue = {stAuthProcData, setStAuthProcData};

    
  return (
    <ContextMainNavControl.Provider value={contextMainNavControlValue}>
      <ContextAuthProcData.Provider value={contextAuthProcDataValue}>
        <main className={`mainnav ${stMainNavControl.darkModeTF ? "dark" : ""}`}>
          <img src={image} alt="image" className="imagemain" />
          <NavBar/>
          {stMainNavControl.menuUserTF && <MenuUser />}
          {stMainNavControl.menuMainYTF && screenSize.width < widthLayoutChange && <MenuMainY />}
          {Boolean(stAuthProcData.process) && <AuthProc />}
          <div className="mainoutlet">
            <Outlet />
          </div>
        </main>
      </ContextAuthProcData.Provider>
    </ContextMainNavControl.Provider>
  )
};