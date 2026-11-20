import { useContext, useRef } from "react";
import { ContextAccount, ContextAccountControl, type tyPersonDict } from "./declare";
import TextLabelValue from "@/common/component/TextLabelValue";
import PersonID from "./PersonID";
import DialogConfirm from "@/common/component/DialogConfirm";
import LineX1 from "@/common/component/LineX1";


export type tyPropsPersonDisplay2 = {
  personDict: tyPersonDict
};

export default function PersonDisplay2(props: tyPropsPersonDisplay2) {

  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);
  const dialogDeleteRef = useRef<HTMLDialogElement | null>(null);

  const onClickEdit = (personDict: tyPersonDict): void => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: "edit", personEditDict: {...personDict}}});
  };

  const onClickDelete = (): void => {
    dialogDeleteRef.current?.showModal();
  };

  const onClickYesDelete = (personDict: tyPersonDict): void => {
    let personArr: tyPersonDict[] = [...stAccountEdit.person ?? []];
    personArr = personArr.filter((item) => item.id !== personDict.id);
    setStAccountEdit({...stAccountEdit, person: [...personArr]});
    setStAccountControl({...stAccountControl, errMsg: ""});
    dialogDeleteRef.current?.close();
  };
  

  return (
    <div className="accountcategorybase2">
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickDelete()}
        >
          <h6>Delete</h6>
        </button>
        <button
          className="squarebutton w-25"
          onClick={() => onClickEdit(props.personDict)}
        >
          <h6>Edit</h6>
        </button>
      </div>
      <LineX1 />
      <div className="accountcategorygrid">
        <div className="accountcategory">
          {props.personDict.email && <TextLabelValue label="Person Email:" value={props.personDict.email} />}
          {props.personDict.note && <TextLabelValue label="Note:" value={props.personDict.note} />}
          <PersonID personDict={props.personDict} />
        </div>
        <div className="accountcategory">
          {props.personDict &&
            <div className="textbase">
              {props.personDict.name && <h5 className="max-md:p-contentmdp md:p-navbarp">Correspondence Forwarding Address:</h5>}
              {props.personDict.name && <h6 className="textvalue max-md:p-contentmdp md:p-navbarp">{props.personDict.name}</h6>}
              {props.personDict.line1 && <h6 className="textvalue">{props.personDict.line1}</h6>}
              {props.personDict.line2 && <h6 className="textvalue">{props.personDict.line2}</h6>}
              {props.personDict.city && <h6 className="textvalue">{props.personDict.city}</h6>}
              {props.personDict.county && <h6 className="textvalue">{props.personDict.county}</h6>}
              {props.personDict.country && <h6 className="textvalue">{props.personDict.country}</h6>}
              {props.personDict.postcode && <h6 className="textvalue">{props.personDict.postcode}</h6>}
            </div>
          }
        </div>
      </div>
      <DialogConfirm
        ref={dialogDeleteRef}
        message={"Do you want to delete the person " + props.personDict.name + "?"}
        onClickYes={() => {onClickYesDelete(props.personDict)}}
      />
      <LineX1 />
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickDelete()}
        >
          <h6>Delete</h6>
        </button>
        <button
          className="squarebutton w-25"
          onClick={() => onClickEdit(props.personDict)}
        >
          <h6>Edit</h6>
        </button>
      </div>
    </div>
  )
}

