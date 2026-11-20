import { constFlexibilityDict } from "./declare";
import FlexibilityPrice from "./FlexibilityPrice";


export default function Flexibility() {
  return (
    <div className="flexibility">
      <h5
        className="text-right"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        {constFlexibilityDict.subject}
      </h5>
      <h3
        className="text-right font-bold"
        data-aos="fade-right"
        data-aos-delay="700"
      >
        {constFlexibilityDict.title}
      </h3>
      <div
        className="flexibilitypricebase"
        data-aos="zoom-in-up"
        data-aos-delay="700"
      >
        <FlexibilityPrice />
      </div>
    </div>
  )
}