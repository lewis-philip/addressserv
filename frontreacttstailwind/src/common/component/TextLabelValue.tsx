
export type tyPropsTextLabelValue = {
  label?: string,
  value?: string
};

export default function TextLabelValue(props: tyPropsTextLabelValue) {
  return (
    <div className="textbase">
      {props.label && <h6>{props.label}</h6>}
      {props.value && <h6 className="textvalue">{props.value}</h6>}
    </div>
  )
}