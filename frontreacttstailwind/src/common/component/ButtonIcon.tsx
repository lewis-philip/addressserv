import type { IconType } from "react-icons";


type tyPropsButtonIcon = {
  icon: IconType,
  onClick: () => void
};

export default function ButtonIcon(props: tyPropsButtonIcon) {
  return (
    <button
      className="buttonicon"
      onClick={props.onClick}
    >
      {props.icon && <props.icon className="buttoniconicon" />}
    </button>
  )
};