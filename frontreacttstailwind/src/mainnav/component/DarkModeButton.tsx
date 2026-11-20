import { useContext } from "react";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunnySharp } from "react-icons/io5";
import { ContextMainNavControl } from "./declare";


export default function DarkModeButton() {

  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);

  return (
    <button
      className="buttonicon"
      onClick={() => setStMainNavControl({...stMainNavControl, darkModeTF: !stMainNavControl.darkModeTF})}
    >
      {stMainNavControl.darkModeTF
        ? <IoSunnySharp className="buttoniconicon" />
        : <IoMoonSharp className="buttoniconicon" />
      }
    </button>
  )
};
