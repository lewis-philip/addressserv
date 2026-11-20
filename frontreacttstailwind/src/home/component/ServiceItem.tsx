import { type tyServiceDict } from "./declare";


type tyPropsServiceItem = {
  serviceDict: tyServiceDict,
  showIcon: boolean,
  showName: boolean
};

export default function ServiceItem(props: tyPropsServiceItem) {
  return (
    <div className="serviceitem">
      <div className="w-17">
        {props.showIcon && props.serviceDict.icon && <props.serviceDict.icon className="serviceitemicon" />}
      </div>
      <div className="w-full">
        {props.showName && props.serviceDict.name && <h6 className="font-bold text-left">{props.serviceDict.name}</h6>}
      </div>
    </div>
  )
}

  
