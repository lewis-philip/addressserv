import { useContext } from 'react'
import { ContextAccountControl } from './declare';
import type { tyCustomerTypeDict } from '@/home/component/declare';


type tyPropsCustomerTypeItem = {
  customerTypeDict: tyCustomerTypeDict
};

export default function CustomerTypeItem(props: tyPropsCustomerTypeItem) {

  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);


  return (
    <div
      className={`
        customertypeitem
        ${stAccountControl.customer.customerEditDict.customertype === props.customerTypeDict.name ? "border-app" : "border-app/30"}
      `}
      onClick={() => setStAccountControl({...stAccountControl, customer: {...stAccountControl.customer, customerEditDict: {...stAccountControl.customer.customerEditDict, customertype: props.customerTypeDict.name}}})}
    >
      <div>
        {props.customerTypeDict.icon && <props.customerTypeDict.icon className="customertypeicon" />}
      </div>
      <div className="customertypey">
        <div>
          {props.customerTypeDict.name && <h6 className="font-bold text-left">{props.customerTypeDict.name}</h6>}
        </div>
        <div>
          {props.customerTypeDict.note && <p className="text-left">{props.customerTypeDict.note}</p>}
        </div>
      </div>
    </div>
  )
}
