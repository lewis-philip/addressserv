import { type RefObject } from "react";


export type tyPropsInputDate = {
  id?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  ref?: RefObject<HTMLInputElement | null>,
  min?: string,
  max?: string,
  value: string,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  error?: boolean,
  errorMsg?: string
};

export default function InputDate(props: tyPropsInputDate) {

  return (
    <div className="inputdatebase">
      {props.label &&
        <label htmlFor={props.id ? props.id : "inputdate#"}>
          <h6 className="inputdatelabel">{props.required ? props.label + " *" : props.label}</h6>
        </label>
      }
      <input
        type="date"
        id={props.id ? props.id : "inputdate#"}
        name={props.name ? props.name : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        ref={props.ref}
        min={props.min ? props.min : ""}
        max={props.max ? props.max : ""}
        className={`inputdate ${props.error ? "text-apperror outline-apperror" : "text-txtcolor outline-txtcolor hover:outline-appactive focus:outline-appactive"}`}
        value={props.value}
        onChange={(event) => props.onChange ? props.onChange(event) : null}
      />
      {props.error && props.errorMsg && <p className="text-end text-apperror">{props.errorMsg}</p>}
      {/* <p className={`text-end ${props.error ? "text-apperror" : "text-transparent"}`}>{props.errorMsg ? props.errorMsg : "* wrong data *"}</p> */}
    </div>
  )
}