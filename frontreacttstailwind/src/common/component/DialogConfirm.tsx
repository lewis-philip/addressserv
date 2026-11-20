import type { RefObject } from "react";
import { IoWarningOutline } from "react-icons/io5";


type tyPropsDialogConfirm = {
  ref: RefObject<HTMLDialogElement | null>,
  message: string,
  onClickYes: (() => void) | undefined
};

export default function DialogConfirm(props: tyPropsDialogConfirm) {
  return (
    <dialog ref={props.ref}>
      <div className="modalblack">
        <div className="dialogbase">
          <div className="dialog">
            <IoWarningOutline className="dialogicon text-appicondialog" />
            <h6 className="font-bold text-app">{props.message}</h6>
          </div>
          <div className="buttonbox2x justify-end">
            <button
              className="squarebutton w-25"
              onClick={() => props.ref ? props.ref.current?.close() : null}
            >
              <h6>No</h6>
            </button>
            <button
              className="squarebutton w-25"
              onClick={() => props.onClickYes ? props.onClickYes() : null}
            >
              <h6>Yes</h6>
            </button>
          </div>
        </div>
      </div>
    </dialog>
  )
};

