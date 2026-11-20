import { useContext, useRef, useState } from "react";
import { constPackageDict, ContextAccount, ContextAccountControl, ContextPackageCancelControl, type tyContextPackageCancelControlValue, type tyPackageDict, type tyPersonDict } from "./declare";
import TextLabelValue from "@/common/component/TextLabelValue";
import DialogConfirm from "@/common/component/DialogConfirm";
import LineX1 from "@/common/component/LineX1";
import { constPackageYMArr, constServiceArr, type tyServiceDict, type tyServiceYNDict } from "@/home/component/declare";
import PackageDate from "./PackageDate";
import PackageCancelDialog from "./PackageCancelDialog";


export type tyPropsPackageDisplay2 = {
  packageDict: tyPackageDict
};

export default function PackageDisplay2(props: tyPropsPackageDisplay2) {

  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);
  const [stPackageCancelControl, setStPackageCancelControl] = useState<tyPackageDict>(constPackageDict);
  const contextPackageCancelControlValue: tyContextPackageCancelControlValue = {stPackageCancelControl, setStPackageCancelControl};
  const dialogDeleteRef = useRef<HTMLDialogElement | null>(null);
  const dialogCancelRef = useRef<HTMLDialogElement | null>(null);

  const onClickCancel = (packageDict: tyPackageDict): void => {
    setStPackageCancelControl({...packageDict});
    dialogCancelRef.current?.showModal();
  };

  const onClickDelete = (): void => {
    dialogDeleteRef.current?.showModal();
  };

  const onClickYesDelete = (packageDict: tyPackageDict): void => {
    let packageArr: tyPersonDict[] = [...stAccountEdit.package ?? []];
    packageArr = packageArr.filter((item) => item.id !== packageDict.id);
    setStAccountEdit({...stAccountEdit, package: [...packageArr]});
    setStAccountControl({...stAccountControl, errMsg: ""});
    dialogDeleteRef.current?.close();
  };


  return (
    <ContextPackageCancelControl.Provider value={contextPackageCancelControlValue}>
      <div className="accountcategorybase2">
        <div className="buttonboxx justify-end">
          {["Approved", "Active"].includes(props.packageDict.status ?? "") &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickCancel(props.packageDict)}
            >
              <h6>Cancel</h6>
            </button>
          }
          {props.packageDict.status == "New" &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickDelete()}
            >
              <h6>Delete</h6>
            </button>
          }
        </div>
        <LineX1 />
        <div className="accountcategorygrid">
          <div className="accountcategory">
            <div className="accountcategoryx">
              {props.packageDict.puid && <div className="w-1/2"><TextLabelValue label="Package Unique ID:" value={props.packageDict.puid.toString()} /></div>}
              {props.packageDict.name && <div className="w-1/2"><TextLabelValue label="Package Name:" value={props.packageDict.name} /></div>}
            </div>
            <PackageDate packageDict={props.packageDict} />
            <div className="accountcategoryx">
              <div className="w-1/3"><TextLabelValue label="Net Price:" value={"£" + (((props.packageDict.netprice ?? 0) * 100) / 100).toFixed(2)} /></div>
              <div className="w-1/3"><TextLabelValue label="Discount:" value={(((props.packageDict.discount ?? 0) * 100) / 100).toFixed(2).split(".")[1] + "%"} /></div>
              <div className="w-1/3"><TextLabelValue label="Vat:" value={(((props.packageDict.vat ?? 0) * 100) / 100).toFixed(2).split(".")[1] + "%"} /></div>
            </div>
            {props.packageDict.note && <TextLabelValue label="Note:" value={props.packageDict.note} />}
            <div className="accountcategoryx">
              {props.packageDict.canceldate && <div className="w-1/2"><TextLabelValue label="Cancellation Date:" value={props.packageDict.canceldate} /></div>}
              {props.packageDict.cancelfromdate && <div className="w-1/2"><TextLabelValue label="Cancel From Date:" value={props.packageDict.cancelfromdate} /></div>}
            </div>
            <div className="accountcategoryx">
              {props.packageDict.status && <div className="w-1/2"><TextLabelValue label="Status:" value={props.packageDict.status} /></div>}
            </div>
          </div>
          <div className="accountcategory">
            <div className="textbase2">
              <h5 className="max-md:p-contentmdp md:p-navbarp">Package Services:</h5>
              {constPackageYMArr.find((item) => item.id === props.packageDict.puid)?.service.filter((item) => item.value === true).map((item: tyServiceYNDict) => constServiceArr.find(({id}) => id === item.id)).map((item: tyServiceDict | undefined) => (
                <div key={item?.id} className="personiditem">
                  {item?.icon && <item.icon className="personidicon" />}
                  {item?.name && <h6 className="font-bold text-app">{item.name}</h6>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogConfirm
          ref={dialogDeleteRef}
          message={"Do you want to delete the package " + props.packageDict.name + "?"}
          onClickYes={() => onClickYesDelete(props.packageDict)}
        />
        <PackageCancelDialog ref={dialogCancelRef} />
        <LineX1 />
      <div className="buttonboxx justify-end">
          {["Approved", "Active"].includes(props.packageDict.status ?? "") &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickCancel(props.packageDict)}
            >
              <h6>Cancel</h6>
            </button>
          }
          {props.packageDict.status == "New" &&
            <button
              className="squarebutton w-25"
              onClick={() => onClickDelete()}
            >
              <h6>Delete</h6>
            </button>
          }
        </div>
      </div>
    </ContextPackageCancelControl.Provider>
  )
}

