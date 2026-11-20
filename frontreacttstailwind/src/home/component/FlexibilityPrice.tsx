import { type tyFlexibilityPriceDict } from "./declare";
import { constFlexibilityPriceArr } from "./declare";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


export default function FlexibilityPrice() {
  return (
    <>
      <div className="flexibilityprice">
        {constFlexibilityPriceArr.map((item: tyFlexibilityPriceDict, index: number) => (
          <div
            key={index}
            className="flex max-md:flex-col w-full"
          >
            <div className="flexibilitypriceitem">
              <div className="w-3/4">
                {item.name && <p className="self-start font-bold">{item.name}</p>}
              </div>
              <div className="w-1/4">
                {item.netprice &&
                  <div className="flex flex-col w-full">
                    <h5 className="self-end text-appprice font-bold">£{(Math.round(item.netprice * 100) / 100).toFixed(2)}</h5>
                    <p className="self-end">+ VAT</p>
                  </div>
                }
              </div>
            </div>
            <div className="flexibilitypricenote">
              {item.note && <p className="text-justify">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
      <FaChevronUp className="max-md:hidden absolute -top-7 self-center size-iconbniconsize text-txtcolor" />
      <FaChevronDown className="max-md:hidden absolute -bottom-7 self-center size-iconbniconsize text-txtcolor" />
    </>
  )
}

  
