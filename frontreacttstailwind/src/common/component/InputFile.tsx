import { type RefObject } from "react";


export type tyPropsInputFile = {
  id?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  autoComplete?: string,
  ref?: RefObject<HTMLInputElement | null>,
  accept?: string,
  multiple?: boolean,
  value: string,
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined,
  error?: boolean,
  errorMsg?: string
};

export default function InputFile(props: tyPropsInputFile) {

  return (
    <div className="inputfilebase">
      {props.label &&
        <label htmlFor={props.id ? props.id : "inputfile#"}>
          <h6 className="inputfilelabel">{props.required ? props.label + " *" : props.label}</h6>
        </label>
      }
      <input
        type="file"
        id={props.id ? props.id : "inputfile#"}
        name={props.name ? props.name : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        autoComplete={props.autoComplete ? props.autoComplete : "off"}
        ref={props.ref}
        accept={props.accept ? props.accept : ""}
        multiple={props.multiple ? props.multiple : false}
        className={`inputfile ${props.error ? "text-apperror outline-apperror" : "text-txtcolor outline-txtcolor hover:outline-appactive focus:outline-appactive"}`}
        value={props.value}
        onChange={(event) => props.onChange ? props.onChange(event) : null}
      />
      <p className={`text-end ${props.error ? "text-apperror" : "text-transparent"}`}>{props.errorMsg ? props.errorMsg : "* wrong data *"}</p>
    </div>
  )
}