import { useContext } from 'react'
import { ContextAccountControl } from './declare';
import CustomerTypeItem from './CustomerTypeItem';
import { constCustomerTypeArr, type tyCustomerTypeDict } from '@/home/component/declare';


export default function CustomerType() {

  const {stAccountControl} = useContext(ContextAccountControl);

  return (
    <div className="customertypebase">
      <h6 className="customertypelabel">Account Type *</h6>
      <div className={`customertype ${stAccountControl.customer.customertypeValidTF ? "border-app/30" : "border-apperror"}`}>
        {constCustomerTypeArr.map((item: tyCustomerTypeDict, index: number) => (
          <div
            key={index}
            className="w-1/2"
          >
            <CustomerTypeItem customerTypeDict={item} />
          </div>
        ))}
      </div>
      <p className={`text-end ${stAccountControl.customer.customertypeValidTF ? "text-transparent" : "text-apperror"}`}>* Account Type required *</p>
    </div>
  )
}
