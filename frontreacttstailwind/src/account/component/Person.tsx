import ButtonIcon from "@/common/component/ButtonIcon";
import { useContext, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import PersonDisplay from "./PersonDisplay";
import PersonEdit from "./PersonEdit";
import GlassFrame from "@/common/component/GlassFrame";
import { ContextAccountControl } from "./declare";


export default function Person() {

  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: ""}});
  }, []);


  return (
    <GlassFrame>
      <div className="accountcategorybase">
        <div className="accountcategoryswitch">
          <div></div>
          <h5 className="font-bold">Person</h5>
          {Boolean(stAccountControl.person.goto)
            ? <ButtonIcon icon={FaChevronUp} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: ""}})} />
            : <ButtonIcon icon={FaChevronDown} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: "display"}})} />
          }
        </div>
        {stAccountControl.person.goto === "display" && <PersonDisplay />}
        {stAccountControl.person.goto === "edit" && <PersonEdit />}
      </div>
    </GlassFrame>
  )
}