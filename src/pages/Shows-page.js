import { useSelector } from "react-redux";
import Items from "../components/shows-movies/Items";
import { showGenres } from "../util/hellper";
import { fetchShows } from "../util/http";
import Error from "../components/error-element/Error";

function ShowsPage() {
  const showError = useSelector((state) => state.movies.shows.error);

  return (
    <>
      {showError ? (
        <Error />
      ) : (
        <Items type="tv" genresList={showGenres} fetchItems={fetchShows} />
      )}
    </>
  );
}

export default ShowsPage;
