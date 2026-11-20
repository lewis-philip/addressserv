import type { RefObject } from "react";
import ButtonIcon from "./ButtonIcon";
import { FaXmark } from "react-icons/fa6";
import { backendServer } from "../declare";


type tyPropsDialogFileView = {
  ref: RefObject<HTMLDialogElement | null>,
  file: string,
  type: string
};

export default function DialogFileView(props: tyPropsDialogFileView) {
  return (
    <dialog ref={props.ref}>
      <div className="modalblack">
        <div className="fileviewbase">
          <div className="absolute max-md:top-2 max-md:right-2 md:-top-10 md:-right-10">
            <ButtonIcon icon={FaXmark} onClick={() => props.ref.current?.close()} />
          </div>
          {(props.type ?? "").startsWith("image/") && <img src={backendServer + props.file} />}
        </div>
      </div>
    </dialog>
  )
};

