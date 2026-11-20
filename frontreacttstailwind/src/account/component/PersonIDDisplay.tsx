import { useContext, useRef } from 'react'
import { constPersonIDControlDict, constValidFileDict, ContextAccount, ContextPersonIDControl, type tyPersonDict } from './declare';
import { FaRegAddressCard } from "react-icons/fa";
import { deletePersonIdFileUrl, useAxiosJSONAuth } from '@/common/declare';
import type { AxiosResponse } from 'axios';
import { ContextAuth } from '@/auth/component/declare';
import DialogConfirm from '@/common/component/DialogConfirm';
import DialogFileView from '@/common/component/DialogFileView';


export type tyPropsPersonIDDisplay = {
  personDict: tyPersonDict
};

export default function PersonIDDisplay(props: tyPropsPersonIDDisplay) {

  const {stAuth, stAuthEdit} = useContext(ContextAuth);
  const {stAccount, stAccountEdit, setStAccount, setStAccountEdit} = useContext(ContextAccount);
  const {stPersonIDControl, setStPersonIDControl} = useContext(ContextPersonIDControl);
  const axiosJSONAuth = useAxiosJSONAuth();
  const dialogFileViewRef = useRef<HTMLDialogElement | null>(null);
  const dialogDeleteRef = useRef<HTMLDialogElement | null>(null);

  const onClickEdit = (): void => {
    setStPersonIDControl({
      ...stPersonIDControl,
      goto: "edit",
      typeValidTF: Boolean(props.personDict.type) ? (props.personDict?.type ?? "###").startsWith("image/") : true,
      sizeValidTF: Boolean(props.personDict.size) ? (props.personDict?.size ?? 0) < constValidFileDict.maxKB * 1024 : true,
      saveActiveTF: false,
      errMsg: "",
      personIDEditDict: {
        ...stPersonIDControl.personIDEditDict,
        id: props.personDict?.id ?? null,
        file: null,
        type: props.personDict?.type ?? "",
        size: props.personDict?.size ?? null,
        filename: props.personDict?.filename ?? "",
        ext: props.personDict?.ext ?? ""
       }
    });
  };

  const onClickDelete = async(): Promise<void> => {
    if (props.personDict?.id) {
      try {
        let response: AxiosResponse = await axiosJSONAuth.post(deletePersonIdFileUrl, JSON.stringify({"id": props.personDict.id}));
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
    <div className="personid">
      {props.personDict.filename && props.personDict.ext &&
        <div className="personiditem border-app/30">
          <FaRegAddressCard className="personidicon" />
          <h6 className="font-bold text-app">{props.personDict.filename}.{props.personDict.ext}</h6>
        </div>
      }
      <DialogFileView
        ref={dialogFileViewRef}
        file={props.personDict.file ?? ""}
        type={props.personDict.type ?? ""}
      />
      <DialogConfirm
        ref={dialogDeleteRef}
        message={"Do you want to delete the file " + props.personDict.filename + "." + props.personDict.ext + "?"}
        onClickYes={() => {onClickDelete(); dialogDeleteRef.current?.close()}}
      />
      <div className="buttonbox2x justify-end">
        {props.personDict.filename && props.personDict.ext &&
          <button
            className="squarebutton w-25"
            onClick={() => dialogFileViewRef.current?.showModal()}
          >
            <h6>View</h6>
          </button>
        }
        {JSON.stringify(stAuth.userdata) == JSON.stringify(stAuthEdit.userdata) && JSON.stringify(stAccount) == JSON.stringify(stAccountEdit) &&
         props.personDict.filename && props.personDict.ext &&
          <button
            className="squarebutton w-25"
            disabled={JSON.stringify(stAuth.userdata) != JSON.stringify(stAuthEdit.userdata) || JSON.stringify(stAccount) != JSON.stringify(stAccountEdit)}
            onClick={() => dialogDeleteRef.current?.showModal()}
          >
            <h6>Delete</h6>
          </button>
        }
        {JSON.stringify(stAuth.userdata) == JSON.stringify(stAuthEdit.userdata) && JSON.stringify(stAccount) == JSON.stringify(stAccountEdit) &&
          <button
            className="squarebutton w-25"
            onClick={() => onClickEdit()}
          >
            <h6>Edit</h6>
          </button>
        }
      </div>
    </div>
  )
}
