import { currencyFormater } from "../../util/hellper";
import Hearth from "./Hearth";

function DetailsTextMonitor({ details, director, producers, writers, device }) {
  return (
    <div className="text-top">
      {!device.mobile && (
        <div className="hearth-title">
          <h2>{details?.title || details?.name}</h2>
          <Hearth items={details} />
        </div>
      )}
      {!device.mobile && (
        <p>
          <span className="bold space">
            <i className="fa-solid fa-star"></i>
          </span>
          {details?.vote_average?.toFixed(1)}
          {details?.runtime && (
            <span className="below-title-space">{details.runtime} min</span>
          )}
          {details?.status && (
            <span className="below-title-space">{details.status}</span>
          )}
        </p>
      )}
      <ul>
        <span className="bold">Genre:</span>
        {details?.genres?.length > 0 ? (
          details.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
        ) : (
          <li>No genres available</li>
        )}
      </ul>
      {details?.release_date && (
        <p>
          <span className="bold space">Release date:</span>
          {details?.release_date}
        </p>
      )}
      {details?.first_air_date && (
        <div>
          <p>
            <span className="bold space">First air date:</span>
            {details?.first_air_date}
          </p>
          <p>
            <span className="bold space">Last air date:</span>
            {details?.last_air_date}
          </p>
        </div>
      )}
      {director?.name && (
        <p>
          <span className="bold space">Director:</span> {director?.name}
        </p>
      )}
      {producers.length > 0 && (
        <p>
          <span className="bold space">Producers:</span>
          {producers.map((producer) => (
            <span className="space" key={producer.id}>
              {producer.name},
            </span>
          ))}
        </p>
      )}
      {writers.length > 0 && (
        <p>
          <span className="bold space">Writers:</span>
          {writers.map((writer) => (
            <span className="space" key={writer.id}>
              {writer.name},
            </span>
          ))}
        </p>
      )}
      {details?.budget > 0 && (
        <p>
          <span className="bold space">Budget:</span>{" "}
          {currencyFormater(details.budget)}
        </p>
      )}
      {details?.revenue > 0 && (
        <p>
          <span className="bold space">Revenue:</span>{" "}
          {currencyFormater(details.revenue)}
        </p>
      )}
      {details?.number_of_seasons && (
        <p>
          <span className="bold space">Seasons:</span>{" "}
          {details.number_of_seasons}
        </p>
      )}
      {details?.number_of_episodes && (
        <p>
          <span className="bold space">Episodes:</span>{" "}
          {details.number_of_episodes}
        </p>
      )}
      {((!device.mobile && !device.tablet) || device.mobile) && (
        <p>
          <span className="bold space">Overview:</span>
          {details?.overview}
        </p>
      )}
    </div>
  );
}

export default DetailsTextMonitor;
