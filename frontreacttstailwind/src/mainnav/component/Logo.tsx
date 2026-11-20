import { useScreenSize, type tyScreenSize } from "./declare";
import { widthLayoutChange } from "@/common/declare";
import logo from "/logo.png";
import MenuMainButton from "./MenuMainButton";


export default function Logo() {

  const screenSize: tyScreenSize = useScreenSize();

  return (
    <div className="logo">
      <img alt="logo" src={logo} className="size-logo"/>
      {screenSize.width < widthLayoutChange && <MenuMainButton />}
    </div>
  )
};