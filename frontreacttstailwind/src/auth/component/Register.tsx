import { useContext } from "react";
import Otp from "./Otp";
import Success from "./Success";
import { ContextAuthProcData } from "./declare";
import RegisterDetail from "./RegisterDetail";


export default function Register() {

  const {stAuthProcData} = useContext(ContextAuthProcData);

  return (
    <>
      <div className="authheader">
        <h3 className="font-bold">Register</h3>
      </div>
      <div className="authbody">
        {stAuthProcData.goto === "detail" && <RegisterDetail />}
        {stAuthProcData.goto === "otp" && <Otp />}
        {stAuthProcData.goto === "success" && <Success />}
      </div>
    </>
  )
};
