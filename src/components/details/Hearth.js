import { useDispatch, useSelector } from "react-redux";
import { actionMovies } from "../../store/movies";

function Hearth({ items }) {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.userData.userAuth);
  const favorites = useSelector((state) => state.movies.favorites);
  const savedItem = favorites.find((item) => item.id === items.id);
  const savedClas = savedItem ? "saved hearth-button" : "hearth-button";
  return (
    <button
      className={savedClas}
      onClick={() =>
        userAuth
          ? dispatch(actionMovies.setFavorites(items))
          : alert(
              "Log in to save your favorite movies and TV shows! Create an account or sign in to keep track of what you love."
            )
      }
    >
      <i className="fa-solid fa-heart"></i>
    </button>
  );
}

export default Hearth;
