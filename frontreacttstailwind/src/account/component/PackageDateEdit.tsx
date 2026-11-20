import { useContext, useEffect } from 'react'
import { constPackageDateControlDict, ContextAccount, ContextPackageDateControl, packageExists, type tyPackageDict } from './declare';
import InputDate from '@/common/component/InputDate';
import { dateAddYMD, dateFormat, maxDatePackageInMonths, today } from '@/common/declare';


export default function PackageDateEdit() {

  const {stAccountEdit, setStAccountEdit} = useContext(ContextAccount);
  const {stPackageDateControl, setStPackageDateControl} = useContext(ContextPackageDateControl);

  const onChangeDate = (event: React.ChangeEvent<HTMLInputElement, Element>, duration: number): void => {
    event.preventDefault();
    setStPackageDateControl({...stPackageDateControl,
      packageDateDict: {...stPackageDateControl.packageDateDict,
        fromdate: dateFormat({dateObj: new Date(event.target.value)}),
        todate: dateAddYMD({dateStr: dateFormat({dateObj: new Date(event.target.value)}), ymd: "M", toadd: duration}),
      }
    });
  };

  const onClickCancel = (): void => {
    setStPackageDateControl({...constPackageDateControlDict, goto: "display"});
  };

  const onClickSave = (): void => {
    let packageArr: tyPackageDict[] = [...stAccountEdit.package ?? []].map((item) =>
      item.id !== stPackageDateControl.packageDateDict.id
      ? item
      : {...item, fromdate: stPackageDateControl.packageDateDict.fromdate, todate: stPackageDateControl.packageDateDict.todate}
    );
    setStAccountEdit({...stAccountEdit, package: [...packageArr]});
    setStPackageDateControl({...constPackageDateControlDict, goto: "display"});
  };

  useEffect(() => {
    setStPackageDateControl({...stPackageDateControl,
      packageValidTF: !packageExists({
        packageArr: stAccountEdit.package ?? [],
        packageDict: stPackageDateControl.packageDateDict
      })
    });
  }, [stPackageDateControl.packageDateDict.todate]);

  useEffect(() => {
    setStPackageDateControl({...stPackageDateControl,
      packageValidTF: !packageExists({
        packageArr: stAccountEdit.package ?? [],
        packageDict: stPackageDateControl.packageDateDict
      })
    });
  }, []);


  return (
    <>
      <div className="packagedateedit">
        <div className="w-11/20">
          <InputDate
            id={"fromdate" + stPackageDateControl.packageDateDict.name}
            name={"fromdate" + stPackageDateControl.packageDateDict.name}
            label="From Date"
            placeholder="DD/MM/YYYY"
            required={true}
            min={today()}
            max={dateAddYMD({dateStr: today(), ymd: "M", toadd: maxDatePackageInMonths})}
            value={stPackageDateControl.packageDateDict.fromdate ?? today()}
            onChange={(event) => onChangeDate(event, stPackageDateControl.packageDateDict.duration ?? 0)}
            error={false}
            errorMsg=""
          />
        </div>
        <div className="pkgcardate">
          <h6 className="font-bold">To Date:</h6>
          <h6 className="font-bold">{stPackageDateControl.packageDateDict.todate}</h6>
        </div>
      </div>
      {!stPackageDateControl.packageValidTF && <p className="text-end text-apperror">{"* Duplicate Package *"}</p>}
      {stPackageDateControl.packageDateDict.status == "New" &&
        <div className="buttonbox2x justify-end">
          <button
            className="squarebutton w-25"
            onClick={() => onClickCancel()}
          >
            <h6>Cancel</h6>
          </button>
          <button
            className="squarebutton w-25"
            disabled={!stPackageDateControl.packageValidTF}
            onClick={() => onClickSave()}
          >
            <h6>Save</h6>
          </button>
        </div>
      }
    </>
  )
}
