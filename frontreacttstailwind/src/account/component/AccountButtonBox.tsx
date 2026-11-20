import { setAuthDataUrl, setAccountDataUrl, useAxiosJSONAuth } from "@/common/declare";
import { useContext } from "react";
import type { AxiosResponse } from "axios";
import { ContextAuth } from "@/auth/component/declare";
import { ContextAccount, ContextAccountControl, type tyAccountDict, type tyPackageDict, type tyPersonDict } from "./declare";


export default function AccountButtonBox() {

  const {stAuth, setStAuth, stAuthEdit, setStAuthEdit} = useContext(ContextAuth);
  const axiosJSONAuth = useAxiosJSONAuth();
  const {stAccount, setStAccount, stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl, validAccount} = useContext(ContextAccountControl);

  const setAccountData = async(): Promise<void> => {
    if (!validAccount()) {return};
    let response: AxiosResponse;
    if (JSON.stringify(stAuth.userdata) != JSON.stringify(stAuthEdit.userdata)) {
      try {
        response = await axiosJSONAuth.post(setAuthDataUrl, JSON.stringify(stAuthEdit.userdata));
        // console.log("setAccountData response auth data:", response.data);
        if (response.data?.userdata?.id) {
          setStAuth({...stAuth, userdata: response.data?.userdata});
          setStAuthEdit({...stAuthEdit, userdata: response.data?.userdata});
        };
      }
      catch (error: any) {
        if (!error.response) {
          setStAccountControl({...stAccountControl, errMsg: "* No server response *"});
        } else if (error.response?.status === 400) {
          setStAccountControl({...stAccountControl, errMsg: error.response?.data.message});
        } else {
          setStAccountControl({...stAccountControl, errMsg: error.response?.data});
        };
      };
    };
    if (JSON.stringify(stAccount) != JSON.stringify(stAccountEdit)) {
      let accountEdit: tyAccountDict = {...stAccountEdit};
      let personArr: tyPersonDict[] = [...accountEdit.person ?? []];
      if (personArr.length > 0) {
        personArr.forEach((item) => {if((item.id ?? -1) < 0) {item.id = null};});
        accountEdit = {...accountEdit, person: [...personArr]};
      };
      let packageArr: tyPackageDict[] = [...accountEdit.package ?? []];
      if (packageArr.length > 0) {
        packageArr.forEach((item) => {if((item.id ?? -1) < 0) {item.id = null};});
        accountEdit = {...accountEdit, package: [...packageArr]};
      };
      try {
        response = await axiosJSONAuth.post(setAccountDataUrl, JSON.stringify(accountEdit));
        setStAccount(response.data);
        setStAccountEdit(response.data);
      }
      catch (error: any) {
        if (!error.response) {
          setStAccountControl({...stAccountControl, errMsg: "* No server response *"});
        } else if (error.response?.status === 400) {
          setStAccountControl({...stAccountControl, errMsg: error.response?.data.message});
        } else {
          setStAccountControl({...stAccountControl, errMsg: error.response?.data});
        };
      };
    };
  };


  return (
    <div className="buttonboxxerrmsg">
      <div className="buttonboxx">
        <button
          className="squarebutton w-1/2"
          onClick={() => {setStAuthEdit({...stAuthEdit, userdata: stAuth.userdata}); setStAccountEdit(stAccount);}}
        >
          <h6>Restore Original</h6>
        </button>
        <button
          className="squarebutton w-1/2"
          disabled={
            !stAccountControl.customer.nameValidTF ||
            !stAccountControl.customer.customertypeValidTF || !stAccountControl.customer.nameInvValidTF || !stAccountControl.customer.line1ValidTF ||
            !stAccountControl.customer.cityValidTF || !stAccountControl.customer.countryValidTF || !stAccountControl.customer.postcodeValidTF ||
            !stAccountControl.package.packageValidTF ||
            !stAccountControl.business.nameValidTF || !stAccountControl.business.emailValidTF || !stAccountControl.business.line1ValidTF ||
            !stAccountControl.business.cityValidTF || !stAccountControl.business.countryValidTF || !stAccountControl.business.postcodeValidTF ||
            !stAccountControl.person.nameValidTF || !stAccountControl.person.emailValidTF || !stAccountControl.person.line1ValidTF ||
            !stAccountControl.person.cityValidTF || !stAccountControl.person.countryValidTF || !stAccountControl.person.postcodeValidTF ||
            Boolean(stAccountControl.errMsg)
          }
          onClick={() => setAccountData()}
        >
          <h6>Submit Changes</h6>
        </button>
      </div>
      <div>
        {stAccountControl.errMsg && <h6 className="text-end text-apperror">{stAccountControl.errMsg}</h6>}
      </div>
    </div>
  )
}