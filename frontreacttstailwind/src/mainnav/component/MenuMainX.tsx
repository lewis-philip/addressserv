import type { tyMenuMainDict } from "./declare";
import { constMenuMainArr } from "./declare";
import { HashLink } from "react-router-hash-link";


export default function MenuMainX() {

  return (
    <nav className="max-md:hidden">
      <ul className="menumainx">
        {constMenuMainArr.map((item: tyMenuMainDict, index: number) => (
          <li key={index}>
            <HashLink to={item.linkto}>
              <h6 className="menumainxitem">{item.caption}</h6>
            </HashLink>
          </li>
        ))}
      </ul>
    </nav>
  )
};
