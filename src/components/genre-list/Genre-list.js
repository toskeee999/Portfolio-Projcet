import { useSelector } from "react-redux";
import "./Genre-list.css";
import { useSliders } from "../../custom-hooks/useSliders";
import Item from "./item";
import { useEffect, useState } from "react";

function GenreList({ genre, name, type, idName }) {
  const movies = useSelector((state) => state.movies.movies.movieList);
  const shows = useSelector((state) => state.movies.shows.showList);
  const [genreWidth, setGenreWidth] = useState({
    items: 8,
    multiplayer: 0.125,
  });
  let movieGenre = [];

  useEffect(() => {
    const handleResize = () => {
      setGenreWidth(() => {
        let items = 8;
        let multiplayer = 0.125;

        if (window.innerWidth < 1700) {
          items = 6;
          multiplayer = 0.1666;
        }
        if (window.innerWidth < 1400) {
          items = 5;
          multiplayer = 0.2;
        }
        if (window.innerWidth < 1080) {
          items = 4;
          multiplayer = 0.25;
        }
        if (window.innerWidth < 750) {
          items = 3;
          multiplayer = 0.3333;
        }
        return {
          items,
          multiplayer,
        };
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (movies.length > 0 && shows.length > 0) {
    const allItems = [...movies, ...shows];
    if (type === "shows" && genre === name) {
      movieGenre = [...shows].sort((a, b) => {
        return b[idName] - a[idName];
      });
    } else if (genre === name && type === "movies") {
      movieGenre = [...movies].sort((a, b) => {
        return b[idName] - a[idName];
      });
    } else {
      movieGenre = allItems.filter((item) => item.genre_ids.includes(genre));
    }
  }

  const { inerWidth, sliderWidth, setRightCurr, setLeftCurr } = useSliders(
    movieGenre,
    genreWidth.items
  );

  return (
    <div id="control">
      {movieGenre.length > 0 && (
        <div id="genre-list" ref={inerWidth}>
          <div className="arrow-button-left">
            <button className="arrow-button" onClick={setLeftCurr}>
              <i className="fa-solid fa-chevron-left left-arrow left-js"></i>
            </button>
          </div>
          <div className="arrow-button-right">
            <button className="arrow-button" onClick={setRightCurr}>
              <i className="fa-solid fa-chevron-right right-arrow right-js"></i>
            </button>
          </div>
          <h3>
            {name} {type && type}
          </h3>
          <ul
            style={{
              width: `${
                Number(movieGenre.length * genreWidth.multiplayer) * 100
              }%`,
              transform: `translateX(-${sliderWidth}px)`,
            }}
          >
            {movieGenre.map((item) => (
              <li key={item.id}>
                <Item items={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GenreList;
