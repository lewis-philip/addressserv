import { type tyServiceDict } from "./declare";


type tyPropsServiceCard = {
  serviceDict: tyServiceDict,
  showIcon: boolean,
  showName: boolean,
  showNote: boolean,
  flexHeight: boolean
};

export default function ServiceCard(props: tyPropsServiceCard) {
  return (
    <div className={`servicecard ${props.flexHeight ? "" : "aspect-servicecardar"}`}>
      <div>
        {props.showIcon && props.serviceDict.icon && <props.serviceDict.icon className="servicecardicon" />}
      </div>
      <div>
        {props.showName && props.serviceDict.name && <h4 className="font-bold text-center">{props.serviceDict.name}</h4>}
      </div>
      <div>
        {props.showNote && props.serviceDict.note && <p className="text-justify">{props.serviceDict.note}</p>}
      </div>
    </div>
  )
}

  
