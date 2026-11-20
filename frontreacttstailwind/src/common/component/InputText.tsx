import { useState, type RefObject } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { FiUser } from "react-icons/fi";


export type tyPropsInputText = {
  type: string,  // values: text/name/email/password
  id?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  autoComplete?: string,
  ref?: RefObject<HTMLInputElement | null>,
  value: string,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  onClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined,
  onKeyDown?: ((event: React.KeyboardEvent<HTMLInputElement>) => void) | undefined,
  onPaste?: ((event: React.ClipboardEvent<HTMLInputElement>) => void) | undefined,
  error?: boolean,
  errorMsg?: string
};

export default function InputText(props: tyPropsInputText) {

  const [stPwdVisible, setStPwdVisible] = useState<boolean>(false);

  return (
    <div className="inputtextbase">
      {props.label &&
        <label htmlFor={props.id ? props.id : props.type + "#"}>
          <h6 className="inputtextlabel">{props.required ? props.label + " *" : props.label}</h6>
        </label>
      }
      <div className="inputtextbox">
        {props.type === "name" && <FiUser className="inputtexticon"/>}
        {props.type === "email" && <MdAlternateEmail className="inputtexticon"/>}
        {props.type === "password" && <MdPassword className="inputtexticon"/>}
        <input
          type={["text", "name"].includes(props.type) || (props.type === "password" && stPwdVisible) ? "text" : props.type}
          id={props.id ? props.id : props.type + "#"}
          name={props.name ? props.name : ""}
          placeholder={props.placeholder ? props.placeholder : ""}
          autoComplete={props.autoComplete ? props.autoComplete : "off"}
          ref={props.ref}
          className={`
            inputtext
            ${props.type === "text" ? "max-md:px-inputtextmdpx md:px-inputtextpx" : ""}
            ${["name", "email"].includes(props.type) ? "max-md:pl-inputtextwithiconmdpx md:pl-inputtextwithiconpx max-md:pr-inputtextmdpx md:pr-inputtextpx" : ""}
            ${props.type === "password" ? "max-md:px-inputtextwithiconmdpx md:px-inputtextwithiconpx" : ""}
            ${props.error ? "text-apperror outline-apperror" : "text-txtcolor outline-txtcolor hover:outline-appactive focus:outline-appactive"}
          `}
          value={props.value}
          onChange={(event) => props.onChange ? props.onChange(event) : null}
          onClick={(event) => props.onClick ? props.onClick(event) : null}
          onKeyDownCapture={(event) => props.onKeyDown ? props.onKeyDown(event) : null}
          onPasteCapture={(event) => props.onPaste ? props.onPaste(event) : null}
        />
        {props.type === "password" && stPwdVisible && <BsEyeSlash className="inputtexticonswitch" onClick={() => setStPwdVisible(false)} />}
        {props.type === "password" && !stPwdVisible && <BsEye className="inputtexticonswitch" onClick={() => setStPwdVisible(true)} />}
      </div>
      <p className={`text-end ${props.error ? "text-apperror" : "text-transparent"}`}>{props.errorMsg ? props.errorMsg : "* wrong data *"}</p>
    </div>
  )
}