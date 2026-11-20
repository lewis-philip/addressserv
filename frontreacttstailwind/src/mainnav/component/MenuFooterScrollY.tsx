import { HashLink } from "react-router-hash-link";
import type { tyMenuMainDict } from "./declare";
import { constMenuMainArr } from "./declare";


export default function MenuFooterScrollY() {

  return (
    <nav>
      <ul className="menufooterscrolly">
        {constMenuMainArr.map((item: tyMenuMainDict, index: number) => (
          <li key={index}>
            <HashLink to={item.linkto}>
              <h6 className="menufooteryitem">{item.caption}</h6>
            </HashLink>
          </li>
        ))}
      </ul>
    </nav>
  )
};
