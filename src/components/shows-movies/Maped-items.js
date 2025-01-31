import Item from "../genre-list/item";
import { useSelector } from "react-redux";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

function MapedItems({ outputItems }) {
  const movieLoading = useSelector((state) => state.movies.movies.loading);
  const showLoading = useSelector((state) => state.movies.shows.loading);

  return (
    <ul className="items-list-ul">
      {outputItems.map((item) => (
        <li key={item.id}>
          <Item items={item} />
        </li>
      ))}
      {(movieLoading || showLoading) && (
        <li>
          <LoadingIndicator />
        </li>
      )}
    </ul>
  );
}

export default MapedItems;
