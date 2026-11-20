import { useContext } from "react";
import Otp from "./Otp";
import Success from "./Success";
import { ContextAuthProcData } from "./declare";
import PasswordChangeDetail from "./PasswordChangeDetail";


export default function PasswordChange() {

  const {stAuthProcData} = useContext(ContextAuthProcData);

  return (
    <>
      <div className="authheader">
        <h3 className="font-bold">Change Password</h3>
      </div>
      <div className="authbody">
        {stAuthProcData.goto === "detail" && <PasswordChangeDetail />}
        {stAuthProcData.goto === "otp" && <Otp />}
        {stAuthProcData.goto === "success" && <Success />}
      </div>
    </>
  )
};
