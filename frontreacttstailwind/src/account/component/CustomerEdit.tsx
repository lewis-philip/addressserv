import { useContext, useEffect } from "react";
import { constCustomerControlDict, ContextAccount, ContextAccountControl, type tyCustomerDict } from "./declare";
import { ContextAuth, nameRegExp } from "@/auth/component/declare";
import InputText from "@/common/component/InputText";
import CustomerType from "./CustomerType";
import CheckBox from "@/common/component/CheckBox";
import { constCustomerTypeArr, type tyCustomerTypeDict } from "@/home/component/declare";
import TextArea from "@/common/component/TextArea";
import LineX1 from "@/common/component/LineX1";


export default function CustomerEdit() {

  const {stAuthEdit, setStAuthEdit} = useContext(ContextAuth);
  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickCancel = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...constCustomerControlDict, goto: "display"}});
  };

  const onClickSave = (): void => {
    let customerDict: tyCustomerDict = {...stAccountControl.customer.customerEditDict};
    customerDict = {...customerDict, custuser: stAuthEdit.userdata.id};
    setStAccountEdit({...stAccountEdit, customer: {...customerDict}});
    setStAuthEdit({...stAuthEdit, userdata: {...stAccountControl.customer.userDataEditDict}});
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, goto: "display"}});
  };

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, nameValidTF: nameRegExp.test(stAccountControl.customer.userDataEditDict.fullname)}});
  }, [stAccountControl.customer.userDataEditDict.fullname]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, customertypeValidTF: constCustomerTypeArr.map((item: tyCustomerTypeDict) => item.name).includes(stAccountControl.customer.customerEditDict.customertype ?? "")}});
  }, [stAccountControl.customer.customerEditDict.customertype]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, nameInvValidTF: Boolean(stAccountControl.customer.customerEditDict.name)}});
  }, [stAccountControl.customer.customerEditDict.name]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, line1ValidTF: Boolean(stAccountControl.customer.customerEditDict.line1)}});
  }, [stAccountControl.customer.customerEditDict.line1]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, cityValidTF: Boolean(stAccountControl.customer.customerEditDict.city)}});
  }, [stAccountControl.customer.customerEditDict.city]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, countryValidTF: Boolean(stAccountControl.customer.customerEditDict.country)}});
  }, [stAccountControl.customer.customerEditDict.country]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, postcodeValidTF: Boolean(stAccountControl.customer.customerEditDict.postcode)}});
  }, [stAccountControl.customer.customerEditDict.postcode]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: ""});
  }, [stAccountControl.customer.customerEditDict.phone, stAccountControl.customer.customerEditDict.vatnumber, stAccountControl.customer.customerEditDict.note, stAccountControl.customer.customerEditDict.line2, stAccountControl.customer.customerEditDict.county]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer,
      nameValidTF: nameRegExp.test(stAccountControl.customer.userDataEditDict.fullname),
      customertypeValidTF: constCustomerTypeArr.map((item: tyCustomerTypeDict) => item.name).includes(stAccountControl.customer.customerEditDict.customertype ?? ""),
      nameInvValidTF: Boolean(stAccountControl.customer.customerEditDict.name),
      line1ValidTF: Boolean(stAccountControl.customer.customerEditDict.line1),
      cityValidTF: Boolean(stAccountControl.customer.customerEditDict.city),
      countryValidTF: Boolean(stAccountControl.customer.customerEditDict.country),
      postcodeValidTF: Boolean(stAccountControl.customer.customerEditDict.postcode)
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
            !stAccountControl.customer.nameValidTF ||
            !stAccountControl.customer.customertypeValidTF || !stAccountControl.customer.nameInvValidTF || !stAccountControl.customer.line1ValidTF ||
            !stAccountControl.customer.cityValidTF || !stAccountControl.customer.countryValidTF || !stAccountControl.customer.postcodeValidTF ||
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
            {stAuthEdit.userdata.groups.includes("admin") &&
              <div className="checkboxbasefixedheight">
                <CheckBox
                  id="accountisactive"
                  name="accountisactive"
                  label="Account is active"
                  required={false}
                  checked={stAccountControl.customer.userDataEditDict.is_active}
                  onChange={() => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, userDataEditDict: {...stAccountControl.customer.userDataEditDict, is_active: !stAccountControl.customer.userDataEditDict.is_active}}})}
                />
              </div>
            }
            <InputText
              type="name"
              id="name"
              name="name"
              label="Name on Account"
              placeholder="your name"
              required={true}
              autoComplete="off"
              value={stAccountControl.customer.userDataEditDict.fullname}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, userDataEditDict: {...stAccountControl.customer.userDataEditDict, fullname: event.target.value}}})}
              error={!stAccountControl.customer.nameValidTF}
              errorMsg="* invalid Name on Account *"
            />
            <CustomerType />
            <InputText
              type="text"
              id="phone"
              name="phone"
              label="Phone"
              placeholder="phone number"
              required={false}
              autoComplete="off"
              value={stAccountControl.customer.customerEditDict.phone ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, phone: event.target.value}}})}
              error={false}
              errorMsg=""
            />
            <InputText
              type="text"
              id="vat"
              name="vat"
              label="VAT Number"
              placeholder="vat number"
              required={false}
              autoComplete="off"
              value={stAccountControl.customer.customerEditDict.vatnumber ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, vatnumber: event.target.value}}})}
              error={false}
              errorMsg=""
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
              value={stAccountControl.customer.customerEditDict.note ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, note: event.target.value}}})}
              error={false}
              errorMsg=""
            />
          </div>
        </div>
        <div className="accountcategory">
          <h5 className="font-bold text-center">Billing Name & Address</h5>
          <div>
            <InputText
              type="text"
              id="nameinv"
              name="nameinv"
              label="Name on Invoice"
              placeholder="name on invoice"
              required={true}
              autoComplete="off"
              value={stAccountControl.customer.customerEditDict.name ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, name: event.target.value}}})}
              error={!stAccountControl.customer.nameInvValidTF}
              errorMsg="* Name on Invoice required *"
            />
            <InputText
              type="text"
              id="line1"
              name="line1"
              label="Address Line1"
              placeholder="address line1"
              required={true}
              autoComplete="off"
              value={stAccountControl.customer.customerEditDict.line1 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, line1: event.target.value}}})}
              error={!stAccountControl.customer.line1ValidTF}
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
              value={stAccountControl.customer.customerEditDict.line2 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, line2: event.target.value}}})}
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
              value={stAccountControl.customer.customerEditDict.city ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, city: event.target.value}}})}
              error={!stAccountControl.customer.cityValidTF}
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
              value={stAccountControl.customer.customerEditDict.county ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, county: event.target.value}}})}
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
              value={stAccountControl.customer.customerEditDict.country ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, country: event.target.value}}})}
              error={!stAccountControl.customer.countryValidTF}
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
              value={stAccountControl.customer.customerEditDict.postcode ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, postcode: event.target.value}}})}
              error={!stAccountControl.customer.postcodeValidTF}
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
            !stAccountControl.customer.nameValidTF ||
            !stAccountControl.customer.customertypeValidTF || !stAccountControl.customer.nameInvValidTF || !stAccountControl.customer.line1ValidTF ||
            !stAccountControl.customer.cityValidTF || !stAccountControl.customer.countryValidTF || !stAccountControl.customer.postcodeValidTF ||
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