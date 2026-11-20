import { type RefObject } from "react";


export type tyPropsTextArea = {
  id?: string,
  name?: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  autoComplete?: string,
  ref?: RefObject<HTMLTextAreaElement | null>
  cols?: number,
  rows?: number,
  maxLength?: number,
  minLength?: number,
  wrap?: string,  // "hard", "soft", or "off"
  value: string,
  onChange: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void) | undefined,
  onClick?: ((event: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => void) | undefined,
  onKeyDown?: ((event: React.KeyboardEvent<HTMLTextAreaElement>) => void) | undefined,
  onPaste?: ((event: React.ClipboardEvent<HTMLTextAreaElement>) => void) | undefined,
  error?: boolean,
  errorMsg?: string
};

export default function TextArea(props: tyPropsTextArea) {

  return (
    <div className="textareabase">
      {props.label &&
        <label htmlFor={props.id ? props.id : "textarea#"}>
          <h6 className="textarealabel">{props.required ? props.label + " *" : props.label}</h6>
        </label>
      }
      <textarea
        id={props.id ? props.id : "textarea#"}
        name={props.name ? props.name : ""}
        placeholder={props.placeholder ? props.placeholder : ""}
        autoComplete={props.autoComplete ? props.autoComplete : "off"}
        ref={props.ref}
        cols={props.cols ? props.cols : 20}
        rows={props.rows ? props.rows : 2}
        maxLength={props.maxLength ? props.maxLength : 2000}
        minLength={props.minLength ? props.minLength : 0}
        wrap={props.wrap ? props.wrap : "off"}
        className={`textarea ${props.error ? "text-apperror outline-apperror" : "text-txtcolor outline-txtcolor hover:outline-appactive focus:outline-appactive"}`}
        value={props.value}
        onChange={(event) => props.onChange ? props.onChange(event) : null}
        onClick={(event) => props.onClick ? props.onClick(event) : null}
        onKeyDownCapture={(event) => props.onKeyDown ? props.onKeyDown(event) : null}
        onPasteCapture={(event) => props.onPaste ? props.onPaste(event) : null}
      />
      <p className={`text-end ${props.error ? "text-apperror" : "text-transparent"}`}>{props.errorMsg ? props.errorMsg : "* wrong data *"}</p>
    </div>
  )
}