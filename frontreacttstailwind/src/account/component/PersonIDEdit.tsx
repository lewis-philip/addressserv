import { useContext, useRef } from "react"
import { constPersonIDControlDict, constValidFileDict, ContextAccount, ContextAccountControl, ContextPersonIDControl } from "./declare";
import { setPersonIdFileUrl, useAxiosMPAuth } from "@/common/declare";
import type { AxiosResponse } from "axios";


export default function PersonIDEdit() {

  const {setStAccount, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl} = useContext(ContextAccountControl);
  const {stPersonIDControl, setStPersonIDControl} = useContext(ContextPersonIDControl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const axiosMPAuth = useAxiosMPAuth();

  const onClickCancel = () => {
    setStPersonIDControl(constPersonIDControlDict);
  };

  const onClickSelect = () => {
    fileInputRef.current?.click();
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let file: File = event.target.files[0];
      setStPersonIDControl({
        ...stPersonIDControl,
        goto: "edit",
        typeValidTF: file.type.startsWith("image/"),
        sizeValidTF: file.size < constValidFileDict.maxKB * 1024,
        saveActiveTF: true,
        errMsg: "",
        personIDEditDict: {
          ...stPersonIDControl.personIDEditDict,
          file: file,
          type: file.type,
          size: file.size,
          filename: file.name.split(".").shift() ?? null,
          ext: file.name.split(".").pop() ?? null
        }
      });
    };
  };

  const onClickSave = async() => {
    if (stPersonIDControl.personIDEditDict.file) {
      let fileData: FormData = new FormData();
      fileData.append("id", (stPersonIDControl.personIDEditDict.id ?? 0).toString());
      fileData.append("file", stPersonIDControl.personIDEditDict.file);
      fileData.append("type", stPersonIDControl.personIDEditDict.type ?? "");
      fileData.append("size", (stPersonIDControl.personIDEditDict.size ?? 0).toString());
      fileData.append("filename", stPersonIDControl.personIDEditDict.filename ?? "");
      fileData.append("ext", stPersonIDControl.personIDEditDict.ext ?? "");
      try {
        let response: AxiosResponse = await axiosMPAuth.post(setPersonIdFileUrl, fileData);
        setStAccount(response.data);
        setStAccountEdit(response.data);
        setStPersonIDControl(constPersonIDControlDict);
      }
      catch (error: any) {
        if (!error.response) {
          setStPersonIDControl({...stPersonIDControl, errMsg: "* No server response *"});
        } else if (error.response?.status === 400) {
          setStPersonIDControl({...stPersonIDControl, errMsg: error.response?.data.message});
        } else {
          setStPersonIDControl({...stPersonIDControl, errMsg: error.response?.data});
        };
      };
    };
  };


  return (
    <div className="personid" >
      {stPersonIDControl.personIDEditDict.filename && stPersonIDControl.personIDEditDict.ext &&
        <div className={`personiditem ${stPersonIDControl.sizeValidTF && stPersonIDControl.typeValidTF ? "border-app/30" : "border-apperror"}`}>
          <h6 className={`font-bold ${stPersonIDControl.sizeValidTF && stPersonIDControl.typeValidTF ? "text-app" : "text-apperror"}`}>{stPersonIDControl.personIDEditDict.filename}.{stPersonIDControl.personIDEditDict.ext}</h6>
        </div>
      }
      <input
        type="file"
        accept={constValidFileDict.accept}
        multiple={false}
        ref={fileInputRef}
        className="hidden"
        onChange={(event) => onFileInputChange(event)}
      />
      {!(stPersonIDControl.sizeValidTF && stPersonIDControl.typeValidTF) &&
        <p className="text-apperror">
          Valid file parameters:
          <br/>- Type: any image file type, such as <b>PNG, JPG, JPEG, GIF, TIFF, WebP, SVG, EPS</b>
          <br/>- Size: max <b>50 KB</b>
        </p>
      }
      {stPersonIDControl.errMsg && <h6 className="text-justify text-apperror">{stPersonIDControl.errMsg}</h6>}
      <div className="buttonbox2x justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickCancel()}
        >
          <h6>Cancel</h6>
        </button>
        <button
          className="squarebutton w-25"
          onClick={() => onClickSelect()}
        >
          <h6>Select</h6>
        </button>
        <button
          className="squarebutton w-25"
          disabled={
            !stPersonIDControl.typeValidTF || !stPersonIDControl.sizeValidTF || !stPersonIDControl.saveActiveTF ||
            Boolean(stPersonIDControl.errMsg) || Boolean(stAccountControl.errMsg)
          }
          onClick={() => onClickSave()}
        >
          <h6>Save</h6>
        </button>
      </div>
    </div>
  )
}
