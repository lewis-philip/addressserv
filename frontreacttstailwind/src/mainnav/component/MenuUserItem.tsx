import type { IconType } from "react-icons";


type tyPropsMenuUserItem = {
  caption: string,
  icon: IconType,
  showIcon: boolean,
  showCaption: boolean
};

export default function MenuUserItem(props: tyPropsMenuUserItem) {
  return (
    <div className="menuuseritem">
      <div>
        {props.showIcon && props.icon && <props.icon className="menuuseritemicon" />}
      </div>
      <div className="w-full">
        {props.showCaption && props.caption && <h6 className="text-left">{props.caption}</h6>}
      </div>
    </div>
  )
}

  
