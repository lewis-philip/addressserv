import { ContextAuth } from "@/auth/component/declare";
import { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ContextMainNavControl } from "./declare";


export default function MenuUserButton() {

  const {stAuth} = useContext(ContextAuth);
  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);
  
  return (
    <button
      className="menuuserbutton"
      onClick={() => setStMainNavControl({...stMainNavControl, menuUserTF: true})}
    >
      {stAuth.userdata.is_loggedin
        ? <FaUser className="menuuserbuttonicon" />
        : <FaRegUser className="menuuserbuttonicon" />
      }
    </button>
  )
};
