import { HiMenu } from "react-icons/hi";
import { ContextMainNavControl } from "./declare";
import { useContext } from "react";


export default function MenuMainButton() {

  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);

  return (
    <button
      className="squarebutton"
      onClick={() => setStMainNavControl({...stMainNavControl, menuMainYTF: true})}
    >
      <div className="squarebuttonwithiconbase">
        <HiMenu className="menuuserbuttonicon" />
        <p>Menu</p>
      </div>
    </button>
  )
};
