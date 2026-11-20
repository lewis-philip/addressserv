import { Link } from "react-router-dom";
import type { tyMenuMainDict } from "./declare";
import { constMenuLinkArr } from "./declare";


export default function MenuFooterLinkY() {

  return (
    <nav>
      <ul className="menufooterlinky">
        {constMenuLinkArr.map((item: tyMenuMainDict, index: number) => (
          <li key={index}>
            <Link to={item.linkto}><h6 className="menufooteryitem">{item.caption}</h6></Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};
