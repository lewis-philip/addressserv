import { HashLink } from "react-router-hash-link";
import type { tyMenuMainDict } from "./declare";
import { constMenuMainArr, ContextMainNavControl } from "./declare";
import ButtonIcon from "@/common/component/ButtonIcon";
import { FaXmark } from "react-icons/fa6";
import { useContext } from "react";


export default function MenuMainY() {

  const {stMainNavControl, setStMainNavControl} = useContext(ContextMainNavControl);

  return (
    <>
      <div className="modal" />
      <div className="menumainybase">
        <div className="flex justify-end">
          <ButtonIcon icon={FaXmark} onClick={() => setStMainNavControl({...stMainNavControl, menuMainYTF: false})} />
        </div>
        <ul className="menumainy">
          {constMenuMainArr.map((item: tyMenuMainDict, index: number) => (
            <li key={index}>
              <HashLink to={item.linkto}>
                <h6
                  className="menumainyitem"
                  onClick={() => setStMainNavControl({...stMainNavControl, menuMainYTF: false})}
                >
                  {item.caption}
                </h6>
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
};
