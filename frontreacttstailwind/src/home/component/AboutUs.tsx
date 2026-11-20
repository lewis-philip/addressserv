import { constAboutUsDict } from "./declare";


export default function AboutUs() {
  return (
    <div className="aboutusbase">
      <div></div>
      <div className="aboutus">
        <h5
          className="text-right"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {constAboutUsDict.subject}
        </h5>
        <h3
          className="text-right font-bold"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {constAboutUsDict.title}
        </h3>
        <p
          className="text-right"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          {constAboutUsDict.note}
        </p>
      </div>
    </div>
  )
}