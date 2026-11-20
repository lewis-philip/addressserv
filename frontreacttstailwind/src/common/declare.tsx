import { useContext } from "react";
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { ContextAuth, constAuthDict } from "@/auth/component/declare";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


//--------------------------------------------------------------------------------
// App
//--------------------------------------------------------------------------------

export const nameApp: string = "AddressServ"
export const rememberMeTrueDays: number = 180
export const rememberMeFalseDays: number = 1
export const maxDatePackageInMonths: number = 12


//--------------------------------------------------------------------------------
// Server
//--------------------------------------------------------------------------------

export const backendServer: string = "http://127.0.0.1:8000";
export const newAccessTokenUrl: string = "/custauth/cookietoken/refresh/";
export const otpSendUrl: string = "/custemail/aotpsend/";
export const registerUrl: string = "/custauth/aregister/";
export const passwordChangeUrl: string = "/custauth/asetpass/";
export const signInUrl: string = "/custauth/asignin/";
export const signOutUrl: string = "/custauth/asignout/";
export const getAuthDataUrl: string = "/custauth/agetdata/";
export const setAuthDataUrl: string = "/custauth/asetdata/";
export const getAccountDataUrl: string = "/customer/agetdata/";
export const setAccountDataUrl: string = "/customer/asetdata/";
export const setPersonIdFileUrl: string = "/customer/asetfile/";
export const deletePersonIdFileUrl: string = "/customer/adeletefile/";

//--------------------------------------------------------------------------------
// Axios
//--------------------------------------------------------------------------------

export const axiosJSON: AxiosInstance = axios.create({
  baseURL: backendServer,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  }
});


export const useAxiosJSONAuth = (): AxiosInstance => {

  const {stAuth, setStAuth} = useContext(ContextAuth);
  const navigate = useNavigate();

  const axiosJSONAuth: AxiosInstance = axios.create({
    baseURL: backendServer,
    timeout: 15000,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    }
  });

  axiosJSONAuth.interceptors.response.use(
    (response) => response,  // Directly return successful responses.
    async (error) => {
      const requestOriginal = error.config;
      if (error.response?.status === 401 && !requestOriginal._retry) {
        requestOriginal._retry = true;  // Mark the request as retried to avoid infinite loops.
        try {
          // Make a request to backend Django server to refresh the access token.
          let responseNewAccessToken: AxiosResponse = await axiosJSON.post(newAccessTokenUrl, JSON.stringify({"refresh": stAuth.refreshtoken}));
          // console.log("responseNewAccessToken:", responseNewAccessToken.data);
          return axiosJSONAuth(requestOriginal);  // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle token refresh error by clearing stored tokens and redirecting to the login page.
          Cookies.remove("dev");
          setStAuth(constAuthDict);
          navigate("/signin");
          return Promise.reject(refreshError);
        };
      } else {
        return Promise.reject(error);  // For all other errors, return the error as is.
      };
    }
  );

  return axiosJSONAuth;
};


export const useAxiosMPAuth = (): AxiosInstance => {

  const {stAuth, setStAuth} = useContext(ContextAuth);
  const navigate = useNavigate();

  const axiosMPAuth: AxiosInstance = axios.create({
    baseURL: backendServer,
    timeout: 15000,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  axiosMPAuth.interceptors.response.use(
    (response) => response,  // Directly return successful responses.
    async (error) => {
      const requestOriginal = error.config;
      if (error.response?.status === 401 && !requestOriginal._retry) {
        requestOriginal._retry = true;  // Mark the request as retried to avoid infinite loops.
        try {
          // Make a request to backend Django server to refresh the access token.
          let responseNewAccessToken: AxiosResponse = await axiosJSON.post(newAccessTokenUrl, JSON.stringify({"refresh": stAuth.refreshtoken}));
          // console.log("responseNewAccessToken:", responseNewAccessToken.data);
          return axiosMPAuth(requestOriginal);  // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle token refresh error by clearing stored tokens and redirecting to the login page.
          Cookies.remove("dev");
          setStAuth(constAuthDict);
          navigate("/signin");
          return Promise.reject(refreshError);
        };
      } else {
        return Promise.reject(error);  // For all other errors, return the error as is.
      };
    }
  );

  return axiosMPAuth;
};


//--------------------------------------------------------------------------------
// Style
//--------------------------------------------------------------------------------

export const widthLayoutChange: number = 768;  // md	= 48rem = 768px


//--------------------------------------------------------------------------------
// Function today
//--------------------------------------------------------------------------------

export function today(): string {
  return (new Date).toISOString().split('T')[0];
};


//--------------------------------------------------------------------------------
// Function dateFormat
//--------------------------------------------------------------------------------

export type tyPropsDateFormat = {
  dateObj: Date,    // Date object
  format?: string   // "YYYY-MM-DD"(default)/...
};

export function dateFormat(props: tyPropsDateFormat): string {
  let result = props.dateObj.toISOString().split('T')[0];
  let format = props.format ?? "YYYY-MM-DD";
  if (format === "YYYY-MM-DD") {
    result = props.dateObj.toISOString().split('T')[0];
  } else {
    result = props.dateObj.toISOString().split('T')[0];
  };
  return result;
};


//--------------------------------------------------------------------------------
// Function dateAddYMD
//--------------------------------------------------------------------------------

export type tyPropsDateAddYMD = {
  dateStr: string,  // format "YYYY-MM-DD"
  ymd: string,      // "Y"/"M"/"D"
  toadd: number     // number of years/months/days to add
};

export function dateAddYMD(props: tyPropsDateAddYMD): string {
  let result = props.dateStr;
  let date = new Date(props.dateStr);
  if (props.ymd === "Y") {
    result = new Date(date.setFullYear(date.getFullYear() + props.toadd)).toISOString().split('T')[0];
  } else if (props.ymd === "M") {
    result = new Date(date.setMonth(date.getMonth() + props.toadd)).toISOString().split('T')[0];
  } else if (props.ymd === "D") {
    result = new Date(date.setDate(date.getDate() + props.toadd)).toISOString().split('T')[0];
  };
  return result;
};

