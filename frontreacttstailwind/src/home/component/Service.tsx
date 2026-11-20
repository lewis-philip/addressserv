import { useState } from 'react'
import { constServiceArr } from "./declare";
import ServiceCarouselX from './ServiceCarouselX';
import ServiceCarouselY from './ServiceCarouselY';


export default function Service() {

  const [stCurrentIndex, setStCurrentIndex] = useState<number>(2);

  const prevIndex = () => {
    setStCurrentIndex(prev => (prev - 1 + constServiceArr.length) % constServiceArr.length);
  };

  const nextIndex = () => {
    setStCurrentIndex(prev => (prev + 1) % constServiceArr.length);
  };
   
  return (
    <>
      <div className="max-md:hidden w-full h-servicelisth">
        <ServiceCarouselY
          stCurrentIndex={stCurrentIndex}
          setStCurrentIndex={setStCurrentIndex}
        />
      </div>
      <div className="servicecarouselx">
        <ServiceCarouselX
          stCurrentIndex={stCurrentIndex}
          setStCurrentIndex={setStCurrentIndex}
          prevIndex={prevIndex}
          nextIndex={nextIndex}
        />
      </div>
    </>
  )
}