import { useRef, useState } from "react";

export function useSliders(movies, idNumber) {
  const inerWidth = useRef();
  const [curr, setCurr] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  const number = Math.floor(movies.length / idNumber);
  const remainder = movies.length % idNumber;

  const totalSlides = remainder > 0 ? number + 1 : number;

  function setLeftCurr() {
    setCurr((prevCurr) => {
      const newCurr = prevCurr === 0 ? totalSlides - 1 : prevCurr - 1;
      handleSliderWidth(newCurr);
      return newCurr;
    });
  }

  function setRightCurr() {
    setCurr((prevCurr) => {
      const newCurr = (prevCurr + 1) % totalSlides;
      handleSliderWidth(newCurr);
      return newCurr;
    });
  }

  function handleSliderWidth(index) {
    if (index === number) {
      setSliderWidth(
        index * inerWidth.current.offsetWidth -
          (inerWidth.current.offsetWidth -
            (remainder / idNumber) * inerWidth.current.offsetWidth)
      );
    } else {
      setSliderWidth(index * inerWidth.current.offsetWidth);
    }
  }

  return {
    inerWidth,
    sliderWidth,
    setRightCurr,
    setLeftCurr,
  };
}
