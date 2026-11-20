import { createContext, useContext, type Ref } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


//--------------------------------------------------------------------------------
// Context - for authentication
//--------------------------------------------------------------------------------

export type tyUserDataDict = {
  id: string,
  email: string,
  fullname: string,
  groups: string[],
  is_loggedin: boolean,
  is_staff: boolean,
  is_active: boolean
};

export const constUserDataDict: tyUserDataDict = {
  id: "",
  email: "",
  fullname: "",
  groups: [],
  is_loggedin: false,
  is_staff: false,
  is_active: true
};

export type tyAuthDict = {
  userdata: tyUserDataDict,
  refreshtoken: string
};

export const constAuthDict: tyAuthDict = {
  userdata: constUserDataDict,
  refreshtoken: ""
};

export type tyContextAuthValue = {
  stAuth: tyAuthDict,
  setStAuth: (value: tyAuthDict) => void,
  stAuthEdit: tyAuthDict,
  setStAuthEdit: (value: tyAuthDict) => void
};
const contextAuthValue: tyContextAuthValue = {
  stAuth: constAuthDict,
  setStAuth: (value: tyAuthDict) => {},
  stAuthEdit: constAuthDict,
  setStAuthEdit: (value: tyAuthDict) => {}
};
export const ContextAuth = createContext(contextAuthValue);


//--------------------------------------------------------------------------------
// Hook - for authentication context
//--------------------------------------------------------------------------------
export function useContextAuth() {return useContext(ContextAuth)};


//--------------------------------------------------------------------------------
// Authorization component
//--------------------------------------------------------------------------------
export type tyPropsAuthOnly = {groupsOnly: string[]};

export function AuthOnly(props: tyPropsAuthOnly) {
  const {stAuth} = useContextAuth();
  const location = useLocation();
  return (
    Boolean(stAuth.userdata.groups.find(item => props.groupsOnly.includes(item)))
      ? <Outlet />
      : <Navigate to="/" state={{from: location}} replace={true} />
      // : <Navigate to="/login" state={{ from: location }} replace />
  )
};

//--------------------------------------------------------------------------------
// RegExp
//--------------------------------------------------------------------------------

export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
export const pwdRegExp = /^\w{4,16}$/  //  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})$/
export const nameRegExp = /^[a-zA-Z][a-zA-Z0-9-_ ]{2,31}$/


//--------------------------------------------------------------------------------
// Context - for authentication process data
//--------------------------------------------------------------------------------

export type tyAuthProcDataDict = {
  process: string,
  goto: string,
  errMsg: string,
  otp: string,
  apiOtp: string,
  otpValidTF: boolean,
  email: string,
  emailValidTF: boolean,
  name: string,
  nameValidTF: boolean,
  pwd: string,
  pwdValidTF: boolean,
  pwdAgain: string,
  pwdAgainValidTF: boolean,
  rememberMeTF: boolean
};

export const constAuthProcDataDict: tyAuthProcDataDict = {
  process: "",  // values: ""/register/signin/passwordchange/personchange/companychange/bankchange/invoiceaddresschange
  goto: "",     // values: detail/otp/success
  errMsg: "",
  otp: "",
  apiOtp: "",
  otpValidTF: true,
  email: "",
  emailValidTF: true,
  name: "",
  nameValidTF: true,
  pwd: "",
  pwdValidTF: true,
  pwdAgain: "",
  pwdAgainValidTF: true,
  rememberMeTF: false
};

export type tyContextAuthProcDataValue = {
  stAuthProcData: tyAuthProcDataDict,
  setStAuthProcData: (value: tyAuthProcDataDict) => void
};
const contextAuthProcDataValue: tyContextAuthProcDataValue = {
  stAuthProcData: constAuthProcDataDict,
  setStAuthProcData: (value: tyAuthProcDataDict) => {}
};
export const ContextAuthProcData = createContext(contextAuthProcDataValue);


