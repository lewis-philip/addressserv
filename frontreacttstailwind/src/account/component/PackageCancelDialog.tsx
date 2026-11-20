import { useContext, type RefObject } from "react";
import { IoWarningOutline } from "react-icons/io5";
import InputDate from "../../common/component/InputDate";
import { constPackageDict, ContextAccount, ContextPackageCancelControl, type tyPackageDict } from "./declare";
import { dateFormat, today } from "@/common/declare";


type tyPropsPackageCancelDialog = {
  ref: RefObject<HTMLDialogElement | null>
};

export default function PackageCancelDialog(props: tyPropsPackageCancelDialog) {

  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stPackageCancelControl, setStPackageCancelControl} = useContext(ContextPackageCancelControl);

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement, Element>): void => {
    event.preventDefault();
    setStPackageCancelControl({...stPackageCancelControl, cancelfromdate: dateFormat({dateObj: new Date(event.target.value)})});
  };

  const onClickYes = (): void => {
    let packageDict: tyPackageDict = {...stPackageCancelControl, canceldate: today()};
    let packageArr: tyPackageDict[] = [...stAccountEdit.package ?? []];
    let idx: number = packageArr.findIndex((item) => item.id === packageDict.id);
    setStAccountEdit({...stAccountEdit, package: [...packageArr.slice(0, idx), packageDict, ...packageArr.slice(idx + 1)]});
    setStPackageCancelControl({...constPackageDict});
    props.ref.current?.close();
  };

  const onClickNo = (): void => {
    setStPackageCancelControl({...constPackageDict});
    props.ref.current?.close();
  };

  return (
    <dialog ref={props.ref}>
      <div className="modalblack">
        <div className="dialogbase">
          <div className="dialog">
            <IoWarningOutline className="dialogicon text-appicondialog" />
            <h6 className="font-bold text-app">{"Do you want to cancel the package " + stPackageCancelControl.name + "?"}</h6>
          </div>
          <div className="packagedateedit">
            <div className="w-full">
              <InputDate
                id={"cancelfromdate" + Math.random().toString()}
                name={"cancelfromdate" + Math.random().toString()}
                label="Cancel From Date"
                placeholder="DD/MM/YYYY"
                required={true}
                min={today()}
                max={stPackageCancelControl.todate ?? today()}
                value={stPackageCancelControl.cancelfromdate ?? today()}
                onChange={(event) => onChangeDate(event)}
                error={false}
                errorMsg=""
              />
            </div>
          </div>
          <div className="buttonbox2x justify-end">
            <button
              className="squarebutton w-25"
              onClick={() => onClickNo()}
            >
              <h6>No</h6>
            </button>
            <button
              className="squarebutton w-25"
              onClick={() => onClickYes()}
            >
              <h6>Yes</h6>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
};

