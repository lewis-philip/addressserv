import { ContextMainNavControl } from "./declare";
import MenuUserItem from "./MenuUserItem";
import { useContext } from "react";
import { constAuthProcDataDict, ContextAuthProcData } from "@/auth/component/declare";
import { LuUserPlus } from "react-icons/lu";
import { MdPassword } from "react-icons/md";


export default function MenuUserAuthY() {

  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);
  const {setStAuthProcData} = useContext(ContextAuthProcData);

  const onClickRegister = () => {
    setStMainNavControl({...stMainNavControl, menuUserTF: false});
    setStAuthProcData({...constAuthProcDataDict, process: "register", goto: "detail"});
  };

  const onClickPasswordChange = () => {
    setStMainNavControl({...stMainNavControl, menuUserTF: false});
    setStAuthProcData({...constAuthProcDataDict, process: "passwordchange", goto: "detail"});
  };


  return (
    <ul className="menuuser">
      <li onClick={() => onClickRegister()}>
        <MenuUserItem caption="Register" icon={LuUserPlus} showCaption={true} showIcon={true} />
      </li>
      <li onClick={() => onClickPasswordChange()}>
        <MenuUserItem caption="Change Password" icon={MdPassword} showCaption={true} showIcon={true} />
      </li>
    </ul>
  )
};

