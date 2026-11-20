import { type tyServiceDict } from "./declare";
import { constServiceArr } from "./declare";
import ServiceItem from "./ServiceItem";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";


type tyPropsServiceCarouselY = {
  stCurrentIndex: number,
  setStCurrentIndex: (value: number) => void
};

export default function ServiceCarouselY(props: tyPropsServiceCarouselY) {
  return (
    <div className="relative servicecarousely">
      <div
        className="servicecarousely space-y-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {constServiceArr.map((item: tyServiceDict, index: number) => (
          <div
            key={index}
            className={`cursor-pointer ${index === props.stCurrentIndex ? "inset-shadow-lg inset-shadow-app" : ""}`}
            onClick={() => {props.setStCurrentIndex(index)}}
          >
            <ServiceItem serviceDict={item} showIcon={true} showName={true} />
          </div>
        ))}
      </div>
      <FaChevronUp className="absolute -top-7 self-center size-iconbniconsize text-txtcolor" />
      <FaChevronDown className="absolute -bottom-7 self-center size-iconbniconsize text-txtcolor" />
    </div>
  )
}

  
