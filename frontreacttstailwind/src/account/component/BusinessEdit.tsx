import { useContext, useEffect } from "react";
import { constBusinessControlDict, ContextAccount, ContextAccountControl, type tyBusinessDict } from "./declare";
import { ContextAuth, emailRegExp } from "@/auth/component/declare";
import InputText from "@/common/component/InputText";
import TextArea from "@/common/component/TextArea";
import LineX1 from "@/common/component/LineX1";


export default function BusinessEdit() {

  const {stAuthEdit} = useContext(ContextAuth);
  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickCancel = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...constBusinessControlDict, goto: "display"}});
  };

  const onClickSave = (): void => {
    let businessDict: tyBusinessDict = {...stAccountControl.business.businessEditDict};
    businessDict = {...businessDict, custuser: stAuthEdit.userdata.id};
    setStAccountEdit({...stAccountEdit, business: {...businessDict}});
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, goto: "display"}});
  };

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, emailValidTF: emailRegExp.test(stAccountControl.business.businessEditDict.email ?? "")}});
  }, [stAccountControl.business.businessEditDict.email]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, nameValidTF: Boolean(stAccountControl.business.businessEditDict.name)}});
  }, [stAccountControl.business.businessEditDict.name]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, line1ValidTF: Boolean(stAccountControl.business.businessEditDict.line1)}});
  }, [stAccountControl.business.businessEditDict.line1]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, cityValidTF: Boolean(stAccountControl.business.businessEditDict.city)}});
  }, [stAccountControl.business.businessEditDict.city]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, countryValidTF: Boolean(stAccountControl.business.businessEditDict.country)}});
  }, [stAccountControl.business.businessEditDict.country]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, postcodeValidTF: Boolean(stAccountControl.business.businessEditDict.postcode)}});
  }, [stAccountControl.business.businessEditDict.postcode]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: ""});
  }, [stAccountControl.business.businessEditDict.note, stAccountControl.business.businessEditDict.line2, stAccountControl.business.businessEditDict.county]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business,
      emailValidTF: Boolean(stAccountControl.business.businessEditDict.email),
      nameValidTF: Boolean(stAccountControl.business.businessEditDict.name),
      line1ValidTF: Boolean(stAccountControl.business.businessEditDict.line1),
      cityValidTF: Boolean(stAccountControl.business.businessEditDict.city),
      countryValidTF: Boolean(stAccountControl.business.businessEditDict.country),
      postcodeValidTF: Boolean(stAccountControl.business.businessEditDict.postcode)
    }});
  }, []);
  

  return (
    <div className="accountcategorybase2">
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickCancel()}
        >
          <h6>Cancel</h6>
        </button>
        <button
          className="squarebutton w-25"
          disabled={
            !stAccountControl.business.nameValidTF || !stAccountControl.business.emailValidTF || !stAccountControl.business.line1ValidTF ||
            !stAccountControl.business.cityValidTF || !stAccountControl.business.countryValidTF || !stAccountControl.business.postcodeValidTF ||
            Boolean(stAccountControl.errMsg)
          }
          onClick={() => onClickSave()}
        >
          <h6>Save</h6>
        </button>
      </div>
      <LineX1 />
      <div className="accountcategorygrid">
        <div className="accountcategory">
          <div>
            <InputText
              type="text"
              id="email"
              name="email"
              label="Business Email"
              placeholder="business email"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.email ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, email: event.target.value}}})}
              error={!stAccountControl.business.emailValidTF}
              errorMsg="* Business Email required *"
            />
            <TextArea
              id="note"
              name="note"
              label="Note"
              placeholder="note/description/instruction"
              required={false}
              autoComplete="off"
              rows={5}
              maxLength={400}
              wrap="soft"
              value={stAccountControl.business.businessEditDict.note ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, note: event.target.value}}})}
              error={false}
              errorMsg=""
            />
          </div>
        </div>
        <div className="accountcategory">
          <h5 className="font-bold text-center">Correspondence Forwarding Address</h5>
          <div>
            <InputText
              type="text"
              id="name"
              name="name"
              label="Business Name"
              placeholder="business name"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.name ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, name: event.target.value}}})}
              error={!stAccountControl.business.nameValidTF}
              errorMsg="* Business Name required *"
            />
            <InputText
              type="text"
              id="line1"
              name="line1"
              label="Address Line1"
              placeholder="address line1"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.line1 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, line1: event.target.value}}})}
              error={!stAccountControl.business.line1ValidTF}
              errorMsg="* Address Line1 required *"
            />
            <InputText
              type="text"
              id="line2"
              name="line2"
              label="Address Line2"
              placeholder="address line2"
              required={false}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.line2 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, line2: event.target.value}}})}
              error={false}
              errorMsg=""
            />
            <InputText
              type="text"
              id="city"
              name="city"
              label="City"
              placeholder="city"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.city ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, city: event.target.value}}})}
              error={!stAccountControl.business.cityValidTF}
              errorMsg="* City required *"
            />
            <InputText
              type="text"
              id="county"
              name="county"
              label="County"
              placeholder="county"
              required={false}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.county ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, county: event.target.value}}})}
              error={false}
              errorMsg=""
            />
            <InputText
              type="text"
              id="country"
              name="country"
              label="Country"
              placeholder="country"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.country ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, country: event.target.value}}})}
              error={!stAccountControl.business.countryValidTF}
              errorMsg="* Country required *"
            />
            <InputText
              type="text"
              id="postcode"
              name="postcode"
              label="Postcode"
              placeholder="postcode"
              required={true}
              autoComplete="off"
              value={stAccountControl.business.businessEditDict.postcode ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, business: {...stAccountControl.business, businessEditDict: {...stAccountControl.business.businessEditDict, postcode: event.target.value}}})}
              error={!stAccountControl.business.postcodeValidTF}
              errorMsg="* Postcode required *"
            />
          </div>
        </div>
      </div>
      <LineX1 />
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickCancel()}
        >
          <h6>Cancel</h6>
        </button>
        <button
          className="squarebutton w-25"
          disabled={
            !stAccountControl.business.nameValidTF || !stAccountControl.business.emailValidTF || !stAccountControl.business.line1ValidTF ||
            !stAccountControl.business.cityValidTF || !stAccountControl.business.countryValidTF || !stAccountControl.business.postcodeValidTF ||
            Boolean(stAccountControl.errMsg)
          }
          onClick={() => onClickSave()}
        >
          <h6>Save</h6>
        </button>
      </div>
    </div>
  )
}