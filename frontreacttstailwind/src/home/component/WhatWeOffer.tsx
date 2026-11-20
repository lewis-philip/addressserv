import { constWhatWeOfferDict } from "./declare";
import Service from "./Service";


export default function WhatWeOffer() {
  return (
    <div className="whatweoffer">
      <h5
        className="text-right"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        {constWhatWeOfferDict.subject}
      </h5>
      <h3
        className="text-right font-bold"
        data-aos="fade-left"
        data-aos-delay="700"
      >
        {constWhatWeOfferDict.title}
      </h3>
      <div
        className="servicebase"
        data-aos="zoom-in"
        data-aos-delay="700"
      >
        <Service />
      </div>
    </div>
  )
}