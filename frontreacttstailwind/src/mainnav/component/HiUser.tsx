import { useContext } from "react";
import { ContextAuth } from "@/auth/component/declare";
import MenuUserButton from "./MenuUserButton";
import DarkModeButton from "./DarkModeButton";


export default function HiUser() {

  const {stAuth} = useContext(ContextAuth);

  
  return (
    <div className="hiuser">
      <DarkModeButton />
      {stAuth.userdata.is_loggedin && Boolean(stAuth.userdata.fullname) && <h6 className="font-bold">Hi {Boolean(stAuth.userdata.fullname.split(" ")[0]) ? stAuth.userdata.fullname.split(" ")[0] : stAuth.userdata.fullname}</h6>}
      <MenuUserButton />
    </div>
  )
};

