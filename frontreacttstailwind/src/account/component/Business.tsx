import ButtonIcon from "@/common/component/ButtonIcon";
import { useContext, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import BusinessDisplay from "./BusinessDisplay";
import BusinessEdit from "./BusinessEdit";
import GlassFrame from "@/common/component/GlassFrame";
import { ContextAccountControl } from "./declare";


export default function Business() {

  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, goto: ""}});
  }, []);


  return (
    <GlassFrame>
      <div className="accountcategorybase">
        <div className="accountcategoryswitch">
          <div></div>
          <h5 className="font-bold">Business</h5>
          {Boolean(stAccountControl.business.goto)
            ? <ButtonIcon icon={FaChevronUp} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, goto: ""}})} />
            : <ButtonIcon icon={FaChevronDown} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", business: {...stAccountControl.business, goto: "display"}})} />
          }
        </div>
        {stAccountControl.business.goto === "display" && <BusinessDisplay />}
        {stAccountControl.business.goto === "edit" && <BusinessEdit />}
      </div>
    </GlassFrame>
  )
}