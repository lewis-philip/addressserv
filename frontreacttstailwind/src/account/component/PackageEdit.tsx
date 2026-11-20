import { useContext, useEffect } from "react";
import { constPackageControlDict, ContextAccount, ContextAccountControl, packageExists, type tyPackageDict } from "./declare";
import { ContextAuth } from "@/auth/component/declare";
import LineX1 from "@/common/component/LineX1";
import { constPackageYMArr, constServiceArr, type tyPackageYMDict, type tyServiceDict, type tyServiceYNDict } from "@/home/component/declare";
import InputDate from "@/common/component/InputDate";
import { dateAddYMD, dateFormat, maxDatePackageInMonths, today } from "@/common/declare";


export default function PackageEdit() {

  const {stAuthEdit} = useContext(ContextAuth);
  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stAccountControl, setStAccountControl} = useContext(ContextAccountControl);

  const onClickCancel = (): void => {
    setStAccountControl({...stAccountControl, errMsg: "", package: {...constPackageControlDict, goto: "display"}});
  };

  const onClickYM = (packageYMDict: tyPackageYMDict, ym: string): void => {
    setStAccountControl({...stAccountControl,
      errMsg: "",
      package: {...stAccountControl.package,
        packageEditDict: {...stAccountControl.package.packageEditDict,
          puid: packageYMDict.id,
          name: ym === "Y" ? packageYMDict.m12.name : packageYMDict.m1.name,
          duration: ym === "Y" ? packageYMDict.m12.duration : packageYMDict.m1.duration,
          fromdate: today(),
          todate: dateAddYMD({dateStr: today(), ymd: "M", toadd: ym === "Y" ? packageYMDict.m12.duration : packageYMDict.m1.duration}),
          netprice: ym === "Y" ? packageYMDict.m12.netprice : packageYMDict.m1.netprice,
          discount: ym === "Y" ? packageYMDict.m12.discount : packageYMDict.m1.discount,
          vat: packageYMDict.vat,
          status: "New"
        }
      }
    });
  };

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement, Element>, duration: number): void => {
    event.preventDefault();
    setStAccountControl({...stAccountControl,
      package: {...stAccountControl.package,
        packageEditDict: {...stAccountControl.package.packageEditDict,
          fromdate: dateFormat({dateObj: new Date(event.target.value)}),
          todate: dateAddYMD({dateStr: dateFormat({dateObj: new Date(event.target.value)}), ymd: "M", toadd: duration}),
        }
      }
    });
  };

  const onClickSave = (): void => {
    let packageArr: tyPackageDict[] = [...stAccountEdit.package ?? []];
    let packageDict: tyPackageDict = {...stAccountControl.package.packageEditDict};
    let packageId: number | null | undefined = packageDict.id;
    // new
    if (!packageId) {
      let idArr: number[] = packageArr.map((item) => Math.abs(item.id ?? 0));
      if (idArr.length === 0) {
        packageId = -1;
      } else {
        packageId = -(Math.max(...idArr) + 1);
      };
      packageDict = {...packageDict, id: packageId, custuser: stAuthEdit.userdata.id};
    };
    setStAccountEdit({...stAccountEdit, package: [...packageArr, packageDict]});
    setStAccountControl({...stAccountControl, errMsg: "", package: {...stAccountControl.package, goto: "display"}});
  };

  useEffect(() => {
    setStAccountControl({...stAccountControl,
      errMsg: "",
      package: {...stAccountControl.package,
        packageValidTF: !packageExists({
          packageArr: stAccountEdit.package ?? [],
          packageDict: stAccountControl.package.packageEditDict
        })
      }
    });
  }, [stAccountControl.package.packageEditDict.todate, stAccountControl.package.packageEditDict.name]);

  useEffect(() => {
    setStAccountControl({...stAccountControl,
      errMsg: "",
      package: {...stAccountControl.package,
        packageValidTF: !packageExists({
          packageArr: stAccountEdit.package ?? [],
          packageDict: stAccountControl.package.packageEditDict
        })
      }
    });
  }, []);
  

  return (
    <div className="accountcategorybase2">
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickCancel()}
        >
          <h6>Cancel</h6>
        </button>
        <button
          className="squarebutton w-25"
          disabled={!stAccountControl.package.packageValidTF || Boolean(stAccountControl.errMsg)}
          onClick={() => onClickSave()}
        >
          <h6>Save</h6>
        </button>
      </div>
      <LineX1 />
      <div className="pkgcardgrid">
        {constPackageYMArr.filter((item) => item.customertype === stAccountEdit.customer?.customertype).map((item) => (
          <div key={item?.id} className="pkgcardbase">
            <div className={`pkgcardservice ${item.m12.name === stAccountControl.package.packageEditDict.name || item.m1.name === stAccountControl.package.packageEditDict.name ? !stAccountControl.package.packageValidTF ? "border-apperror" : "border-appactive" : "border-app/20"}`}>
              <h5 className="font-bold ">Package Services:</h5>
              {item.service.filter((item) => item.value === true).map((item: tyServiceYNDict) => constServiceArr.find(({id}) => id === item.id)).map((item: tyServiceDict | undefined) => (
                <div key={item?.id} className="pkgcardserviceitem">
                  {item?.icon && <item.icon className="pkgcardserviceitemicon" />}
                  {item?.name && <h6>{item.name}</h6>}
                </div>
              ))}
            </div>
            {item.m12.netprice !== 0
              ? <div className={`pkgcardproduct ${item.m12.name === stAccountControl.package.packageEditDict.name ? !stAccountControl.package.packageValidTF ? "border-apperror" : "border-appactive" : "border-app/20"}`}
                  onClick={() => onClickYM(item, "Y")}
                >                            
                  <h4 className="pkgcardproductname">{item.m12.name}</h4>
                  <div className="flex">
                    <h4 className="font-bold text-appprice">£{Math.trunc(item.m12.netprice * (1 - item.m12.discount))}</h4>
                    <p className="font-bold text-appprice self-start">{(Math.round((item.m12.netprice * (1 - item.m12.discount)) * 100) / 100).toFixed(2).split(".")[1]}</p>
                    <p className="self-end">exVAT /year</p>
                  </div>
                  <div className="flex max-md:space-x-1 md:space-x-2">
                    <h6 className="font-bold text-appprice self-end">£{((item.m12.netprice * (1 - item.m12.discount)) * (1 + item.vat)).toFixed(2)}</h6>
                    <p className="self-end">incVAT /year</p>
                  </div>
                  {item.m12.name === stAccountControl.package.packageEditDict.name &&
                    <div className="packagedateedit">
                      <div className="w-11/20">
                        <InputDate
                          id={"fromdate" + item.m12.name}
                          name={"fromdate" + item.m12.name}
                          label="From Date"
                          placeholder="DD/MM/YYYY"
                          required={true}
                          min={today()}
                          max={dateAddYMD({dateStr: today(), ymd: "M", toadd: maxDatePackageInMonths})}
                          value={stAccountControl.package.packageEditDict.fromdate ?? today()}
                          onChange={(event) => onChangeDate(event, item.m12.duration)}
                          error={false}
                          errorMsg=""
                        />
                      </div>
                      <div className="pkgcardate">
                        <h6 className="font-bold">To Date:</h6>
                        <h6 className="font-bold">{stAccountControl.package.packageEditDict.todate}</h6>
                      </div>
                    </div>
                  }
                  {item.m12.name === stAccountControl.package.packageEditDict.name && !stAccountControl.package.packageValidTF && 
                    <p className="text-apperror">{"* Duplicate Package *"}</p>
                  }
                </div>
              : <div className="pkgcardnoproduct">
                  <h5 className="font-bold text-center">No product</h5>                            
                </div>
            }
            {item.m1.netprice !== 0
              ? <div className={`pkgcardproduct ${item.m1.name === stAccountControl.package.packageEditDict.name ? !stAccountControl.package.packageValidTF ? "border-apperror" : "border-appactive" : "border-app/20"}`}
                  onClick={() => onClickYM(item, "M")}
                >                            
                  <h4 className="pkgcardproductname">{item.m1.name}</h4>
                  <div className="flex">
                    <h4 className="font-bold text-appprice">£{Math.trunc((item.m1.netprice * (1 - item.m1.discount)))}</h4>
                    <p className="font-bold text-appprice self-start">{(Math.round((item.m1.netprice * (1 - item.m1.discount)) * 100) / 100).toFixed(2).split(".")[1]}</p>
                    <p className="self-end">exVAT /month</p>
                  </div>
                  <div className="flex max-md:space-x-1 md:space-x-2">
                    <h6 className="font-bold text-appprice self-end">£{((item.m1.netprice * (1 - item.m1.discount)) * (1 + item.vat)).toFixed(2)}</h6>
                    <p className="self-end">incVAT /month</p>
                  </div>
                  {item.m1.name === stAccountControl.package.packageEditDict.name &&
                    <div className="packagedateedit">
                      <div className="w-11/20">
                        <InputDate
                          id={"fromdate" + item.m1.name}
                          name={"fromdate" + item.m1.name}
                          label="From Date"
                          placeholder="DD/MM/YYYY"
                          required={true}
                          min={today()}
                          max={dateAddYMD({dateStr: today(), ymd: "M", toadd: maxDatePackageInMonths})}
                          value={stAccountControl.package.packageEditDict.fromdate ?? today()}
                          onChange={(event) => onChangeDate(event, item.m1.duration)}
                          error={false}
                          errorMsg=""
                        />
                      </div>
                      <div className="pkgcardate">
                        <h6 className="font-bold">To Date:</h6>
                        <h6 className="font-bold">{stAccountControl.package.packageEditDict.todate}</h6>
                      </div>
                    </div>
                  }
                  {item.m1.name === stAccountControl.package.packageEditDict.name && !stAccountControl.package.packageValidTF && 
                    <p className="text-apperror">{"* Duplicate Package *"}</p>
                  }
                </div>
              : <div className="pkgcardnoproduct">
                  <h5 className="font-bold text-center">No product</h5>                            
                </div>
            }
          </div>
        ))}
      </div>
      <LineX1 />
      <div className="buttonboxx justify-end">
        <button
          className="squarebutton w-25"
          onClick={() => onClickCancel()}
        >
          <h6>Cancel</h6>
        </button>
        <button
          className="squarebutton w-25"
          disabled={!stAccountControl.package.packageValidTF || Boolean(stAccountControl.errMsg)}
          onClick={() => onClickSave()}
        >
          <h6>Save</h6>
        </button>
      </div>
    </div>
  )
}