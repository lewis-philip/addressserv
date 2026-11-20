import ButtonIcon from "@/common/component/ButtonIcon";
import { useContext, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import PackageDisplay from "./PackageDisplay";
import PackageEdit from "./PackageEdit";
import GlassFrame from "@/common/component/GlassFrame";
import { ContextAccountControl } from "./declare";


export default function Package() {

  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  useEffect(() => {
    setStAccountControl({...stAccountControl, errMsg: "", package: {...stAccountControl.package, goto: ""}});
  }, []);


  return (
    <GlassFrame>
      <div className="accountcategorybase">
        <div className="accountcategoryswitch">
          <div></div>
          <h5 className="font-bold">Package</h5>
          {Boolean(stAccountControl.package.goto)
            ? <ButtonIcon icon={FaChevronUp} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", package: {...stAccountControl.package, goto: ""}})} />
            : <ButtonIcon icon={FaChevronDown} onClick={() => setStAccountControl({...stAccountControl, errMsg: "", package: {...stAccountControl.package, goto: "display"}})} />
          }
        </div>
        {stAccountControl.package.goto === "display" && <PackageDisplay />}
        {stAccountControl.package.goto === "edit" && <PackageEdit />}
      </div>
    </GlassFrame>
  )
}