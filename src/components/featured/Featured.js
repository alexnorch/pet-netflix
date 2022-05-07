import "./Featured.scss";
import Iframe from "../../ui/Iframe";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from '@mui/icons-material/Close';
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Featured() {
  const [movie, setMovie] = useState([]);
  const [isHeaderLoaded, setIsHeaderLoaded] = useState(false);
  const [trailerActive, setTrailerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      const randomIndex = Math.round(Math.random() * 20);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`
      );
      const movieData = await response.json();

      setMovie(movieData.results[randomIndex]);
      setIsHeaderLoaded(true);
    };

    getMovies();
  }, []);

  return (
    <header className={`featured ${trailerActive && "minimize"}`}>
      <div className={`featured__background ${!trailerActive && "blured"}`}>
        {isHeaderLoaded &&
          (trailerActive ? (
            <Iframe id={movie?.id} />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt={movie?.title}
            />
          ))}
      </div>
      <div className="container">
        {!trailerActive && (
          <div className="featured__content">
            <div className="featured__info">
              {isHeaderLoaded ? (
                <>
                  <h1>{movie?.title}</h1>
                  <p className="featured__description">
                    {movie?.overview.length > 220
                      ? movie.overview.substring(0, 220) + "..."
                      : movie.overview}
                  </p>
                  <div className="featured__buttons">
                    <button
                      onClick={() =>
                        setTrailerActive((prevState) => !prevState)
                      }
                      className="play"
                    >
                      <PlayArrowIcon />
                      <span>{trailerActive ? "Close" : "Watch trailer"}</span>
                    </button>
                    <button
                      onClick={() => navigate(`/movie/${movie?.id}`)}
                      className="info"
                    >
                      <InfoOutlinedIcon />
                      <span>About</span>
                    </button>
                  </div>
                </>
              ) : (
                <Stack spacing={2}>
                  <Skeleton variant="rectangular" width="100%" height={40} />
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Stack direction="row" spacing={2}>
                    <Skeleton variant="rectangular" width="100%" height={50} />
                    <Skeleton variant="rectangular" width="100%" height={50} />
                  </Stack>
                </Stack>
              )}
            </div>
          </div>
        )}
      </div>
      {trailerActive && (
        <button
        onClick={() => setTrailerActive((prevState) => !prevState)}
        className="play"
      >
        <CloseIcon />
        <span>{trailerActive ? "Close" : "Watch trailer"}</span>
      </button>
      )}
    </header>
  );
}
