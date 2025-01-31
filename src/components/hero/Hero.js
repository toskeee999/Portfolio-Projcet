import { useDispatch, useSelector } from "react-redux";
import "./Hero.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { actionMovies } from "../../store/movies";

function Hero() {
  const movies = useSelector((state) => state.movies.movies.movieList);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userData.userAuth);
  const favorites = useSelector((state) => state.movies.favorites);
  const savedItem = favorites.find((item) => item.id === movies[count].id);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const popularMovies = [...movies].sort((a, b) => {
    return b.popularity - a.popularity;
  });

  function handleLeftArrow() {
    setCount((prevCount) => {
      let number = prevCount;
      number--;
      if (!popularMovies[number].backdrop_path) {
        number--;
      }
      if (number < 0) {
        number = 9;
      }
      return number;
    });
  }
  function handleRightArrow() {
    setCount((prevCount) => {
      let number = prevCount;
      number++;
      if (!popularMovies[number].backdrop_path) {
        number++;
      }
      if (number > 9) {
        number = 0;
      }
      return number;
    });
  }

  return (
    <>
      {movies.length > 0 && (
        <div id="hero">
          <div className="hero-image">
            <img
              src={`http://image.tmdb.org/t/p/original${
                windowWidth <= 650
                  ? popularMovies[count].poster_path
                  : popularMovies[count].backdrop_path
              }`}
              alt={popularMovies[count].title}
            />
          </div>
          <div className="arrow-button-hero">
            <button className="arrow-button" onClick={handleLeftArrow}>
              <i className="fa-solid fa-chevron-left left-arrow left-js"></i>
            </button>
            <button className="arrow-button" onClick={handleRightArrow}>
              <i className="fa-solid fa-chevron-right right-arrow right-js"></i>
            </button>
          </div>
          <div className="hero-text">
            <h1>{popularMovies[count].title}</h1>
            <div className="hero-text-p">
              <p>{popularMovies[count].overview}</p>
            </div>
            <div className="hero-buttons">
              <button
                className="button"
                onClick={() =>
                  userAuth
                    ? dispatch(actionMovies.setFavorites(movies[count]))
                    : alert(
                        "Log in to save your favorite movies and TV shows! Create an account or sign in to keep track of what you love."
                      )
                }
              >
                {savedItem ? "Remove From Favorites" : "Add To Favorites"}
              </button>
              <Link
                to={`movies/${popularMovies[count].id}`}
                className="text-button"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
