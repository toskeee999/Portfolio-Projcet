import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionMovies } from "../../store/movies";
import noPicture from "../../util/no-pictures.png";
import Hearth from "../details/Hearth";

function Item({ items }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="movie-item">
        <div className="movie-item-flex">
          <div className="item-image">
            <img
              src={
                items.poster_path
                  ? `http://image.tmdb.org/t/p/w200${items.poster_path}`
                  : noPicture
              }
              alt={items.title ? items.title : items.name}
            />
          </div>
          <div className="movie-item-text">
            <h3>{items.title ? items.title : items.name}</h3>
            <p className="overview-text">{items.overview}</p>
            <div className="button-list">
              <p>
                <Link
                  onClick={() => dispatch(actionMovies.setInputSearchFalse())}
                  to={
                    items.title ? `/movies/${items.id}` : `/shows/${items.id}`
                  }
                  className="text-button"
                >
                  View More
                </Link>
              </p>
              <p>
                <Hearth items={items} />
              </p>
            </div>
            <p className="rating-text">
              <i className="fa-solid fa-star"></i>
              {items.vote_average.toFixed(1)}/{items.vote_count}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
