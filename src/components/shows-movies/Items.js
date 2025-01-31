import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionMovies } from "../../store/movies";
import "./items.css";
import MapedItems from "./Maped-items";

function Items({ type, genresList, fetchItems }) {
  const items = useSelector((state) =>
    type === "movies"
      ? state.movies.movies.movieList || []
      : state.movies.shows.showList || []
  );
  const page = useSelector((state) =>
    type === "movies" ? state.movies.movies.page : state.movies.shows.page
  );

  const [genre, setGenre] = useState("");
  const dispatch = useDispatch();

  const outputItems = genre
    ? items.filter((item) => item.genre_ids.includes(genre))
    : items;

  const handleChange = (e) => setGenre(Number(e.target.value));

  const fetchNewItems = useCallback(async () => {
    dispatch(actionMovies.setLoader({ boolean: true, type: type }));
    try {
      const data = await fetchItems(page, genre);
      dispatch(actionMovies.setItems({ allItems: data, type }));
    } catch (error) {
      dispatch(
        actionMovies.setError(error?.message || "Failed to load resources")
      );
    } finally {
      dispatch(actionMovies.setLoader({ boolean: false, type: type }));
    }
  }, [dispatch, fetchItems, page, genre, type]);

  useEffect(() => {
    fetchNewItems();
  }, [fetchNewItems]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 100
      ) {
        dispatch(actionMovies.setNextPage(type));
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatch, type]);

  return (
    <div className="items-list">
      <select onChange={handleChange}>
        <option value="">All</option>
        {genresList.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <MapedItems outputItems={outputItems} />
    </div>
  );
}

export default Items;
