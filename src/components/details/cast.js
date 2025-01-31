import { useEffect, useState } from "react";
import { useSliders } from "../../custom-hooks/useSliders";
import picture from "../../util/no-pictures.png";

function Cast({ cast }) {
  const [slideNumber, setSlideNumber] = useState(10);

  useEffect(() => {
    function handleResize() {
      let number = 10;
      if (window.innerWidth < 1000) {
        number = 8;
      }
      if (window.innerWidth < 750) {
        number = 6;
      }
      if (window.innerWidth < 550) {
        number = 4;
      }
      setSlideNumber(number);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { inerWidth, sliderWidth, setRightCurr, setLeftCurr } = useSliders(
    cast,
    slideNumber
  );

  return (
    <div id="bottom-cast" ref={inerWidth}>
      {cast.length > 10 && (
        <div className="arrow-cast-left">
          <button className="arrow-button" onClick={setLeftCurr}>
            <i className="fa-solid fa-chevron-left left-arrow left-js"></i>
          </button>
        </div>
      )}
      {cast.length > 10 && (
        <div className="arrow-cast-right">
          <button className="arrow-button" onClick={setRightCurr}>
            <i className="fa-solid fa-chevron-right right-arrow right-js"></i>
          </button>
        </div>
      )}
      <p>
        <span className="bold">Cast:</span>
      </p>
      <ul
        style={{
          width: `${(cast.length / slideNumber) * 100}%`,
          transform: `translateX(-${sliderWidth}px)`,
        }}
      >
        {cast.map((member) => (
          <li key={member.id}>
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                  : picture
              }
              alt=""
            />
            <div className="cast-name">
              <p style={{ margin: 0 }}>
                <span className="bold">{member.name}</span>
              </p>
              <p style={{ margin: 0 }}>{member.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cast;
