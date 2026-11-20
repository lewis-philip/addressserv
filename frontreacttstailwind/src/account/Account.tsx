import LoadingSpinner from "@/common/component/LoadingSpinner";
import { getAccountDataUrl, useAxiosJSONAuth } from "@/common/declare";
import { useContext, useEffect, useState } from "react";
import type { AxiosResponse } from "axios";
import { ContextAuth } from "@/auth/component/declare";
import ButtonIcon from "@/common/component/ButtonIcon";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { constAccountControlDict, constAccountDict, ContextAccount, ContextAccountControl, sameAddressPerson, validPackage, type tyAccountControlDict, type tyAccountDict, type tyContextAccountControlValue, type tyContextAccountValue } from "./component/declare";
import Customer from "./component/Customer";
import Business from "./component/Business";
import Package from "./component/Package";
import Person from "./component/Person";
import AccountButtonBox from "./component/AccountButtonBox";


export default function Account() {

  const {stAuth, stAuthEdit} = useContext(ContextAuth);
  const [stIsLoading, setStIsLoading] = useState<boolean>(true);
  const axiosJSONAuth = useAxiosJSONAuth();
  const [stAccount, setStAccount] = useState<tyAccountDict>(constAccountDict);
  const [stAccountEdit, setStAccountEdit] = useState<tyAccountDict>(constAccountDict);
  const contextAccountValue: tyContextAccountValue = {stAccount, setStAccount, stAccountEdit, setStAccountEdit};
  const [stAccountControl, setStAccountControl] = useState<tyAccountControlDict>(constAccountControlDict);

  const validAccount = (): boolean => {
    if ((stAccountEdit.package?.length ?? 0) > 0) {
      if (!validPackage({accountDict: stAccountEdit})) {
        setStAccountControl({...stAccountControl, errMsg: "* A Personal account must have Personal packages, and a Business account must have Business packages *"});
        return false;
      };
    };
    if (stAccountEdit.customer?.customertype === "Personal") {
      if (stAccountEdit.business?.name) {
        setStAccountControl({...stAccountControl, errMsg: "* A Personal account cannot have a Business *"});
        return false;
      } else if (!sameAddressPerson({personArr: (stAccountEdit.person ?? [])})) {
        setStAccountControl({...stAccountControl, errMsg: "* On a Personal account all Persons must have the same Correspondence Forwarding Address *"});
        return false;
      };
    };
    return true;
  };

  const contextAccountControlValue: tyContextAccountControlValue = {stAccountControl, setStAccountControl, validAccount};
  const navigate = useNavigate();

  const getAccountData = async(): Promise<void> => {
    if (stAuth?.userdata?.id) {
      let response: AxiosResponse = await axiosJSONAuth.post(getAccountDataUrl, JSON.stringify({"custuserid": stAuth.userdata.id}));
      // console.log("getAccountData:", response.data);
      setStAccount(response.data);
      setStAccountEdit(response.data);
    };
  };

  useEffect(() => {
    setStIsLoading(true);
    getAccountData();
    setStIsLoading(false);
  }, []);


  return (
    <>
      {stIsLoading
        ? <div className="loadingspinner">
            <LoadingSpinner />
          </div>
        : <ContextAccount.Provider value={contextAccountValue}>
            <ContextAccountControl.Provider value={contextAccountControlValue}>
              <div className="accountpage">
                <div className="flex justify-between md:p-navbarp">
                  <h3
                    className="font-bold"
                    data-aos="fade-left"
                    data-aos-delay="500"
                  >
                    Account Settings
                  </h3>
                  <div>
                    <ButtonIcon icon={FaXmark} onClick={() => navigate("/")} />
                  </div>
                </div>
                {(JSON.stringify(stAuth.userdata) != JSON.stringify(stAuthEdit.userdata) || JSON.stringify(stAccount) != JSON.stringify(stAccountEdit)) &&
                  <AccountButtonBox />
                }
                <div
                  data-aos="fade-left"
                  data-aos-delay="700"
                >
                  <Customer />
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-delay="900"
                >
                  <Package />
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-delay="1100"
                >
                  <Business />
                </div>
                <div
                  data-aos="fade-left"
                  data-aos-delay="1300"
                >
                  <Person />
                </div>
                {(JSON.stringify(stAuth.userdata) != JSON.stringify(stAuthEdit.userdata) || JSON.stringify(stAccount) != JSON.stringify(stAccountEdit)) &&
                  <AccountButtonBox />
                }
              </div>
            </ContextAccountControl.Provider>
          </ContextAccount.Provider>
      }
    </>
  )
}