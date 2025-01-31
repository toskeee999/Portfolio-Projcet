import { useParams } from "react-router-dom";
import Details from "../components/details/Details";

function MovieDetailsPage() {
  const { movieId } = useParams();

  return <Details id={movieId} type="movie" />;
}

export default MovieDetailsPage;
