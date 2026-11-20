import { useContext, useEffect } from "react";
import image from "@/assets/earthfromspace1.jpg";
import ButtonIcon from "@/common/component/ButtonIcon";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import SignIn from "./component/SignIn";
import Register from "./component/Register";
import PasswordChange from "./component/PasswordChange";
import { constAuthProcDataDict, ContextAuthProcData } from "./component/declare";


export default function AuthProc() {

  const {stAuthProcData, setStAuthProcData} = useContext(ContextAuthProcData);
  const navigate = useNavigate();

  const onClickClose = () => {
    setStAuthProcData(constAuthProcDataDict);
    navigate("/", {preventScrollReset: true, replace: true});
  };

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, goto: "detail"});
  }, []);


  return (
    <div className="modalblack">
      <div className="authbase">
        <div
          className="flex"
          data-aos="zoom-in"
          data-aos-delay="700"
        >
          <img src={image} alt="image" className="authimg" />
          <div className="auth">
            <div className="flex justify-end">
              <ButtonIcon icon={FaXmark} onClick={() => onClickClose()} />
            </div>
            {stAuthProcData.process === "signin" && <SignIn />}
            {stAuthProcData.process === "register" && <Register />}
            {stAuthProcData.process === "passwordchange" && <PasswordChange />}
          </div>
        </div>
      </div>
    </div>
  )
};

