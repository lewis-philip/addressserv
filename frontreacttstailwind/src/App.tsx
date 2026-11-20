
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthOnly, ContextAuth, constAuthDict, type tyAuthDict, type tyContextAuthValue } from "./auth/component/declare";
import { getAuthDataUrl, useAxiosJSONAuth } from "./common/declare";
import { type AxiosResponse } from "axios";
import Cookies from "js-cookie";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingSpinner from "./common/component/LoadingSpinner";
import MainNav from "./mainnav/MainNav";
import Home from "./home/Home";
import Account from "./account/Account";


export default function App() {

  const [stIsLoading, setStIsLoading] = useState<boolean>(true);
  const axiosJSONAuth = useAxiosJSONAuth();
  const [stAuth, setStAuth] = useState<tyAuthDict>(constAuthDict);
  const [stAuthEdit, setStAuthEdit] = useState<tyAuthDict>(constAuthDict);
  const contextAuthValue: tyContextAuthValue = {stAuth, setStAuth, stAuthEdit, setStAuthEdit};

  const getAuthData = async() => {
    let authId: string | undefined = Cookies.get("dev");
    if (authId) {
      let response: AxiosResponse = await axiosJSONAuth.post(getAuthDataUrl, JSON.stringify({"id": authId}));
      // console.log("responseApp:", response);
      if (response.data?.userdata?.id) {
        setStAuth({...stAuth, userdata: response.data?.userdata});
        setStAuthEdit({...stAuthEdit, userdata: response.data?.userdata});
      };
    };
  };

  useEffect(() => {
    setStIsLoading(true);
    getAuthData();
    setStIsLoading(false);
    AOS.init({ duration: 1200, easing: "ease-in-out" });
  }, []);


  return (
    <>
      {stIsLoading
        ? <div className="loadingspinner">
            <LoadingSpinner />
          </div>
        : <ContextAuth.Provider value={contextAuthValue}>
            <Routes>
              <Route path="/" element={<MainNav />}>
                {/* public routes */}
                <Route path="/" element={<Home />}/>
                {/* authentication protected routes */}
                <Route element={<AuthOnly groupsOnly={["customer"]} />}>
                  <Route path="/account" element={<Account />} />
                </Route>
                {/* everything else  */}
              </Route>
            </Routes>
          </ContextAuth.Provider>
      }
    </>
  )
};


