import { useState } from 'react'
import { constPackageYMArr, type tyPackageYMDict } from "./declare";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ButtonIcon from "@/common/component/ButtonIcon";
import { useScreenSize, type tyScreenSize } from "@/mainnav/component/declare";
import { widthLayoutChange } from "@/common/declare"; 
import PackageCard from './PackageCard';


export default function PackageCarouselX() {

  const screenSize: tyScreenSize = useScreenSize();
  const [stCurrentIndex, setStCurrentIndex] = useState<number>(0);

  const prevIndex = (): void => {
    setStCurrentIndex(prev => (prev - 1 + constPackageYMArr.length) % constPackageYMArr.length);
  };

  const nextIndex = (): void => {
    setStCurrentIndex(prev => (prev + 1) % constPackageYMArr.length);
  };

  return (
    <div className="relative packagecarouselx">
      <div className={`packagecarouselx overflow-hidden ${screenSize.width < widthLayoutChange ? "" : "overflow-x-scroll scrollbar-thin"}`}>
        <div
          className="flex max-md:space-x-packagecarouselxmdsx md:space-x-packagecarouselxsx transition ease-out duration-1200"
          style={{ transform: `translateX(-${stCurrentIndex * (screenSize.width < widthLayoutChange ? 18+0.15 : 27)}rem)` }}
        >
          {constPackageYMArr.map((item: tyPackageYMDict) => (
            <div
              key={item.id}
            >
              <PackageCard packageYMDict={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute packagecarouselxnav">
        <ButtonIcon icon={FaChevronLeft} onClick={() => prevIndex()} />
        <ButtonIcon icon={FaChevronRight} onClick={() => nextIndex()} />
      </div>
    </div>
  )
}
