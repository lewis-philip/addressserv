import type { AxiosResponse } from "axios";
import { axiosJSON, nameApp, otpSendUrl, passwordChangeUrl, registerUrl, rememberMeFalseDays, rememberMeTrueDays, signInUrl } from "@/common/declare";
import { PiCaretDoubleLeftBold } from "react-icons/pi";
import InputText from "@/common/component/InputText";
import { useContext, useEffect } from "react";
import { constAuthProcDataDict, ContextAuth, ContextAuthProcData } from "./declare";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Otp() {

  const {stAuth, setStAuth, stAuthEdit, setStAuthEdit} = useContext(ContextAuth);
  const {stAuthProcData, setStAuthProcData} = useContext(ContextAuthProcData);
  const navigate = useNavigate();

  const getOtp = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    setStAuthProcData({...stAuthProcData, goto: "otp", otp: "", errMsg: ""});
    if (stAuthProcData.email) {
      try {
        let response: AxiosResponse = await axiosJSON.post(otpSendUrl, JSON.stringify({
          "appname": nameApp,
          "tolist": [stAuthProcData.email]
        }));
        setStAuthProcData({...stAuthProcData, apiOtp: response.data.otp});
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

  const onClickGoBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    if (["register", "signin", "passwordchange"].includes(stAuthProcData.process)) {
      setStAuthProcData({...stAuthProcData, goto: "detail", otp: "", apiOtp: "", errMsg: ""});
    };
  };

  const submitRegister = async(): Promise<void> => {
    try {
      let response: AxiosResponse = await axiosJSON.post(registerUrl, JSON.stringify({
        "email": stAuthProcData.email,
        "fullname": stAuthProcData.name,
        "password": stAuthProcData.pwd
      }));
      // console.log("response:", response);
      setStAuthProcData({...stAuthProcData, goto: "success"});
    }
    catch (error: any) {
      if (!error.response) {
        setStAuthProcData({...stAuthProcData, errMsg: "No server response"});
      } else if (error.response?.status === 409) {
        setStAuthProcData({...stAuthProcData, errMsg: "Account exists already"});
      } else {
        setStAuthProcData({...stAuthProcData, errMsg: "Wrong HTTP request"});
      };
    };
  };

  const submitPasswordChange = async(): Promise<void> => {
    try {
      let response: AxiosResponse = await axiosJSON.post(passwordChangeUrl, JSON.stringify({
        "email": stAuthProcData.email,
        "password": stAuthProcData.pwd
      }));
      // console.log("response:", response);
      setStAuthProcData({...stAuthProcData, goto: "success"});
    }
    catch (error: any) {
      if (!error.response) {
        setStAuthProcData({...stAuthProcData, errMsg: "No server response"});
      } else if (error.response?.status === 404) {
        setStAuthProcData({...stAuthProcData, errMsg: "Account not found or is inactive"});
      } else {
        setStAuthProcData({...stAuthProcData, errMsg: "Wrong HTTP request"});
      };
    };
  };

  const submitSignIn = async(): Promise<void> => {
    try {
      let response: AxiosResponse = await axiosJSON.post(signInUrl, JSON.stringify({
        "email": stAuthProcData.email,
        "password": stAuthProcData.pwd
      }));
      // console.log("responseSignIn:", response);
      if (response.data?.userdata?.id) {
        if (stAuthProcData.rememberMeTF) {
          Cookies.set("dev", response.data?.userdata?.id, { expires: rememberMeTrueDays });
        } else {
          Cookies.set("dev", response.data?.userdata?.id, { expires: rememberMeFalseDays });
        };
        setStAuth({...stAuth, userdata: response.data?.userdata, refreshtoken: response.data?.refresh_token});
        setStAuthEdit({...stAuthEdit, userdata: response.data?.userdata, refreshtoken: response.data?.refresh_token});
        setStAuthProcData(constAuthProcDataDict);
        navigate("/");
      } else {
        setStAuthProcData({...stAuthProcData, errMsg: "Something went wrong. Please try to sign in again."});
      };
    } catch (error: any) {
      if (!error.response) {
        setStAuthProcData({...stAuthProcData, errMsg: "No server response"});
      } else if (error.response?.status === 404) {
        setStAuthProcData({...stAuthProcData, errMsg: "Wrong credentials"});
      } else {
        setStAuthProcData({...stAuthProcData, errMsg: "Wrong HTTP request"});
      };
    };
  };

  const onClickSubmit = async(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    if (stAuthProcData.otp !== stAuthProcData.apiOtp) {
      setStAuthProcData({...stAuthProcData, otp: "", errMsg: "Something went wrong. Please type in the verification code again, or ask for a new code."});
    } else if (stAuthProcData.process === "register") {
      await submitRegister();
    } else if (stAuthProcData.process === "passwordchange") {
      await submitPasswordChange();
    } else if (stAuthProcData.process === "signin") {
      await submitSignIn();
    };
  };

  useEffect(() => {
    setStAuthProcData({...stAuthProcData, otpValidTF: stAuthProcData.otp === "" ? true : stAuthProcData.otp === stAuthProcData.apiOtp, errMsg: ""});
  }, [stAuthProcData.otp]);


  return (
    <>
      <div className="authbody2">
        <h6>A <b>verification code</b> has been sent to your email <b>{stAuthProcData.email}</b>.
            <br/>(Don't forget to check your <b>Spam</b> folder too.)
        </h6>
        <h6>Please enter this code in the token box below.</h6>
        <div className="inputtextbase2">
          <InputText
            type="password"
            id="otp"
            name="otp"
            label="Verification Code"
            placeholder="*******"
            required={true}
            autoComplete="off"
            value={stAuthProcData.otp}
            onChange={(event) => setStAuthProcData({...stAuthProcData, otp: event.target.value})}
            error={!stAuthProcData.otpValidTF}
            errorMsg="* invalid Verification Code *"
          />
        </div>
        <div className="autherror">
          {stAuthProcData.errMsg && <h6 className="text-justify text-apperror">{stAuthProcData.errMsg}</h6>}
        </div>
        <h6>For a new <b>verification code</b> click <button className="text-appactive cursor-pointer" onClick={(e) => getOtp(e)}>here</button>.</h6>
      </div>
      <div className="authbutton">
        {["register", "signin", "passwordchange"].includes(stAuthProcData.process) &&
          <button
            className="squarebutton self-stretch"
            onClick={(event) => onClickGoBack(event)}
          >
            <PiCaretDoubleLeftBold />
            <h5>Go back</h5>
          </button>
        }
        <button
          className="squarebutton self-stretch"
          disabled={stAuthProcData.otpValidTF && stAuthProcData.otp !== "" ? false : true}
          onClick={(event) => onClickSubmit(event)}
        >
          <h5>Submit</h5>
        </button>
      </div>
    </>
  )
};



