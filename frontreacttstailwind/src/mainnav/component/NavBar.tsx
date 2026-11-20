import Logo from "./Logo";
import HiUser from "./HiUser";
import MenuMainX from "./MenuMainX";


export default function NavBar() {
  return (
    <div className="navbarbase">
      <div className="navbarborder">
        <div className="navbar">
          <Logo />
          <MenuMainX />
          <HiUser />
        </div>
      </div> 
    </div> 
  )
};
