import { useSelector } from "react-redux";
import { useRouteError } from "react-router-dom";
import "./Error.css";
import Navigation from "../navigation/Navigation";

function Error({ description }) {
  const error = useRouteError();
  const movieError = useSelector((state) => state.movies.movies.error);
  const showError = useSelector((state) => state.movies.shows.error);
  console.log(description);
  let title = "UPS Error Occurred!";
  let text = "Something went wrong.";

  if (movieError && showError) {
    console.log(movieError, showError);
    text = "Failed to fetch movies and tv-shows";
  } else if (movieError) {
    console.log(movieError);
    text = movieError || "Failed to fetch movies";
  } else if (showError) {
    text = showError || "Failed to fetch tv-shows";
  }

  if (description) {
    text = description;
  }

  if (error?.status === 404) {
    title = "404 Not Found!";
    text = "The requested URL does not exist on the server.";
  }

  return (
    <>
      <Navigation />
      <div id="error">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </>
  );
}

export default Error;
