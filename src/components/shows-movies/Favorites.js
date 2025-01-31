import { useSelector } from "react-redux";
import MapedItems from "./Maped-items";

function Favorites() {
  const favorites = useSelector((state) => state.movies.favorites);

  return (
    <div className="items-list">
      {favorites?.length > 0 ? (
        <MapedItems outputItems={favorites} />
      ) : (
        <p className="no-items-message">
          You haven't saved anything yet. Start adding your favorite movies and
          shows!
        </p>
      )}
    </div>
  );
}

export default Favorites;
