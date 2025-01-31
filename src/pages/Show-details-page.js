import { useParams } from "react-router-dom";
import Details from "../components/details/Details";

function ShowDetailsPage() {
  const { showId } = useParams();

  return <Details id={showId} type="tv" />;
}

export default ShowDetailsPage;
