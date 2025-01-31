import { useSelector } from "react-redux";
import Items from "../components/shows-movies/Items";
import { movieGenres } from "../util/hellper";
import { fetchMovies } from "../util/http";
import Error from "../components/error-element/Error";

function MoviesPage() {
  const movieError = useSelector((state) => state.movies.movies.error);

  return (
    <>
      {movieError ? (
        <Error />
      ) : (
        <Items
          type="movies"
          genresList={movieGenres}
          fetchItems={fetchMovies}
        />
      )}
    </>
  );
}

export default MoviesPage;
