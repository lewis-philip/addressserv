import { useContext, useEffect } from "react";
import { constPersonControlDict, ContextAccount, ContextAccountControl, type tyPersonDict } from "./declare";
import { ContextAuth, emailRegExp } from "@/auth/component/declare";
import InputText from "@/common/component/InputText";
import TextArea from "@/common/component/TextArea";
import LineX1 from "@/common/component/LineX1";


export default function PersonEdit() {

  const {stAuthEdit} = useContext(ContextAuth);
  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickCancel = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...constPersonControlDict, goto: "display"}});
  };

  const onClickSave = (): void => {
    let personArr: tyPersonDict[] = [...stAccountEdit.person ?? []];
    let personDict: tyPersonDict = {...stAccountControl.person.personEditDict};
    let personId: number | null | undefined = personDict.id;
    if (personId) {
      // edit
      let personIdx: number = personArr.findIndex((item) => item.id === personId);
      personArr.splice(personIdx, 1, personDict);
    } else {
      // new
      let idArr: number[] = personArr.map(item => Math.abs(item.id ?? 0));
      if (idArr.length === 0) {
        personId = -1;
      } else {
        personId = -(Math.max(...idArr) + 1);
      };
      personDict = {...personDict, id: personId, custuser: stAuthEdit.userdata.id};
      personArr = [...personArr, personDict]
    };
    setStAccountEdit({...stAccountEdit, person: [...personArr]});
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: "display"}});
  };

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, emailValidTF: emailRegExp.test(stAccountControl.person.personEditDict.email ?? "")}});
  }, [stAccountControl.person.personEditDict.email]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, nameValidTF: Boolean(stAccountControl.person.personEditDict.name)}});
  }, [stAccountControl.person.personEditDict.name]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, line1ValidTF: Boolean(stAccountControl.person.personEditDict.line1)}});
  }, [stAccountControl.person.personEditDict.line1]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, cityValidTF: Boolean(stAccountControl.person.personEditDict.city)}});
  }, [stAccountControl.person.personEditDict.city]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, countryValidTF: Boolean(stAccountControl.person.personEditDict.country)}});
  }, [stAccountControl.person.personEditDict.country]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, postcodeValidTF: Boolean(stAccountControl.person.personEditDict.postcode)}});
  }, [stAccountControl.person.personEditDict.postcode]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: ""});
  }, [stAccountControl.person.personEditDict.note, stAccountControl.person.personEditDict.line2, stAccountControl.person.personEditDict.county]);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person,
      emailValidTF: Boolean(stAccountControl.person.personEditDict.email),
      nameValidTF: Boolean(stAccountControl.person.personEditDict.name),
      line1ValidTF: Boolean(stAccountControl.person.personEditDict.line1),
      cityValidTF: Boolean(stAccountControl.person.personEditDict.city),
      countryValidTF: Boolean(stAccountControl.person.personEditDict.country),
      postcodeValidTF: Boolean(stAccountControl.person.personEditDict.postcode)
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
            !stAccountControl.person.nameValidTF || !stAccountControl.person.emailValidTF || !stAccountControl.person.line1ValidTF ||
            !stAccountControl.person.cityValidTF || !stAccountControl.person.countryValidTF || !stAccountControl.person.postcodeValidTF ||
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
              label="Person Email"
              placeholder="person email"
              required={true}
              autoComplete="off"
              value={stAccountControl.person.personEditDict.email ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, email: event.target.value}}})}
              error={!stAccountControl.person.emailValidTF}
              errorMsg="* Person Email required *"
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
              value={stAccountControl.person.personEditDict.note ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, note: event.target.value}}})}
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
              label="Person Name"
              placeholder="person name"
              required={true}
              autoComplete="off"
              value={stAccountControl.person.personEditDict.name ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, name: event.target.value}}})}
              error={!stAccountControl.person.nameValidTF}
              errorMsg="* Person Name required *"
            />
            <InputText
              type="text"
              id="line1"
              name="line1"
              label="Address Line1"
              placeholder="address line1"
              required={true}
              autoComplete="off"
              value={stAccountControl.person.personEditDict.line1 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, line1: event.target.value}}})}
              error={!stAccountControl.person.line1ValidTF}
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
              value={stAccountControl.person.personEditDict.line2 ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, line2: event.target.value}}})}
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
              value={stAccountControl.person.personEditDict.city ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, city: event.target.value}}})}
              error={!stAccountControl.person.cityValidTF}
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
              value={stAccountControl.person.personEditDict.county ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, county: event.target.value}}})}
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
              value={stAccountControl.person.personEditDict.country ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, country: event.target.value}}})}
              error={!stAccountControl.person.countryValidTF}
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
              value={stAccountControl.person.personEditDict.postcode ?? ""}
              onChange={(event) => setStAccountControl({...stAccountControl, person: {...stAccountControl.person, personEditDict: {...stAccountControl.person.personEditDict, postcode: event.target.value}}})}
              error={!stAccountControl.person.postcodeValidTF}
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
            !stAccountControl.person.nameValidTF || !stAccountControl.person.emailValidTF || !stAccountControl.person.line1ValidTF ||
            !stAccountControl.person.cityValidTF || !stAccountControl.person.countryValidTF || !stAccountControl.person.postcodeValidTF ||
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