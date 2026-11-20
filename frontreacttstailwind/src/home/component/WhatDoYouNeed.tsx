import { constWhatDoYouNeedDict } from "./declare";
import PackageCarouselX from "./PackageCarouselX";


export default function WhatDoYouNeed() {
  return (
    <div className="whatdoyouneed">
      <h5
        className="text-right"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        {constWhatDoYouNeedDict.subject}
      </h5>
      <h3
        className="text-right font-bold"
        data-aos="fade-right"
        data-aos-delay="700"
      >
        {constWhatDoYouNeedDict.title}
      </h3>
      <div
        className="packagebase"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <PackageCarouselX />
      </div>
    </div>
  )
}