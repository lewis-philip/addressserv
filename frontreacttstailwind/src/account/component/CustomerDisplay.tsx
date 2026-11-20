import { useContext } from "react";
import { ContextAccount, ContextAccountControl } from "./declare";
import { ContextAuth } from "@/auth/component/declare";
import TextLabelValue from "@/common/component/TextLabelValue";
import LineX1 from "@/common/component/LineX1";


export default function CustomerDisplay() {

  const {stAuthEdit} = useContext(ContextAuth);
  const {stAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickEdit = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, goto: "edit", userDataEditDict: {...stAuthEdit.userdata}, customerEditDict: {...stAccountEdit.customer}}});
  };


  return (
    <div className="accountcategorybase2">
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickEdit()}
        >
          <h6>Edit</h6>
        </button>
      </div>
      <LineX1 />
      <div className="accountcategorygrid">
        <div className="accountcategory">
          <TextLabelValue label="Account Email:" value={stAuthEdit.userdata.email} />
          <TextLabelValue label="Name on Account:" value={stAuthEdit.userdata.fullname} />
          {stAccountEdit.customer?.customertype && <TextLabelValue label="Account Type:" value={stAccountEdit.customer.customertype} />}
          {stAccountEdit.customer?.phone && <TextLabelValue label="Phone:" value={stAccountEdit.customer.phone} />}
          {stAccountEdit.customer?.vatnumber && <TextLabelValue label="VAT Number:" value={stAccountEdit.customer.vatnumber} />}
          {stAccountEdit.customer?.note && <TextLabelValue label="Note:" value={stAccountEdit.customer.note} />}
        </div>
        <div className="accountcategory">
          {stAccountEdit.customer &&
            <div className="textbase">
              {stAccountEdit.customer?.name && <h5 className="max-md:p-contentmdp md:p-navbarp">Billing Name & Address:</h5>}
              {stAccountEdit.customer?.name && <h6 className="textvalue max-md:p-contentmdp md:p-navbarp">{stAccountEdit.customer.name}</h6>}
              {stAccountEdit.customer?.line1 && <h6 className="textvalue">{stAccountEdit.customer.line1}</h6>}
              {stAccountEdit.customer?.line2 && <h6 className="textvalue">{stAccountEdit.customer.line2}</h6>}
              {stAccountEdit.customer?.city && <h6 className="textvalue">{stAccountEdit.customer.city}</h6>}
              {stAccountEdit.customer?.county && <h6 className="textvalue">{stAccountEdit.customer.county}</h6>}
              {stAccountEdit.customer?.country && <h6 className="textvalue">{stAccountEdit.customer.country}</h6>}
              {stAccountEdit.customer?.postcode && <h6 className="textvalue">{stAccountEdit.customer.postcode}</h6>}
            </div>
          }
        </div>
      </div>
      <LineX1 />
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickEdit()}
        >
          <h6>Edit</h6>
        </button>
      </div>
    </div>
  )
}