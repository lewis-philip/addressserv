import { type RefObject } from "react";
import { FaXmark } from "react-icons/fa6";


export type tyPropsCheckBox = {
  id?: string,
  name?: string,
  label?: string,
  required?: boolean,
  ref?: RefObject<HTMLInputElement | null>,
  checked: boolean,
  onChange: ((event: any) => void) | undefined
};

export default function CheckBox(props: tyPropsCheckBox) {

  return (
    <div className="checkboxbase">
      <input
        type="checkbox"
        id={props.id ? props.id : "checkbox#"}
        name={props.name ? props.name : ""}
        ref={props.ref}
        className="checkbox peer"
        checked={props.checked}
        onChange={(event: any) => props.onChange ? props.onChange(event) : null}
      />
      <FaXmark className="checkedicon hidden peer-checked:block" />
      {props.label &&
        <label htmlFor={props.id ? props.id : "checkbox#"}>
          <h6 className="checkboxlabel">{props.required ? props.label + " *" : props.label}</h6>
        </label>
      }
    </div>
  )
};
