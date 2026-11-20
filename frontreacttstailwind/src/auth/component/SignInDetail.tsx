import InputText from "@/common/component/InputText";
import { useContext, useEffect } from "react";
import { constAuthProcDataDict, ContextAuthProcData, emailRegExp, pwdRegExp } from "./declare";
import { axiosJSON, nameApp, otpSendUrl } from "@/common/declare";
import type { AxiosResponse } from "axios";
import CheckBox from "@/common/component/CheckBox";


export default function SignInDetail() {

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

  const onClickRegister = () => {
    setStAuthProcData({...constAuthProcDataDict, process: "register", goto: "detail"});
  };

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, emailValidTF: stAuthProcData.email === "" ? true : emailRegExp.test(stAuthProcData.email), errMsg: ""});
  }, [stAuthProcData.email]);

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, pwdValidTF: stAuthProcData.pwd === "" ? true : pwdRegExp.test(stAuthProcData.pwd), errMsg: ""});
  }, [stAuthProcData.pwd]);


  return (
    <>
      <div className="authbody">
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
            <div className="checkboxbasefixedheight">
              <CheckBox
                id="rememberme"
                name="rememberme"
                label="Remember me"
                required={false}
                checked={stAuthProcData.rememberMeTF}
                onChange={() => setStAuthProcData({...stAuthProcData, rememberMeTF: !stAuthProcData.rememberMeTF})}
              />
            </div>
          </div>
          <div className="autherror">
            {stAuthProcData.errMsg && <h6 className="text-justify text-apperror">{stAuthProcData.errMsg}</h6>}
          </div>
          <h6>Please <button className="text-appactive cursor-pointer" onClick={() => onClickRegister()}>register</button> if you don't have an account.</h6>
        </div>
        <button
          className="squarebutton self-stretch"
          disabled={
            stAuthProcData.emailValidTF && stAuthProcData.email !== "" &&
            stAuthProcData.pwdValidTF && stAuthProcData.pwd !== ""
            ? false : true
          }
          onClick={(event) => getOtp(event)}
        >
          <h5>Sign In</h5>
        </button>
      </div>
    </>
  )
};



