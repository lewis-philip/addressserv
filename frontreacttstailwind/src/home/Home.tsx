import AboutUs from "./component/AboutUs";
import WhatWeOffer from "./component/WhatWeOffer";
import WhatDoYouNeed from "./component/WhatDoYouNeed";
import HowWeDoIt from "./component/HowWeDoIt";
import Flexibility from "./component/Flexibility";
import Footer from "@/mainnav/component/Footer";
import VideoHome from "./component/VideoHome";


export default function Home() {
  return (
    <>
      <VideoHome />
      <div className="home">
        <div id="aboutus">
          <AboutUs />
        </div>
        <div id="whatweoffer">
          <WhatWeOffer />
        </div>
        <div id="whatdoyouneed">
          <WhatDoYouNeed />
        </div>
        <div id="howwedoit">
          <HowWeDoIt />
        </div>
        <div id="flexibility">
          <Flexibility />
        </div>
      </div>
      <Footer />
    </>
  )
};