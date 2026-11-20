import { useEffect, useState } from 'react'
import { constPersonIDControlDict, ContextPersonIDControl, type tyContextPersonIDControlValue, type tyPersonDict, type tyPersonIDControlDict } from './declare';
import PersonIDDisplay from './PersonIDDisplay';
import PersonIDEdit from './PersonIDEdit';


export type tyPropsPersonID = {
  personDict: tyPersonDict
};

export default function PersonID(props: tyPropsPersonID) {

  const [stPersonIDControl, setStPersonIDControl] = useState<tyPersonIDControlDict>(constPersonIDControlDict);
  const contextPersonIDControlValue: tyContextPersonIDControlValue = {stPersonIDControl, setStPersonIDControl};

  useEffect(() => {
    setStPersonIDControl({...stPersonIDControl, errMsg: "", goto: "display"});
  }, []);


  return (
    <ContextPersonIDControl.Provider value={contextPersonIDControlValue}>
      <div className="personidbase">
        <h6>Person ID:</h6>
        {(props.personDict.id ?? 0) > 0
          ? <>
              {stPersonIDControl.goto === "display" && <PersonIDDisplay personDict={props.personDict} />}
              {stPersonIDControl.goto === "edit" && <PersonIDEdit />}
            </>
          : <p>Please <b>Submit Changes</b> to make <b>Person ID</b> control available.</p>
        }
      </div>
    </ContextPersonIDControl.Provider>
  )
}
