import { useContext } from "react";
import { constPackageDict, ContextAccount, ContextAccountControl, type tyPackageDict } from "./declare";
import PackageDisplay2 from "./PackageDisplay2";


export default function PackageDisplay() {

  const {stAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickNew = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", package: {...stAccountControl.package, goto: "edit", packageEditDict: {...constPackageDict}}});
  };
  

  return (
    <div className="accountcategorybase">
      {Boolean(stAccountEdit.customer?.customertype) &&
        <div className="buttonboxx justify-end">
          <button
            className="squarebutton w-25"
            onClick={() => onClickNew()}
          >
            <h6>New</h6>
          </button>
        </div>
      }
      {stAccountEdit.package?.map((item: tyPackageDict) => (
        <div key={item.id}>
          <PackageDisplay2 packageDict={item} />
        </div>
      ))}
      {(stAccountEdit.package?.length ?? 0) >= 1 &&
        <div className="buttonboxx justify-end">
          <button
            className="squarebutton w-25"
            onClick={() => onClickNew()}
          >
            <h6>New</h6>
          </button>
        </div>
      }
    </div>
  )
}

