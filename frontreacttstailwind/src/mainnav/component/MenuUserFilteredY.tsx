import { HashLink } from "react-router-hash-link";
import type { tyMenuItemIconGroupDict, tyMenuItemIconDict } from "./declare";
import { constMenuUserFilteredArr, constMenuUserOtherArr, ContextMainNavControl } from "./declare";
import MenuUserItem from "./MenuUserItem";
import { useContext } from "react";
import { ContextAuth } from "@/auth/component/declare";


export default function MenuUserFilteredY() {

  const {stAuth} = useContext(ContextAuth);
  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);
  
  return (
    <ul className="menuuser">
      {constMenuUserFilteredArr.filter(item1 => (item1.group.some(item2 => stAuth.userdata.groups.includes(item2)))).map((item: tyMenuItemIconGroupDict, index: number) => (
        <li key={index}>
          <HashLink
            to={item.linkto}
            onClick={() => setStMainNavControl({...stMainNavControl, menuUserTF: false})}
          >
            <MenuUserItem caption={item.caption} icon={item.icon} showCaption={true} showIcon={true} />
          </HashLink>
        </li>
      ))}
      {constMenuUserOtherArr.map((item: tyMenuItemIconDict, index: number) => (
        <li key={index}>
          <HashLink
            to={item.linkto}
            onClick={() => setStMainNavControl({...stMainNavControl, menuUserTF: false})}
          >
            <MenuUserItem caption={item.caption} icon={item.icon} showCaption={true} showIcon={true} />
          </HashLink>
        </li>
      ))}
    </ul>
  )
};
