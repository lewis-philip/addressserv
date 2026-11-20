import { useContext } from "react";
import Otp from "./Otp";
import { ContextAuthProcData } from "./declare";
import SignInDetail from "./SignInDetail";


export default function SignIn() {

  const {stAuthProcData} = useContext(ContextAuthProcData);
 
  return (
    <>
      <div className="authheader">
        <h3 className="font-bold">Sign In</h3>
      </div>
      <div className="authbody">
        {stAuthProcData.goto === "detail" && <SignInDetail />}
        {stAuthProcData.goto === "otp" && <Otp />}
      </div>
    </>
  )
};
