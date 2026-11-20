import { CgCloseO } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";


type tyPropsPackageItem = {
  serviceName: string,
  value: boolean
};

export default function PackageItem(props: tyPropsPackageItem) {
  return (
    <div className={`packageitem ${props.value === true ? "bg-app/20 dark:bg-app/10" : "bg-app/10 dark:bg-appdark/20"}`}>
      {props.serviceName && props.value
        ? <FaRegCheckCircle className="packageitemicon text-blue-400" />
        : <CgCloseO className="packageitemicon text-red-400" />
      }
      {props.serviceName && <p className="text-left w-full">{props.serviceName}</p>}
    </div>
  )
}

  
