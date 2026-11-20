import ButtonIcon from "@/common/component/ButtonIcon";
import { useContext, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import CustomerDisplay from "./CustomerDisplay";
import CustomerEdit from "./CustomerEdit";
import GlassFrame from "@/common/component/GlassFrame";
import { ContextAccountControl } from "./declare";


export default function Customer() {

  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, goto: ""}});
  }, []);


  return (
    <GlassFrame>
      <div className="accountcategorybase">
        <div className="accountcategoryswitch">
          <div></div>
          <h5 className="font-bold">Account</h5>
          {Boolean(stAccountControl.customer.goto)
            ? <ButtonIcon icon={FaChevronUp} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, goto: ""}})} />
            : <ButtonIcon icon={FaChevronDown} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", customer: {...stAccountControl.customer, goto: "display"}})} />
          }
        </div>
        {stAccountControl.customer.goto === "display" && <CustomerDisplay />}
        {stAccountControl.customer.goto === "edit" && <CustomerEdit />}
      </div>
    </GlassFrame>
  )
}