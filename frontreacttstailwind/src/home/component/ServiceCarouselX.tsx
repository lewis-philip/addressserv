import { type tyServiceDict } from "./declare";
import { constServiceArr } from "./declare";
import ServiceCard from "./ServiceCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import ButtonIcon from "@/common/component/ButtonIcon";
import { useScreenSize, type tyScreenSize } from "@/mainnav/component/declare";
import { widthLayoutChange } from "@/common/declare"; 

export type tyPropsServiceCarouselX = {
  stCurrentIndex: number,
  setStCurrentIndex: (value: number) => void,
  prevIndex: () => void,
  nextIndex: () => void 
};

export default function ServiceCarouselX(props: tyPropsServiceCarouselX) {

  const screenSize: tyScreenSize = useScreenSize();

  return (
    <div className="relative servicecarouselx overflow-hidden">
      <div
        className="flex transition ease-out duration-1200"
        style={{ transform: `translateX(-${props.stCurrentIndex * (screenSize.width < widthLayoutChange ? 18 : 27)}rem)` }}
      >
        {constServiceArr.map((item: tyServiceDict, index: number) => (
          <div
            key={index}
            className={`${index === props.stCurrentIndex ? "inset-shadow-lg inset-shadow-app" : ""}`}
          >
            <ServiceCard serviceDict={item} showIcon={true} showName={true} showNote={true} flexHeight={false} />
          </div>
        ))}
      </div>
      <div className="absolute max-md:bottom-2 md:bottom-4 w-full flex justify-center items-center max-md:space-x-1 md:space-x-2 bg-transparent">
        <ButtonIcon icon={FaChevronLeft} onClick={() => props.prevIndex()} />
        <div className="flex space-x-1">
          {constServiceArr.map((_, index: number) => (
            <div
              key={index}
              className={`rounded-full max-md:size-2 md:size-3 cursor-pointer ${index === props.stCurrentIndex ? "bg-app" : "bg-app/20"}`}
              onClick={() => {props.setStCurrentIndex(index)}}
            />
          ))}
        </div>
        <ButtonIcon icon={FaChevronRight} onClick={() => props.nextIndex()} />
      </div>
    </div>
  )
}
