import { useContext } from 'react'
import { ContextPackageDateControl, type tyPackageDict } from './declare';
import TextLabelValue from '@/common/component/TextLabelValue';


export type tyPropsPackageDateDisplay = {
  packageDict: tyPackageDict
};

export default function PackageDateDisplay(props: tyPropsPackageDateDisplay) {

  const {stPackageDateControl, setStPackageDateControl} = useContext(ContextPackageDateControl);

  const onClickEdit = (): void => {
    setStPackageDateControl({...stPackageDateControl, packageDateDict: {...props.packageDict}, goto: "edit"});
  };


  return (
    <>
      <div className="accountcategoryx">
        {props.packageDict.fromdate && <div className="w-1/2"><TextLabelValue label="Start Date:" value={props.packageDict.fromdate} /></div>}
        {props.packageDict.todate && <div className="w-1/2"><TextLabelValue label="End Date:" value={props.packageDict.todate} /></div>}
      </div>
      {props.packageDict.status == "New" &&
        <div className="buttonbox2x justify-end">
          <button
            className="squarebutton w-25"
            onClick={() => onClickEdit()}
          >
            <h6>Edit</h6>
          </button>
        </div>
      }
    </>
  )
}
