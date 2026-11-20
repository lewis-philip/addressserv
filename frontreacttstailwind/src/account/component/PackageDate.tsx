import { useEffect, useState } from 'react'
import { constPackageDateControlDict, ContextPackageDateControl, type tyContextPackageDateControlValue, type tyPackageDict, type tyPackageDateControlDict } from './declare';
import PackageDateDisplay from './PackageDateDisplay';
import PackageDateEdit from './PackageDateEdit';


export type tyPropsPackageDate = {
  packageDict: tyPackageDict
};

export default function PackageDate(props: tyPropsPackageDate) {

  const [stPackageDateControl, setStPackageDateControl] = useState<tyPackageDateControlDict>(constPackageDateControlDict);
  const contextPackageDateControlValue: tyContextPackageDateControlValue = {stPackageDateControl, setStPackageDateControl};

  useEffect(() => {
    setStPackageDateControl({...stPackageDateControl, goto: "display"});
  }, []);


  return (
    <ContextPackageDateControl.Provider value={contextPackageDateControlValue}>
      <div className="packagedatebase">
        {stPackageDateControl.goto === "display" && <PackageDateDisplay packageDict={props.packageDict} />}
        {stPackageDateControl.goto === "edit" && <PackageDateEdit />}
      </div>
    </ContextPackageDateControl.Provider>
  )
}
