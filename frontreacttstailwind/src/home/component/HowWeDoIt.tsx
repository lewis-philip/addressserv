import { constHowWeDoItDict } from "./declare";
import Faq from "./Faq";


export default function HowWeDoIt() {
  return (
    <div className="howwedoit">
      <h5
        className="text-left"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        {constHowWeDoItDict.subject}
      </h5>
      <h3
        className="text-left font-bold"
        data-aos="fade-left"
        data-aos-delay="700"
      >
        {constHowWeDoItDict.title}
      </h3>
      <div
        className="faqbase"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <Faq />
      </div>
    </div>
  )
}