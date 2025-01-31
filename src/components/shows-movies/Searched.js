import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedMovies } from "../../util/http";
import MapedItems from "./Maped-items";
import { useEffect, useState } from "react";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import Error from "../error-element/Error";

function Searched() {
  const inputSearch = useSelector((state) => state.movies.inputSearchMovies);
  const [debounceSearch, setDebounceSearch] = useState("");

  useEffect(() => {
    const timout = setTimeout(() => {
      setDebounceSearch(inputSearch);
    }, 500);

    return () => clearTimeout(timout);
  }, [inputSearch]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["search", inputSearch],
    queryFn: ({ signal }) =>
      fetchSearchedMovies({ signal, query: debounceSearch }),
    enabled: debounceSearch.length > 1,
    refetchOnWindowFocus: false,
  });

  let content = (
    <p className="no-items-message">Enter a movie or show to search for!</p>
  );

  if (inputSearch.length > 1 && isPending) {
    content = <LoadingIndicator />;
  }

  if (inputSearch.length > 1 && isError) {
    content = <Error description={"failed to load searched results."} />;
  }

  if (inputSearch.length > 1 && data) {
    const checkedItems = data.filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.poster_path
    );
    const sortedByPopularity = checkedItems.sort(
      (a, b) => b.popularity - a.popularity
    );
    content = (
      <>
        {sortedByPopularity?.length > 0 ? (
          <MapedItems outputItems={sortedByPopularity} />
        ) : (
          <p className="no-items-message">
            We couldn't find any movies or shows matching your search. Try
            different keywords!
          </p>
        )}
      </>
    );
  }

  return <div className="items-list">{content}</div>;
}

export default Searched;
