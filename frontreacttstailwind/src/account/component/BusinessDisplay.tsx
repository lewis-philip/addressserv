import { useContext, useRef } from "react";
import { ContextAccount, ContextAccountControl, type tyAccountDict } from "./declare";
import TextLabelValue from "@/common/component/TextLabelValue";
import DialogConfirm from "@/common/component/DialogConfirm";
import LineX1 from "@/common/component/LineX1";


export default function BusinessDisplay() {

  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);
  const dialogDeleteRef = useRef<HTMLDialogElement | null>(null);

  const onClickEdit = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, goto: "edit", businessEditDict: {...stAccountEdit.business}}});
  };

  const onClickDelete = (): void => {
    dialogDeleteRef.current?.showModal();
  };

  const onClickYesDelete = (): void => {
    let accountDict: tyAccountDict = {...stAccountEdit};
    delete accountDict.business;
    setStAccountEdit({...accountDict});
    setStAccountControl({...stAccountControl, errMsg: ""});
    dialogDeleteRef.current?.close();
  };


  return (
    <div className="accountcategorybase2">
      {(Boolean(stAccountEdit.business?.name) || stAccountEdit.customer?.customertype === "Business") &&
        <div className="buttonboxx justify-end">
          {Boolean(stAccountEdit.business?.name) &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickDelete()}
            >
              <h6>Delete</h6>
            </button>
          }
          {stAccountEdit.customer?.customertype === "Business" &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickEdit()}
            >
              <h6>Edit</h6>
            </button>
          }
        </div>
      }
      {Boolean(stAccountEdit.business?.name) &&
        <>
          <LineX1 />
          <div className="accountcategorygrid">
            <div className="accountcategory">
              {stAccountEdit.business?.email && <TextLabelValue label="Business Email:" value={stAccountEdit.business.email} />}
              {stAccountEdit.business?.note && <TextLabelValue label="Note:" value={stAccountEdit.business.note} />}
            </div>
            <div className="accountcategory">
              {stAccountEdit.business &&
                <div className="textbase">
                  {stAccountEdit.business?.name && <h5 className="max-md:p-contentmdp md:p-navbarp">Correspondence Forwarding Address:</h5>}
                  {stAccountEdit.business?.name && <h6 className="textvalue max-md:p-contentmdp md:p-navbarp">{stAccountEdit.business.name}</h6>}
                  {stAccountEdit.business?.line1 && <h6 className="textvalue">{stAccountEdit.business.line1}</h6>}
                  {stAccountEdit.business?.line2 && <h6 className="textvalue">{stAccountEdit.business.line2}</h6>}
                  {stAccountEdit.business?.city && <h6 className="textvalue">{stAccountEdit.business.city}</h6>}
                  {stAccountEdit.business?.county && <h6 className="textvalue">{stAccountEdit.business.county}</h6>}
                  {stAccountEdit.business?.country && <h6 className="textvalue">{stAccountEdit.business.country}</h6>}
                  {stAccountEdit.business?.postcode && <h6 className="textvalue">{stAccountEdit.business.postcode}</h6>}
                </div>
              }
            </div>
          </div>
          <DialogConfirm
            ref={dialogDeleteRef}
            message={"Do you want to delete the business " + stAccountEdit.business?.name + "?"}
            onClickYes={() => onClickYesDelete()}
          />
          <LineX1 />
          <div className="buttonboxx justify-end">
            <button
              className="squarebutton w-25"
              onClick={() => onClickDelete()}
            >
              <h6>Delete</h6>
            </button>
            {stAccountEdit.customer?.customertype === "Business" &&
              <button
                className="squarebutton w-25"
                onClick={() => onClickEdit()}
              >
                <h6>Edit</h6>
              </button>
            }
          </div>
        </>
      }
    </div>
  )
}