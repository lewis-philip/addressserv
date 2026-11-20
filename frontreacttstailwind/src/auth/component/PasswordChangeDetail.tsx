import InputText from "@/common/component/InputText";
import { useContext, useEffect } from "react";
import { ContextAuthProcData, emailRegExp, pwdRegExp } from "./declare";
import { axiosJSON, nameApp, otpSendUrl } from "@/common/declare";
import type { AxiosResponse } from "axios";


export default function PasswordChangeDetail() {

  const {stAuthProcData, setStAuthProcData} = useContext(ContextAuthProcData);

  const getOtp = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    setStAuthProcData({...stAuthProcData, otp: "", errMsg: ""});
    if (stAuthProcData.email) {
      try {
        let response: AxiosResponse = await axiosJSON.post(otpSendUrl, JSON.stringify({
          "appname": nameApp,
          "tolist": [stAuthProcData.email]
        }));
        setStAuthProcData({...stAuthProcData, goto: "otp", apiOtp: response.data.otp});
      }
      catch (error: any) {
        if (!error.response) {
          setStAuthProcData({...stAuthProcData, errMsg: "No server response"});
        } else {
          setStAuthProcData({...stAuthProcData, errMsg: "One time passcode request error"});
        };
      };
    } else {
      setStAuthProcData({...stAuthProcData, errMsg: "Email cannot be empty"});
    };
  };

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, emailValidTF: stAuthProcData.email === "" ? true : emailRegExp.test(stAuthProcData.email), errMsg: ""});
  }, [stAuthProcData.email]);

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, pwdValidTF: stAuthProcData.pwd === "" ? true : pwdRegExp.test(stAuthProcData.pwd), errMsg: ""});
  }, [stAuthProcData.pwd]);

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, pwdAgainValidTF: stAuthProcData.pwdAgain === "" ? true : stAuthProcData.pwd === stAuthProcData.pwdAgain && pwdRegExp.test(stAuthProcData.pwdAgain), errMsg: ""});
  }, [stAuthProcData.pwdAgain]);


  return (
    <>
      <div className="authbody2">
        <div className="authbody3">
          <InputText
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="your@email.dom"
            required={true}
            autoComplete="off"
            value={stAuthProcData.email}
            onChange={(event) => setStAuthProcData({...stAuthProcData, email: event.target.value})}
            error={!stAuthProcData.emailValidTF}
            errorMsg="* invalid Email *"
          />
          <InputText
            type="password"
            id="pwd"
            name="pwd"
            label="Password"
            placeholder="*******"
            required={true}
            autoComplete="off"
            value={stAuthProcData.pwd}
            onChange={(event) => setStAuthProcData({...stAuthProcData, pwd: event.target.value})}
            error={!stAuthProcData.pwdValidTF}
            errorMsg="* invalid Password *"
          />
          <InputText
            type="password"
            id="pwdAgain"
            name="pwdAgain"
            label="Password again"
            placeholder="*******"
            required={true}
            autoComplete="off"
            value={stAuthProcData.pwdAgain}
            onChange={(event) => setStAuthProcData({...stAuthProcData, pwdAgain: event.target.value})}
            error={!stAuthProcData.pwdAgainValidTF}
            errorMsg="* invalid Password *"
          />
        </div>
        <div className="autherror">
          {stAuthProcData.errMsg && <h6 className="text-justify text-apperror">{stAuthProcData.errMsg}</h6>}
        </div>
      </div>
      <button
        className="squarebutton self-stretch"
        disabled={
          stAuthProcData.emailValidTF && stAuthProcData.email !== "" &&
          stAuthProcData.pwdValidTF && stAuthProcData.pwd !== "" &&
          stAuthProcData.pwdAgainValidTF && stAuthProcData.pwdAgain !== ""
          ? false : true
        }
        onClick={(event) => getOtp(event)}
      >
        <h5>Change Password</h5>
      </button>
    </>
  )
};



