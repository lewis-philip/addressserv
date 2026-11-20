import { constAuthProcDataDict, ContextAuthProcData } from "./declare";
import { useContext } from "react";


export default function Success() {

  const {stAuthProcData, setStAuthProcData} = useContext(ContextAuthProcData);

  const onClickSignIn = () => {
    setStAuthProcData({...constAuthProcDataDict, process: "signin", goto: "detail"});
  };

  
  return (
    <>
      {(stAuthProcData.process === "register" || stAuthProcData.process === "passwordchange") &&
        <>
          <div className="authbody2">
            {stAuthProcData.process === "register"       && <h6>The <b>{stAuthProcData.email}</b> account has been created successfully.</h6>}
            {stAuthProcData.process === "passwordchange" && <h6>The <b>{stAuthProcData.email}</b> account's password has been updated successfully.</h6>}
            <h6>Click <button className="text-appactive cursor-pointer" onClick={() => onClickSignIn()}>here</button> to <button className="text-appactive cursor-pointer" onClick={() => onClickSignIn()}>sign in</button>.</h6>
          </div>
          <button
            className="squarebutton self-stretch"
            onClick={() => onClickSignIn()}
          >
            <h5>Sign in</h5>
          </button>
        </>
      }
    </>
  )
};

