import ButtonIcon from "@/common/component/ButtonIcon";
import { FaXmark } from "react-icons/fa6";
import { useContext } from "react";
import { ContextAuth, ContextAuthProcData, constAuthDict, constAuthProcDataDict } from "@/auth/component/declare";
import MenuUserFilteredY from "./MenuUserFilteredY";
import Cookies from "js-cookie";
import { signOutUrl, useAxiosJSONAuth } from "@/common/declare";
import MenuUserAuthY from "./MenuUserAuthY";
import { ContextMainNavControl } from "./declare";


export default function MenuUser() {

  const {stAuth, setStAuth} = useContext(ContextAuth);
  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);
  const {setStAuthProcData} = useContext(ContextAuthProcData);
  const axiosJSONAuth = useAxiosJSONAuth();

  const onClickSignOut = async() => {
    setStMainNavControl({...stMainNavControl, menuUserTF: false});
    let authId: string | undefined = Cookies.get("dev");
    if (authId) {
      await axiosJSONAuth.post(signOutUrl, JSON.stringify({"id": authId}));
      Cookies.remove("dev");
      setStAuth(constAuthDict);
    };
  };

  const onClickSignIn = () => {
    setStMainNavControl({...stMainNavControl, menuUserTF: false});
    setStAuthProcData({...constAuthProcDataDict, process: "signin", goto: "detail"});
  };


  return (
    <>
      <div className="modal" />
      <div className="menuuserbase">
        <div className="menuuserheader">
          <div className="flex justify-end">
            <ButtonIcon icon={FaXmark} onClick={() => setStMainNavControl({...stMainNavControl, menuUserTF: false})} />
          </div>
          <div className="flex justify-start">
            {stAuth.userdata.is_loggedin && Boolean(stAuth.userdata.fullname) && 
              <h5 className="font-bold">Hello, {Boolean(stAuth.userdata.fullname.split(" ")[0]) ? stAuth.userdata.fullname.split(" ")[0] : stAuth.userdata.fullname}</h5>
            }
          </div>
        </div>
        <div className="menuuserbase2">
          <MenuUserAuthY />
          <MenuUserFilteredY />
        </div>
        <div className="menuuserfooter">
          {stAuth.userdata.is_loggedin
            ? <button
                className="squarebutton w-1/2"
                onClick={() => onClickSignOut()}
              >
                <h6>Sign Out</h6>
              </button>
            : <button
                className="squarebutton w-1/2"
                onClick={() => onClickSignIn()}
              >
                <h6>Sign In</h6>
              </button>
          }
        </div>
      </div>
    </>
  )
};
