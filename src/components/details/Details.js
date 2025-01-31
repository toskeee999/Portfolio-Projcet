import { useQuery } from "@tanstack/react-query";
import "./Details.css";
import Cast from "./cast";
import WrittenComents from "./WrittenComents";
import Coment from "./Coment";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import { fetchCast, fetchDetails } from "../../util/http";
import Error from "../error-element/Error";
import { useEffect, useState } from "react";
import DetailsTextMonitor from "./Details-text-monitor";
import Hearth from "./Hearth";

function Details({ id, type }) {
  const [device, setDevice] = useState({
    tablet: false,
    mobile: false,
  });

  const {
    data: details,
    isPending: detailsPending,
    isError: detailsIsError,
  } = useQuery({
    queryKey: [`${type}-details`, id],
    queryFn: ({ signal }) => fetchDetails({ signal, type, id }),
    refetchOnWindowFocus: false,
  });

  const { data, isPending, isError } = useQuery({
    queryKey: [`${type}-cast`, id],
    queryFn: ({ signal }) => fetchCast({ signal, id, type }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleResize = () => {
      let tablet = false;
      let mobile = false;

      if (window.innerWidth < 1001) {
        tablet = true;
      }
      if (window.innerWidth < 551) {
        mobile = true;
      }

      setDevice(() => {
        return {
          tablet,
          mobile,
        };
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let content;

  if (isPending || detailsPending) {
    content = <LoadingIndicator />;
  }

  if (isError || detailsIsError) {
    content = <Error description={`Failed to load details for the ${type}.`} />;
  }

  if (data && details) {
    const director = data?.crew.find((item) => item.job === "Director");
    const producers = data?.crew.filter((item) => item.job === "Producer");
    const writersList = data?.crew.filter(
      (item) => item.department === "Writing"
    );
    const writers = writersList?.filter((obj, index) => {
      return index === writersList.findIndex((o) => obj.id === o.id);
    });
    content = (
      <div
        id="details"
        style={{
          backgroundImage:
            !device.mobile &&
            `url('http://image.tmdb.org/t/p/original${details.backdrop_path}')`,
        }}
      >
        <div className="black-shadow">
          <div id="top">
            <div
              className="image-top"
              style={{
                backgroundImage:
                  device.mobile &&
                  `url('http://image.tmdb.org/t/p/w780${details.poster_path}')`,
              }}
            >
              {!device.mobile && (
                <img
                  src={`http://image.tmdb.org/t/p/w500${details.poster_path}`}
                  alt={details?.title || details?.name || "No Title"}
                />
              )}
              {device.mobile && (
                <div style={{ padding: "20px" }}>
                  <div className="hearth-div-mobile">
                    <Hearth items={details} />
                  </div>
                  <h2>{details?.title || details?.name}</h2>
                  <p>
                    <span className="bold space">
                      <i className="fa-solid fa-star"></i>
                    </span>
                    {details?.vote_average?.toFixed(1)}
                    {details?.runtime && (
                      <span className="below-title-space">
                        {details.runtime} min
                      </span>
                    )}
                    {details?.status && (
                      <span className="below-title-space">
                        {details.status}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
            {!device.mobile && (
              <DetailsTextMonitor
                details={details}
                director={director}
                producers={producers}
                writers={writers}
                device={device}
              />
            )}
          </div>
          {device.tablet && !device.mobile && (
            <div className="overview">
              <p>
                <span className="bold space">Overview:</span>
                {details?.overview}
              </p>
            </div>
          )}
          <div id="bottom">
            {device.mobile && (
              <div style={{ margin: "20px" }}>
                <DetailsTextMonitor
                  details={details}
                  director={director}
                  producers={producers}
                  writers={writers}
                  device={device}
                />
              </div>
            )}
            <div id="cast-div">
              <Cast cast={data?.cast} />
            </div>
            <div id="coments-div">
              <Coment itemId={details.id} />
              <WrittenComents itemId={details.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}

export default Details;
