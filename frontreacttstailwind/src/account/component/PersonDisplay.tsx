import { useContext } from "react";
import { constPersonDict, ContextAccount, ContextAccountControl, type tyPersonDict } from "./declare";
import PersonDisplay2 from "./PersonDisplay2";


export default function PersonDisplay() {

  const {stAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickNew = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", person: {...stAccountControl.person, goto: "edit", personEditDict: {...constPersonDict}}});
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
      {stAccountEdit.person?.map((item: tyPersonDict) => (
        <div key={item.id}>
          <PersonDisplay2 personDict={item} />
        </div>
      ))}
      {(stAccountEdit.person?.length ?? 0) >= 1 &&
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

