import { type tyPackageYMDict, type tyServiceYNDict } from "./declare";
import PackageItem from "./PackageItem";
import { constServiceArr } from "./declare";
import { useContext, useState } from "react";
import ServiceCard from "./ServiceCard";
import { ContextAuth, ContextAuthProcData, constAuthProcDataDict } from "@/auth/component/declare";
import { useNavigate } from "react-router-dom";


type tyPropsPackageCard = {
  packageYMDict: tyPackageYMDict
};

export default function PackageCard(props: tyPropsPackageCard) {

  const [stClickedServiceId, setStClickedServiceId] = useState<number>(0);
  const [stShowServiceCard, setStShowServiceCard] = useState<boolean>(false);
  const {stAuth} = useContext(ContextAuth);
  const {setStAuthProcData} = useContext(ContextAuthProcData);
  const navigate = useNavigate();

  const onClickPkgItem = (id: number) => {
    setStClickedServiceId(id);
    setStShowServiceCard(true);
  };

  const onClickServiceCard = () => {
    setStClickedServiceId(0);
    setStShowServiceCard(false);
  };

  const onClickBuy = () => {
    if (!stAuth.userdata.email) {
      setStAuthProcData({...constAuthProcDataDict, process: "signin", goto: "detail"});
    } else {
      if (stAuth.userdata.groups.includes("customer")) {
        navigate("/account", {preventScrollReset: true});
      };
    };
  };


  return (
    <div className="packagecard">
      {props.packageYMDict.name &&
        <h3 className="packagename">
          {props.packageYMDict.name}
        </h3>
      }
      {props.packageYMDict.service.map((item: tyServiceYNDict, index: number) => (
        <div
          key={index}
          className="cursor-pointer"
        >
          {item.id === stClickedServiceId && stShowServiceCard
            ? <div onClick={() => {onClickServiceCard()}}>
                <ServiceCard
                  serviceDict={constServiceArr.find(({id}) => id === item.id) ?? constServiceArr[0]}
                  showIcon={true}
                  showName={true}
                  showNote={true}
                  flexHeight={true}
                />
              </div>
            : <div onClick={() => {onClickPkgItem(item.id)}}>
                <PackageItem
                  serviceName={constServiceArr.find(({id}) => id === item.id)?.name ?? constServiceArr[0].name}
                  value={item.value}
                />
              </div>
          }
        </div>
      ))}
      {props.packageYMDict.m12.netprice !== 0 &&
        <div className="flex flex-col w-full justify-center items-center max-md:space-y-1 md:space-y-2 max-md:p-2 md:p-5 bg-app/10 dark:bg-appdark/20">
          <div className="flex">
            <h2 className="font-bold text-appprice">£{Math.trunc(props.packageYMDict.m12.netprice * (1 - props.packageYMDict.m12.discount))}</h2>
            <p className="font-bold text-appprice self-start">{(Math.round((props.packageYMDict.m12.netprice * (1 - props.packageYMDict.m12.discount)) * 100) / 100).toFixed(2).split(".")[1]}</p>
            <p className="self-end">exVAT /year</p>
          </div>
          <div className="flex max-md:space-x-1 md:space-x-2">
            <p className="font-bold text-appprice self-start">£{((props.packageYMDict.m12.netprice * (1 - props.packageYMDict.m12.discount)) * (1 + props.packageYMDict.vat)).toFixed(2)}</p>
            <p className="self-start">incVAT /year</p>
          </div>
          {props.packageYMDict.m12.discount !== 0 &&
            <div className="flex">
              <p className="font-bold self-start">Save {(Math.round(props.packageYMDict.m12.discount * 100) / 100).toFixed(2).split(".")[1]}% /year</p>
            </div>
          }
          <button
            className="squarebutton w-6/10"
            onClick={() => onClickBuy()}
          >
            <p>Buy 12 months package</p>
          </button>
        </div>
      }
      {props.packageYMDict.m1.netprice !== 0 &&
        <div className="flex flex-col w-full justify-center items-center max-md:space-y-1 md:space-y-2 max-md:p-2 md:p-5 bg-app/10 dark:bg-appdark/20">
          <div className="flex">
            <h2 className="font-bold text-appprice">£{Math.trunc((props.packageYMDict.m1.netprice * (1 - props.packageYMDict.m1.discount)))}</h2>
            <p className="font-bold text-appprice self-start">{(Math.round((props.packageYMDict.m1.netprice * (1 - props.packageYMDict.m1.discount)) * 100) / 100).toFixed(2).split(".")[1]}</p>
            <p className="self-end">exVAT /month</p>
          </div>
          <div className="flex max-md:space-x-1 md:space-x-2">
            <p className="font-bold text-appprice self-start">£{((props.packageYMDict.m1.netprice * (1 - props.packageYMDict.m1.discount)) * (1 + props.packageYMDict.vat)).toFixed(2)}</p>
            <p className="self-start">incVAT /month</p>
          </div>
          {props.packageYMDict.m1.discount !== 0 &&
            <div className="flex">
              <p className="font-bold self-start">Save {(Math.round(props.packageYMDict.m1.discount * 100) / 100).toFixed(2).split(".")[1]}% /month</p>
            </div>
          }
          <button
            className="squarebutton w-6/10"
            onClick={() => onClickBuy()}
          >
            <p>Buy monthly package</p>
          </button>
        </div>
      }
    </div>
  )
}

  
