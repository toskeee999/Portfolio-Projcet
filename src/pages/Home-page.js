import { useSelector } from "react-redux";
import GenreList from "../components/genre-list/Genre-list";
import Hero from "../components/hero/Hero";
import LoadingIndicator from "../components/loadingIndicator/LoadingIndicator";
import Error from "../components/error-element/Error";

function HomePage() {
  const movieLoading = useSelector((state) => state.movies.movies.loading);
  const showLoading = useSelector((state) => state.movies.shows.loading);
  const movieError = useSelector((state) => state.movies.movies.error);
  const showError = useSelector((state) => state.movies.shows.error);

  return (
    <>
      {movieError || showError ? (
        <Error />
      ) : (
        <>
          {!movieLoading ? <Hero /> : <LoadingIndicator />}
          {!movieLoading && showLoading ? (
            <LoadingIndicator />
          ) : (
            <main>
              <GenreList
                genre={"popular"}
                name={"popular"}
                idName={"popularity"}
                type={"movies"}
              />
              <GenreList genre={18} name={"dramas"} />
              <GenreList
                genre={"popular"}
                name={"popular"}
                type={"shows"}
                idName={"popularity"}
              />
              <GenreList genre={35} name={"comedies"} />
              <GenreList
                genre={"top-rated"}
                name={"top-rated"}
                idName={"vote_average"}
                type={"movies"}
              />
            </main>
          )}
        </>
      )}
    </>
  );
}

export default HomePage;
